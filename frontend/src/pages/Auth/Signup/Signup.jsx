import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { registerUser } from "../../../services/auth.service";
import "../Login/Login.css";

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [enrollmentNumber, setEnrollmentNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // check passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // check university email
        if (!email.endsWith("@rishihood.edu.in")) {
            setError("Only @rishihood.edu.in emails are allowed");
            return;
        }

        try {
            setLoading(true);
            await registerUser({ name, enrollmentNumber, email, password });
            alert("Registration successful");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            isWide={true}
            headline="Create your account"
            subtext="Join the Rishihood campus community."
            bottomText="Already have an account?"
            bottomLinkText="Log In"
            bottomLinkTo="/login"
        >
            <form onSubmit={handleSubmit}>
                {/* name */}
                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="signup-name">Full Name</label>
                    <input id="signup-name" name="name" type="text" className="frosted-input"
                        placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required />
                </div>

                {/* enrollment number */}
                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="signup-enrollment">Enrollment Number</label>
                    <input id="signup-enrollment" name="enrollmentNumber" type="text" className="frosted-input"
                        placeholder="e.g. RU23XXXX" value={enrollmentNumber} onChange={e => setEnrollmentNumber(e.target.value)} required />
                </div>

                {/* email */}
                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="signup-email">University Email</label>
                    <input id="signup-email" name="email" type="email"
                        className={`frosted-input${error ? " input-error" : ""}`}
                        placeholder="yourname@rishihood.edu.in" value={email} onChange={e => setEmail(e.target.value)} required />
                    {error
                        ? <div className="auth-error">{error}</div>
                        : <div className="auth-helper">Only @rishihood.edu.in emails are accepted.</div>
                    }
                </div>

                {/* password */}
                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="signup-password">Password</label>
                    <PasswordInput id="signup-password" name="password" value={password}
                        onChange={e => setPassword(e.target.value)} autoComplete="new-password" showStrength={true} />
                </div>

                {/* confirm password */}
                <div className="auth-form-group mb-24">
                    <label className="auth-label" htmlFor="signup-confirm">Confirm Password</label>
                    <PasswordInput id="signup-confirm" name="confirmPassword" value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" />
                </div>

                <button type="submit" className="auth-primary-btn" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                </button>

                <div className="auth-divider">
                    <div className="auth-divider-line" />
                    <span className="auth-divider-text">or</span>
                    <div className="auth-divider-line" />
                </div>

                <GoogleAuthButton />

                <p className="terms-text">
                    By continuing you agree to our <a href="#" className="inline-link">Terms</a> and <a href="#" className="inline-link">Privacy Policy</a>
                </p>
            </form>
        </AuthLayout>
    );
}
