import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowRightLeft, BarChart3, Globe, Leaf, Wallet } from 'lucide-react';
import { useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const earthRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
 


  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[700px] flex items-center bg-gradient-to-b from-green-50 to-white">
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="hero-text max-w-2xl">
            <h1 className="text-6xl font-bold text-green-800 mb-6 leading-tight">
              Revolutionizing
              <span className="text-green-600 block">Green Finance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join the movement towards sustainable crypto trading. Make every transaction count for our planet's future while managing your digital assets securely.
            </p>
            <div className="flex gap-4">
              <button 
                className="group bg-green-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started
                <ArrowRight className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
              </button>
              <button className="px-8 py-4 rounded-lg text-lg text-green-600 hover:bg-green-50 transition-all duration-300 hover:-translate-y-1">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-4">
            Why Choose GreenWallet?
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Experience the perfect blend of security, convenience, and environmental responsibility
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Wallet,
                title: "Secure Wallet",
                description: "Military-grade encryption and multi-layer security protocols to protect your assets",
                color: "green"
              },
              {
                icon: ArrowRightLeft,
                title: "Smart Swaps",
                description: "Lightning-fast token swaps with minimal fees and maximum environmental consideration",
                color: "emerald"
              },
              {
                icon: BarChart3,
                title: "Impact Dashboard",
                description: "Real-time tracking of your environmental impact with detailed analytics",
                color: "teal"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="feature-card group p-8 rounded-2xl hover:bg-green-50 transition-all duration-500 border border-gray-100 hover:border-green-200 hover:shadow-xl hover:-translate-y-2"
              >
                <div className={`bg-${feature.color}-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}>
                  <feature.icon className={`h-10 w-10 text-${feature.color}-600 transition-transform duration-500 group-hover:rotate-12`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="bg-gradient-to-br from-green-800 via-green-700 to-green-900 py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                value: "$10M+", 
                label: "Total Value Locked", 
                icon: Wallet,
                description: "in sustainable crypto assets"
              },
              { 
                value: "50K+", 
                label: "Active Users", 
                icon: Globe,
                description: "growing community worldwide"
              },
              { 
                value: "100K+", 
                label: "Trees Planted", 
                icon: Leaf,
                description: "direct environmental impact"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="stat-item group p-8 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <stat.icon className="h-6 w-6 text-green-300 mr-3 transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="text-green-50 text-lg font-medium">{stat.label}</h3>
                </div>
                <div className="text-5xl font-bold text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <p className="text-green-200 text-sm">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;