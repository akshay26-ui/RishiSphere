import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Pulse from './components/Pulse';
import Upcoming from './components/Upcoming';
import Features from './components/Features';
import Experience from './components/Experience';
import Marquee from './components/Marquee';
import Cta from './components/Cta';
import './Home.css';

export default function Home() {
  return (
    <div className="landing-page">
      <div className="noise-overlay" />
      <div className="blueprint-grid" />
      
      <Navbar />
      
      <main>
        <Hero />
        <Pulse />
        <Upcoming />
        <Features />
        <Experience />
        <Marquee />
        <Cta />
      </main>
      
      <Footer />
    </div>
  );
}
