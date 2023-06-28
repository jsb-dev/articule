const calculateOffset = (
  targetHandle,
  nodePosition,
  minorIncrement,
  majorIncrement
) => {
  const largeOffsetX = minorIncrement + Math.random() * majorIncrement;
  const smallOffsetX = minorIncrement + Math.random() * minorIncrement;
  const largeOffsetY = minorIncrement + Math.random() * majorIncrement;
  const smallOffsetY = minorIncrement + Math.random() * minorIncrement;
  let position;

  switch (targetHandle) {
    case 'top':
      position = {
        x:
          nodePosition.x + (Math.random() < 0.5 ? -largeOffsetX : largeOffsetX),
        y: nodePosition.y + largeOffsetY,
      };
      break;
    case 'bottom':
      position = {
        x:
          nodePosition.x + (Math.random() < 0.5 ? -smallOffsetX : smallOffsetX),
        y: nodePosition.y - largeOffsetY,
      };
      break;
    case 'left':
      position = {
        x: nodePosition.x + largeOffsetX,
        y:
          nodePosition.y + (Math.random() < 0.5 ? -smallOffsetY : smallOffsetY),
      };
      break;
    case 'right':
      position = {
        x: nodePosition.x - largeOffsetX,
        y:
          nodePosition.y + (Math.random() < 0.5 ? -smallOffsetY : smallOffsetY),
      };
      break;
    default:
      break;
  }

  return position;
};

export default calculateOffset;
