"use client";

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Settings, Maximize, SkipBack, SkipForward } from 'lucide-react';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
  movieTitle: string;
}

interface Video {
  key: string;
  name: string;
  type: string;
}

export default function TrailerModal({ isOpen, onClose, movieId, movieTitle }: TrailerModalProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

  // Киноны trailer-уудыг татах
  useEffect(() => {
    if (isOpen && movieId) {
      fetchVideos();
    }
  }, [isOpen, movieId]);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      
      // Trailer төрлийн видео-уудыг шүүх
      const trailerVideos = data.results?.filter((video: Video) => 
        video.type === 'Trailer'
      ) || [];
      
      setVideos(trailerVideos);
      if (trailerVideos.length > 0) {
        setSelectedVideo(trailerVideos[0]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg overflow-hidden ${isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl max-h-[80vh]'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">
              {movieTitle}: Trailer
            </h2>
            {selectedVideo && (
              <span className="text-sm text-gray-600">
                {selectedVideo.name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Toggle fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Video Player */}
          <div className="flex-1 p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : selectedVideo ? (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                  title={selectedVideo.name}
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={toggleMute}
                        className="p-2 hover:bg-white/20 rounded-md transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <button className="p-2 hover:bg-white/20 rounded-md transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/20 rounded-md transition-colors">
                        <SkipBack className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-white/20 rounded-md transition-colors">
                        <SkipForward className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg">
                <p className="text-gray-600">Trailer олдсонгүй</p>
              </div>
            )}
          </div>

          {/* Video List */}
          {videos.length > 1 && (
            <div className="w-full lg:w-80 p-4 bg-gray-50 border-l">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Бусад Trailer-ууд</h3>
              <div className="space-y-3">
                {videos.map((video, index) => (
                  <button
                    key={video.key}
                    onClick={() => handleVideoSelect(video)}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      selectedVideo?.key === video.key
                        ? 'bg-blue-100 border-blue-300 border'
                        : 'bg-white hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                        <Play className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-800 truncate">
                          {video.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Trailer {index + 1}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
