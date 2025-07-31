import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Home, Settings, User, Sparkles, Heart, Star, BookOpen, Crown, Gift } from "lucide-react";
import { StoryDetail } from "../components/StoryDetail";
import { UserManager } from "../lib/userManager";

export const StoryPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = React.useState<number | null>(null);
  const userManager = UserManager.getInstance();

  // 获取互动次数和亲密度等级
  const [interactionCount, setInteractionCount] = React.useState(0);
  
  React.useEffect(() => {
    const currentCount = userManager.getInteractionCount();
    setInteractionCount(currentCount);
  }, []);
  
  const intimacy = userManager.getIntimacyLevel(interactionCount);
  
  // 故事解锁条件
  const stories = [
    { 
      id: 1,
      title: "First Encounter", 
      description: "The beginning of your journey with Usagi", 
      emoji: "🐰", 
      unlockLevel: 1,
      bgColor: "from-[#87CEEB] to-[#B0E0E6]",
      theme: "ocean",
      rarity: "common"
    },
    { 
      id: 2,
      title: "Growing Bond", 
      description: "Your friendship with Usagi deepens", 
      emoji: "🌸", 
      unlockLevel: 3,
      bgColor: "from-[#DDA0DD] to-[#E6E6FA]",
      theme: "sakura",
      rarity: "rare"
    },
    { 
      id: 3,
      title: "Playful Companion", 
      description: "Discover Usagi's playful side", 
      emoji: "🎭", 
      unlockLevel: 6,
      bgColor: "from-[#F0E68C] to-[#FFFFE0]",
      theme: "golden",
      rarity: "legendary"
    }
  ];

  // 如果选择了故事，显示故事详情
  if (selectedStory) {
    return <StoryDetail storyId={selectedStory} onBack={() => setSelectedStory(null)} />;
  }

  return (
    <div className="relative w-[393px] h-[852px] bg-gradient-to-b from-[#f8efb3] to-[#ffa5a5] overflow-hidden">
      {/* Magical floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-30"
            style={{
              left: `${10 + i * 25}px`,
              top: `${80 + (i % 4) * 120}px`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.2}s`
            }}
          >
            <div className={`${i % 3 === 0 ? 'text-yellow-400' : i % 3 === 1 ? 'text-pink-400' : 'text-blue-400'} text-lg animate-pulse`}>
              {i % 4 === 0 ? '✨' : i % 4 === 1 ? '🌟' : i % 4 === 2 ? '💫' : '⭐'}
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-[60px] left-[20px] right-[20px] flex items-center">
        <Button
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-none p-0 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-[#5f2121]" />
        </Button>
        <h1 className="flex-1 text-center text-2xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] flex items-center justify-center">
          <BookOpen className="w-6 h-6 mr-2 animate-pulse" />
          Story Collection
          <Sparkles className="w-5 h-5 ml-2 text-yellow-500 animate-spin" />
        </h1>
      </div>

      {/* Current Level */}
      <div className="absolute top-[120px] left-[20px] right-[20px]">
        <div className="bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/30 shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse"></div>
          
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-500 animate-bounce" />
              <p className="text-sm font-bold text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica]">
                Friendship Level: Lv.{intimacy.level}
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              {intimacy.name}
            </div>
          </div>
          
          <div className="flex items-center space-x-3 relative z-10">
            <img 
              src="/IMG_9348.PNG" 
              alt="Usagi character" 
              className="w-12 h-12 object-cover rounded-full hover:scale-110 transition-transform duration-300 ring-2 ring-white/50"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="text-4xl hidden">🐰</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-[#875f5f] font-medium">Progress to next level</p>
                <p className="text-xs text-[#875f5f] font-bold">{interactionCount % 15}/15</p>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 relative overflow-hidden">
                <div className="bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffd700] h-3 rounded-full animate-pulse relative" style={{ width: `${Math.min((interactionCount % 15) / 15 * 100, 100)}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Cards */}
      <div className="absolute top-[260px] left-[20px] right-[20px] bottom-[280px] space-y-4 overflow-y-auto pb-4">
        {stories.map((story, index) => {
          const isUnlocked = intimacy.level >= story.unlockLevel;
          const getRarityIcon = (rarity: string) => {
            switch(rarity) {
              case 'legendary': return <Crown className="w-4 h-4 text-yellow-500 animate-pulse" />;
              case 'rare': return <Star className="w-4 h-4 text-purple-500 animate-pulse" />;
              default: return <Heart className="w-4 h-4 text-blue-500 animate-pulse" />;
            }
          };
          
          const getThemeDecoration = (theme: string) => {
            switch(theme) {
              case 'ocean': return '🌊';
              case 'sakura': return '🌸';
              case 'golden': return '✨';
              default: return '💫';
            }
          };
          
          return (
            <div 
              key={index}
              onClick={() => isUnlocked && setSelectedStory(story.id)}
              className={`bg-gradient-to-r ${story.bgColor} rounded-2xl p-4 flex items-center space-x-3 relative overflow-hidden border-2 ${
                !isUnlocked ? 'opacity-50 grayscale border-gray-300' : 'cursor-pointer hover:scale-105 border-white/50 shadow-lg'
              } transition-all duration-300 group`}
            >
              {/* Animated background effects */}
              {isUnlocked && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="absolute top-2 right-2 text-xs opacity-50 animate-bounce">
                    {getThemeDecoration(story.theme)}
                  </div>
                  <div className="absolute bottom-2 left-2 opacity-30">
                    {getRarityIcon(story.rarity)}
                  </div>
                </>
              )}
              
              <div className={`text-4xl relative z-10 ${isUnlocked ? 'hover:scale-125 transition-transform duration-300' : ''}`}>
                {isUnlocked ? story.emoji : '🔒'}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-[#5f2121] text-sm [font-family:'Irish_Grover',Helvetica]">
                    {isUnlocked ? story.title : `Unlock at Level ${story.unlockLevel}`}
                  </h3>
                  {isUnlocked && getRarityIcon(story.rarity)}
                </div>
                <p className="text-xs text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] mb-1">
                  {isUnlocked ? story.description : `Need ${story.unlockLevel * 5} interactions to unlock`}
                </p>
                {isUnlocked && (
                  <div className="flex items-center space-x-1">
                    <div className="bg-white/30 px-2 py-0.5 rounded-full">
                      <span className="text-xs font-bold text-[#5f2121] capitalize">{story.rarity}</span>
                    </div>
                    <div className="bg-white/30 px-2 py-0.5 rounded-full">
                      <span className="text-xs text-[#5f2121] capitalize">{story.theme}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={`flex flex-col items-center space-y-1 ${isUnlocked ? 'text-yellow-500' : 'text-gray-400'}`}>
                <div className={`text-2xl ${isUnlocked ? 'animate-pulse' : ''}`}>
                  {isUnlocked ? '⭐' : '🔒'}
                </div>
                {isUnlocked && (
                  <div className="text-xs font-bold bg-white/30 px-2 py-0.5 rounded-full">
                    READ
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Coming Soon Card */}
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl p-4 flex items-center space-x-3 opacity-60 relative overflow-hidden border-2 border-dashed border-gray-400">
          <div className="text-3xl">🎁</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-600 text-sm [font-family:'Irish_Grover',Helvetica] flex items-center">
              More Stories Coming Soon
              <Sparkles className="w-4 h-4 ml-2 animate-spin" />
            </h3>
            <p className="text-xs text-gray-500 [font-family:'Annie_Use_Your_Telescope',Helvetica]">
              Keep interacting with Usagi to unlock new adventures!
            </p>
          </div>
          <Gift className="w-6 h-6 text-gray-500 animate-bounce" />
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="absolute bottom-[180px] left-[20px] right-[20px]">
        <div className="bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-4 border border-white/30 shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse"></div>
          <img 
            src="/IMG_9348.PNG" 
            alt="Usagi character" 
            className="w-12 h-12 object-cover rounded-full hover:scale-110 transition-transform duration-300 ring-2 ring-white/50 relative z-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="text-4xl hidden">🐰</div>
          <div className="flex-1 relative z-10">
            <p className="text-sm text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] italic">
              "Every story we share makes our friendship stronger! ✨"
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-xs text-[#875f5f] font-medium">
                {stories.filter(s => intimacy.level >= s.unlockLevel).length} stories unlocked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-[20px] left-[20px] right-[20px]">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 flex justify-around items-center shadow-lg">
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
          <Button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center bg-transparent hover:bg-transparent p-0"
          >
            <User className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-400 font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};