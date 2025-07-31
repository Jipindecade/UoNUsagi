import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Search, Home, User, Settings, Heart, Smile, ArrowLeft } from "lucide-react";
import { UserManager } from "../lib/userManager";

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isFloating, setIsFloating] = useState(false);
  const userManager = UserManager.getInstance();

  // 页面加载时获取互动次数
  useEffect(() => {
    const currentCount = userManager.getInteractionCount();
    setInteractionCount(currentCount);
  }, []);

  // 增加互动次数的函数
  const incrementInteraction = () => {
    const newCount = userManager.incrementInteraction();
    setInteractionCount(newCount);
  };

  // 添加浮动效果
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFloating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 计算亲密度等级
  const intimacy = userManager.getIntimacyLevel(interactionCount);
  const progressPercentage = Math.min((interactionCount % 15) / 15 * 100, 100);

  // 搜索数据库
  const searchData = [
    { id: 1, title: "Story Collection", description: "Unlock magical stories with Usagi", type: "feature", route: "/story", emoji: "📚" },
    { id: 2, title: "Trace Journey", description: "Track Usagi's manufacturing journey", type: "feature", route: "/trace", emoji: "🔍" },
    { id: 3, title: "Eco Impact", description: "See environmental benefits", type: "feature", route: "/eco", emoji: "🌱" },
    { id: 4, title: "DIY Customize", description: "Create your unique Usagi personality", type: "feature", route: "/customize", emoji: "🎨" },
    { id: 5, title: "Profile", description: "View your friendship stats", type: "feature", route: "/profile", emoji: "👤" },
    { id: 6, title: "Usagi", description: "Your adorable plush companion", type: "character", route: "/home", emoji: "🐰" },
    { id: 7, title: "Friendship Level", description: `Current level: ${intimacy.name}`, type: "status", route: "/profile", emoji: "❤️" },
    { id: 8, title: "Interactions", description: `${interactionCount} times together`, type: "status", route: "/profile", emoji: "⭐" },
    { id: 9, title: "Birthday Celebration", description: "Usagi's special day in 2025", type: "event", route: "/home", emoji: "🎉" }
  ];

  // 搜索功能
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  // 处理搜索结果点击
  const handleSearchResultClick = (item: any) => {
    incrementInteraction();
    setShowSearchResults(false);
    setSearchQuery("");
    navigate(item.route);
  };

  // 点击外部关闭搜索结果
  const handleClickOutside = () => {
    setShowSearchResults(false);
  };

  return (
    <div className="relative w-[393px] h-[852px] bg-gradient-to-b from-[#f8efb3] to-[#ffa5a5] overflow-hidden" onClick={handleClickOutside}>
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 opacity-20 animate-pulse">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.3) 10px,
              rgba(255,255,255,0.3) 20px
            )`
          }}
        />
      </div>

      {/* 动态浮动粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-30"
            style={{
              left: `${10 + i * 30}px`,
              top: `${80 + (i % 4) * 150}px`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.2}s`
            }}
          >
            <div className={`${i % 3 === 0 ? 'text-yellow-400' : i % 3 === 1 ? 'text-pink-400' : 'text-white'} text-lg animate-pulse`}>
              {i % 4 === 0 ? '✨' : i % 4 === 1 ? '🌟' : i % 4 === 2 ? '💫' : '⭐'}
            </div>
          </div>
        ))}
      </div>

      {/* Back button */}
      <div className="absolute top-[20px] left-[20px] z-10">
        <Button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border-none p-0 flex items-center justify-center hover:bg-white/90 shadow-lg hover:scale-110 transition-all duration-300 hover:rotate-12"
        >
          <ArrowLeft className="w-5 h-5 text-[#5f2121]" />
        </Button>
      </div>

      {/* Search bar */}
      <div className="absolute top-[20px] left-[80px] right-[20px]">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-3 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group" onClick={(e) => e.stopPropagation()}>
          {/* 搜索框光泽效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search stories, features, Usagi..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery && setShowSearchResults(true)}
            className="flex-1 bg-transparent border-none text-gray-600 placeholder-gray-400 text-sm outline-none relative z-10"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
                setShowSearchResults(false);
              }}
              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 relative z-10"
            >
              <span className="text-xs text-gray-500">✕</span>
            </button>
          )}
          {!searchQuery && (
            <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 animate-pulse">
              <span className="text-xs text-gray-500">⌘</span>
            </div>
          )}
        </div>

        {/* 搜索结果下拉框 */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden animate-fadeIn z-50">
            <div className="max-h-80 overflow-y-auto">
              {searchResults.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleSearchResultClick(item)}
                  className="px-4 py-3 hover:bg-gradient-to-r hover:from-[#f8efb3]/30 hover:to-[#ffa5a5]/30 cursor-pointer transition-all duration-200 border-b border-gray-100/50 last:border-b-0 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl group-hover:scale-125 transition-transform duration-200">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#5f2121] text-sm [font-family:'Irish_Grover',Helvetica] group-hover:text-[#7f4646] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] group-hover:text-[#875f5f] transition-colors">
                        {item.description}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-[#f8efb3]/50 to-[#ffa5a5]/50 px-2 py-1 rounded-full">
                      <span className="text-xs font-bold text-[#5f2121] capitalize">{item.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-[#f8efb3]/20 to-[#ffa5a5]/20 border-t border-gray-100/50">
              <p className="text-xs text-[#875f5f] [font-family:'Annie_Use_Your_Telescope',Helvetica] text-center">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} • Click to navigate
              </p>
            </div>
          </div>
        )}

        {/* 无搜索结果提示 */}
        {showSearchResults && searchResults.length === 0 && searchQuery.trim() !== "" && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-4 animate-fadeIn z-50">
            <div className="text-center">
              <div className="text-3xl mb-2">🔍</div>
              <p className="text-sm text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] mb-1">
                No results found for "{searchQuery}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 搜索遮罩层 */}
      {showSearchResults && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-40" onClick={handleClickOutside}></div>
      )}

      {/* Hi there section */}
      <div className="absolute top-[90px] left-[20px] right-[20px] h-[320px]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] mb-3 animate-pulse hover:scale-105 transition-transform duration-300">
              Hi there
            </h1>
            <p className="text-lg text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] mb-6 hover:text-[#5f2121] transition-colors duration-300">
              Your smart packaging plush toy
            </p>
            <h2 className="text-5xl font-bold text-[#8b4513] [font-family:'Irish_Grover',Helvetica] mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
              Usagi
            </h2>
            <div className="text-2xl animate-bounce hover:scale-125 transition-transform duration-200 cursor-pointer">👏</div>
          </div>
          <div className={`w-40 h-40 relative mt-8 transition-all duration-1000 hover:scale-110 ${isFloating ? 'transform -translate-y-2' : ''}`}>
            {/* 发光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-pink-200/30 rounded-full animate-pulse opacity-50"></div>
            <img 
              src="/IMG_9427.PNG" 
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

      {/* Notice section */}
      <div className="absolute top-[330px] left-[20px] right-[20px]">
        <div className="bg-gradient-to-r from-[#ff9a56] to-[#ffad56] rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
          {/* 通知栏光泽效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-white animate-pulse">Notice</span>
            <span className="text-sm text-white">
              You have interacted with Usagi <span className="font-bold animate-bounce">{interactionCount}</span> times !
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-[390px] left-[20px] right-[20px]">
        <div className="relative">
          <div className="w-full bg-gradient-to-r from-purple-300 to-pink-300 rounded-full h-4 shadow-inner hover:shadow-lg transition-shadow duration-300">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* 进度条光泽效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="absolute -top-1 bg-white rounded-full p-1 shadow-lg hover:scale-125 transition-transform duration-200" style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%)' }}>
            <Heart className="w-3 h-3 text-pink-500 animate-pulse" />
          </div>
        </div>
        <p className="text-center text-sm font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] mt-2 hover:scale-105 transition-transform duration-200">
          Current intimacy level: <span className="font-bold animate-bounce">Lv{intimacy.level}</span>
        </p>
      </div>

      {/* Main cards section */}
      <div className="absolute top-[470px] left-[20px] right-[20px] flex space-x-3 h-[140px]">
        {/* Story card */}
        <div className="flex-1">
          <Button
            onClick={() => {
              incrementInteraction();
              navigate('/story');
            }}
            className="w-full h-full bg-gradient-to-b from-[#ffd700] to-[#ffb347] rounded-[25px] border-none p-0 relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl group"
          >
            {/* Dot pattern */}
            <div className="absolute inset-3 opacity-40">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                  backgroundSize: '6px 6px'
                }}
              />
            </div>
            
            {/* 卡片光泽效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Chevron */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 border-2 border-[#5f2121] border-t-0 border-l-0 transform rotate-45 group-hover:animate-bounce"></div>
            </div>
            
            {/* Story text */}
            <div className="absolute top-[35px] left-1/2 transform -translate-x-1/2">
              <h2 className="text-xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] group-hover:animate-pulse">
                Story
              </h2>
            </div>
            
            {/* Usagi character */}
            <div className="absolute bottom-[15px] left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-200">
                <img 
                  src="/IMG_9889.PNG" 
                  alt="Usagi character" 
                  className="w-10 h-10 object-cover rounded-full group-hover:animate-spin"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="text-sm hidden">🐰</div>
              </div>
            </div>
          </Button>
        </div>

        {/* Right side cards */}
        <div className="flex-1 flex flex-col space-y-3">
          {/* Trace card */}
          <Button
            onClick={() => {
              incrementInteraction();
              navigate('/trace');
            }}
            className="w-full flex-1 bg-gradient-to-r from-[#98fb98] to-[#90ee90] rounded-[20px] border-none p-0 relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-between px-4 group"
          >
            {/* 卡片光泽效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            <div className="w-2 h-2 border-2 border-[#5f2121] border-t-0 border-l-0 transform rotate-45 group-hover:animate-spin"></div>
            <h3 className="text-base font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] group-hover:animate-pulse">
              Trace
            </h3>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-200">
              <img 
                src="/IMG_9672.PNG" 
                alt="Usagi character" 
                className="w-8 h-8 object-cover rounded-full group-hover:animate-spin"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="text-sm hidden">🐰</div>
            </div>
          </Button>

          {/* Eco card */}
          <Button
            onClick={() => {
              incrementInteraction();
              navigate('/eco');
            }}
            className="w-full flex-1 bg-gradient-to-r from-[#98fb98] to-[#90ee90] rounded-[20px] border-none p-0 relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-between px-4 group"
          >
            {/* 卡片光泽效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            <div className="w-2 h-2 border-2 border-[#5f2121] border-t-0 border-l-0 transform rotate-45 group-hover:animate-spin"></div>
            <h3 className="text-base font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] group-hover:animate-pulse">
              Eco
            </h3>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-200">
              <img 
                src="/IMG_9673.PNG" 
                alt="Usagi character" 
                className="w-8 h-8 object-cover rounded-full group-hover:animate-spin"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="text-sm hidden">🐰</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Activity section - above birthday */}
      <div className="absolute bottom-[140px] left-[20px]">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg inline-block hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse">
          <div className="flex items-center space-x-2">
            <div className="w-0 h-0 border-l-[6px] border-l-red-500 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent animate-bounce"></div>
            <span className="text-xs font-bold text-[#5f2121]">Activity</span>
          </div>
        </div>
      </div>

      {/* Birthday section */}
      <div className="absolute bottom-[60px] left-[20px] right-[20px]">
        <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl p-3 relative overflow-hidden mb-4 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
          {/* Decorative bunting */}
          <div className="absolute top-0 left-0 right-0 h-1.5">
            <div className="flex">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex-1 h-1.5 bg-gradient-to-r from-pink-300 to-blue-300 opacity-60 animate-pulse" style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)', animationDelay: `${i * 0.1}s`}}></div>
              ))}
            </div>
          </div>
          
          {/* 生日卡片光泽效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="flex items-center justify-between mt-1.5">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-base font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] group-hover:animate-bounce">
                  HAPPY
                </h3>
                <h3 className="text-base font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] group-hover:animate-bounce" style={{animationDelay: '0.1s'}}>
                  BIRTHDAY
                </h3>
              </div>
              <h3 className="text-base font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] group-hover:animate-pulse">
                USAGI
              </h3>
              <p className="text-xs text-[#7f4646] font-bold animate-pulse">2025</p>
            </div>
            <div className="w-12 h-12 relative group-hover:scale-110 transition-transform duration-300">
              {/* 头像发光效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 to-pink-300/50 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src="/IMG_9348.PNG" 
                alt="Usagi character" 
                className="w-10 h-10 object-cover rounded-full relative z-10 group-hover:animate-spin"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="text-sm hidden group-hover:animate-bounce">🐰</div>
              {/* 生日帽装饰 */}
              <div className="absolute -top-1 -right-1 text-xs animate-bounce" style={{animationDelay: '0.5s'}}>🎉</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-[10px] left-[20px] right-[20px]">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex justify-around items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
            <Home className="w-5 h-5 text-[#5f2121] mb-0.5 animate-pulse" />
            <span className="text-xs text-[#5f2121] font-medium">Home</span>
          </div>
          <Button
            onClick={() => {
              incrementInteraction();
              navigate('/customize');
            }}
            className="flex flex-col items-center bg-transparent hover:bg-transparent p-0 hover:scale-110 transition-transform duration-200"
          >
            <Smile className="w-5 h-5 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-400 font-medium">Customize</span>
          </Button>
          <Button
            onClick={() => {
              incrementInteraction();
              navigate('/profile');
            }}
            className="flex flex-col items-center bg-transparent hover:bg-transparent p-0 hover:scale-110 transition-transform duration-200"
          >
            <User className="w-5 h-5 text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-400 font-medium">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};