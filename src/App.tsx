import React from "react";
import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { HomePage } from "./pages/HomePage";
import { StoryPage } from "./pages/StoryPage";
import { TracePage } from "./pages/TracePage";
import { CustomizePage } from "./pages/CustomizePage";
import { EcoPage } from "./pages/EcoPage";
import { ProfilePage } from "./pages/ProfilePage.tsx";

export const App = (): JSX.Element => {
  return (
    <div className="bg-transparent flex flex-row justify-center w-full min-h-screen">
      <div className="w-[393px] h-[852px]">
        <div className="h-[852px] bg-white rounded-[40px] overflow-hidden">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/trace" element={<TracePage />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/eco" element={<EcoPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};