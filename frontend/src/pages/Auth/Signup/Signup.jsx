import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import GoogleAuthButton from "../components/GoogleAuthButton";

import { registerUser } from "../../../services/auth.service";

import "../Login/Login.css";

export default function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        enrollmentNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.name)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        try {
            setLoading(true);
            setError("");

            // Basic frontend validation
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            // University email validation
            if (!formData.email.endsWith("@rishihood.edu.in")) {
                setError("Only @rishihood.edu.in emails are allowed");
                return;
            }

            const payload = {
                name: formData.name,
                enrollmentNumber: formData.enrollmentNumber,
                email: formData.email,
                password: formData.password,
            };

            const result = await registerUser(payload);

            console.log(result);

            alert("Registration successful");

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

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
                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="signup-name">
                        Full Name
                    </label>

                    <input
                        id="signup-name"
                        name="name"
                        type="text"
                        className="frosted-input"
                        placeholder="Your full name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="signup-enrollment">
                        Enrollment Number
                    </label>

                    <input
                        id="signup-enrollment"
                        name="enrollmentNumber"
                        type="text"
                        className="frosted-input"
                        placeholder="e.g. RU23XXXX"
                        value={formData.enrollmentNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="signup-email">
                        University Email
                    </label>

                    <input
                        id="signup-email"
                        name="email"
                        type="email"
                        className={`frosted-input${error ? " input-error" : ""}`}
                        placeholder="yourname@rishihood.edu.in"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {error ? (
                        <div className="auth-error">{error}</div>
                    ) : (
                        <div className="auth-helper">
                            Only @rishihood.edu.in emails are accepted.
                        </div>
                    )}
                </div>

                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="signup-password">
                        Password
                    </label>

                    <PasswordInput
                        id="signup-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        showStrength={true}
                    />
                </div>

                <div className="auth-form-group mb-24">
                    <label className="auth-label" htmlFor="signup-confirm">
                        Confirm Password
                    </label>

                    <PasswordInput
                        id="signup-confirm"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
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
                    By continuing you agree to our{" "}
                    <a href="#" className="inline-link">
                        Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="inline-link">
                        Privacy Policy
                    </a>
                </p>
            </form>
        </AuthLayout>
    );
}
