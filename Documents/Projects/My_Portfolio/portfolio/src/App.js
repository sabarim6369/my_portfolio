import React from 'react';
import Navbar from './components/navbar/navbar';
import video1 from './assets/bgvideo.mp4';
import Home from './components/Home/Home';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
const App = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Fixed video container */}
      <div className="fixed top-0 left-0 w-full h-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video1} type="video/mp4" />
          <source src={video1} type="video/webm" />
          <source src={video1} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        <Navbar />
        <Home />
        <About />
        <Projects />
        <Contact/>
      </div>
    </div>
  );
};

export default App;