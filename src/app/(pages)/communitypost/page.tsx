"use client"

import React, { useState } from 'react'

export default function Index() {
  const achievements = [
    { name: "Personal Achievement", image: "/trophy.png" },
    { name: "Celebration", image: "/party.png" },
    { name: "Thoughts", image: "/thought.png" }
  ];

  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([]);
  const [postContent, setPostContent] = useState<string>("");

  const handleAchievementChange = (item: string) => {
    if (selectedAchievements.includes(item)) {
      // setSelectedAchievements(selectedAchievements.filter(achievement => achievement !== item));
      setSelectedAchievements(selectedAchievements.filter(achievements =>achievements !==item))
    } else {
      setSelectedAchievements([...selectedAchievements, item]);
    }
  };

  const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      content: postContent,
      achievements: selectedAchievements
    };
    console.log(formData);
  };

  return (
    <div className="w-full h-screen flex justify-center"
      style={{ backgroundColor: 'rgba(177, 176, 255, 0.34)' }}>
        <audio controls className='mt-28' hidden autoPlay loop>
          <source src="/suneel.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="w-[80%] bg-white mt-24 rounded-xl flex justify-center py-16 px-20">
        <div className="w-full">
          <div className="font-semibold text-2xl px-5 mb-5">
            Create a Post
          </div>
          <form onSubmit={handlePostSubmit}>
            <div className="drop-shadow-2xl p-5">
              <div className="flex flex-row gap-3">
                {achievements.map((item, index) => (
                  <div className={`px-5 py-2 rounded-xl border-gray-200 border-2 text-sm flex flex-row gap-1 justify-center items-center cursor-pointer ${selectedAchievements.includes(item.name) ? "bg-gray-300" : ""}`} onClick={() => handleAchievementChange(item.name)} key={index}>
                      {item.name}
                      <img className='w-8 h-4 object-contain' src={item.image} alt="" />
                    </div>
                ))}
              </div>
              <div className="my-5">
                <textarea
                  className='w-full aspect-[16/5] p-5 bg-gray-200 text-xl rounded-lg outline-none'
                  placeholder='Share your thoughts'
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button type='submit' className='p-3 bg-blue-500 rounded-xl text-white w-[20%]'>Share</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
