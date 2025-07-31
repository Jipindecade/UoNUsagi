import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Home, MessageCircle, User, Settings, Heart, Star, Trophy, Calendar } from "lucide-react";
import { UserManager } from "../lib/userManager";

export const ProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();

  // 获取互动次数和亲密度等级，与主页面同步
  const interactionCount = userManager.getInteractionCount();
  const daysTogether = userManager.getDaysTogether();
  const intimacy = userManager.getIntimacyLevel(interactionCount);
  const userStats = userManager.getUserStats();

  return (
    <div className="relative w-[393px] h-[852px] bg-gradient-to-b from-[#f8efb3] to-[#ffa5a5] overflow-hidden">
      {/* Header */}
      <div className="absolute top-[60px] left-[20px] right-[20px] flex items-center">
        <Button
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-none p-0 flex items-center justify-center hover:bg-white/30"
        >
          <ArrowLeft className="w-5 h-5 text-[#5f2121]" />
        </Button>
        <h1 className="flex-1 text-center text-2xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica]">
          Profile
        </h1>
      </div>

      {/* Profile section with horizontal layout */}
      <div className="absolute top-[120px] left-[20px] right-[20px] h-[280px]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] mb-3 animate-pulse hover:scale-105 transition-transform duration-300">
              Profile
            </h1>
            <p className="text-lg text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] mb-6 hover:text-[#5f2121] transition-colors duration-300">
              Your friendship journey
            </p>
            <h2 className="text-4xl font-bold text-[#8b4513] [font-family:'Irish_Grover',Helvetica] mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
              Usagi
            </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-sm font-bold text-[#7f4646]">Level {intimacy.level} - {intimacy.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
                <span className="text-sm font-bold text-[#7f4646]">{interactionCount} interactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500 animate-pulse" />
                <span className="text-sm font-bold text-[#7f4646]">{daysTogether} days together</span>
              </div>
            </div>
          </div>
          <div className={`w-40 h-40 relative mt-8 transition-all duration-1000 hover:scale-110`}>
            {/* 发光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-pink-200/30 rounded-full animate-pulse opacity-50"></div>
            <img 
              src="/IMG_9678.PNG" 
              alt="Usagi character" 
              className="w-full h-full object-cover hover:animate-bounce relative z-10 cursor-pointer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="text-6xl hidden hover:animate-bounce">🐰</div>
            {/* 浮动装饰 */}
            <div className="absolute -top-2 -right-2 opacity-70 animate-bounce" style={{animationDelay: '0.5s'}}>
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute -bottom-2 -left-2 opacity-70 animate-bounce" style={{animationDelay: '1s'}}>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="absolute top-[420px] left-[20px] right-[20px] space-y-3">
        <div className="bg-gradient-to-r from-[#FFB6C1] to-[#FFC0CB] rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
            <Trophy className="w-5 h-5 text-[#5f2121]" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[#5f2121] text-sm [font-family:'Irish_Grover',Helvetica]">
              Achievements
            </h3>
            <p className="text-xs text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica]">
              First Meeting, Daily Friend
            </p>
          </div>
          <span className="text-lg">🏆</span>
        </div>

        <div className="bg-gradient-to-r from-[#DDA0DD] to-[#E6E6FA] rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
            <Settings className="w-5 h-5 text-[#5f2121]" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[#5f2121] text-sm [font-family:'Irish_Grover',Helvetica]">
              Preferences
            </h3>
            <p className="text-xs text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica]">
              Customize your experience
            </p>
          </div>
          <span className="text-lg">⚙️</span>
        </div>

        <div className="bg-gradient-to-r from-[#87CEEB] to-[#B0E0E6] rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-[#5f2121]" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-[#5f2121] text-sm [font-family:'Irish_Grover',Helvetica]">
              User Info
            </h3>
            <p className="text-xs text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica]">
              User ID: {userStats.userId.slice(-8)}
            </p>
          </div>
          <span className="text-lg">📱</span>
        </div>
      </div>

      {/* Quote Section */}
      <div className="absolute bottom-[100px] left-[20px] right-[20px]">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-4">
          <img 
            src="/IMG_9678.PNG" 
            alt="Usagi character" 
            className="w-12 h-12 object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="text-4xl hidden">🐰</div>
          <div className="flex-1">
            <p className="text-sm text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] italic">
              "Thank you for being my friend! Let's create more wonderful memories together! 🌸"
            </p>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-[20px] left-[20px] right-[20px]">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 flex justify-around items-center">
          <Button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center bg-transparent hover:bg-transparent p-0"
          >
            <Home className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400 font-medium">Home</span>
          </Button>
          <Button
            onClick={() => navigate('/customize')}
            className="flex flex-col items-center bg-transparent hover:bg-transparent p-0"
          >
            <Settings className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400 font-medium">Customize</span>
          </Button>
          <div className="flex flex-col items-center">
            <User className="w-6 h-6 text-[#5f2121] mb-1" />
            <span className="text-xs text-[#5f2121] font-medium">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};