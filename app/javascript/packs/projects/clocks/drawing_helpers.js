export const drawBackground = (canvas, context) => {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
};

export const drawArc = (context, startX, startY, radius, startAngle, endAngle, colour) => {
  context.beginPath();
  context.strokeStyle = colour;
  context.arc(startX, startY, radius, startAngle, endAngle);
  context.stroke();
};

export const drawLine = (context, startX, startY, endX, endY, colour) => {
  context.beginPath();
  context.strokeStyle = colour;
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
};

export const drawLineWithRotation = (context, angle, length, colour) => {
  context.rotate(angle);
  context.beginPath();
  context.strokeStyle = colour;
  context.moveTo(0, 0);
  context.lineTo(length, 0);
  context.stroke();
  context.rotate(-angle);
};
