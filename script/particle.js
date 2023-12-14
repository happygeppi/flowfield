class Particle {
  constructor(lifetime, maxSpeed) {
    this.pos = this.randomPosition();
    this.vel = { x: 0, y: 0 };
    this.maxSpeed = maxSpeed;

    this.lifetime = lifetime;
    this.timeToLive = this.lifetime * (1 - Math.random());
  }

  randomPosition() {
    return { x: w * Math.random(), y: h * Math.random() };
  }

  update() {
    this.move();
    this.show();
    this.age();
  }

  age() {
    this.timeToLive--;
    if (this.timeToLive == 0) return this.respawn();
  }

  respawn() {
    this.timeToLive = this.lifetime;
    this.pos = this.randomPosition();
  }

  move() {
    this.edges();
    this.prev = { x: this.pos.x, y: this.pos.y };
    this.updateVel();
    this.pos.add(this.vel);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > w || this.pos.y < 0 || this.pos.y > h)
      this.respawn();
  }

  updateVel() {
    this.vel = field.at(this.pos.x, this.pos.y, this.maxSpeed);
  }

  show() {
    const a =fadeInOut - Math.abs(2 * fadeInOut * this.timeToLive / this.lifetime - fadeInOut);
    StrokeA(R, G, B, a);
    Line(this.pos, this.prev);
  }
}
