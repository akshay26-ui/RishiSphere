import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
    id,
    name,
    value,
    placeholder = "••••••••",
    defaultValue,
    autoComplete = "current-password",
    showStrength = false,
    onChange,
}) {
    const [showPw, setShowPw] = useState(false);

    return (
        <div className="auth-input-wrapper">
            <input
                name={name}
                value={value}
                id={id}
                type={showPw ? "text" : "password"}
                className="frosted-input has-icon-right"
                placeholder={placeholder}
                defaultValue={defaultValue}
                autoComplete={autoComplete}
                onChange={onChange}
            />
            <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPw(!showPw)}
                aria-label={showPw ? "Hide password" : "Show password"}
            >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {showStrength && (
                <div className="strength-container">
                    <div className="strength-header">
                        <span className="strength-label">Good</span>
                    </div>
                    <div
                        className="strength-bars"
                        role="meter"
                        aria-label="Password strength: Good"
                    >
                        <div className="strength-segment active" />
                        <div className="strength-segment active" />
                        <div className="strength-segment active" />
                        <div className="strength-segment" />
                    </div>
                </div>
            )}
        </div>
    );
}
