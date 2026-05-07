import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import PasswordInput from '../components/PasswordInput';
import GoogleAuthButton from '../components/GoogleAuthButton';
import '../Login/Login.css';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@rishihood.edu.in')) {
      setError('Only @rishihood.edu.in emails are accepted.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/calendar');
    }, 1000);
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
          <label className="auth-label" htmlFor="signup-name">Full Name</label>
          <input id="signup-name" type="text" className="frosted-input" placeholder="Your full name" autoComplete="name" required />
        </div>

        <div className="auth-form-group">
          <label className="auth-label" htmlFor="signup-enrollment">Enrollment Number</label>
          <input id="signup-enrollment" type="text" className="frosted-input" placeholder="e.g. RU23XXXX" required />
        </div>

        <div className="auth-form-group">
          <label className="auth-label" htmlFor="signup-email">University Email</label>
          <input
            id="signup-email"
            type="email"
            className={`frosted-input${error ? ' input-error' : ''}`}
            placeholder="yourname@rishihood.edu.in"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {error
            ? <div className="auth-error">{error}</div>
            : <div className="auth-helper">Only @rishihood.edu.in emails are accepted.</div>
          }
        </div>

        <div className="auth-form-group">
          <label className="auth-label" htmlFor="signup-password">Password</label>
          <PasswordInput id="signup-password" defaultValue="secret123" autoComplete="new-password" showStrength={true} />
        </div>

        <div className="auth-form-group mb-24">
          <label className="auth-label" htmlFor="signup-confirm">Confirm Password</label>
          <PasswordInput id="signup-confirm" autoComplete="new-password" />
        </div>

        <button type="submit" className="auth-primary-btn" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>

        <div className="auth-divider">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">or</span>
          <div className="auth-divider-line" />
        </div>

        <GoogleAuthButton />

        <p className="terms-text">
          By continuing you agree to our{' '}
          <a href="#" className="inline-link">Terms</a> and{' '}
          <a href="#" className="inline-link">Privacy Policy</a>
        </p>
      </form>
    </AuthLayout>
  );
}
