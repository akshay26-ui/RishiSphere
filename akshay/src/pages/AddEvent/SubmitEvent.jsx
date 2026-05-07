import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../shared/Navbar/Navbar';
import EventBasicsForm from './components/EventBasicsForm';
import DateTimeForm from './components/DateTimeForm';
import VenueSelectionForm from './components/VenueSelectionForm';
import DetailsForm from './components/DetailsForm';
import EventPreviewCard from './components/EventPreviewCard';
import SubmissionGuidelines from './components/SubmissionGuidelines';
import './SubmitEvent.css';

export default function SubmitEvent() {
  const [activeType, setActiveType] = useState('workshop');
  const [recurring, setRecurring] = useState(false);
  const [cert, setCert] = useState(true);
  const [activeBlock, setActiveBlock] = useState('academic');
  const [activeFloor, setActiveFloor] = useState('ground');
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Live preview state
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventDate, setEventDate] = useState('');

  // Checklist progress
  const steps = [
    !!eventName,
    !!(eventDate && startTime),
    !!selectedRoom,
  ];
  const completedSteps = steps.filter(Boolean).length;
  const progress = Math.round((completedSteps / steps.length) * 100);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="submit-event-page">
      <Navbar />

      {submitted && (
        <div className="submit-success-banner">
          🎉 Your event has been submitted for admin approval!
        </div>
      )}

      <div className="submit-page-container">
        <div className="submit-left-col">
          <Link to="/calendar" className="back-link">
            <ArrowLeft size={16} /> Back to Calendar
          </Link>
          <h1 className="page-title">Submit Event</h1>
          <p className="page-desc">
            Propose a new event to the university calendar. All submissions are reviewed by the administration before being published.
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
              activeBlock={activeBlock} setActiveBlock={setActiveBlock}
              activeFloor={activeFloor} setActiveFloor={setActiveFloor}
              selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}
            />
            <div className="section-divider" />

            <DetailsForm cert={cert} setCert={setCert} />

            <div className="form-footer">
              <div className="footer-note">All submissions require admin approval.</div>
              <div className="footer-actions">
                <button type="button" className="btn-ghost">Save as Draft</button>
                <button type="submit" className="btn-primary">Submit for Approval</button>
              </div>
            </div>
          </form>
        </div>

        <div className="submit-right-col">
          <div className="right-label">Live Preview</div>
          <div className="right-desc">This is how your event will appear on the calendar.</div>

          <EventPreviewCard
            selectedRoom={selectedRoom}
            eventName={eventName}
            eventType={activeType}
            eventDate={eventDate}
            startTime={startTime}
          />

          <div className="section-divider" style={{ margin: '24px 0' }} />

          <SubmissionGuidelines
            progress={progress}
            steps={steps}
          />
        </div>
      </div>
    </div>
  );
}
