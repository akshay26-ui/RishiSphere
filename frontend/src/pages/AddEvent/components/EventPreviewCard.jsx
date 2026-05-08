import {
    Calendar,
    Clock,
    MapPin,
    Users,
} from "lucide-react";

import "./EventPreviewCard.css";

const EVENT_TYPE_LABELS = {

    workshop: "Workshop",

    seminar: "Seminar",

    hackathon: "Hackathon",

    cultural: "Cultural Event",

    sports: "Sports Event",

    meeting: "Meeting",
};

export default function EventPreviewCard({

    selectedRoom,

    eventName,

    eventType,

    eventDate,

    startTime,
}) {

    const typeLabel =
        EVENT_TYPE_LABELS[eventType] ||
        "Workshop";

    const displayDate =
        eventDate

            ? new Date(
                  eventDate
              ).toLocaleDateString(
                  "en-IN",

                  {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                  }
              )

            : "TBD";

    const displayTime =
        startTime

            ? new Date(
                  `1970-01-01T${startTime}`
              ).toLocaleTimeString(
                  "en-IN",

                  {
                      hour: "numeric",
                      minute: "2-digit",
                  }
              )

            : "TBD";

    return (

        <div className="preview-card">

            <div className="preview-type-pill">

                {typeLabel}

            </div>

            <div className="preview-title">

                {eventName ||
                    "Untitled Event"}

            </div>

            <div className="preview-organizer">

                <div className="preview-avatar">
                    RS
                </div>

                <div className="preview-org-info">

                    <span className="preview-org-label">
                        Organized by
                    </span>

                    <span className="preview-org-name">
                        RishiSphere User
                    </span>

                </div>

            </div>

            <div className="preview-meta-rows">

                {/* Date */}

                <div className="preview-meta-row">

                    <div className="preview-meta-icon">

                        <Calendar size={14} />

                    </div>

                    <span>
                        {displayDate}
                    </span>

                </div>

                {/* Time */}

                <div className="preview-meta-row">

                    <div className="preview-meta-icon">

                        <Clock size={14} />

                    </div>

                    <span>
                        {displayTime}
                    </span>

                </div>

                {/* Venue */}

                <div className="preview-meta-row">

                    <div className="preview-meta-icon">

                        <MapPin size={14} />

                    </div>

                    <span>

                        {selectedRoom?.name ||
                            "Venue TBD"}

                    </span>

                </div>

                {/* Capacity */}

                {selectedRoom?.capacity && (

                    <div className="preview-meta-row">

                        <div className="preview-meta-icon">

                            <Users size={14} />

                        </div>

                        <span>

                            {selectedRoom.capacity}
                            {" "}
                            seats

                        </span>

                    </div>
                )}

            </div>

            <div className="preview-status">
                Draft
            </div>

        </div>
    );
}
