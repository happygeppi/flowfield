let c, ctx, w, h, updater;
let particles = [];
let field;

let N = 4000;
let alpha = 0.02;
let lifetime = 50;
let maxSpeed = 8;
let deltaTime = 0.001;

let dirFreq = 300;
let magFreq = 500;

const fadeInOut = 2;
const colorDelta = 2;
let R = Math.random() * 255;
let G = Math.random() * 255;
let B = Math.random() * 255;

function Init() {
  InitConstants();
  CreateCanvas();
  CreateParticles();
  InitFlowField();
  Background(0, 0, 0, 1);
  Update();
}

function InitConstants() {
  const url = window.location.href.split("?");
  if (url.length == 1) return;

  const vals = url[1].split(";");

  for (const val of vals) {
    let [varName, value] = val.split("=");
    value = parseInt(value);

    if (varName == "n" || varName == "N") N = value;
    if (varName == "alpha" || varName == "a") alpha = value;
    if (varName == "lifetime" || varName == "t") lifetime = value;
    if (varName == "maxSpeed" || varName == "v") maxSpeed = value;
    if (varName == "deltaTime" || varName == "dt") deltaTime = value;
    if (varName == "dirFreq" || varName == "dir") dirFreq = value;
    if (varName == "magFreq" || varName == "mag") magFreq = value;
  }
}

function CreateParticles() {
  for (let i = 0; i < N; i++) particles.push(new Particle(lifetime, maxSpeed));
}

function InitFlowField() {
  field = new FlowField(deltaTime);
}

function Update() {
  Background(0, 0, 0, alpha);
  field.update();
  for (const particle of particles) particle.update();
  UpdateColor();
  updater = requestAnimationFrame(Update);
}

function UpdateColor() {
  R += Math.random() * 2 * colorDelta - colorDelta;
  G += Math.random() * 2 * colorDelta - colorDelta;
  B += Math.random() * 2 * colorDelta - colorDelta;

  if (R < 0) R = 0;
  if (R > 255) R = 255;
  if (G < 0) G = 0;
  if (G > 255) G = 255;
  if (B < 0) B = 0;
  if (B > 255) B = 255;
}

function Interpolate(v1, v2, t) {
  return {
    x: v1.x * (1 - t) + v2.x * t,
    y: v1.y * (1 - t) + v2.y * t,
  };
}

document.addEventListener("DOMContentLoaded", Init);
document.addEventListener("keypress", (e) => {
  if (e.key == "x") cancelAnimationFrame(updater);
  if (e.key == "y") Update();
});

Object.prototype.add = function (vec) {
  this.x += vec.x;
  this.y += vec.y;
  return this;
};

Object.prototype.scale = function (len) {
  const dir = Math.atan2(this.y, this.x);
  this.x = len * Math.cos(dir);
  this.y = len * Math.sin(dir);
  return this;
};

Object.prototype.copy = function () {
  return { x: this.x, y: this.y };
};
