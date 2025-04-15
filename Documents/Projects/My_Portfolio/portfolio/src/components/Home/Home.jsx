import React, { useState, useEffect } from 'react';
import sabarisimage from "../../assets/sabarisimage.jpg"
import resume from "../../assets/updated resume.pdf"
const TypewriterText = ({ texts }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const updateText = () => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          return Math.random() * 100 + 50;
        } else {
          setIsDeleting(true);
          return 2000;
        }
      } else {
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
          return 500;
        }
        setDisplayText(displayText.slice(0, -1));
        return 50;
      }
    };

    const timeout = setTimeout(() => {
      const delay = updateText();
      clearTimeout(timeout);
      setTimeout(updateText, delay);
    }, 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
};

const Home = () => {
  const roles = [
    "MERN Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver"
  ];

  const handleHireMeClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen" id="home">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-20 flex flex-col md:flex-row items-center w-11/12 lg:w-10/12 space-y-8 md:space-y-0 md:space-x-10 py-20">
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-6">
          <div className="space-y-2">
            <h2 className="text-red-500 text-xl font-medium motion-preset-confetti motion-duration-2000">Hello, I'm</h2>
            <h1 className="text-5xl md:text-6xl font-bold text-white motion-preset-blink motion-duration-1500 
">
              Sabari
            </h1>
          </div>

          <div className="h-[50px] text-2xl md:text-3xl font-semibold text-gray-300">
            <TypewriterText texts={roles} />
          </div>

          <p className="text-lg text-gray-300 leading-relaxed ">
            I'm a passionate developer with expertise in building scalable web
            applications. I enjoy working with modern frameworks and solving
            complex problems creatively.
          </p>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleHireMeClick} 
              className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Hire Me
            </button>
            <a
  href={resume}
  download
  className="px-8 py-3 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 "
>
  Download CV
</a>


          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full animate-rotate-gradient"></div>

            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-br from-red-500 to-purple-500 opacity-50 animate-glow"></div>

            <img
              src={sabarisimage}
              alt="Profile"
              className="w-full h-full rounded-full object-contain shadow-2xl animate-float"
            />

            <div className="absolute inset-0 rounded-full border-4 border-red-500/30 animate-shadow"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rotate-gradient {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 15px 5px rgba(255, 0, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 30px 10px rgba(255, 0, 0, 0.7);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shadow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px 5px rgba(255, 0, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 40px 10px rgba(255, 0, 0, 0.7);
          }
        }

        .animate-rotate-gradient {
          animation: rotate-gradient 10s linear infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shadow {
          animation: shadow-pulse 3s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
