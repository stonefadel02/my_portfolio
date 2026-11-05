"use client";

import { useEffect, useRef } from "react";

type Particle = {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

const DOT_COLOR = "#4ecdc4";
const GAP = 4.5;
const REPEL_RADIUS = 72;
const REPEL_STRENGTH = 18;
const SPRING = 0.08;
const FRICTION = 0.78;

function brightness(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function hueSat(r: number, g: number, b: number) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  const sat = max === 0 ? 0 : d / max;
  if (d < 0.0001) return { hue: 0, sat };
  let hue = 0;
  if (max === rn) hue = ((gn - bn) / d) % 6;
  else if (max === gn) hue = (bn - rn) / d + 2;
  else hue = (rn - gn) / d + 4;
  hue *= 60;
  if (hue < 0) hue += 360;
  return { hue, sat };
}

function isSkin(r: number, g: number, b: number) {
  const lum = brightness(r, g, b);
  const { hue, sat } = hueSat(r, g, b);
  const warmHue = hue <= 55 || hue >= 330;
  if (lum < 55 || lum > 252) return false;
  if (r <= b) return false;
  return (warmHue && sat > 0.06) || (r > g - 12 && r > b + 8 && lum > 90);
}

function isOliveBackground(r: number, g: number, b: number) {
  const lum = brightness(r, g, b);
  const { hue, sat } = hueSat(r, g, b);
  return lum > 55 && lum < 210 && hue >= 32 && hue <= 95 && sat > 0.16 && !isSkin(r, g, b);
}

function isHairOrBeard(r: number, g: number, b: number) {
  const lum = brightness(r, g, b);
  const { sat } = hueSat(r, g, b);
  return lum > 8 && lum < 110 && sat < 0.5 && !isOliveBackground(r, g, b);
}

function isPersonPixel(r: number, g: number, b: number, a: number) {
  if (a < 40) return false;
  if (isOliveBackground(r, g, b)) return false;
  return isSkin(r, g, b) || isHairOrBeard(r, g, b);
}

function neighborCount(mask: Uint8Array, cols: number, rows: number, row: number, col: number) {
  let n = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (mask[nr * cols + nc]) n += 1;
    }
  }
  return n;
}

