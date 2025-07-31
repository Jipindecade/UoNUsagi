import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Home, Settings, User, MapPin, Package, Truck, Users, CheckCircle, Clock, Zap } from "lucide-react";
import { UserManager } from "../lib/userManager";

export const TracePage = (): JSX.Element => {
  const navigate = useNavigate();
  const [interactionCount, setInteractionCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const userManager = UserManager.getInstance();

  // 获取真实互动次数
  useEffect(() => {
    const currentCount = userManager.getInteractionCount();
    setInteractionCount(currentCount);
    // 根据真实互动次数设置初始进度
    const initialStep = Math.min(4, Math.floor(currentCount / 10));
    setActiveStep(initialStep);
    setCompletedSteps(Array.from({length: initialStep}, (_, i) => i));
  }, []);

  // 模拟实时追踪进度
  useEffect(() => {
    if (interactionCount === 0) return; // 没有互动时不自动进行
    
    const interval = setInterval(() => {
      if (activeStep < 5) {
        setCompletedSteps(prev => [...prev, activeStep]);
        setActiveStep(prev => prev + 1);
      }
    }, 3000); // 延长间隔时间

    return () => clearInterval(interval);
  }, [activeStep, interactionCount]);

  const steps = [
    {
      title: "Raw Source",
      description: "Sourcing Alien from Recycled Plush Fabrics",
      icon: Package,
      bgColor: "from-[#FFB6C1] to-[#FFC0CB]",
      location: "Material Center, China",
      status: "Completed"
    },
    {
      title: "Production Factory",
      description: "Designed Using Plush Techniques",
      icon: Truck,
      bgColor: "from-[#F0E68C] to-[#FFFFE0]",
      location: "Manufacturing Hub, China",
      status: "In Progress"
    },
    {
      title: "Supplier",
      description: "Verified Plush Supply Co",
      icon: Users,
      bgColor: "from-[#98FB98] to-[#90EE90]",
      location: "Supply Chain Network",
      status: "Pending"
    },
    {
      title: "Design Team",
      description: "Creative Lab (China)",
      icon: MapPin,
      bgColor: "from-[#87CEEB] to-[#B0E0E6]",
      location: "Design Studio, Beijing",
      status: "Pending"
    },
    {
      title: "Manufacturer",
      description: "Certified Toy (China)",
      icon: Users,
      bgColor: "from-[#DDA0DD] to-[#E6E6FA]",
      location: "Final Assembly, Guangzhou",
      status: "Pending"
    }
  ];

  return (
    <div className="relative w-[393px] h-[852px] bg-gradient-to-b from-[#f8efb3] to-[#ffa5a5] overflow-hidden">
      {/* 动态背景粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${10 + i * 45}px`,
              top: `${80 + (i % 3) * 150}px`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${1.5 + i * 0.2}s`
            }}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-[60px] left-[20px] right-[20px] flex items-center">
        <Button
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-none p-0 flex items-center justify-center hover:bg-white/30"
        >
          <ArrowLeft className="w-5 h-5 text-[#5f2121]" />
        </Button>
        <h1 className="flex-1 text-center text-2xl font-bold text-[#5f2121] [font-family:'Irish_Grover',Helvetica]">
          Provenance
        </h1>
        <Button
          onClick={() => setIsTracking(!isTracking)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-none p-0 flex items-center justify-center hover:bg-white/30"
        >
          <Zap className={`w-5 h-5 text-[#5f2121] ${isTracking ? 'animate-pulse' : ''}`} />
        </Button>
      </div>

      {/* Usagi Info */}
      <div className="absolute top-[120px] left-[20px] right-[20px] mb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4 flex items-center space-x-4 hover:scale-105 transition-transform duration-300 shadow-lg relative overflow-hidden">
          <img 
            src="/IMG_9348.PNG" 
            alt="Usagi character" 
            className="w-12 h-12 object-cover rounded-full hover:scale-110 transition-transform duration-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="text-4xl hidden">🐰</div>
          <div className="flex-1">
            <h2 className="font-bold text-[#5f2121] text-lg [font-family:'Irish_Grover',Helvetica] mb-2">
              Usagi Toy {isTracking && <span className="text-green-500 animate-pulse text-sm">● Live</span>}
            </h2>
            <div className="space-y-1 text-xs text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica]">
              <p>Product ID: H120-8930-D50</p>
              <p>Dimensions: 50mm × 18g</p>
              <p>Materials: Premium Polyester Fiber Cotton</p>
              <p>Origin: China → Japan Supply Chain</p>
            </div>
            <div className="mt-3">
              <div className="w-full bg-white/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#7f4646] mt-1">
                Progress: {completedSteps.length}/{steps.length} stages verified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trace Steps */}
      <div className="absolute top-[340px] left-[20px] right-[20px] space-y-4 bottom-[100px] overflow-y-auto pb-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = activeStep === index;
          const IconComponent = step.icon;
          
          return (
            <div
              key={index}
              className={`bg-gradient-to-r ${step.bgColor} rounded-xl p-4 flex items-start space-x-3 transition-all duration-300 hover:scale-105 cursor-pointer ${
                isActive ? 'ring-2 ring-yellow-400 animate-pulse' : ''
              } ${isCompleted ? 'shadow-lg' : 'opacity-70'}`}
              onClick={() => setActiveStep(index)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center relative ${
                isCompleted ? 'bg-green-500/30' : 'bg-white/30'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : isActive ? (
                  <Clock className="w-4 h-4 text-orange-600 animate-spin" />
                ) : (
                  <IconComponent className="w-4 h-4 text-[#5f2121]" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-[#5f2121] text-base [font-family:'Irish_Grover',Helvetica]">
                    {step.title}
                  </h3>
                  {isActive && <span className="text-xs text-orange-600 animate-pulse font-bold bg-orange-100/30 px-2 py-1 rounded-full">Processing</span>}
                  {isCompleted && <span className="text-xs text-green-600 font-bold bg-green-100/30 px-2 py-1 rounded-full">Verified</span>}
                </div>
                <p className="text-sm text-[#7f4646] [font-family:'Annie_Use_Your_Telescope',Helvetica] mt-2">
                  {step.description}
                </p>
                <p className="text-xs text-[#875f5f] [font-family:'Annie_Use_Your_Telescope',Helvetica] mt-1 flex items-center">
                  <span className="mr-1">📍</span>
                  {step.location}
                </p>
              </div>
              
              {/* 进度指示器 */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  isCompleted ? 'bg-green-500' : isActive ? 'bg-orange-500 animate-pulse' : 'bg-gray-400'
                }`}></div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-6 mt-1 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-[20px] left-[20px] right-[20px]">
        <div className="bg-white rounded-full px-6 py-3 flex justify-around items-center shadow-lg border border-gray-200">
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