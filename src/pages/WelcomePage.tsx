import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Sparkles, Heart, Star } from "lucide-react";

export const WelcomePage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="relative w-[393px] h-[852px] bg-gradient-to-b from-[#f8efb3] via-[#ffd1a3] to-[#ffa5a5] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div className={`${i % 3 === 0 ? 'text-yellow-300' : i % 3 === 1 ? 'text-pink-300' : 'text-white'} text-lg`}>
              {i % 4 === 0 ? '✨' : i % 4 === 1 ? '🌟' : i % 4 === 2 ? '💫' : '⭐'}
            </div>
          </div>
        ))}
      </div>

      {/* Welcome text */}
      <div className="absolute w-[258px] h-[59px] top-[87px] left-[30px] animate-fadeIn">
        <h1 className="absolute w-[258px] top-0 left-0 [font-family:'Irish_Grover',Helvetica] font-normal text-[#7b1616] text-5xl tracking-[0] leading-[normal] drop-shadow-lg">
          Welcome to
        </h1>
      </div>

      {/* Usagi Toy title */}
      <div className="absolute w-[239px] h-[76px] top-[156px] left-[85px] animate-fadeIn" style={{animationDelay: '0.3s'}}>
        <h2 className="absolute w-[231px] top-0 left-0 [font-family:'Irish_Grover',Helvetica] font-normal text-[#5f2121] text-5xl tracking-[0] leading-[normal] drop-shadow-lg">
          Usagi Toy
        </h2>
        <span className="w-[17px] top-[27px] left-[222px] text-base absolute [font-family:'Irish_Grover',Helvetica] font-normal text-black tracking-[0] leading-[normal] whitespace-nowrap animate-pulse">
          ★
        </span>
      </div>

      {/* Star decoration */}
      <span className="w-[21px] top-[183px] left-12 text-base absolute [font-family:'Irish_Grover',Helvetica] font-normal text-black tracking-[0] leading-[normal] whitespace-nowrap animate-pulse" style={{animationDelay: '0.5s'}}>
        ★
      </span>

      {/* Usagi character */}
      <div className="absolute top-[240px] left-[80px] w-[230px] h-[230px] animate-fadeIn" style={{animationDelay: '0.6s'}}>
        <div className="w-full h-full bg-[#f5e6d3] rounded-full flex items-center justify-center overflow-hidden shadow-2xl hover:scale-105 transition-all duration-500 relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-pink-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
          
          <img 
            src="/IMG_9348.PNG" 
            alt="Usagi character" 
            className="w-full h-full object-cover relative z-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="text-6xl hidden group-hover:animate-bounce">🐰</div>
          
          {/* Floating hearts around character */}
          <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Heart className="w-6 h-6 text-red-400" />
          </div>
          <div className="absolute -bottom-3 -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.2s'}}>
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Bottom card with CTA */}
      {/* Clean bottom section */}
      <div className="absolute w-[393px] h-[280px] top-[550px] left-0 animate-fadeIn" style={{animationDelay: '0.9s'}}>
        {/* Description text */}
        <div className="px-8 mb-8">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-500 animate-spin" />
              <span className="text-lg font-bold text-[#875f5f] [font-family:'Annie_Use_Your_Telescope',Helvetica]">
                🪄 Discover What's Inside Your Usagi Toy
              </span>
              <Sparkles className="w-5 h-5 ml-2 text-yellow-500 animate-spin" />
            </div>
            <p className="text-sm text-[#875f5f] [font-family:'Annie_Use_Your_Telescope',Helvetica] opacity-90 leading-relaxed">
              Experience magical interactions, unlock stories, and build an unbreakable bond with your adorable companion!
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/home')}
            className="w-72 h-16 rounded-full bg-gradient-to-r from-[#ff6b6b] via-[#ffd93d] to-[#6bcf7f] text-white font-bold text-xl [font-family:'Irish_Grover',Helvetica] shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group border-2 border-white/30"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Button content - perfectly centered */}
            <div className="flex items-center justify-center space-x-3 relative z-10">
              <span className="text-2xl animate-bounce">✨</span>
              <span className="drop-shadow-lg">Get Started Now</span>
              <Heart className="w-6 h-6 text-white animate-pulse fill-current" />
            </div>
            
            {/* Floating decorations */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-300 rounded-full animate-bounce opacity-80" style={{animationDelay: '0.5s'}}></div>
          </Button>
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-6 space-x-4">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>
    </div>
  );
};