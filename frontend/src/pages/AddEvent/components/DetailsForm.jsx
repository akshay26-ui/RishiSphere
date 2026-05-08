import { Search } from "lucide-react";
import "./DetailsForm.css";

export default function DetailsForm({ cert, setCert, reason, setReason }) {
    return (
        <>
            <div className="section-header">
                <div className="section-header-row">
                    <span className="section-pill">Step 4</span>
                    <span className="section-title">Additional Details</span>
                </div>
                <p className="section-desc">Final details for admin review.</p>
            </div>

            {/* reason for event */}
            <div className="form-group">
                <label className="form-label">
                    Reason for Event <span className="optional">(Internal Note)</span>
                </label>
                <textarea
                    className="form-textarea"
                    style={{ minHeight: "80px" }}
                    placeholder="Explain why this event is valuable for students..."
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                />
            </div>

            {/* co-organizers */}
            <div className="form-group">
                <label className="form-label">
                    Co-Organizers <span className="optional">(Optional)</span>
                </label>
                <div className="form-input-with-icon">
                    <div className="icon"><Search size={18} /></div>
                    <input type="text" className="form-input" placeholder="Search for clubs or users" />
                </div>
            </div>

            {/* certificates toggle */}
            <div className="form-group">
                <div className="toggle-row">
                    <div>
                        <div className="toggle-label dark">Issue Certificates</div>
                        <div className="helper-text" style={{ marginTop: "2px" }}>Automatically issue certificates to attendees.</div>
                    </div>
                    <button
                        type="button"
                        className={`toggle-switch ${cert ? "on" : "off"}`}
                        onClick={() => setCert(!cert)}
                        aria-label="Toggle certificates"
                    />
                </div>
            </div>
        </>
    );
}
