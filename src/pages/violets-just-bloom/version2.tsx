import React, { useEffect, useRef, useCallback } from 'react';

import type { Layout } from 'types/persistentLayout';
import type PageWithLayout from 'types/persistentLayout';

const COLORS = [
  { r: 215, g: 150, b: 255, a: 0.4 },
  { r: 255, g: 180, b: 220, a: 0.4 },
  { r: 150, g: 230, b: 255, a: 0.3 },
  { r: 255, g: 240, b: 150, a: 0.3 },
];

const PLANET_IMAGES = [
  '/images/planets/planet1.png',
  '/images/planets/planet2.png',
  '/images/planets/planet3.png',
];

const MUSHROOM_IMAGES = [
  '/images/mushrooms/mushroom1.png',
  '/images/mushrooms/mushroom2.png',
  '/images/mushrooms/mushroom3.png',
  '/images/mushrooms/mushroom4.png',
];

const STAR_IMAGE = '/images/star.png';

class Planet {
  x: number;
  y: number;
  scale: number;
  image: HTMLImageElement;
  imageLoaded: boolean;
  index: number;

  constructor(
    width: number,
    height: number,
    imagePath: string,
    index: number,
    total: number,
  ) {
    this.index = index;
    const padding = 50;
    const centerAvoid = 0.35;
    const side = index % 2 === 0 ? 'left' : 'right';

    if (side === 'left') {
      const leftWidth = width * 0.25;
      this.x = padding + Math.random() * leftWidth;
    } else {
      const rightStart = width * 0.75;
      this.x = rightStart + Math.random() * (width * 0.25 - padding);
    }

    const verticalSection = (height * 0.15) / total;
    this.y =
      padding +
      index * verticalSection +
      Math.random() * (verticalSection * 0.6);
    this.scale = 0.15 + Math.random() * 0.25;

    this.image = new Image();
    this.imageLoaded = false;
    this.image.src = imagePath;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  update() {}

  draw(
    ctx: CanvasRenderingContext2D,
    mouseX: number | null,
    mouseY: number | null,
  ) {
    if (!this.imageLoaded) return;

    const imgWidth = this.image.naturalWidth * this.scale;
    const imgHeight = this.image.naturalHeight * this.scale;

    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.drawImage(
      this.image,
      this.x - imgWidth / 2,
      this.y - imgHeight / 2,
      imgWidth,
      imgHeight,
    );
    ctx.restore();
  }
}

class Bird {
  x: number;
  y: number;
  speed: number;
  size: number;
  wingStep: number;
  width: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.x = Math.random() * width;
    this.y = Math.random() * (height * 0.4);
    this.speed = Math.random() * 0.5 + 0.3;
    this.size = Math.random() * 12 + 10;
    this.wingStep = Math.random() * Math.PI * 2;
  }

  init(height: number) {
    this.x = -100;
    this.y = Math.random() * (height * 0.4);
    this.speed = Math.random() * 0.5 + 0.3;
    this.size = Math.random() * 12 + 10;
    this.wingStep = Math.random() * Math.PI * 2;
  }

  update(height: number) {
    this.x += this.speed;
    this.wingStep += 0.04;
    if (this.x > this.width + 100) this.init(height);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const wing = Math.sin(this.wingStep) * this.size;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(150, 130, 200, 0.4)';
    ctx.lineWidth = 2;
    ctx.moveTo(this.x - this.size, this.y - wing);
    ctx.quadraticCurveTo(
      this.x,
      this.y + wing * 0.3,
      this.x + this.size,
      this.y - wing,
    );
    ctx.stroke();
  }
}

class Mushroom {
  x: number;
  y: number;
  scale: number;
  swayAngle: number;
  image: HTMLImageElement;
  imageLoaded: boolean;
  index: number;

  constructor(
    width: number,
    height: number,
    imagePath: string,
    index: number,
    total: number,
  ) {
    this.index = index;
    const padding = 50;
    const side = index % 2 === 0 ? 'left' : 'right';

    const sectionWidth = (width * 0.3) / Math.ceil(total / 2);

    if (side === 'left') {
      const leftIndex = Math.floor(index / 2);
      this.x =
        padding +
        leftIndex * sectionWidth +
        Math.random() * (sectionWidth * 0.7);
    } else {
      const rightStart = width * 0.7;
      const rightIndex = Math.floor(index / 2);
      this.x =
        rightStart +
        rightIndex * sectionWidth +
        Math.random() * (sectionWidth * 0.7);
    }

    this.y = height + 3;
    this.scale = 0.2 + Math.random() * 0.3;
    this.swayAngle = 0;

    this.image = new Image();
    this.imageLoaded = false;
    this.image.src = imagePath;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  draw(
    ctx: CanvasRenderingContext2D,
    mouseX: number | null,
    mouseY: number | null,
  ) {
    if (!this.imageLoaded) return;

    const imgWidth = this.image.naturalWidth * this.scale;
    const imgHeight = this.image.naturalHeight * this.scale;

    let targetSway = Math.sin(Date.now() * 0.001 + this.x) * 0.05;
    if (mouseX != null && mouseY != null) {
      const dx = mouseX - this.x;
      const dy = mouseY - (this.y - imgHeight);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) targetSway = (dx / 120) * 0.4;
    }
    this.swayAngle += (targetSway - this.swayAngle) * 0.1;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.swayAngle);

