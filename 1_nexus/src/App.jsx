import { useState, useCallback } from 'react';
import VideoCapture from './components/VideoCapture';
import HandTracker from './features/handTracking/HandTracker';
import ObjectCanvas from './features/virtualObjects/ObjectCanvas';
import PingPong from './components/PingPong';
import useHandInteraction from './hooks/useHandInteraction';
import './App.css';

function App() {
  const [videoElement, setVideoElement] = useState(null);
  const [canvasElement, setCanvasElement] = useState(null);
  const [handLandmarks, setHandLandmarks] = useState(null);
  const [isTracking, setIsTracking] = useState(true);
  const [showPingPong, setShowPingPong] = useState(false);
  const { interactionPoints, isPinching, debugInfo } = useHandInteraction(handLandmarks);

  const handleVideoReady = useCallback((video, canvas) => {
    setVideoElement(video);
    setCanvasElement(canvas);
  }, []);

  const handleHandsDetected = useCallback((landmarks) => {
    console.log('Hands detected in App:', landmarks?.length || 0, 'hands');
    setHandLandmarks(landmarks);
  }, []);

  return (
    <div className="app">
      <div className="main-container">
        <button 
          onClick={() => setShowPingPong(!showPingPong)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showPingPong ? 'Hand Tracking' : 'Ping Pong'}
        </button>
        
        {showPingPong ? (
          <PingPong />
        ) : (
          <>
            <VideoCapture onVideoReady={handleVideoReady} />
            
            {videoElement && canvasElement && isTracking && (
              <HandTracker
                videoElement={videoElement}
                canvasElement={canvasElement}
                onHandsDetected={handleHandsDetected}
              />
            )}
            
            <ObjectCanvas handLandmarks={handLandmarks} />
          </>
        )}
      </div>
    </div>
  );
}

export default App
