import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { loginUser } from "../../../services/auth.service";
import { useAuth } from "../../../context/AuthContext";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // check university email
        if (!email.endsWith("@rishihood.edu.in")) {
            setError("Please use your @rishihood.edu.in email.");
            return;
        }

        try {
            setLoading(true);
            const result = await loginUser({ email, password });

            // save to context and go to calendar
            login({ user: result.data.user, accessToken: result.data.accessToken });
            navigate("/calendar");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            headline="Welcome back"
            subtext="Sign in to your campus account."
            bottomText="Don't have an account?"
            bottomLinkText="Sign Up"
            bottomLinkTo="/signup"
        >
            <form onSubmit={handleSubmit}>
                {/* email field */}
                <div className="auth-form-group">
                    <label className="auth-label" htmlFor="login-email">University Email</label>
                    <div className="auth-input-wrapper">
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            className={`frosted-input${error ? " input-error" : ""}`}
                            placeholder="yourname@rishihood.edu.in"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="auth-error">{error}</div>}
                </div>

                {/* password field */}
                <div className="auth-form-group no-margin">
                    <label className="auth-label" htmlFor="login-password">Password</label>
                    <PasswordInput
                        id="login-password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <div className="form-row-below-password">
                    <button type="button" className="text-link">Forgot password?</button>
                </div>

                <button type="submit" className="auth-primary-btn" disabled={loading}>
                    {loading ? "Signing in..." : "Log In"}
                </button>

                <div className="auth-divider">
                    <div className="auth-divider-line" />
                    <span className="auth-divider-text">or</span>
                    <div className="auth-divider-line" />
                </div>

                <GoogleAuthButton />
            </form>
        </AuthLayout>
    );
}
