class PerlinNoise2D {
  constructor(size, freq, mag) {
    this.size = size || { x: 1, y: 1 };
    this.freq = freq || 0.1; // space between vectors
    this.mag = mag || 1; // length of vectors
    this.minVal = (-this.mag * this.freq) / 2;
    this.maxVal = (this.mag * this.freq) / 2;
    this.init();
  }

  init() {
    this.vectors = [];
    let j = 0;
    for (let y = 0; y <= this.size.y + this.freq; y += this.freq) {
      this.vectors.push([]);
      let i = 0;
      for (let x = 0; x <= this.size.x + this.freq; x += this.freq) {
        const dir = Math.random() * Math.PI * 2;
        const mag = this.mag;
        const vec = { x: mag * Math.cos(dir), y: mag * Math.sin(dir) };
        this.vectors[j].push(vec);
        i++;
      }
      j++;
    }
  }

  eval(x, y) {
    // index top left point
    const i = Math.floor(x / this.freq);
    const j = Math.floor(y / this.freq);

    // positions of outer points (4 corners)
    const p0 = { x: (i + 0) * this.freq, y: (j + 0) * this.freq };
    const p1 = { x: (i + 1) * this.freq, y: (j + 0) * this.freq };
    const p2 = { x: (i + 0) * this.freq, y: (j + 1) * this.freq };
    const p3 = { x: (i + 1) * this.freq, y: (j + 1) * this.freq };

    // vectors at outer points
    const v0 = this.vectors[j + 0][i + 0];
    const v1 = this.vectors[j + 0][i + 1];
    const v2 = this.vectors[j + 1][i + 0];
    const v3 = this.vectors[j + 1][i + 1];

    // difference vectors between x,y and corners
    const g0 = { x: x - p0.x, y: y - p0.y };
    const g1 = { x: x - p1.x, y: y - p1.y };
    const g2 = { x: x - p2.x, y: y - p2.y };
    const g3 = { x: x - p3.x, y: y - p3.y };

    // dot product vector & differenceVector
    const d0 = v0.x * g0.x + v0.y * g0.y;
    const d1 = v1.x * g1.x + v1.y * g1.y;
    const d2 = v2.x * g2.x + v2.y * g2.y;
    const d3 = v3.x * g3.x + v3.y * g3.y;

    const fracX = (x - p0.x) / this.freq;
    const fracY = (y - p0.y) / this.freq;

    const temp0 = PerlinNoise2D.interpolate(d0, d1, fracX);
    const temp1 = PerlinNoise2D.interpolate(d2, d3, fracX);

    const rawVal = PerlinNoise2D.interpolate(temp0, temp1, fracY);
    const normVal = this.normalize(rawVal);

    return normVal;
  }

  static interpolate(a, b, t) {
    return a + (b - a) * PerlinNoise2D.smoothstep(t);
  }

  static lerp(a, b, t) {
    return a + t * (b - a);
  }

  static smoothstep(x) {
    return 3 * x ** 2 - 2 * x ** 3;
  }

  normalize(val) {
    return (val - this.minVal) / (this.maxVal - this.minVal);
  }
}
