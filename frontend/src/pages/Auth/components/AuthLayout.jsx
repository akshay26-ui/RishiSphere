import { Link } from 'react-router-dom';

export default function AuthLayout({ 
  children, 
  isWide = false, 
  headline, 
  subtext, 
  bottomText, 
  bottomLinkText, 
  bottomLinkTo 
}) {
  return (
    <div className="auth-page">
      <div className="ambient-wash wash-1" aria-hidden="true" />
      <div className="ambient-wash wash-2" aria-hidden="true" />

      <div className="auth-container">
        <div className="auth-brand">
          <h1 className="auth-brand-name">RishiSphere</h1>
          <span className="auth-brand-sub">Rishihood University</span>
        </div>

        <div className={`frosted-card ${isWide ? 'wide' : ''}`}>
          <div className="card-top">
            <h2 className="card-headline">{headline}</h2>
            <p className="card-subtext">{subtext}</p>
          </div>

          {children}

          <div className="card-bottom">
            <span className="bottom-text">{bottomText}</span>
            <Link to={bottomLinkTo} className="bottom-link">{bottomLinkText}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
