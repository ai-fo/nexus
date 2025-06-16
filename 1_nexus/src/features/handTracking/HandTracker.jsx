import { useEffect, useRef } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

const HandTracker = ({ videoElement, canvasElement, onHandsDetected }) => {
  const handsRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!videoElement || !canvasElement) return;

    const initializeHandTracking = () => {
      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      hands.onResults((results) => {
        const ctx = canvasElement.getContext('2d');
        ctx.save();
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        
        // Mirror the canvas
        ctx.translate(canvasElement.width, 0);
        ctx.scale(-1, 1);
        
        // Draw the image
        ctx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        
        if (results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
              color: '#00FF00',
              lineWidth: 5
            });
            drawLandmarks(ctx, landmarks, {
              color: '#FF0000',
              lineWidth: 2
            });
            
            // Highlight thumb and index finger tips
            const thumbTip = landmarks[4];
            const indexTip = landmarks[8];
            
            // Draw bigger circles on thumb and index
            ctx.fillStyle = '#FFFF00';
            ctx.beginPath();
            ctx.arc(thumbTip.x * canvasElement.width, thumbTip.y * canvasElement.height, 10, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = '#00FFFF';
            ctx.beginPath();
            ctx.arc(indexTip.x * canvasElement.width, indexTip.y * canvasElement.height, 10, 0, 2 * Math.PI);
            ctx.fill();
          }
          
          // Pass hand data to parent
          if (onHandsDetected) {
            onHandsDetected(results.multiHandLandmarks);
          }
        }
        
        ctx.restore();
      });

      const camera = new Camera(videoElement, {
        onFrame: async () => {
          if (canvasElement) {
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
          }
          await hands.send({ image: videoElement });
        },
        width: 1280,
        height: 720
      });

      camera.start();
      
      handsRef.current = hands;
      cameraRef.current = camera;
    };

    initializeHandTracking();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [videoElement, canvasElement, onHandsDetected]);

  return null;
};

export default HandTracker;