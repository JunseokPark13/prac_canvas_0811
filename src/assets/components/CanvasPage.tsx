import { useEffect, useRef, useState } from "react";
import { Canvas, CanvasContainer } from "./CanvasPage.styles";

function CanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [currentCanvas, setCurrentCanvas] = useState<HTMLCanvasElement | null>(
    null
  );
  const [currentCtx, setCurrentCtx] =
    useState<CanvasRenderingContext2D | null>();

  // useEffect(() => {
  //   if (currentCount === 50) cancelAnimationFrame(requestAnimationRef.current);
  // });

  // useEffect(() => {
  //   console.log("currentCount ::", currentCount);
  // }, [currentCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 300;
    canvas.height = 300;
    setCurrentCanvas(canvas);
    setCurrentCtx(canvas.getContext("2d"));
  }, []);

  useEffect(() => {
    let requestId: number;
    let start = 0;
    let count = 100;
    const drawAnimatedCircle = (): any => {
      requestId = window.requestAnimationFrame(drawAnimatedCircle);
      start++;
      if (currentCtx) {
        drawCircleByAngle(currentCtx, (start * 2) / count);
      }

      if (start + count / 5 === count) {
        window.cancelAnimationFrame(requestId);
      }
    };

    if (currentCtx) {
      // drawCircle(currentCtx);
      drawAnimatedCircle();
    }
    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [currentCtx]);

  const drawCircleByAngle = (ctx: CanvasRenderingContext2D, num: number) => {
    const t = 0.5;
    const k = t * Math.PI;
    if (currentCanvas && num !== 2)
      ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
    ctx.beginPath();
    ctx.arc(100, 50, 30, num * Math.PI + k, 2 * Math.PI + k, true);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const drawCircle = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(150, 150, 30, 1, 2 * Math.PI, true);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  };

  // const drawAnimatedCircle = (
  //   ctx: CanvasRenderingContext2D,
  //   count: number
  // ): any => {
  //   drawCircleByAngle(ctx, currentCount / count);
  //   setCurrentCount(currentCount + 1);
  //   requestAnimationRef.current = requestAnimationFrame(
  //     drawAnimatedCircle(ctx, count)
  //   );
  // };

  // const drawAnimationFrame = (ctx: CanvasRenderingContext2D) => {
  //   const count = 50;
  //   let start = 0;
  //   const drawAnimatedCircle = (
  //     ctx: CanvasRenderingContext2D,
  //     count: number
  //   ): any => {
  //     drawCircleByAngle(ctx, start / count);
  //     start++;
  //     setCurrentCount(start);
  //     requestAnimationRef.current = requestAnimationFrame(
  //       drawAnimatedCircle(ctx, count)
  //     );
  //   };

  //   drawAnimatedCircle(ctx, count);
  // };

  return (
    <CanvasContainer>
      <Canvas ref={canvasRef} />
    </CanvasContainer>
  );
}

export default CanvasPage;
