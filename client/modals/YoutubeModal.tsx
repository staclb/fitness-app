import React from 'react';
import { YoutubeModalProps } from '../../types/types';

const YoutubeModal = ({ videoId, onClose }: YoutubeModalProps) => {
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <iframe
          title="youtube video"
          className="w-full h-96" // Adjust size as needed
          src={youtubeEmbedUrl}
          frameBorder="0"
          allowFullScreen
        />
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