    ctx.globalAlpha = 0.9;
    ctx.drawImage(this.image, -imgWidth / 2, -imgHeight, imgWidth, imgHeight);

    ctx.restore();
  }
}

class Star {
  x: number;
  y: number;
  scale: number;
  image: HTMLImageElement;
  imageLoaded: boolean;
  index: number;

  constructor(width: number, height: number, index: number, total: number) {
    this.index = index;
    const padding = 50;
    const centerAvoid = 0.35;
    const side = index % 2 === 0 ? 'left' : 'right';

    if (side === 'left') {
      const leftWidth = width * 0.25;
      this.x = padding + Math.random() * leftWidth;
    } else {
      const rightStart = width * 0.75;
      this.x = rightStart + Math.random() * (width * 0.25 - padding);
    }

    const starStart = height * 0.18;
    const verticalSection = (height * 0.15) / total;
    this.y =
      starStart +
      index * verticalSection +
      Math.random() * (verticalSection * 0.6);
    this.scale = 0.1 + Math.random() * 0.2;

    this.image = new Image();
    this.imageLoaded = false;
    this.image.src = STAR_IMAGE;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  update() {}

  draw(
    ctx: CanvasRenderingContext2D,
    mouseX: number | null,
    mouseY: number | null,
  ) {
    if (!this.imageLoaded) return;

    const imgWidth = this.image.naturalWidth * this.scale;
    const imgHeight = this.image.naturalHeight * this.scale;

    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.drawImage(
      this.image,
      this.x - imgWidth / 2,
      this.y - imgHeight / 2,
      imgWidth,
      imgHeight,
    );
    ctx.restore();
  }
}

class Vine {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
  finished: boolean;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = height + 10;
    this.prevX = this.x;
    this.prevY = this.y;
    this.angle = -Math.PI / 2;
    this.speed = Math.random() * 0.5 + 0.3;
    this.life = 0;
    this.maxLife = height * 0.6;
    this.finished = false;
  }