export default function DotPortrait({
  src = "/face.png",
  alt = "Stone AFEDJOU dotted portrait",
}: {
  src?: string;
  alt?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, inside: false };
    let raf = 0;
    let running = true;
    let isImageFallback = false;

    const image = new Image();
    image.src = src;

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width: rect.width, height: rect.height };
    };

    const buildParticles = () => {
      particles.length = 0;
      isImageFallback = false;
      const { width, height } = setCanvasSize();
      if (!width || !height || !image.naturalWidth) return;
      ctx.clearRect(0, 0, width, height);

      const sample = document.createElement("canvas");
      sample.width = Math.floor(width);
      sample.height = Math.floor(height);
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;

      const imgRatio = image.naturalWidth / image.naturalHeight;
      const boxRatio = width / height;
      let drawW = width;
      let drawH = height;
      let ox = 0;
      let oy = 0;
      if (imgRatio > boxRatio) {
        drawW = height * imgRatio;
        ox = (width - drawW) / 2;
      } else {
        drawH = width / imgRatio;
        oy = (height - drawH) / 2;
      }
      sampleCtx.drawImage(image, ox, oy, drawW, drawH);

      const { data } = sampleCtx.getImageData(0, 0, sample.width, sample.height);
      const cols = Math.ceil(width / GAP);
      const rows = Math.ceil(height / GAP);
      const grid: Array<{
        x: number;
        y: number;
        person: boolean;
        skin: boolean;
        olive: boolean;
        lum: number;
      } | null> = new Array(cols * rows).fill(null);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * GAP + GAP / 2;
          const y = row * GAP + GAP / 2;
          if (x >= width || y >= height) continue;
          const px = Math.min(sample.width - 1, Math.floor(x));
          const py = Math.min(sample.height - 1, Math.floor(y));
          const i = (py * sample.width + px) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          grid[row * cols + col] = {
            x,
            y,
            person: isPersonPixel(r, g, b, a),
            skin: isSkin(r, g, b),
            olive: isOliveBackground(r, g, b),
            lum: brightness(r, g, b),
          };
        }
      }

      let skinMinX = width;
      let skinMaxX = 0;
      let skinMinY = height;
      let skinMaxY = 0;
      let skinCount = 0;
      let skinCx = 0;
      let skinCy = 0;

      for (const cell of grid) {
        if (!cell?.skin) continue;
        skinCount += 1;
        skinCx += cell.x;
        skinCy += cell.y;
        skinMinX = Math.min(skinMinX, cell.x);
        skinMaxX = Math.max(skinMaxX, cell.x);
        skinMinY = Math.min(skinMinY, cell.y);
        skinMaxY = Math.max(skinMaxY, cell.y);
      }

      if (skinCount === 0) {
        ctx.drawImage(image, ox, oy, drawW, drawH);
        isImageFallback = true;
        return;
      }

      skinCx /= skinCount;
      skinCy /= skinCount;
      const faceWidth = Math.max(40, skinMaxX - skinMinX);
      const hairPadX = faceWidth * 0.42;
      const hairPadY = faceWidth * 0.62;
      const neckBottom = Math.min(height - GAP, skinMaxY + GAP * 8);

      const inHeadBox = (x: number, y: number) =>
        x >= skinMinX - hairPadX &&
        x <= skinMaxX + hairPadX &&
        y >= skinMinY - hairPadY &&
        y <= neckBottom;

      const mask = new Uint8Array(cols * rows);

      for (let idx = 0; idx < grid.length; idx++) {
        const cell = grid[idx];
        if (!cell || !inHeadBox(cell.x, cell.y) || cell.olive) continue;
        if (cell.person || cell.skin || (cell.lum > 40 && cell.lum < 250 && !cell.olive)) {
          mask[idx] = 1;
        }
      }

      const startCol = Math.max(0, Math.min(cols - 1, Math.floor(skinCx / GAP)));
      const startRow = Math.max(0, Math.min(rows - 1, Math.floor(skinCy / GAP)));
      const connected = new Uint8Array(cols * rows);
      const stack = [startRow * cols + startCol];
      connected[startRow * cols + startCol] = 1;

      while (stack.length) {
        const idx = stack.pop()!;
        if (!mask[idx] && idx !== startRow * cols + startCol) continue;
        connected[idx] = 1;
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        for (const [nr, nc] of [
          [row - 1, col],
          [row + 1, col],
          [row, col - 1],
          [row, col + 1],
        ]) {
          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
          const nidx = nr * cols + nc;
          if (connected[nidx] || !mask[nidx]) continue;
          connected[nidx] = 1;
          stack.push(nidx);
        }
      }

      for (let pass = 0; pass < 3; pass++) {
        const next = connected.slice();
        for (let row = 1; row < rows - 1; row++) {
          for (let col = 1; col < cols - 1; col++) {
            const idx = row * cols + col;
            const cell = grid[idx];
            if (!cell || cell.olive || !inHeadBox(cell.x, cell.y)) continue;
            if (!connected[idx] && neighborCount(connected, cols, rows, row, col) >= 5) {
              next[idx] = 1;
            }
          }
        }
        connected.set(next);
      }

      const outside = new Uint8Array(cols * rows);
      const edge: number[] = [];
      for (let col = 0; col < cols; col++) {
        edge.push(col, (rows - 1) * cols + col);
      }
      for (let row = 0; row < rows; row++) {
        edge.push(row * cols, row * cols + cols - 1);
      }
      for (const start of edge) {
        if (outside[start] || connected[start]) continue;
        const fill = [start];
        outside[start] = 1;
        while (fill.length) {
          const idx = fill.pop()!;
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          for (const [nr, nc] of [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
          ]) {
            if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
            const nidx = nr * cols + nc;
            if (outside[nidx] || connected[nidx]) continue;
            outside[nidx] = 1;
            fill.push(nidx);
          }
        }
      }

      for (let idx = 0; idx < connected.length; idx++) {
        const cell = grid[idx];
        if (!cell || cell.olive || !inHeadBox(cell.x, cell.y)) continue;
        if (!outside[idx]) connected[idx] = 1;
      }

      let minCol = cols;
      let maxCol = 0;
      const colMaxRow = new Array(cols).fill(-1);
      const colMinRow = new Array(cols).fill(rows);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (!connected[row * cols + col]) continue;
          minCol = Math.min(minCol, col);
          maxCol = Math.max(maxCol, col);
          colMaxRow[col] = Math.max(colMaxRow[col], row);
          colMinRow[col] = Math.min(colMinRow[col], row);
        }
      }

      const bottoms: number[] = [];
      for (let col = minCol; col <= maxCol; col++) {
        if (colMaxRow[col] >= 0) bottoms.push(colMaxRow[col]);
      }
      bottoms.sort((a, b) => a - b);
      const targetRow = bottoms[Math.floor(bottoms.length * 0.72)] ?? bottoms[bottoms.length - 1];

      for (let col = minCol; col <= maxCol; col++) {
        if (colMaxRow[col] < 0) continue;
        for (let row = colMinRow[col]; row <= targetRow; row++) {
          const cell = grid[row * cols + col];
          if (!cell || cell.olive) continue;
          connected[row * cols + col] = 1;
        }
        for (let row = targetRow + 1; row < rows; row++) {
          connected[row * cols + col] = 0;
        }
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (!connected[row * cols + col]) continue;
          const cell = grid[row * cols + col];
          if (!cell) continue;
          const darkness = 1 - cell.lum / 255;
          particles.push({
            originX: cell.x,
            originY: cell.y,
            x: cell.x,
            y: cell.y,
            vx: 0,
            vy: 0,
            size: 0.85 + Math.max(0.25, darkness) * 1.5,
          });
        }
      }
    };

    const draw = () => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = DOT_COLOR;

      for (const p of particles) {
        if (mouse.inside) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 0.001;

          if (dist < REPEL_RADIUS) {
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx += (p.originX - p.x) * SPRING;
        p.vy += (p.originY - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const toLocal = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onMove = (event: PointerEvent) => {
      mouse.inside = true;
      toLocal(event);
    };
    const onLeave = () => {
      mouse.inside = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    image.onload = () => {
      buildParticles();
      cancelAnimationFrame(raf);
      if (!isImageFallback) {
        raf = requestAnimationFrame(draw);
      }
    };

    const onResize = () => {
      if (!image.complete) return;
      buildParticles();
      cancelAnimationFrame(raf);
      if (!isImageFallback) {
        raf = requestAnimationFrame(draw);
      }
    };

    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerenter", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", onLeave);
    canvas.addEventListener("pointercancel", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerenter", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [src]);

  return (
    <div className="relative w-[200px] h-[260px] overflow-hidden rounded-2xl sm:w-[230px] sm:h-[300px] md:w-[250px] md:h-[320px]">
      <canvas
        ref={canvasRef}
        aria-label={alt}
        className="h-full w-full  touch-none"
      />
    </div>
  );
}
