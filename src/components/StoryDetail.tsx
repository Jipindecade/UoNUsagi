import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft, Heart, Star } from "lucide-react";

interface StoryDetailProps {
  storyId: number;
  onBack: () => void;
}

export const StoryDetail = ({ storyId, onBack }: StoryDetailProps): JSX.Element => {
  const navigate = useNavigate();

  const stories = [
    {
      id: 1,
      title: "First Encounter",
      emoji: "🐰",
      bgColor: "from-[#87CEEB] to-[#B0E0E6]",
      content: [
        {
          type: "text",
          content: "It was a sunny morning when you first met Usagi. The little plush toy sat quietly in its packaging, waiting for someone special to discover it."
        },
        {
          type: "dialogue",
          speaker: "Usagi",
          content: "Hello there! I'm so happy to finally meet you! I've been waiting for someone like you to be my friend."
        },
        {
          type: "text",
          content: "From that moment, you knew this wasn't just any ordinary toy. There was something magical about Usagi's presence."
        },
        {
          type: "dialogue",
          speaker: "You",
          content: "Welcome to your new home, Usagi. Let's be the best of friends!"
        }
      ]
    },
    {
      id: 2,
      title: "Growing Bond",
      emoji: "🌸",
      bgColor: "from-[#DDA0DD] to-[#E6E6FA]",
      content: [
        {
          type: "text",
          content: "Days have passed since your first meeting, and your bond with Usagi has grown stronger. You've shared many moments together."
        },
        {
          type: "dialogue",
          speaker: "Usagi",
          content: "I love spending time with you! Every day brings new adventures and memories we can share together."
        },
        {
          type: "text",
          content: "You notice Usagi seems more animated now, as if your friendship has brought it to life in ways you never expected."
        },
        {
          type: "dialogue",
          speaker: "Usagi",
          content: "Thank you for being such a wonderful friend. I feel like I can be myself around you!"
        }
      ]
    },
    {
      id: 3,
      title: "Playful Companion",
      emoji: "🎭",
      bgColor: "from-[#F0E68C] to-[#FFFFE0]",
      content: [
        {
          type: "text",
          content: "Your friendship has reached new heights! Usagi has revealed its most playful and mischievous side to you."
        },
        {
          type: "dialogue",
          speaker: "Usagi",
          content: "Want to play a game? I know so many fun things we can do together! Life is so much more colorful with you around!"
        },
        {
          type: "text",
          content: "You discover that Usagi has many hidden talents and personalities, each more delightful than the last."
        },
        {
          type: "dialogue",
          speaker: "Usagi",
          content: "You've unlocked my playful spirit! Now we can have even more fun adventures together. What shall we do next?"
        }
      ]
    }
  ];

  const story = stories.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="relative w-[393px] h-[852px] bg-gradient-to-b from-[#f8efb3] to-[#ffa5a5] flex items-center justify-center">
        <p className="text-[#5f2121] text-lg">Story not found</p>
      </div>
    );
  }

  return (
    <div className="relative w-[393px] h-[852px] bg-gradient-to-b from-[#f8efb3] to-[#ffa5a5] overflow-hidden">
      {/* Header */}
      <div className="absolute top-[60px] left-[20px] right-[20px] flex items-center">
        <Button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-none p-0 flex items-center justify-center hover:bg-white/30"
        >
          <ArrowLeft className="w-5 h-5 text-[#5f2121]" />
        </Button>
        <h1 className="flex-1 text-center text-xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica]">
          {story.title}
        </h1>
      </div>

      {/* Story Header Card */}
      <div className="absolute top-[120px] left-[20px] right-[20px]">
        <div className={`bg-gradient-to-r ${story.bgColor} rounded-2xl p-6 mb-4 flex flex-col items-center`}>
          <div className="text-4xl mb-3">{story.emoji}</div>
          <h2 className="font-bold text-[#5f2121] text-2xl [font-family:'Irish_Grover',Helvetica] mb-2">
            {story.title}
          </h2>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica]">
              Story Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="absolute top-[280px] left-[20px] right-[20px] bottom-[100px] overflow-y-auto">
        <div className="space-y-4 pb-4">
          {story.content.map((section, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              {section.type === 'text' ? (
                <p className="text-sm text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] leading-relaxed">
                  {section.content}
                </p>
              ) : (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {section.speaker === 'Usagi' ? (
                      <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                        <img 
                          src="/IMG_9348.PNG" 
                          alt="Usagi" 
                          className="w-6 h-6 object-cover rounded-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'block';
                          }}
                        />
                        <div className="text-sm hidden">🐰</div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                        <span className="text-sm">👤</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica] mb-1">
                      {section.speaker}
                    </p>
                    <p className="text-sm text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] leading-relaxed">
                      "{section.content}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-[20px] left-[20px] right-[20px]">
        <div className="flex space-x-3">
          <Button
            onClick={onBack}
            className="flex-1 bg-white/20 backdrop-blur-sm text-[#5f2121] rounded-xl font-bold [font-family:'Irish_Grover',Helvetica] hover:bg-white/30 transition-colors"
          >
            Back to Stories
          </Button>
          <Button 
            onClick={() => {
              // 简单的点赞反馈
              alert('❤️ You liked this story!');
            }}
            className="px-6 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] text-[#5f2121] rounded-xl font-bold [font-family:'Irish_Grover',Helvetica] hover:scale-105 transition-transform"
          >
            <Heart className="w-4 h-4 mr-2" />
            Like
          </Button>
        </div>
      </div>
    </div>
  );
};