  update() {
    if (this.finished) return;
    this.prevX = this.x;
    this.prevY = this.y;
    this.angle += (Math.random() - 0.5) * 0.1;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life += this.speed;
    if (this.life > this.maxLife || this.y < 150) this.finished = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(180, 150, 230, ${
      0.1 + (1 - this.life / this.maxLife) * 0.3
    })`;
    ctx.lineWidth = Math.max(0.5, 2 * (1 - this.life / this.maxLife));
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

const VioletsJustBloomV2: PageWithLayout = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const vineCanvasRef = useRef<HTMLCanvasElement>(null);
  const lifeCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const vinesRef = useRef<Vine[]>([]);
  const mushroomsRef = useRef<Mushroom[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const starsRef = useRef<Star[]>([]);

  const contextsRef = useRef<{
    bg: CanvasRenderingContext2D | null;
    vine: CanvasRenderingContext2D | null;
    life: CanvasRenderingContext2D | null;
  }>({ bg: null, vine: null, life: null });

  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  const resize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (bgCanvasRef.current) {
      bgCanvasRef.current.width = width;
      bgCanvasRef.current.height = height;
      if (!contextsRef.current.bg) {
        contextsRef.current.bg = bgCanvasRef.current.getContext('2d', {
          alpha: true,
        });
      }
      if (contextsRef.current.bg) {
        contextsRef.current.bg.imageSmoothingEnabled = true;
      }
    }
    if (vineCanvasRef.current) {
      vineCanvasRef.current.width = width;
      vineCanvasRef.current.height = height;
      if (!contextsRef.current.vine) {
        contextsRef.current.vine = vineCanvasRef.current.getContext('2d', {
          alpha: true,
        });
      }
      if (contextsRef.current.vine) {
        contextsRef.current.vine.clearRect(0, 0, width, height);
        contextsRef.current.vine.imageSmoothingEnabled = true;
      }
    }
    if (lifeCanvasRef.current) {
      lifeCanvasRef.current.width = width;
      lifeCanvasRef.current.height = height;
      if (!contextsRef.current.life) {
        contextsRef.current.life = lifeCanvasRef.current.getContext('2d', {
          alpha: true,
        });
      }
      if (contextsRef.current.life) {
        contextsRef.current.life.imageSmoothingEnabled = true;
      }
    }

    vinesRef.current = Array.from(
      { length: 12 },
      () => new Vine(width, height),
    );
    mushroomsRef.current = MUSHROOM_IMAGES.map(
      (imagePath, index) =>
        new Mushroom(width, height, imagePath, index, MUSHROOM_IMAGES.length),
    );
    planetsRef.current = PLANET_IMAGES.map(
      (imagePath, index) =>
        new Planet(width, height, imagePath, index, PLANET_IMAGES.length),
    );

    const starCount = 3;
    starsRef.current = Array.from(
      { length: starCount },
      (_, index) => new Star(width, height, index, starCount),
    );
  }, []);

  const animate = useCallback(() => {
    const bgCanvas = bgCanvasRef.current;
    const vineCanvas = vineCanvasRef.current;
    const lifeCanvas = lifeCanvasRef.current;

    if (!bgCanvas || !vineCanvas || !lifeCanvas) return;

    const ctx = contextsRef.current.bg;
    const vctx = contextsRef.current.vine;
    const lctx = contextsRef.current.life;

    if (!ctx || !vctx || !lctx) return;

    const { x: mouseX, y: mouseY } = mouseRef.current;

    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    lctx.clearRect(0, 0, lifeCanvas.width, lifeCanvas.height);

    const vines = vinesRef.current;
    for (let i = 0; i < vines.length; i++) {
      vines[i].update();
      vines[i].draw(vctx);
    }

    const planets = planetsRef.current;
    for (let i = 0; i < planets.length; i++) {
      planets[i].update();
      planets[i].draw(lctx, mouseX, mouseY);
    }

    const stars = starsRef.current;
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw(lctx, mouseX, mouseY);
    }

    const mushrooms = mushroomsRef.current;
    for (let i = 0; i < mushrooms.length; i++) {
      mushrooms[i].draw(lctx, mouseX, mouseY);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    resize();
    animate();

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        resize();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resize, animate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    mouseRef.current = { x: mouseX, y: mouseY };

    if (cardRef.current) {
      const xA = (window.innerWidth / 2 - mouseX) / 90;
      const yA = (window.innerHeight / 2 - mouseY) / 90;
      cardRef.current.style.transform = `rotateY(${-xA}deg) rotateX(${yA}deg)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: null, y: null };
    if (cardRef.current) {
      cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          body {
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          html {
            overflow: hidden !important;
          }
          @keyframes floatSmooth {
            0%, 100% { transform: translateZ(110px) translateY(0) rotate(0deg); }
            33% { transform: translateZ(110px) translateY(-15px) rotate(1deg); }
            66% { transform: translateZ(110px) translateY(10px) rotate(-1deg); }
          }
          .vortex-overlay-image {
            animation: floatSmooth 6s ease-in-out infinite;
          }
          .vortex-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
          }
        `,
        }}
      />

      <div
        className='vortex-container flex items-center justify-center overflow-hidden'
        style={{
          backgroundColor: '#fdfbff',
          backgroundImage:
            "radial-gradient(circle at center, rgba(255, 255, 255, 0) 0%, rgba(240, 230, 255, 0.5) 100%), url('/images/paper-fibers.jpg')",
          perspective: '1200px',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas
          ref={bgCanvasRef}
          className='fixed top-0 left-0 w-full h-full pointer-events-none'
          style={{ zIndex: 0, willChange: 'contents' }}
        />
        <canvas
          ref={vineCanvasRef}
          className='fixed top-0 left-0 w-full h-full pointer-events-none'
          style={{ zIndex: 5, willChange: 'contents' }}
        />
        <canvas
          ref={lifeCanvasRef}
          className='fixed top-0 left-0 w-full h-full pointer-events-none'
          style={{ zIndex: 6, willChange: 'contents' }}
        />

        <div
          className='relative w-full h-full flex items-center justify-center pointer-events-none p-5'
          style={{ zIndex: 10 }}
        >
          <div
            ref={cardRef}
            className='pointer-events-auto cursor-pointer flex items-center justify-center relative'
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              willChange: 'transform',
            }}
          >
            <img
              src='/images/violets-card.png'
              alt='Interactive Centered Image'
              className='block rounded-3xl border-2'
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                width: 'auto',
                height: '80vh',
                objectFit: 'contain',
                borderColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow:
                  '0 30px 60px -12px rgba(150, 100, 180, 0.2), 0 0 40px rgba(200, 150, 255, 0.15)',
                transform: 'translateZ(60px)',
              }}
            />
            <img
              src='/images/card-sprite.png'
              alt='Floating Overlay'
              className='vortex-overlay-image absolute top-0 left-0 w-full h-full object-contain pointer-events-none'
              style={{ transform: 'translateZ(100px)' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const VioletsJustBloomLayout: Layout = ({ children }) => {
  return <>{children}</>;
};

VioletsJustBloomV2.Layout = VioletsJustBloomLayout;

export default VioletsJustBloomV2;
