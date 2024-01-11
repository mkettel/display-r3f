import { atom, useAtom } from "jotai";

export const currentPageAtom = atom("intro");

import React, { useState, useEffect } from 'react';

// ResumeButton Component
function ResumeButton({ isVisible, setCurrentPage }) {
  return (
    <section
      className={`flex w-full h-full flex-col items-center justify-center
        transition-opacity duration-500
        ${isVisible ? 'opacity-1' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="h-[66%]"></div>
      <button
        onClick={() => setCurrentPage("store")}
        className="pointer-events-auto py-4 px-6 bg-blue-400 text-white font-black rounded-full hover:bg-blue-600 cursor-pointer transition-colors duration-500"
      >
        ENTER
      </button>
    </section>
  );
}

// HomeButton Component
function HomeButton({ isVisible, setCurrentPage }) {
  return (
    <section
      className={`flex end w-full h-full flex-col items-center justify-center
        transition-opacity duration-500
        ${isVisible ? 'opacity-1' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="h-[66%]"></div>
      <button
        onClick={() => setCurrentPage("home")}
        className="pointer-events-auto py-4 px-6 bg-blue-400 text-white font-black rounded-full hover:bg-blue-600 cursor-pointer transition-colors duration-500"
      >
        BACK
      </button>
    </section>
  );
}

export const UI = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [showResumeButton, setShowResumeButton] = useState(currentPage === "home");
  const [showHomeButton, setShowHomeButton] = useState(currentPage === "store");

  useEffect(() => {
    if (currentPage === "home") {
      setShowHomeButton(false);
      setTimeout(() => setShowResumeButton(true), 500); // 500ms is the duration of the fade effect
    } else if (currentPage === "store") {
      setShowResumeButton(false);
      setTimeout(() => setShowHomeButton(true), 500);
    }
  }, [currentPage]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <ResumeButton isVisible={showResumeButton} setCurrentPage={setCurrentPage} />
      <HomeButton isVisible={showHomeButton} setCurrentPage={setCurrentPage} />
    </div>
  );
};
