import GoogleIcon from '../Login/GoogleIcon';

export default function GoogleAuthButton() {
  return (
    <button type="button" className="auth-google-btn">
      <span className="google-icon">
        <GoogleIcon />
      </span>
      Continue with Google
    </button>
  );
}
