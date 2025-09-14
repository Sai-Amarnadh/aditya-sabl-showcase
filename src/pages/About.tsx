import React from 'react';
import { BookOpen, Users, Target, Award, Lightbulb, Rocket } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen page-bg-modern relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-16 left-16 w-24 h-24 decoration-modern decoration-teal animate-float-gentle"></div>
      <div className="absolute top-32 right-20 w-20 h-20 decoration-modern decoration-coral animate-rotate-slow"></div>
      <div className="absolute bottom-32 left-1/3 w-18 h-18 decoration-modern decoration-yellow animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-1/4 w-16 h-16 decoration-modern decoration-mint animate-float-gentle" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-12 w-14 h-14 decoration-modern decoration-blue animate-pulse-soft"></div>
      <div className="absolute bottom-40 right-12 w-28 h-28 decoration-modern decoration-purple animate-float-gentle"></div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative z-10">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-12 w-12 text-purple-600 mr-4" />
            <h1 className="text-5xl font-bold text-gradient-cool">
              About SABL
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Student-Based Learning (SABL) is an innovative educational approach that places students at the center of the learning process.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 relative z-10">
          <div className="space-y-8">
            <div className="modern-card p-8 border-teal-200">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-teal-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">What is SABL?</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Student-Based Learning (SABL) encourages active participation, critical thinking, and collaborative skills. 
                Through SABL, students take ownership of their education, fostering a deeper understanding of subjects and 
                developing essential life skills.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white shadow-elevated">
              <div className="flex items-center mb-6">
                <Award className="h-8 w-8 text-white mr-3" />
                <h2 className="text-3xl font-bold">SABL at Aditya University</h2>
              </div>
              <p className="text-white/90 leading-relaxed text-lg mb-6">
                Aditya University has embraced Student-Based Learning (SABL) to provide a dynamic and engaging educational experience. 
                Our SABL activities are designed to complement the traditional curriculum, offering students opportunities to apply 
                their knowledge in practical scenarios.
              </p>
              <a href="/SABL_Grading_Points_Overview.pdf" download>
                <button className="bg-white text-teal-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  📄 Download Grading Points Overview
                </button>
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Students collaborating in SABL activities" 
              className="rounded-2xl shadow-elevated w-full h-64 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Interactive learning session" 
              className="rounded-2xl shadow-elevated w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient-primary">
            SABL Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="stats-card-teal hover:scale-105 transition-all duration-300">
              <Users className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Collaborative Learning</h3>
              <p className="text-white/90">Students work together in teams, sharing knowledge and building strong interpersonal skills.</p>
            </div>
            
            <div className="stats-card-mint hover:scale-105 transition-all duration-300">
              <Lightbulb className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Critical Thinking</h3>
              <p className="text-white/90">Encouraging analytical thinking and problem-solving through hands-on activities and challenges.</p>
            </div>
            
            <div className="stats-card-coral hover:scale-105 transition-all duration-300">
              <Rocket className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Practical Application</h3>
              <p className="text-white/90">Real-world projects and case studies that bridge the gap between theory and practice.</p>
            </div>
          </div>
        </div>

        {/* Activities Gallery */}
        <div className="mb-16 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient-accent">
            SABL Activities in Action
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-2xl shadow-elevated">
              <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="SABL Project Work" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-600/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Project-Based Learning</h3>
                  <p className="text-white/90">Students work on real-world projects</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl shadow-elevated">
              <img 
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Group Discussion" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Interactive Discussions</h3>
                  <p className="text-white/90">Collaborative problem-solving sessions</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-2xl shadow-elevated">
              <img 
                src="https://images.unsplash.com/photo-1573164713712-03790a178651?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Workshop" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mint-600/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Hands-on Workshops</h3>
                  <p className="text-white/90">Practical skill development sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-white text-center shadow-elevated relative z-10">
          <h2 className="text-4xl font-bold mb-6">SABL Impact</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Our SABL approach has transformed the learning experience, creating more engaged, confident, and skilled graduates 
            ready to tackle real-world challenges.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-white/80">Student Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">80%</div>
              <div className="text-white/80">Improved Performance</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-white/80">Activities Conducted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Students Engaged</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;