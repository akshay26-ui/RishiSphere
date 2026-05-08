import { Check } from "lucide-react";

import "./SubmissionGuidelines.css";

export default function SubmissionGuidelines({
    progress = 0,

    steps = [],
}) {
    const checklistLabels = [
        "Basic Information",

        "Date & Time Selected",

        "Venue Selected",
    ];

    return (
        <>
            {/* Guidelines */}

            <div className="right-label">Submission Guidelines</div>

            <div className="guidelines-list">
                <div className="guideline-item">
                    <div className="guideline-dot" />

                    <div className="guideline-text">
                        Events must be submitted at least 48 hours in advance.
                    </div>
                </div>

                <div className="guideline-item">
                    <div className="guideline-dot" />

                    <div className="guideline-text">
                        Venue bookings are confirmed only after admin approval.
                    </div>
                </div>

                <div className="guideline-item">
                    <div className="guideline-dot" />

                    <div className="guideline-text">
                        Rooms with conflicting schedules are automatically restricted.
                    </div>
                </div>

                <div className="guideline-item">
                    <div className="guideline-dot" />

                    <div className="guideline-text">
                        Event submissions may be reviewed, approved, or rejected by
                        administrators.
                    </div>
                </div>
            </div>

            <div
                className="section-divider"
                style={{
                    margin: "24px 0",
                }}
            />

            {/* Checklist */}

            <div className="right-label">Submission Checklist</div>

            <div className="checklist-list">
                {checklistLabels.map((label, index) => (
                    <div className="check-item" key={label}>
                        <div
                            className={`
                                    check-box
                                    ${steps[index] ? "checked" : ""}
                                `}
                        >
                            {steps[index] && <Check size={10} />}
                        </div>

                        <div
                            className="check-text"
                            style={{
                                color: steps[index] ? "var(--text-main)" : "var(--text-muted)",
                            }}
                        >
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress */}

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>

            <div className="progress-text">{progress}% Complete</div>
        </>
    );
}
