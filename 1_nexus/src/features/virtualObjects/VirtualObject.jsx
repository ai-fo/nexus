import { useState, useEffect } from 'react';

const VirtualObject = ({ id, initialX, initialY, size = 100, color = '#3498db', shape = 'circle', onPositionChange, isDragging = false }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  useEffect(() => {
    if (onPositionChange) {
      onPositionChange(id, position);
    }
  }, [position, id, onPositionChange]);

  const renderShape = () => {
    const baseStyle = {
      position: 'absolute',
      left: `${position.x - size / 2}px`,
      top: `${position.y - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      cursor: 'pointer',
      userSelect: 'none',
      transition: isDragging ? 'none' : 'all 0.3s ease',
      boxShadow: isDragging ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
      transform: isDragging ? 'scale(1.1)' : 'scale(1)',
      zIndex: isDragging ? 1000 : 1
    };

    switch (shape) {
      case 'circle':
        return <div style={{ ...baseStyle, borderRadius: '50%' }} />;
      case 'square':
        return <div style={baseStyle} />;
      case 'triangle':
        return (
          <div
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      default:
        return <div style={baseStyle} />;
    }
  };

  return renderShape();
};

export default VirtualObject;