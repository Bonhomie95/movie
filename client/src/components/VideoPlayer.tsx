import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import videoSrcDefault from '../video/one.mp4';

interface VideoPlayerProps {
  videoSource?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSource = videoSrcDefault,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Controls visibility and idle timer
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideControlsTimeout = useRef<number | null>(null);
  // States for main video controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Settings panel and nested submenu state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<
    'subtitle' | 'playback' | null
  >(null);
  const [subtitleMenuOpen, setSubtitleMenuOpen] = useState(false);
  const [playbackMenuOpen, setPlaybackMenuOpen] = useState(false);

  // New states for Volume and Brightness panels
  const [volumePanelOpen, setVolumePanelOpen] = useState(false);
  const [brightnessPanelOpen, setBrightnessPanelOpen] = useState(false);

  // Volume and Brightness levels
  const [volume, setVolume] = useState(1.0); // Range: 0..1
  const [brightness, setBrightness] = useState(1.0); // Range: 0.5..1.5

  // Subtitles & Playback Speed
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subtitle, setSubtitle] = useState('None');

  // Progress bar states
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Options for settings
  const subtitleOptions = [
    'English',
    'Spanish',
    'Italian',
    'French',
    'Portuguese',
    'None',
  ];
  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Format seconds into mm:ss
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Reset the idle timer to hide controls after 3 seconds of inactivity
  const resetHideControlsTimer = () => {
    setControlsVisible(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    hideControlsTimeout.current = window.setTimeout(() => {
      setControlsVisible(false);
      setIsSettingsOpen(false);
      setActiveSubmenu(null);
      setVolumePanelOpen(false);
      setBrightnessPanelOpen(false);
    }, 3000);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleInteraction = () => resetHideControlsTimer();
    container.addEventListener('mousemove', handleInteraction);
    container.addEventListener('touchstart', handleInteraction);
    return () => {
      container.removeEventListener('mousemove', handleInteraction);
      container.removeEventListener('touchstart', handleInteraction);
      if (hideControlsTimeout.current)
        clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  // Hide controls when clicking outside
  const handleContainerClick = () => {
    setControlsVisible(false);
    setIsSettingsOpen(false);
    setActiveSubmenu(null);
    setVolumePanelOpen(false);
    setBrightnessPanelOpen(false);
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleContainerClick();
  };

  // When metadata loads, store the video duration
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Update current time while playing
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // When video ends, reset play state
  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Toggle play/pause state
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Toggle fullscreen mode and, on mobile, lock orientation to landscape
  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().then(() => {
        setIsFullScreen(true);
        if (
          window.innerWidth < 768 &&
          screen.orientation &&
          (screen.orientation as any).lock
        ) {
          (screen.orientation as any)
            .lock('landscape')
            .catch((err: unknown) => console.log(err));
        }
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
        if (
          window.innerWidth < 768 &&
          screen.orientation &&
          (screen.orientation as any).unlock
        ) {
          (screen.orientation as any).unlock();
        }
      });
    }
  };

  // Toggle the settings panel
  const toggleSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVolumePanelOpen(false);
    setBrightnessPanelOpen(false);
    setIsSettingsOpen((prev) => {
      if (prev) {
        setActiveSubmenu(null);
        return false;
      }
      return true;
    });
  };

  // Submenu toggles for subtitles & playback
  const toggleSubtitleSubmenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSubmenu((prev) => (prev === 'subtitle' ? null : 'subtitle'));
  };
  const togglePlaybackSubmenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSubmenu((prev) => (prev === 'playback' ? null : 'playback'));
  };

  // Select subtitle option
  const selectSubtitle = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSubtitle(option);
    setActiveSubmenu(null);
  };

  // Select playback speed option
  const selectPlaybackSpeed = (speed: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaybackSpeed(speed);
    setActiveSubmenu(null);
  };

  // Toggle Volume panel (and close others)
  const toggleVolumePanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSettingsOpen(false);
    setActiveSubmenu(null);
    setBrightnessPanelOpen(false);
    setVolumePanelOpen((prev) => !prev);
  };

  // Toggle Brightness panel (and close others)
  const toggleBrightnessPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSettingsOpen(false);
    setActiveSubmenu(null);
    setVolumePanelOpen(false);
    setBrightnessPanelOpen((prev) => !prev);
  };

  // Handle volume change
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  // Handle brightness change
  const handleBrightnessChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBright = parseFloat(e.target.value);
    setBrightness(newBright);
  };

  // Handle progress bar click to seek
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    videoRef.current.currentTime = newTime;
  };

  // New functions: Jump back/forward 10 seconds
  const handlePrev10 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime - 10
      );
    }
  };

  const handleNext10 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        duration,
        videoRef.current.currentTime + 10
      );
    }
  };

  // Apply brightness filter to the video element
  const videoStyle = { filter: `brightness(${brightness})` };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      onClick={handleContainerClick}
    >
      {/* Video Element now uses videoSource prop */}
      <video
        ref={videoRef}
        src={videoSource}
        style={videoStyle}
        className="w-full"
        controls={false}
        onClick={handleVideoClick}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
      />
      {/* Settings Panel */}
      {controlsVisible && isSettingsOpen && (
        <div
          className="absolute bottom-16 right-4 bg-gray-800 bg-opacity-90 p-2 rounded space-y-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSubtitleMenuOpen((prev) => !prev);
              }}
              className="flex items-center space-x-1 bg-gray-700 p-2 rounded"
            >
              {/* Subtitles Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16v12H4z" fill="none" />
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zm-2 12H6V8h12v8zM8 10h2v4H8zm4 0h2v4h-2z" />
              </svg>
              <span className="hidden md:inline">Subtitles</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlaybackMenuOpen((prev) => !prev);
              }}
              className="flex items-center space-x-1 bg-gray-700 p-2 rounded"
            >
              {/* Playback Speed Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8v5h4v-2h-2V8z" />
                <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <span className="hidden md:inline">Speed</span>
            </button>
          </div>
          {subtitleMenuOpen && (
            <div className="mt-2 bg-gray-800 bg-opacity-90 p-2 rounded">
              {[
                'English',
                'Spanish',
                'Italian',
                'French',
                'Portuguese',
                'None',
              ].map((option) => (
                <button
                  key={option}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSubtitle(option);
                    setSubtitleMenuOpen(false);
                  }}
                  className="block w-full px-4 py-1 text-white text-sm hover:bg-gray-700"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          {playbackMenuOpen && (
            <div className="mt-2 bg-gray-800 bg-opacity-90 p-2 rounded">
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaybackSpeed(speed);
                    setPlaybackMenuOpen(false);
                  }}
                  className="block w-full px-4 py-1 text-white text-sm hover:bg-gray-700"
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Center Play/Pause Control */}
      {controlsVisible && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={togglePlayPause}
            className="bg-black bg-opacity-50 p-3 rounded-full"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 md:h-12 md:w-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 md:h-12 md:w-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Bottom Controls Section */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4 flex items-center">
        {/* Left Group: Prev/Next 10s Buttons */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <button onClick={handlePrev10} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 19l-7-7 7-7M4 12h13"
              />
            </svg>
          </button>
          <button onClick={handleNext10} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5l7 7-7 7M20 12H7"
              />
            </svg>
          </button>
        </div>

        {/* Center Group: Progress Bar with Time Labels */}
        <div className="flex-grow mx-4 flex items-center">
          <span className="text-white text-xs mr-2">
            {formatTime(currentTime)}
          </span>
          <div
            className="relative w-full h-3 bg-gray-600 rounded cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </div>
          <span className="text-white text-xs ml-2">
            {formatTime(duration)}
          </span>
        </div>

        {/* Right Group: Five Icons: Subtitle, Playback Speed, Volume, Brightness, Fullscreen */}
        <div
          className="flex-shrink-0 flex items-center space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtitle Icon */}
          <div className="relative inline-block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSubtitleMenuOpen((prev) => !prev);
                // Close other menus if needed
                setPlaybackMenuOpen(false);
              }}
              className="bg-gray-800 bg-opacity-70 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16v12H4z" fill="none" />
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zm-2 12H6V8h12v8zM8 10h2v4H8zm4 0h2v4h-2z" />
              </svg>
            </button>
            {subtitleMenuOpen && (
              <div className="absolute bottom-full right-0 mb-2 bg-gray-800 bg-opacity-90 p-2 rounded">
                {[
                  'English',
                  'Spanish',
                  'Italian',
                  'French',
                  'Portuguese',
                  'None',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubtitle(option);
                      setSubtitleMenuOpen(false);
                    }}
                    className="block w-full px-4 py-1 text-white text-sm hover:bg-gray-700"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Playback Speed Icon */}
          <div className="relative inline-block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlaybackMenuOpen((prev) => !prev);
                // Close other menus if needed
                setSubtitleMenuOpen(false);
              }}
              className="bg-gray-800 bg-opacity-70 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8v5h4v-2h-2V8z" />
                <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
            {playbackMenuOpen && (
              <div className="absolute bottom-full right-0 mb-2 bg-gray-800 bg-opacity-90 p-2 rounded">
                {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlaybackSpeed(speed);
                      setPlaybackMenuOpen(false);
                    }}
                    className="block w-full px-4 py-1 text-white text-sm hover:bg-gray-700"
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Volume Icon */}
          <div className="relative inline-block">
            <button
              onClick={toggleVolumePanel}
              className="bg-gray-800 bg-opacity-70 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.43 3.238a1 1 0 00-1.09.217L6.586 7H3a1 1 0 00-1 1v8a1 1 0 001 1h3.586l3.753 3.545A1 1 0 0012 20V4a1 1 0 00-.57-.762zM16.707 7.293a1 1 0 10-1.414 1.414 3 3 0 010 4.242 1 1 0 101.414 1.414 5 5 0 000-7.07z" />
                <path d="M19.071 4.929a1 1 0 00-1.414 1.414 7 7 0 010 9.9 1 1 0 101.414 1.414 9 9 0 000-12.728z" />
              </svg>
            </button>
            {volumePanelOpen && (
              <div className="absolute bottom-full right-0 mb-2 bg-gray-800 bg-opacity-90 p-2 rounded">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    transform: 'rotate(180deg)',
                    WebkitAppearance: 'slider-vertical',
                    height: '100px',
                  }}
                />
              </div>
            )}
          </div>

          {/* Brightness Icon */}
          <div className="relative inline-block">
            <button
              onClick={toggleBrightnessPanel}
              className="bg-gray-800 bg-opacity-70 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 4V2h2v2h-2zm6 1.414l1.414-1.414 1.414 1.414L18.414 6 17 4.586zM4.586 7L6 5.586 4.586 4.172 3.172 5.586 4.586 7zM2 11h2v2H2v-2zm18 0h2v2h-2v-2zM7 19.414L5.586 18 4.172 19.414l1.414 1.414L7 19.414zM19.414 17L18 18.414l1.414 1.414 1.414-1.414L19.414 17zM11 22v-2h2v2h-2zm1-16a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            </button>
            {brightnessPanelOpen && (
              <div className="absolute bottom-full right-0 mb-2 bg-gray-800 bg-opacity-90 p-2 rounded">
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.01"
                  value={brightness}
                  onChange={handleBrightnessChange}
                  style={{
                    transform: 'rotate(180deg)',
                    WebkitAppearance: 'slider-vertical',
                    height: '100px',
                  }}
                />
              </div>
            )}
          </div>

          {/* Fullscreen Icon */}
          <button
            onClick={toggleFullScreen}
            className="bg-gray-800 bg-opacity-70 p-2 rounded-full"
          >
            {isFullScreen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 3H5a2 2 0 00-2 2v4a1 1 0 001 1h2V5h3V3zm6 0v2h3v4h2a1 1 0 001-1V5a2 2 0 00-2-2h-4zm3 14h-3v2h4a2 2 0 002-2v-4a1 1 0 00-1-1h-2v3zm-9 2v-2H5v-3H3a1 1 0 01-1 1v4a2 2 0 002 2h4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 14H5v5a1 1 0 001 1h5v-2H7v-4zm0-4h4V4H6a1 1 0 00-1 1v5h2V10zm10 8h-4v2h5a1 1 0 001-1v-5h-2v4zm0-12h-4V3h5a1 1 0 011 1v5h-2V6z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
