import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import resume from "../../assets/Sabaris resume.pdf"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [ 'About', 'Projects', 'Contact'];

  
  const handleSmoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-transparent backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="w-full h-[100px] relative flex items-center justify-between px-6 lg:px-16">
      <div className="flex items-center space-x-3">
  <Code className="text-red-500 w-10 h-10 " />
  <span className="text-white text-4xl font-bold tracking-wider relative ">
    SABARI
    <span className="text-red-500 animate-pulse absolute -top-2 -right-4 text-5xl">.</span>
  </span>
  <span className='motion-preset-spin motion-duration-75 text-3xl mt-1'>⭐</span>

</div>



        <div className="hidden lg:flex items-center space-x-12">
          <div className="relative group">
            <button
              onClick={() => handleSmoothScroll('home')}
              className="text-white font-medium text-lg tracking-wide uppercase hover:text-red-500 transition-colors duration-300"
            >
              Home
              <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
          {menuItems.map((item) => (
            <div key={item} className="relative group">
              <button
                onClick={() => handleSmoothScroll(item.toLowerCase())}
                className="text-white font-medium text-lg tracking-wide uppercase hover:text-red-500 transition-colors duration-300"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          ))}
          <a   href={resume}
            download className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 transform hover:scale-105">
            Resume
          </a>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-red-500 transition-colors duration-300"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-[100px] left-0 w-full bg-black/95 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center py-8 space-y-6">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleSmoothScroll(item.toLowerCase(),setIsOpen(false))}
              className="text-white font-medium text-xl tracking-wide uppercase hover:text-red-500 transition-colors duration-300"
            >
              {item}
            </button>
          ))}
          <button className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300">
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
