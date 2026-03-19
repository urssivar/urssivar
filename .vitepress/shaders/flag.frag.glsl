precision mediump float;
varying vec2 vUV;
varying float vFold;
uniform sampler2D uTexture;
uniform float uTexAspect;
uniform float uCanvasAspect;

void main() {
  // Map UVs to texture space, preserving aspect ratio
  vec2 c = (vUV - 0.5) * vec2(1.2, 1.4) * 1.5;
  float rel = uTexAspect / uCanvasAspect;
  if (rel > 1.0) { c.y *= rel; } else { c.x /= rel; }
  vec2 texUV = c + 0.5;

  // Sample texture; discard fragments outside bounds
  if (texUV.x < 0.0 || texUV.x > 1.0 || texUV.y < 0.0 || texUV.y > 1.0) discard;
  vec4 tex = texture2D(uTexture, texUV);
  if (tex.a < 0.01) discard;

  vec3 color = tex.rgb;

  // Fold lighting
  color *= clamp(0.95 + vFold * 0.3, 0.6, 1.35);

  // Fabric weave with irregular threads and skips
  float row = floor(vUV.y * 300.0);
  float col = floor(vUV.x * 300.0);
  float h1 = fract(sin(row * 12.9898) * 43758.5453);
  float h2 = fract(sin(col * 78.233) * 23421.631);
  float sx = vUV.x * 300.0 + h1 * 0.4;
  float sy = vUV.y * 300.0 + h2 * 0.4;
  float warp = sin(sy * 3.14159 * (0.9 + h1 * 0.2)) * 0.5 + 0.5;
  float weft = sin(sx * 3.14159 * (0.9 + h2 * 0.2)) * 0.5 + 0.5;
  float pat = step(0.5, fract(sx * 0.5 + sy * 0.5));
  if (fract(sin(row * 127.1 + col * 311.7) * 43758.5453) < 0.15) pat = 1.0 - pat;
  color *= 0.96 + mix(warp, weft, pat) * 0.03 + ((h1 + h2) * 0.5 - 0.5) * 0.02;

  gl_FragColor = vec4(color, tex.a);
}
