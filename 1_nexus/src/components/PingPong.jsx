import React, { useEffect, useRef, useState } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';

const PingPong = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  
  // Game state
  const gameState = useRef({
    ballX: 400,
    ballY: 300,
    ballVx: 5,
    ballVy: 3,
    playerY: 250,
    computerY: 250,
    paddleHeight: 100,
    paddleWidth: 15,
    ballSize: 15,
    handY: 0,
  });

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks[0]) {
        // Use wrist position (landmark 0) to control paddle
        const wrist = results.multiHandLandmarks[0][0];
        gameState.current.handY = wrist.y * 600; // Scale to canvas height
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      camera.stop();
    };
  }, []);

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = setInterval(() => {
      const state = gameState.current;

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 800, 600);

      // Update player paddle based on hand position
      state.playerY = Math.max(0, Math.min(500, state.handY - state.paddleHeight / 2));

      // Update ball position
      state.ballX += state.ballVx;
      state.ballY += state.ballVy;

      // Ball collision with top/bottom
      if (state.ballY <= 0 || state.ballY >= 600 - state.ballSize) {
        state.ballVy = -state.ballVy;
      }

      // Ball collision with player paddle
      if (
        state.ballX <= 30 + state.paddleWidth &&
        state.ballX > 30 &&
        state.ballY >= state.playerY &&
        state.ballY <= state.playerY + state.paddleHeight
      ) {
        state.ballVx = Math.abs(state.ballVx);
        // Add some spin based on where the ball hits the paddle
        const hitPos = (state.ballY - state.playerY) / state.paddleHeight;
        state.ballVy = (hitPos - 0.5) * 10;
      }

      // Ball collision with computer paddle
      if (
        state.ballX >= 770 - state.paddleWidth - state.ballSize &&
        state.ballX < 770 - state.ballSize &&
        state.ballY >= state.computerY &&
        state.ballY <= state.computerY + state.paddleHeight
      ) {
        state.ballVx = -Math.abs(state.ballVx);
      }

      // Simple AI for computer paddle
      const targetY = state.ballY - state.paddleHeight / 2;
      const diff = targetY - state.computerY;
      state.computerY += diff * 0.1;
      state.computerY = Math.max(0, Math.min(500, state.computerY));

      // Score points
      if (state.ballX < 0) {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
        state.ballX = 400;
        state.ballY = 300;
        state.ballVx = -5;
        state.ballVy = 3;
      } else if (state.ballX > 800) {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        state.ballX = 400;
        state.ballY = 300;
        state.ballVx = 5;
        state.ballVy = 3;
      }

      // Draw everything
      ctx.fillStyle = '#fff';
      
      // Draw middle line
      for (let i = 0; i < 600; i += 40) {
        ctx.fillRect(398, i, 4, 20);
      }

      // Draw paddles
      ctx.fillRect(30, state.playerY, state.paddleWidth, state.paddleHeight);
      ctx.fillRect(770 - state.paddleWidth, state.computerY, state.paddleWidth, state.paddleHeight);

      // Draw ball
      ctx.fillRect(state.ballX, state.ballY, state.ballSize, state.ballSize);

      // Draw scores
      ctx.font = '48px monospace';
      ctx.fillText(score.player.toString(), 320, 60);
      ctx.fillText(score.computer.toString(), 450, 60);
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, score]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '20px'
      }}>Ping Pong</h1>
      
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{
            border: '4px solid white',
            display: 'block'
          }}
        />
        
        <video
          ref={videoRef}
          style={{
            position: 'absolute',
            bottom: '-140px',
            right: '0',
            width: '160px',
            height: '120px',
            border: '2px solid white',
            borderRadius: '8px',
            transform: 'scaleX(-1)'
          }}
        />
      </div>

      {!gameStarted && (
        <button
          onClick={() => setGameStarted(true)}
          style={{
            marginTop: '40px',
            padding: '16px 32px',
            backgroundColor: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            fontSize: '1.25rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          Commencer
        </button>
      )}

      {gameStarted && (
        <div style={{
          marginTop: '20px',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.875rem' }}>Utilisez votre main pour contrôler la raquette gauche</p>
          <button
            onClick={() => {
              setGameStarted(false);
              setScore({ player: 0, computer: 0 });
              gameState.current.ballX = 400;
              gameState.current.ballY = 300;
            }}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#da190b'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
};

export default PingPong;