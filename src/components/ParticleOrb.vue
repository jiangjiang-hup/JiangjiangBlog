<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({ paused: Boolean });
let canvas,
  context,
  observer,
  frame = 0,
  width = 0,
  height = 0,
  rotation = 0;
let visible = true;
const pointer = { x: 0, y: 0 };
const dots = Array.from({ length: 1100 }, (_, i) => {
  const y = 1 - (i / 1099) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(theta) * radius, y, Math.sin(theta) * radius];
});

function draw() {
  if (!context || !width) return;
  context.clearRect(0, 0, width, height);
  const radius = Math.min(width, height) * 0.32;
  const cx = width / 2,
    cy = height / 2;
  const angle = rotation + pointer.x * 0.22;
  const tilt = -0.3 + pointer.y * 0.15;
  const glow = context.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.45);
  glow.addColorStop(0, "rgba(130,180,60,.07)");
  glow.addColorStop(1, "rgba(130,180,60,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
  for (let ring = 0; ring < 3; ring++) {
    context.beginPath();
    context.ellipse(
      cx,
      cy,
      radius * (1.35 + ring * 0.1),
      radius * 0.4,
      -0.45 + ring * 0.65,
      0,
      Math.PI * 2,
    );
    context.strokeStyle = `rgba(196,245,104,${0.14 - ring * 0.025})`;
    context.lineWidth = 0.7;
    context.stroke();
  }
  const projected = dots
    .map(([x, y, z]) => {
      const rx = x * Math.cos(angle) - z * Math.sin(angle);
      const rz = x * Math.sin(angle) + z * Math.cos(angle);
      const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
      const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
      const scale = 2.7 / (2.7 - depth * 0.35);
      return {
        x: cx + rx * radius * scale,
        y: cy + ry * radius * scale,
        depth,
      };
    })
    .sort((a, b) => a.depth - b.depth);
  for (const dot of projected) {
    const light = (dot.depth + 1) / 2;
    context.beginPath();
    context.arc(dot.x, dot.y, 0.65 + light * 1.15, 0, Math.PI * 2);
    context.fillStyle = `rgba(${Math.round(125 + light * 71)},${Math.round(175 + light * 70)},${Math.round(80 + light * 24)},${0.15 + light * 0.8})`;
    context.fill();
  }
}
let previous = 0;
function animate(time) {
  if (time - previous > 30) {
    rotation += 0.003;
    draw();
    previous = time;
  }
  frame = requestAnimationFrame(animate);
}
function syncAnimation() {
  cancelAnimationFrame(frame);
  if (!props.paused && visible && !document.hidden)
    frame = requestAnimationFrame(animate);
  else draw();
}
function resize() {
  const box = canvas.getBoundingClientRect();
  width = box.width;
  height = box.height;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw();
}
function move(event) {
  if (props.paused) return;
  const box = canvas.getBoundingClientRect();
  pointer.x = (event.clientX - box.left) / width - 0.5;
  pointer.y = (event.clientY - box.top) / height - 0.5;
}
function setCanvas(el) {
  canvas = el;
}
watch(() => props.paused, syncAnimation);
onMounted(() => {
  context = canvas.getContext("2d");
  if (!context) return;
  resize();
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncAnimation();
  });
  observer.observe(canvas);
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", syncAnimation);
  syncAnimation();
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
  window.removeEventListener("resize", resize);
  document.removeEventListener("visibilitychange", syncAnimation);
});
</script>

<template>
  <canvas
    :ref="setCanvas"
    class="particle-canvas"
    aria-hidden="true"
    @pointermove="move"
  />
</template>
