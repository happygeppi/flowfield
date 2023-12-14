class FlowField {
  constructor(deltaTime) {
    this.deltaTime = deltaTime;
    this.time = 0;
    this.flipped = false;

    this.noise = [
      {
        dir: new PerlinNoise2D({ x: w, y: h }, dirFreq),
        mag: new PerlinNoise2D({ x: w, y: h }, magFreq),
      },
      {
        dir: new PerlinNoise2D({ x: w, y: h }, dirFreq),
        mag: new PerlinNoise2D({ x: w, y: h }, magFreq),
      },
    ];
  }

  at(x, y, v) {
    const dirs = [
      2 * Math.PI * this.noise[0].dir.eval(x, y),
      2 * Math.PI * this.noise[1].dir.eval(x, y),
    ];
    const mags = [
      v * this.noise[0].mag.eval(x, y),
      v * this.noise[1].mag.eval(x, y),
    ];

    const first = 1 * (this.time > 1);
    const dir = PerlinNoise2D.lerp(dirs[first], dirs[1 - first], this.time % 1);
    const mag = PerlinNoise2D.lerp(mags[first], mags[1 - first], this.time % 1);

    return { x: mag * Math.cos(dir), y: mag * Math.sin(dir) };
  }

  update() {
    this.time += this.deltaTime;

    if (!this.flipped && this.time >= 1) {
      this.noise[0] = {
        dir: new PerlinNoise2D({ x: w, y: h }, dirFreq),
        mag: new PerlinNoise2D({ x: w, y: h }, magFreq),
      };
      this.flipped = true;
    }
    
    if (this.time >= 2) {
      this.flipped = false;
      this.time = 0;
      this.noise[1] = {
        dir: new PerlinNoise2D({ x: w, y: h }, dirFreq),
        mag: new PerlinNoise2D({ x: w, y: h }, magFreq),
      };
    }
  }
}
