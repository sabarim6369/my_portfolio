import React, { useState } from 'react';
import { Code2, Palette, Terminal, Globe2, Database, Cpu, BrainCircuit, Layout, Blocks } from 'lucide-react';

const About = () => {
  const [activeSkill, setActiveSkill] = useState('webdev');

  const mainSkills = [
    {
      id: 'webdev',
      icon: <Globe2 className="w-12 h-12 text-blue-500 group-hover:text-cyan-500 transition-all duration-300" />,
      name: 'Web Development',
      description: 'Full-stack development with modern technologies',
      color: 'from-blue-500/20 to-cyan-500/20',
      hoverColor: 'group-hover:from-blue-500/30 group-hover:to-cyan-500/30'
    },
    {
      id: 'uiux',
      icon: <Palette className="w-12 h-12 text-purple-500 group-hover:text-pink-500 transition-all duration-300" />,
      name: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user experiences',
      color: 'from-purple-500/20 to-pink-500/20',
      hoverColor: 'group-hover:from-purple-500/30 group-hover:to-pink-500/30'
    },
    {
      id: 'problem',
      icon: <Terminal className="w-12 h-12 text-green-500 group-hover:text-emerald-500 transition-all duration-300" />,
      name: 'Problem Solving',
      description: 'Algorithmic thinking and efficient solutions',
      color: 'from-green-500/20 to-emerald-500/20',
      hoverColor: 'group-hover:from-green-500/30 group-hover:to-emerald-500/30'
    }
  ];

  const skillDetails = {
    webdev: {
      title: 'Web Development Stack',
      items: [
        {
          icon: <Blocks className="w-8 h-8 text-red-500" />,
          name: 'Frontend',
          skills: ['Html','Css','javascript','React', 'Next.js',  'Tailwind CSS']
        },
        {
          icon: <Database className="w-8 h-8 text-yellow-500" />,
          name: 'Backend',
          skills: ['Node.js', 'Express', 'REST APIs']
        },
        {
          icon: <Database className="w-8 h-8 text-yellow-500" />,
          name: 'Database',
          skills: ['MongoDB', 'SQL', 'Supabase','Firebase']
        },
        {
          icon: <Cpu className="w-8 h-8 text-indigo-500" />,
          name: 'DevOps',
          skills: [ 'Git']
        }
      ]
    },
    uiux: {
      title: 'Design Expertise',
      items: [
        {
          icon: <Layout className="w-8 h-8 text-pink-500" />,
          name: 'Design Tools',
          skills: ['Figma']
        },
        {
          icon: <Palette className="w-8 h-8 text-purple-500" />,
          name: 'Design Skills',
          skills: ['Wireframing', 'Prototyping']
        },
      
      ]
    },
    problem: {
      title: 'Problem Solving',
      leetcode: {
        profile: 'leetcode.com/yourusername',
        stats: {
          solved: '220+',
          ranking: 'Top 5%',
          contest: '1500+ Rating'
        }
      },
      achievements: [
        'Solved 150+ algorithmic problems',
        'Participated in 2+ coding contests',
        'Contributed to open-source projects',
        'Mentored junior developers',
        'Optimized critical system components'
      ]
    },
  };

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* About Me Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-4 motion-preset-pulse">
            About <span className="text-red-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8 motion-preset-stretch "></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="About Me" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            
            <div className="text-gray-300 space-y-6">
              <h3 className="text-2xl font-semibold text-white">
                Passionate Full Stack Developer
              </h3>
              <p className="leading-relaxed">
                With over 1 year of experience in web development, I specialize in creating scalable and efficient web applications. My journey in technology has been driven by a passion for solving complex problems and creating impactful digital solutions.
              </p>
              <p className="leading-relaxed">
                I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices. My goal is to deliver high-quality solutions that not only meet technical requirements but also provide an exceptional user experience.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <p><span className="text-red-500">Name:</span> Sabari</p>
                  <p><span className="text-red-500">Experience:</span> 1+ Years</p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-red-500">Location:</span> Remote</p>
                  <p><span className="text-red-500">Available:</span> Freelance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-12">
          {/* Main Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainSkills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => setActiveSkill(skill.id)}
                className={`group relative bg-gray-800 rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-2 ${
                  activeSkill === skill.id ? 'ring-2 ring-red-500' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} ${skill.hoverColor} rounded-xl opacity-50 transition-opacity duration-300`}></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-red-500 mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{skill.name}</h3>
                  <p className="text-gray-400 text-sm">{skill.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Skill Details */}
          <div className="bg-gray-800/50 rounded-xl p-8">
            {activeSkill !== 'problem' ? (
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {skillDetails[activeSkill].title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> {/* Use 4 columns instead of 3 */}
  {skillDetails[activeSkill].items.map((item, index) => (
    <div key={index} className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="text-red-500">{item.icon}</div>
        <h4 className="text-lg font-medium text-white">{item.name}</h4>
      </div>
      <ul className="space-y-2">
        {item.skills.map((skill, skillIndex) => (
          <li
            key={skillIndex}
            className="text-gray-400 flex items-center space-x-2"
          >
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>

              </div>
            ) : (
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Problem Solving Expertise
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* LeetCode Profile */}
                  <div className="bg-gray-900/50 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-white mb-4">LeetCode Profile</h4>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">{skillDetails.problem.leetcode.stats.solved}</div>
                        <div className="text-sm text-gray-400">Problems Solved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">{skillDetails.problem.leetcode.stats.ranking}</div>
                        <div className="text-sm text-gray-400">Global Ranking</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">{skillDetails.problem.leetcode.stats.contest}</div>
                        <div className="text-sm text-gray-400">Contest Rating</div>
                      </div>
                    </div>
                    <a
                      href={`https://leetcode.com/u/sabarimcse6369/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 flex items-center justify-center space-x-2"
                    >
                      <span>View Profile</span>
                      <Code2 className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Achievements */}
                  <div className="bg-gray-900/50 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-white mb-4">Achievements</h4>
                    <ul className="list-disc pl-6 text-gray-400 space-y-2">
                      {skillDetails.problem.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
