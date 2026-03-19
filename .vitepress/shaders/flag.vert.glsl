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

float displace(vec2 uv, float t) {
  float windPhase = uv.x * 2.9 + uv.y * 0.8 - t * 1.1;
  float gust = 0.85 + 0.15 * sin(t * 0.5);

  // All layers use the same windPhase — just at different frequencies
  // Warp is shared and subtle, keeping folds aligned
  float warp = snoise(vec2(uv.x * 1.2 + t * 0.1, uv.y * 0.8)) * 0.4;

  float big = sin(windPhase + warp) + 0.5 * sin(windPhase * 2.3 + warp + 1.0);
  float med = sin(windPhase * 3.5 + warp * 1.5) + 0.4 * sin(windPhase * 5.1 + warp * 1.5 + 2.0);
  float small = sin(windPhase * 8.0 + warp * 2.0);

  float texLeft = 0.5 - 1.0 / (1.2 * 1.5 * 2.0);
  float hoist = smoothstep(texLeft - 0.05, texLeft + 0.2, uv.x);
  return (big * 0.03 + med * 0.045 + small * 0.018) * gust * hoist;
}

void main() {
  vUV = uv;
  float t = uTime;
  float d = displace(uv, t);

  float eps = 0.015;
  vFold = (displace(uv + vec2(eps, 0.0), t) - displace(uv - vec2(eps, 0.0), t)) / (2.0 * eps);

  vec3 pos = position;
  pos.y += d;
  pos.x *= 1.2;
  pos.y *= 1.6;

  float a = 0.09;
  vec2 r = vec2(pos.x * cos(a) - pos.y * sin(a), pos.x * sin(a) + pos.y * cos(a));

  gl_Position = vec4(r, 0.0, 1.0);
}
