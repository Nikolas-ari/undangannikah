import React, { useEffect, useRef } from 'react';

export const PetalCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numPetals = 22;
    const petals = [];

    class Petal {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.rotation = Math.random() * 360;
        this.rotSpeed = Math.random() * 1.5 - 0.75;
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX;
        this.rotation += this.rotSpeed;
        if (this.y > height + 20) {
          this.reset();
          this.y = -10;
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#fce4ec';

        // Draw soft petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size * 1.5, -this.size * 1.5, this.size, 0, this.size * 1.8);
        ctx.bezierCurveTo(this.size * 1.5, this.size, this.size, -this.size * 1.5, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < numPetals; i++) {
      petals.push(new Petal());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="petalCanvas" ref={canvasRef} />;
};
