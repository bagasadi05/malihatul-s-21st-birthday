import React, { useEffect, useRef, useState } from 'react';

interface FireworksProps {
    active: boolean;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
    gravity: number;
}

interface Firework {
    x: number;
    y: number;
    targetY: number;
    vy: number;
    exploded: boolean;
    particles: Particle[];
    hue: number;
}

const Fireworks: React.FC<FireworksProps> = ({ active }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [shouldHide, setShouldHide] = useState(false);

    useEffect(() => {
        if (!active) return;

        setShouldHide(false);

        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fireworks: Firework[] = [];
        const colors = [330, 350, 45, 280]; // Rose, Pink, Gold, Purple hues

        let animationId: number;
        let lastLaunch = 0;

        const createFirework = () => {
            const hue = colors[Math.floor(Math.random() * colors.length)];
            fireworks.push({
                x: Math.random() * canvas.width,
                y: canvas.height,
                targetY: Math.random() * canvas.height * 0.5 + 100,
                vy: -8 - Math.random() * 4,
                exploded: false,
                particles: [],
                hue
            });
        };

        const explode = (fw: Firework) => {
            const particleCount = 50 + Math.random() * 50;
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                const speed = 2 + Math.random() * 4;
                fw.particles.push({
                    x: fw.x,
                    y: fw.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    color: `hsl(${fw.hue}, 100%, ${50 + Math.random() * 20}%)`,
                    gravity: 0.05 + Math.random() * 0.05
                });
            }
        };

        const animate = (timestamp: number) => {
            ctx.fillStyle = 'rgba(255, 240, 240, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Launch new fireworks
            if (timestamp - lastLaunch > 400 + Math.random() * 400) {
                createFirework();
                lastLaunch = timestamp;
            }

            // Update fireworks
            for (let i = fireworks.length - 1; i >= 0; i--) {
                const fw = fireworks[i];

                if (!fw.exploded) {
                    fw.y += fw.vy;
                    fw.vy += 0.1; // gravity

                    // Draw rocket
                    ctx.beginPath();
                    ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${fw.hue}, 100%, 60%)`;
                    ctx.fill();

                    // Explode when reaching target
                    if (fw.y <= fw.targetY) {
                        fw.exploded = true;
                        explode(fw);
                    }
                } else {
                    // Update particles
                    let allDead = true;
                    fw.particles.forEach(p => {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.vy += p.gravity;
                        p.alpha -= 0.008;

                        if (p.alpha > 0) {
                            allDead = false;
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                            ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('hsl', 'hsla');
                            ctx.fill();
                        }
                    });

                    if (allDead) {
                        fireworks.splice(i, 1);
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animate(0);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        // Auto-stop after 15 seconds and hide
        const timeout = setTimeout(() => {
            cancelAnimationFrame(animationId);
            setShouldHide(true);
        }, 15000);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeout);
        };
    }, [active]);

    if (!active || shouldHide) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
        />
    );
};

export default Fireworks;
