precision mediump float;
varying vec2 vUV;
varying float vFold;
uniform sampler2D uTexture;
uniform float uTexAspect;
uniform float uCanvasAspect;
uniform vec2 uScale;

void main() {
  vec2 c = (vUV - 0.5) * uScale * 1.5;
  float rel = uTexAspect / uCanvasAspect;
  if (rel > 1.0) { c.y *= rel; } else { c.x /= rel; }
  vec2 texUV = c + 0.5;

  if (texUV.x < -0.01 || texUV.x > 1.01 || texUV.y < -0.01 || texUV.y > 1.01) discard;
  float edge = smoothstep(0.0, 0.005, texUV.x) * smoothstep(0.0, 0.005, texUV.y)
             * smoothstep(0.0, 0.005, 1.0 - texUV.x) * smoothstep(0.0, 0.005, 1.0 - texUV.y);

  vec4 tex = texture2D(uTexture, clamp(texUV, 0.0, 1.0));
  float a = tex.a * edge;
  if (a < 0.001) discard;

  vec3 color = tex.rgb;
  color *= clamp(0.95 + vFold * 0.3, 0.6, 1.35);

  // Fabric weave — sparse, irregular threads
  float rowBase = vUV.y * 150.0;
  float colBase = vUV.x * 150.0;
  float row = floor(rowBase);
  float col = floor(colBase);
  float h1 = fract(sin(row * 12.9898) * 43758.5453);
  float h2 = fract(sin(col * 78.233) * 23421.631);
  // Only show ~40% of threads — the rest are invisible
  float showRow = step(0.6, h1);
  float showCol = step(0.6, h2);
  float sx = colBase + h2 * 0.8 + sin(rowBase * 0.37) * 0.5;
  float sy = rowBase + h1 * 0.8 + sin(colBase * 0.41) * 0.5;
  float warp = sin(sy * 3.14159 * (0.6 + h1 * 0.6)) * 0.5 + 0.5;
  float weft = sin(sx * 3.14159 * (0.6 + h2 * 0.6)) * 0.5 + 0.5;
  float pat = step(0.5, fract(sx * 0.5 + sy * 0.5));
  if (fract(sin(row * 127.1 + col * 311.7) * 43758.5453) < 0.2) pat = 1.0 - pat;
  float weave = mix(warp * showRow, weft * showCol, pat);
  color *= 0.97 + weave * 0.03 + ((h1 + h2) * 0.5 - 0.5) * 0.015;

  gl_FragColor = vec4(color, a);
}
