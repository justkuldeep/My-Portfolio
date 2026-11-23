import { useEffect, useRef } from 'react';

/**
 * Custom flame cursor — arrow SVG + hover SVG + canvas particle trail.
 * Ported 1:1 from the original script.js (same SVGs, palette, particle physics,
 * click burst and clickable detection).
 */
const PALETTE = ['#fff7a0', '#ffe040', '#ffa800', '#ff6200', '#e82c00', '#c01000'];
const MAX_PARTICLES = 220;
const CLICKABLE =
  'a, button, [role="button"], input, textarea, select, label, [tabindex], [data-cursor="pointer"]';

const hexAlpha = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
};

class Particle {
  constructor(x, y, isClick) {
    this.reset(x, y, isClick);
  }
  reset(x, y, isClick) {
    this.x = x + (Math.random() - 0.5) * (isClick ? 14 : 6);
    this.y = y + (Math.random() - 0.5) * (isClick ? 14 : 6);
    this.vx = (Math.random() - 0.5) * (isClick ? 3.5 : 2.2);
    this.vy = -(Math.random() * (isClick ? 4.5 : 3.0) + 1.2);
    this.life = 1;
    this.decay = isClick ? 0.014 + Math.random() * 0.012 : 0.018 + Math.random() * 0.016;
    this.radius = isClick ? 7 + Math.random() * 7 : 4 + Math.random() * 5;
    this.wobble = (Math.random() - 0.5) * 0.08;
  }
  update() {
    this.x += this.vx + this.wobble;
    this.y += this.vy;
    this.vy *= 0.975;
    this.vx *= 0.985;
    this.life -= this.decay;
  }
  draw(ctx) {
    if (this.life <= 0) return;
    const t = Math.min(1, Math.max(0, this.life));
    const idx = Math.floor((1 - t) * (PALETTE.length - 1));
    const color = PALETTE[Math.min(idx, PALETTE.length - 1)];
    const r = this.radius * (0.4 + t * 0.6);
    const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
    grd.addColorStop(0, hexAlpha(color, t));
    grd.addColorStop(0.5, hexAlpha(color, t * 0.7));
    grd.addColorStop(1, hexAlpha(color, 0));
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }
}

export default function FlameCursor() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const arrowRef = useRef(null);
  const pointerRef = useRef(null);

  useEffect(() => {
    // Mouse / trackpad only — touch devices keep their native behaviour
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const canvas = canvasRef.current;
    const cursorEl = cursorRef.current;
    const arrow = arrowRef.current;
    const pointer = pointerRef.current;
    if (!canvas || !cursorEl) return undefined;

    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let mx = -200;
    let my = -200;
    let isPointer = false;
    let isDown = false;
    let rafId = 0;
    const particles = [];

    const emit = (x, y, count, isClick) => {
      for (let i = 0; i < count; i++) {
        if (particles.length < MAX_PARTICLES) {
          particles.push(new Particle(x, y, isClick));
        } else {
          let oldest = 0;
          for (let j = 1; j < particles.length; j++) {
            if (particles[j].life < particles[oldest].life) oldest = j;
          }
          particles[oldest].reset(x, y, isClick);
        }
      }
    };

    const setMode = (p) => {
      if (p === isPointer) return;
      isPointer = p;
      arrow.style.display = p ? 'none' : 'block';
      pointer.style.display = p ? 'block' : 'none';
    };

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      emit(mx + 18, my + 32, isDown ? 5 : 2, false);
      for (const p of particles) {
        p.update();
        if (p.life > 0) p.draw(ctx);
      }
      ctx.globalCompositeOperation = 'source-over';

      cursorEl.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      setMode(!!(e.target.closest && e.target.closest(CLICKABLE)));
    };
    const onDown = () => {
      isDown = true;
      emit(mx + 18, my + 32, 28, true);
    };
    const onUp = () => {
      isDown = false;
    };
    const onLeave = () => {
      mx = -400;
      my = -400;
      cursorEl.style.transform = 'translate(-400px, -400px)';
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <canvas id="flameCursorCanvas" ref={canvasRef} />
      <div id="flameCursor" ref={cursorRef} aria-hidden="true">
        <img id="flameCursorArrow" ref={arrowRef} src="/assets/cursor/flame-cursor.svg" alt="" draggable="false" />
        <img
          id="flameCursorPointer"
          ref={pointerRef}
          src="/assets/cursor/flame-hover.svg"
          alt=""
          draggable="false"
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
}
