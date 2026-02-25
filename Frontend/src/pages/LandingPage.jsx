import Navbar from '../components/Navbar';
import Hero from './Hero';
import Footer from '../components/Footer';

const LandingPage = () => {
 
  return (
    <div className="bg-[#0b0f1a] text-white min-h-screen font-sans selection:bg-blue-500/30">
     <Navbar/>
     <Hero/>
    <Footer/>
    </div>
  );
};

export default LandingPage;