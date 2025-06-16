import { useState, useCallback, useEffect } from 'react';
import VirtualObject from './VirtualObject';
import useHandInteraction from '../../hooks/useHandInteraction';

const ObjectCanvas = ({ handLandmarks }) => {
  const { interactionPoints, isPinching } = useHandInteraction(handLandmarks);
  const [objects, setObjects] = useState([
    { id: 1, x: 200, y: 200, size: 80, color: '#3498db', shape: 'circle' },
    { id: 2, x: 400, y: 300, size: 100, color: '#e74c3c', shape: 'square' },
    { id: 3, x: 600, y: 200, size: 90, color: '#2ecc71', shape: 'triangle' },
    { id: 4, x: 300, y: 400, size: 70, color: '#f39c12', shape: 'circle' }
  ]);

  const handleObjectPositionChange = useCallback((id, newPosition) => {
    setObjects(prev => prev.map(obj => 
      obj.id === id ? { ...obj, x: newPosition.x, y: newPosition.y } : obj
    ));
  }, []);

  const [draggedObject, setDraggedObject] = useState(null);

  // Debug logging
  useEffect(() => {
    if (isPinching) {
      console.log('Pinch detected!');
    }
  }, [isPinching]);

  // Update object positions based on hand tracking
  useEffect(() => {
    if (!interactionPoints || interactionPoints.length === 0) return;

    const point = interactionPoints[0];
    const fingerX = point.indexFinger.x;
    const fingerY = point.indexFinger.y;

    // Handle dragging
    if (isPinching && !draggedObject) {
      // Find closest object to start dragging
      let closestObject = null;
      let minDistance = Infinity;

      objects.forEach(obj => {
        const distance = Math.sqrt(
          Math.pow(fingerX - obj.x, 2) + Math.pow(fingerY - obj.y, 2)
        );
        if (distance < obj.size && distance < minDistance) {
          minDistance = distance;
          closestObject = obj.id;
        }
      });

      if (closestObject) {
        console.log('Starting drag for object:', closestObject);
        setDraggedObject(closestObject);
      }
    } else if (!isPinching && draggedObject) {
      // Release dragged object
      console.log('Releasing object:', draggedObject);
      setDraggedObject(null);
    }

    // Move dragged object
    if (draggedObject) {
      setObjects(prevObjects => {
        return prevObjects.map(obj => {
          if (obj.id === draggedObject) {
            return { ...obj, x: fingerX, y: fingerY };
          }
          return obj;
        });
      });
    }
  }, [interactionPoints, isPinching, draggedObject, objects]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }}>
      {objects.map(obj => (
        <VirtualObject
          key={obj.id}
          id={obj.id}
          initialX={obj.x}
          initialY={obj.y}
          size={obj.size}
          color={obj.color}
          shape={obj.shape}
          onPositionChange={handleObjectPositionChange}
          isDragging={draggedObject === obj.id}
        />
      ))}
    </div>
  );
};

export default ObjectCanvas;