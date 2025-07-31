import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Home, Settings, User, Edit3, Check, X, Save } from "lucide-react";
import { UserManager } from "../lib/userManager";

export const CustomizePage = (): JSX.Element => {
  const navigate = useNavigate();
  const userManager = UserManager.getInstance();
  const [selectedCharacter, setSelectedCharacter] = useState("Yutong");
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState("");

  const [characters, setCharacters] = useState(() => {
    const userData = userManager.getUserData();
    return userData.customCharacters || [
      { name: "Yutong", emoji: "🐰", description: "Cute and friendly rabbit" },
      { name: "Yutong Fu", emoji: "🎭", description: "Playful performer" },
      { name: "World Peace", emoji: "🕊️", description: "Peaceful dove" },
      { name: "Nottingham", emoji: "🦌", description: "Noble deer" }
    ];
  });

  const [idCardData, setIdCardData] = useState({
    name: "Yutong",
    birthday: "24 Dec 01",
    blessing: "World Peace",
    home: "Nottingham"
  });

  const openEditModal = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
    setShowModal(true);
  };

  const saveEdit = () => {
    if (editingField) {
      if (editingField === 'characterName') {
        setSelectedCharacter(tempValue);
        setIdCardData(prev => ({ ...prev, name: tempValue }));
      } else {
        setIdCardData(prev => ({ ...prev, [editingField]: tempValue }));
      }
    }
    setShowModal(false);
    setEditingField(null);
    setTempValue("");
  };

  const cancelEdit = () => {
    setShowModal(false);
    setEditingField(null);
    setTempValue("");
  };

  return (
    <div className="relative w-[393px] h-[852px] bg-gradient-to-b from-[#f8efb3] to-[#ffa5a5] overflow-hidden">
      {/* Header */}
      <div className="absolute top-[60px] left-[20px] right-[20px] flex items-center z-10">
        <Button
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border-none p-0 flex items-center justify-center hover:bg-white/90"
        >
          <ArrowLeft className="w-5 h-5 text-[#5f2121]" />
        </Button>
        <h1 className="flex-1 text-center text-2xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica]">
          DIY Customize
        </h1>
        <div className="w-10 h-10"></div>
      </div>

      {/* Main Content */}
      <div className="absolute top-[140px] left-[40px] right-[40px] bottom-[120px] space-y-4">
        
        {/* Character Display */}
        <div className="bg-gradient-to-br from-[#FFE066] via-[#90EE90] to-[#32CD32] rounded-2xl p-6 shadow-lg text-center relative overflow-hidden">
          {/* Subtle overlay for better text readability */}
          <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
          
          <div className="w-28 h-28 mx-auto mb-4 bg-gradient-to-br from-[#90EE90] to-[#32CD32] rounded-3xl flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300">
            <img 
              src="/IMG_9348.PNG" 
              alt="Usagi character" 
              className="w-24 h-24 object-cover rounded-2xl"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
            <div className="text-8xl hidden">🐰</div>
          </div>
          
          <div 
            className="flex items-center justify-center space-x-2 mb-2 cursor-pointer hover:bg-gray-100/50 rounded-lg p-2 transition-colors relative z-10"
            onClick={() => openEditModal('characterName', selectedCharacter)}
          >
            <h2 className="text-4xl font-bold text-[#4a4a4a] [font-family:'Irish_Grover',Helvetica] drop-shadow-sm">
              {selectedCharacter}
            </h2>
            <Edit3 className="w-5 h-5 text-gray-600 hover:text-[#4a4a4a]" />
          </div>
          
          <p className="text-sm text-[#6b5b5b] [font-family:'Annie_Use_Your_Telescope',Helvetica] drop-shadow-sm relative z-10">
            Your current Usagi personality
          </p>
        </div>

        {/* ID Card */}
        <div className="bg-gradient-to-r from-[#FFE066] to-[#FFC700] rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica]">
              Usagi
            </h3>
            <div className="bg-[#4A90E2] text-white px-3 py-1 rounded-full text-xs font-bold">
              ID card
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            {/* Left side - Character image */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                  src="/IMG_9429.PNG" 
                  alt="Usagi character" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="text-4xl hidden">🐰</div>
              </div>
            </div>
            
            {/* Right side - Information fields */}
            <div className="flex-1 space-y-2">
              <div 
                className="cursor-pointer hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                onClick={() => openEditModal('name', idCardData.name)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#7f4646] font-medium text-xs block">Name:</span>
                    <span className="font-bold text-[#5f2121] text-sm">{idCardData.name}</span>
                  </div>
                  <Edit3 className="w-3 h-3 text-gray-400" />
                </div>
              </div>
              
              <div 
                className="cursor-pointer hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                onClick={() => openEditModal('birthday', idCardData.birthday)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#7f4646] font-medium text-xs block">Birthday:</span>
                    <span className="font-bold text-[#5f2121] text-sm">{idCardData.birthday}</span>
                  </div>
                  <Edit3 className="w-3 h-3 text-gray-400" />
                </div>
              </div>
              
              <div 
                className="cursor-pointer hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                onClick={() => openEditModal('blessing', idCardData.blessing)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#7f4646] font-medium text-xs block">Blessing:</span>
                    <span className="font-bold text-[#5f2121] text-sm">{idCardData.blessing}</span>
                  </div>
                  <Edit3 className="w-3 h-3 text-gray-400" />
                </div>
              </div>
              
              <div 
                className="cursor-pointer hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                onClick={() => openEditModal('home', idCardData.home)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#7f4646] font-medium text-xs block">Home:</span>
                    <span className="font-bold text-[#5f2121] text-sm">{idCardData.home}</span>
                  </div>
                  <Edit3 className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] mb-4 text-center">
              Edit {editingField === 'characterName' ? 'Character Name' : editingField?.charAt(0).toUpperCase() + editingField?.slice(1)}
            </h3>
            
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl outline-none focus:border-[#5f2121] transition-colors"
              placeholder={`Enter ${editingField === 'characterName' ? 'character name' : editingField}`}
              autoFocus
            />
            
            <div className="flex space-x-3 mt-6">
              <Button
                onClick={cancelEdit}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold py-3"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={saveEdit}
                className="flex-1 bg-gradient-to-r from-[#90EE90] to-[#98FB98] hover:from-[#7FDD7F] hover:to-[#87EB87] text-[#5f2121] rounded-xl font-bold py-3"
              >
                <Check className="w-5 h-5 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="absolute bottom-[20px] left-[40px] right-[40px]">
        <div className="bg-gradient-to-r from-[#f8efb3]/80 to-[#ffa5a5]/80 backdrop-blur-sm rounded-full px-6 py-3 flex justify-around items-center shadow-lg border border-white/30">
          <Button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center bg-transparent hover:bg-transparent p-0"
          >
            <Home className="w-6 h-6 text-[#7f4646] mb-1 hover:text-[#5f2121] transition-colors" />
            <span className="text-xs text-[#7f4646] font-medium hover:text-[#5f2121] transition-colors">Home</span>
          </Button>
          <div className="flex flex-col items-center">
            <Settings className="w-6 h-6 text-[#8b4513] mb-1 animate-pulse" />
            <span className="text-xs text-[#8b4513] font-medium">Customize</span>
          </div>
          <Button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center bg-transparent hover:bg-transparent p-0"
          >
            <User className="w-6 h-6 text-[#7f4646] mb-1 hover:text-[#5f2121] transition-colors" />
            <span className="text-xs text-[#7f4646] font-medium hover:text-[#5f2121] transition-colors">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};