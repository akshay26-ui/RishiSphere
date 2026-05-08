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

export default function SubmitEvent() {
    const [activeType, setActiveType] = useState("workshop");

    const [recurring, setRecurring] = useState(false);

    const [cert, setCert] = useState(true);

    const [reason, setReason] = useState("");

    const [selectedRoom, setSelectedRoom] = useState(null);

    // Backend data
    const [rooms, setRooms] = useState([]);

    const [unavailableRooms, setUnavailableRooms] = useState([]);

    // Live preview state
    const [eventName, setEventName] = useState("");

    const [startTime, setStartTime] = useState("");

    const [endTime, setEndTime] = useState("");

    const [eventDate, setEventDate] = useState("");

    // UI states
    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // Checklist progress
    const steps = [!!eventName, !!(eventDate && startTime), !!selectedRoom];

    const completedSteps = steps.filter(Boolean).length;

    const progress = Math.round((completedSteps / steps.length) * 100);

    // Fetch rooms on mount
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const result = await getRooms();
                
                const roomsArray = Array.isArray(result) ? result : (result?.data || []);
                setRooms(roomsArray);
            } catch (err) {
                console.error("Error fetching rooms:", err);
            }
        };

        fetchRooms();
    }, []);

    // Fetch unavailable rooms
    useEffect(() => {
        if (!eventDate || !startTime || !endTime) {
            return;
        }

        const fetchUnavailableRooms = async () => {
            try {
                const start = new Date(`${eventDate}T${startTime}`);

                const end = new Date(`${eventDate}T${endTime}`);

                const result = await getUnavailableRooms({
                    startTime: start.toISOString(),

                    endTime: end.toISOString(),
                });

                const unavArray = Array.isArray(result) ? result : (result?.data || []);
                setUnavailableRooms(unavArray);
            } catch (err) {
                console.error("Error fetching unavailable rooms:", err);
            }
        };

        fetchUnavailableRooms();
    }, [eventDate, startTime, endTime]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            setError("");

            const start = new Date(`${eventDate}T${startTime}`);

            const end = new Date(`${eventDate}T${endTime}`);

            await createEvent({
                title: eventName,

                description: reason || `${activeType} event submission`,
                
                type: activeType,

                roomId: selectedRoom.id,

                startTime: start.toISOString(),

                endTime: end.toISOString(),
            });

            setSubmitted(true);

            setTimeout(() => {
                setSubmitted(false);
            }, 4000);
        } catch (err) {
            console.error(err);

            setError(err.response?.data?.message || "Failed to submit event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-event-page">
            <Navbar />

            {submitted && (
                <div className="submit-success-banner">
                    🎉 Your event has been submitted for admin approval!
                </div>
            )}

            {error && <div className="submit-error-banner">{error}</div>}

            <div className="submit-page-container">
                {/* LEFT COLUMN */}

                <div className="submit-left-col">
                    <Link to="/calendar" className="back-link">
                        <ArrowLeft size={16} />
                        Back to Calendar
                    </Link>

                    <h1 className="page-title">Submit Event</h1>

                    <p className="page-desc">
                        Propose a new event to the university calendar. All submissions are
                        reviewed by the administration before being published.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <EventBasicsForm
                            activeType={activeType}
                            setActiveType={setActiveType}
                            eventName={eventName}
                            setEventName={setEventName}
                        />

                        <div className="section-divider" />

                        <DateTimeForm
                            recurring={recurring}
                            setRecurring={setRecurring}
                            eventDate={eventDate}
                            setEventDate={setEventDate}
                            startTime={startTime}
                            setStartTime={setStartTime}
                            endTime={endTime}
                            setEndTime={setEndTime}
                        />

                        <div className="section-divider" />

                        <VenueSelectionForm
                            rooms={rooms}
                            unavailableRooms={unavailableRooms}
                            selectedRoom={selectedRoom}
                            setSelectedRoom={setSelectedRoom}
                        />

                        <div className="section-divider" />

                        <DetailsForm cert={cert} setCert={setCert} reason={reason} setReason={setReason} />

                        <div className="form-footer">
                            <div className="footer-note">
                                All submissions require admin approval.
                            </div>

                            <div className="footer-actions">
                                <button type="button" className="btn-ghost">
                                    Save as Draft
                                </button>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit for Approval"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* RIGHT COLUMN */}

                <div className="submit-right-col">
                    <div className="right-label">Live Preview</div>

                    <div className="right-desc">
                        This is how your event will appear on the calendar.
                    </div>

                    <EventPreviewCard
                        selectedRoom={selectedRoom}
                        eventName={eventName}
                        eventType={activeType}
                        eventDate={eventDate}
                        startTime={startTime}
                    />

                    <div
                        className="section-divider"
                        style={{
                            margin: "24px 0",
                        }}
                    />

                    <SubmissionGuidelines progress={progress} steps={steps} />
                </div>
            </div>
        </div>
    );
}
