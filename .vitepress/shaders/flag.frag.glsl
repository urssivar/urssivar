precision highp float;
varying vec2 vUV;
varying float vFold;
uniform sampler2D uTexture;
uniform float uTexAspect;
uniform float uCanvasAspect;
uniform vec2 uScale;

void main() {
  // Scale UVs — adapt zoom to canvas aspect so texture stays visible on mobile
  float rel = uTexAspect / uCanvasAspect;
  float zoom = 1.5 / max(rel, 1.0);
  vec2 c = (vUV - 0.5) * uScale * zoom;
  if (rel > 1.0) { c.y *= rel; } else { c.x /= rel; }
  // Looking up perspective — top narrows, bottom widens
  float perspective = 0.15;
  float yNorm = c.y + 0.5;
  c.x *= 1.0 + perspective * (yNorm - 0.5);
  vec2 texUV = c + 0.5;

  if (texUV.x < -0.01 || texUV.x > 1.01 || texUV.y < -0.01 || texUV.y > 1.01) discard;
  float edge = smoothstep(0.0, 0.005, texUV.x) * smoothstep(0.0, 0.005, texUV.y)
             * smoothstep(0.0, 0.005, 1.0 - texUV.x) * smoothstep(0.0, 0.005, 1.0 - texUV.y);

  vec4 tex = texture2D(uTexture, clamp(texUV, 0.0, 1.0));
  float a = tex.a * edge;
  if (a < 0.001) discard;

  vec3 color = tex.rgb;
  color *= clamp(0.95 + vFold * 0.3, 0.6, 1.35);

  // Fabric grain — organic noise texture
  vec2 gp = vUV * 200.0;
  float g1 = fract(sin(dot(floor(gp), vec2(127.1, 311.7))) * 43758.5453);
  float g2 = fract(sin(dot(floor(gp * 0.7 + 3.1), vec2(269.5, 183.3))) * 43758.5453);
  float g3 = fract(sin(dot(floor(gp * 1.3 + 7.9), vec2(419.2, 371.9))) * 43758.5453);
  float grain = (g1 + g2 + g3) / 3.0 - 0.5;
  color *= 1.0 + grain * 0.06;

  gl_FragColor = vec4(color, a);
}
