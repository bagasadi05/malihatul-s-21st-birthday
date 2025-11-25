import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: { x: number; y: number; color: string; size: number; speedY: number; speedX: number; rotation: number }[] = [];
    const colors = ['#FFB7B2', '#FF9E9E', '#FFD700', '#FFF0F5', '#E6E6FA']; // Pastel & Gold

    for (let i = 0; i < 100; i++) { // Slightly fewer pieces for elegance
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4, // Slightly smaller
        speedY: Math.random() * 2 + 1, // Slower fall
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += 5;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default Confetti;