import { useState, useEffect, useCallback } from 'react';

const useHandInteraction = (handLandmarks) => {
  const [interactionPoints, setInteractionPoints] = useState([]);
  const [gestureState, setGestureState] = useState('open');
  const [debugInfo, setDebugInfo] = useState(null);

  // Calculate distance between two points
  const getDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + 
      Math.pow(point1.y - point2.y, 2)
    );
  };

  // Detect if hand is making a pinch gesture
  const detectPinch = useCallback((landmarks) => {
    if (!landmarks || landmarks.length < 21) return false;
    
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    
    const distance = getDistance(thumbTip, indexTip);
    const isPinching = distance < 0.15; // Further increased threshold for easier pinch detection
    
    console.log('Pinch check - Distance:', distance.toFixed(3), 'Threshold: 0.15, Is Pinching:', isPinching);
    
    return isPinching;
  }, []);

  // Process hand landmarks
  useEffect(() => {
    if (!handLandmarks || handLandmarks.length === 0) {
      setInteractionPoints([]);
      return;
    }

    const points = handLandmarks.map((landmarks, handIndex) => {
      const indexFingerTip = landmarks[8];
      const thumbTip = landmarks[4];
      const isPinching = detectPinch(landmarks);
      
      return {
        handIndex,
        indexFinger: {
          x: (1 - indexFingerTip.x) * window.innerWidth,  // Mirror x coordinate
          y: indexFingerTip.y * window.innerHeight
        },
        thumb: {
          x: (1 - thumbTip.x) * window.innerWidth,  // Mirror x coordinate
          y: thumbTip.y * window.innerHeight
        },
        isPinching,
        landmarks
      };
    });

    setInteractionPoints(points);
    setGestureState(points.some(p => p.isPinching) ? 'pinch' : 'open');
    
    // Store debug info
    if (points.length > 0 && handLandmarks[0]) {
      const p = points[0];
      const thumbTip = handLandmarks[0][4];
      const indexTip = handLandmarks[0][8];
      setDebugInfo({
        thumbX: p.thumb.x,
        thumbY: p.thumb.y,
        indexX: p.indexFinger.x,
        indexY: p.indexFinger.y,
        distance: getDistance(thumbTip, indexTip),
        isPinching: p.isPinching
      });
    }
  }, [handLandmarks, detectPinch]);

  return {
    interactionPoints,
    gestureState,
    isPinching: gestureState === 'pinch',
    debugInfo
  };
};

export default useHandInteraction;