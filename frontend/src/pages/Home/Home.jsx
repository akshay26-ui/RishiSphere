import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Pulse from './components/Pulse';
import Features from './components/Features';
import Experience from './components/Experience';
import Marquee from './components/Marquee';
import Cta from './components/Cta';
import s from './Home.module.css';

export default function Home() {
  return (
    <div className={s.page}>
      <div className={s.home} />
      <div className={s.grid} />
      
      <Navbar />
      
      <main>
        <Hero />
        <Pulse />
        <Features />
        <Experience />
        <Marquee />
        <Cta />
      </main>
      
      <Footer />
    </div>
  );
}
