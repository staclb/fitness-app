import React, { useState } from 'react';
import { YoutubeModalProps } from '../../types/types';

const YoutubeModal = ({ videoIds, onClose }: YoutubeModalProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // functions used to cycle between the 5 videos
  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : videoIds.length - 1,
    );
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoIds.length);
  };

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoIds[currentVideoIndex]}`;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <iframe
          title="youtube video"
          className="w-full h-96" // Adjust size as needed
          src={youtubeEmbedUrl}
          allowFullScreen
        />
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handlePrevVideo}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            <i className="material-icons">chevron_left</i>
          </button>
          <button
            type="button"
            onClick={handleNextVideo}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default YoutubeModal;
