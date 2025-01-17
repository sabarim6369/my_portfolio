import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://my-portfolio-1-n68t.onrender.com/contact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      console.log(data);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending the message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2
          ref={headingRef}
          className={`text-4xl font-bold text-center text-white mb-4 transition-all duration-1000 ${
            headingInView ? 'motion-preset-slide-right' : 'opacity-0 translate-x-[-50px]'
          }`}
        >
          Contact <span className="text-red-500">Me</span>
        </h2>
        <div className="w-24 h-1 bg-red-500 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-gray-400">sabarim6369@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Phone</h4>
                    <p className="text-gray-400">+6369012255</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Location</h4>
                    <p className="text-gray-400">Namakkal</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-700">
                <h4 className="text-white font-medium mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/sabarim6369/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/sabarim6369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white rounded-lg px-6 py-3 flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
