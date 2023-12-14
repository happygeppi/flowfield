function CreateCanvas() {
  c = document.createElement("canvas");
  document.body.append(c);

  w = innerWidth;
  h = innerHeight;

  c.width = w;
  c.height = h;

  ctx = c.getContext("2d");
}

function Line(a, b) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.closePath();
}

function Circle(pos, rad, stroke = false) {
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, rad, 0, 2 * Math.PI);
  ctx.fill();
  if (stroke) ctx.stroke();
  ctx.closePath();
}

function Stroke(r, g, b) {
  ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
}

function StrokeA(r, g, b, a) {
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function StrokeWidth(sw) {
  ctx.lineWidth = sw;
}

function Fill(r, g, b) {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
}

function DrawVector(pos, vec, len) {
  const end = pos.copy().add(vec.copy().scale(len));
  const sw = ctx.lineWidth;
  StrokeWidth(sw);
  Line(pos, end);
  ctx.fillStyle = ctx.strokeStyle;
  Circle(end, 2 * sw);
}

function Background(r, g, b, a) {
  ctx.beginPath();
  ctx.rect(0, 0, w, h);
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  ctx.fill();
  ctx.closePath();
}
