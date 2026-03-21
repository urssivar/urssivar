uniform float uTime;
varying vec2 vUV;
varying float vFold;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vUV = uv;
  float t = uTime;

  float gust = 0.95 + 0.05 * sin(t * 0.41);
  float tWarp = t * 1.1 + 0.12 * sin(t * 0.31) + 0.08 * sin(t * 0.97 + 2.0);
  float windPhase = uv.x * 2.9 + uv.y * 1.06 - tWarp;
  float warp = snoise(vec2(uv.x * 1.2 + t * 0.1, uv.y * 0.8)) * 0.4;

  float big = sin(windPhase + warp) + 0.5 * sin(windPhase * 2.3 + warp + 1.0);
  float med = sin(windPhase * 3.5 + warp * 1.5) + 0.4 * sin(windPhase * 5.1 + warp * 1.5 + 2.0);
  float small = sin(windPhase * 8.0 + warp * 2.0);

  // Hoist threshold follows pole's UV-space position across perspective skew
  // Pole at uv.x ≈ 0.288 (bottom) to 0.378 (top), i.e. 0.333 + 0.09*(uv.y-0.5)
  float hoistEdge = 0.355 + 0.09 * (uv.y - 0.5);
  float hoist = smoothstep(hoistEdge, hoistEdge + 0.13, uv.x);

  float d = (big * 0.03 + med * 0.045 + small * 0.018) * gust * hoist;

  // Analytical fold derivative (pre-computed coefficients, 2.5x for shimmer)
  vFold = (cos(windPhase + warp) * 0.2175        // 2.9 * 0.03 * 2.5
         + cos(windPhase * 2.3 + warp + 1.0) * 0.08625  // 2.3 * 0.5 * 0.03 * 2.5
         + cos(windPhase * 3.5 + warp * 1.5) * 0.39375  // 3.5 * 0.045 * 2.5
         + cos(windPhase * 5.1 + warp * 1.5 + 2.0) * 0.2295  // 5.1 * 0.4 * 0.045 * 2.5
         + cos(windPhase * 8.0 + warp * 2.0) * 0.36     // 8.0 * 0.018 * 2.5
         ) * gust * hoist;

  vec3 pos = position;
  pos.y += d;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
