import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface TurtleProps {
  width: number;
  height: number;
  circleColor?: string;
}

const Turtle: React.FC<TurtleProps> = ({ width, height}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // creates a ref that you can attach to a <canvas> element in your component. 
  // This allows you to directly access and manipulate the canvas and its properties, 
  // such as drawing graphics on it, without triggering re-renders. 
  // The inclusion of the type <HTMLCanvasElement> ensures that 
  // you're working with the correct type of DOM element, leveraging TypeScript's type safety.

  useEffect(() => {
    const drawLine = (
      ctx: CanvasRenderingContext2D,
      startPoint: Point,
      endPoint: Point,
      lineWidth: number,
      duration: number
    ) => {
      let startTime = performance.now();

      const draw = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = elapsed / duration;
        const currentX = startPoint.x + (endPoint.x - startPoint.x) * progress;
        const currentY = startPoint.y + (endPoint.y - startPoint.y) * progress;

        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currentX, currentY);
        ctx.lineWidth = lineWidth; // Set line width
        ctx.strokeStyle = 'limegreen'; // Set line color to bright green
        ctx.stroke();

        if (progress < 1) {
          requestAnimationFrame(draw);
        }
      };

      requestAnimationFrame(draw);
    };

    // const drawCircle = (
    //   ctx: CanvasRenderingContext2D,
    //   point: Point,
    //   diameter: number
    // ) => {
    //   ctx.beginPath();
    //   ctx.arc(point.x, point.y, diameter / 2, 0, Math.PI * 2);
    //   ctx.fillStyle = circleColor ?? 'limegreen'; // Use circleColor prop for circle fill color, fallback to 'limegreen' if undefined
    //   ctx.fill();
    //   ctx.closePath();
    // };

    const drawTree = (
      ctx: CanvasRenderingContext2D,
      startPoint: Point,
      length: number,
      angle: number,
      depth: number,
      isFirstLine: boolean = true
    ) => {
      if (depth === 0) return;

      const endPoint: Point = {
        x: startPoint.x + Math.cos(angle) * length,
        y: startPoint.y - Math.sin(angle) * length,
      };

      // Calculate line width based on depth
      let lineWidth = isFirstLine ? 20 : 1 + depth;
      if (depth === 5) {
        lineWidth *= 0.8; // Reduce line width by 20% for the fifth last branches
      }
      if (depth === 4) {
        lineWidth *= 0.7; // Reduce line width by 30% for the fourth last branches
      }
      if (depth === 3) {
        lineWidth *= 0.6; // Reduce line width by 30% for the third last branches
      }
      if (depth === 2) {
        lineWidth *= 0.5; // Reduce line width by 30% for the sedond last branches
      }
      if (depth === 1) {
        lineWidth *= 0.4; // Reduce line width by 50% for the last branches
      }

      drawLine(ctx, startPoint, endPoint, lineWidth, 1000); // Draw line gradually over 1000 milliseconds

      setTimeout(() => {
        const newLength = length * 0.6; // Reduce the length of subsequent branches by 40%
        const newAngle = angle + Math.PI / 3.15 * 1.25; // Increase angle by 10%

        drawTree(ctx, endPoint, newLength, newAngle, depth - 1, false);
        drawTree(ctx, endPoint, newLength, angle - Math.PI / 3.15 * 1.1, depth - 1, false); // Increased angle by 10%
        drawTree(ctx, endPoint, newLength, angle + Math.PI / 6 * 1.1, depth - 1, false); // Additional branch
        drawTree(ctx, endPoint, newLength, angle - Math.PI / 6 * 1.1, depth - 1, false); // Additional branch

        // if (depth === 1) {
        //   // Draw circles at the end of the last lines
        //   drawCircle(ctx, endPoint, 7); // Circle diameter set to 7 pixels
        // }
      }, 1000); // Delay increased by 5000 milliseconds
    };

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = 'limegreen'; // Set initial stroke color to bright green
        const startPoint: Point = { x: width / 2, y: height }; // Center the turtle vertically
        const initialLength = 200; // Initial length of the main branch
        drawTree(ctx, startPoint, initialLength, Math.PI / 2, 6); // Start angle is pointing upwards, depth controls the number of iterations
      }
    }
  }, [width, height]); // Include circleColor in dependency array

  return <canvas ref={canvasRef} width={width} height={height} style={{ border: '2px solid white' }} />;
};

export default Turtle;
