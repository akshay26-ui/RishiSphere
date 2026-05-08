import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../shared/Navbar/Navbar";
import EventBasicsForm from "./components/EventBasicsForm";
import DateTimeForm from "./components/DateTimeForm";
import VenueSelectionForm from "./components/VenueSelectionForm";
import DetailsForm from "./components/DetailsForm";
import EventPreviewCard from "./components/EventPreviewCard";
import SubmissionGuidelines from "./components/SubmissionGuidelines";
import { createEvent, getUnavailableRooms } from "../../services/event.service";
import { getRooms } from "../../services/room.service";
import "./SubmitEvent.css";

// today's date as yyyy-mm-dd for the min attribute on date input
const TODAY = new Date().toISOString().split("T")[0];

export default function SubmitEvent() {
    const [activeType, setActiveType] = useState("workshop");
    const [recurring, setRecurring] = useState(false);
    const [cert, setCert] = useState(true);
    const [reason, setReason] = useState("");
    const [selectedRoom, setSelectedRoom] = useState(null);

    const [rooms, setRooms] = useState([]);
    const [unavailableRooms, setUnavailableRooms] = useState([]);

    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [eventDate, setEventDate] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // user must fill date + both times before rooms unlock
    const dateTimeReady = !!(eventDate && startTime && endTime);

    // progress bar
    const steps = [!!eventName, dateTimeReady, !!selectedRoom];
    const progress = Math.round((steps.filter(Boolean).length / steps.length) * 100);

    // load all rooms on first open
    useEffect(() => {
        async function loadRooms() {
            try {
                const res = await getRooms();
                // API returns { success: true, data: [...] }
                const list = res?.data || [];
                setRooms(list);
            } catch (err) {
                console.log("Could not load rooms", err);
            }
        }
        loadRooms();
    }, []);

    // whenever date/time changes, clear selected room and re-check availability
    useEffect(() => {
        // clear old selection if date/time changed
        setSelectedRoom(null);

        if (!dateTimeReady) return;

        async function checkRooms() {
            try {
                const start = new Date(`${eventDate}T${startTime}`).toISOString();
                const end = new Date(`${eventDate}T${endTime}`).toISOString();
                const res = await getUnavailableRooms(start, end);
                const list = Array.isArray(res) ? res : (res?.data || []);
                setUnavailableRooms(list);
            } catch (err) {
                console.log("Could not check rooms", err);
            }
        }
        checkRooms();
    }, [eventDate, startTime, endTime]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // --- Validation ---

        // title must be at least 3 characters
        if (!eventName || eventName.trim().length < 3) {
            setError("Event title must be at least 3 characters.");
            return;
        }

        // must have date + times
        if (!eventDate || !startTime || !endTime) {
            setError("Please fill in the event date and times.");
            return;
        }

        const start = new Date(`${eventDate}T${startTime}`);
        const end = new Date(`${eventDate}T${endTime}`);
        const now = new Date();

        // can't be in the past
        if (start <= now) {
            setError("Event start time must be in the future.");
            return;
        }

        // end must be after start
        if (end <= start) {
            setError("End time must be after start time.");
            return;
        }

        // must have a room
        if (!selectedRoom) {
            setError("Please select a venue.");
            return;
        }

        try {
            setLoading(true);

            await createEvent({
                title: eventName,
                description: reason || `${activeType} event submission`,
                type: activeType,
                roomId: selectedRoom.id,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
            });

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 4000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit event");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="submit-event-page">
            <Navbar />

            {/* success message */}
            {submitted && <div className="submit-success-banner">🎉 Your event has been submitted for admin approval!</div>}

            {/* error message */}
            {error && <div className="submit-error-banner">{error}</div>}

            <div className="submit-page-container">
                {/* left side - form */}
                <div className="submit-left-col">
                    <Link to="/calendar" className="back-link">
                        <ArrowLeft size={16} /> Back to Calendar
                    </Link>

                    <h1 className="page-title">Submit Event</h1>
                    <p className="page-desc">Propose a new event to the university calendar. All submissions are reviewed by the administration before being published.</p>

                    <form onSubmit={handleSubmit}>
                        <EventBasicsForm activeType={activeType} setActiveType={setActiveType} eventName={eventName} setEventName={setEventName} />
                        <div className="section-divider" />

                        {/* pass today as min date so past dates are disabled in the picker */}
                        <DateTimeForm
                            recurring={recurring} setRecurring={setRecurring}
                            eventDate={eventDate} setEventDate={setEventDate}
                            startTime={startTime} setStartTime={setStartTime}
                            endTime={endTime} setEndTime={setEndTime}
                            minDate={TODAY}
                        />
                        <div className="section-divider" />

                        {/* locked=true means user hasn't picked date+time yet */}
                        <VenueSelectionForm
                            rooms={rooms}
                            unavailableRooms={unavailableRooms}
                            selectedRoom={selectedRoom}
                            setSelectedRoom={setSelectedRoom}
                            locked={!dateTimeReady}
                        />
                        <div className="section-divider" />

                        <DetailsForm cert={cert} setCert={setCert} reason={reason} setReason={setReason} />

                        <div className="form-footer">
                            <div className="footer-note">All submissions require admin approval.</div>
                            <div className="footer-actions">
                                <button type="button" className="btn-ghost">Save as Draft</button>
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? "Submitting..." : "Submit for Approval"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* right side - live preview */}
                <div className="submit-right-col">
                    <div className="right-label">Live Preview</div>
                    <div className="right-desc">This is how your event will appear on the calendar.</div>

                    <EventPreviewCard selectedRoom={selectedRoom} eventName={eventName} eventType={activeType} eventDate={eventDate} startTime={startTime} />

                    <div className="section-divider" style={{ margin: "24px 0" }} />

                    <SubmissionGuidelines progress={progress} steps={steps} />
                </div>
            </div>
        </div>
    );
}
