precision highp float;
varying vec2 vUV;
varying float vFold;
uniform sampler2D uTexture;
uniform float uTexAspect;
uniform float uCanvasAspect;
uniform vec2 uScale;

void main() {
  vec2 c = (vUV - 0.5) * uScale;
  float rel = uTexAspect / uCanvasAspect;
  if (rel > 1.0) { c.y *= rel; } else { c.x /= rel; }
  c.x *= 1.0 + 0.12 * c.y; // perspective — top narrows
  vec2 texUV = c + 0.5;

  // Unified pole + finial
  float poleX = 0.012;
  float poleDist = abs(texUV.x - poleX);
  float baseWidth = 0.0096;

  float finialCenter = 1.16;
  float finialHalf = 0.115;
  float finialY = clamp((texUV.y - finialCenter) / finialHalf, -1.0, 1.0);
  float finialInZone = step(finialCenter - finialHalf, texUV.y) * step(texUV.y, finialCenter + finialHalf);
  float widestAt = -0.4;
  float shape = 1.0 - abs(finialY - widestAt) / (finialY > widestAt ? (1.0 - widestAt) : (1.0 + widestAt));
  float finialExtra = 0.013 * clamp(shape, 0.0, 1.0) * finialInZone;

  float aboveCenter = step(finialCenter, texUV.y) * finialInZone;
  float taper = baseWidth * (1.0 - clamp((texUV.y - finialCenter) / finialHalf, 0.0, 1.0)) * aboveCenter;
  float w = mix(baseWidth, taper, aboveCenter) + finialExtra;
  float pole = smoothstep(w, w - 0.002, poleDist)
             * smoothstep(finialCenter + finialHalf, finialCenter + finialHalf - 0.002, texUV.y);

  // Texture
  float edge = smoothstep(0.0, 0.005, texUV.x) * smoothstep(0.0, 0.005, texUV.y)
             * smoothstep(0.0, 0.005, 1.0 - texUV.x) * smoothstep(0.0, 0.005, 1.0 - texUV.y);
  vec4 tex = texture2D(uTexture, clamp(texUV, 0.0, 1.0));
  float a = tex.a * edge;

  float totalAlpha = max(a, pole);
  if (totalAlpha < 0.001) discard;

  vec3 color = tex.rgb;
  color *= clamp(0.95 + vFold * 0.3, 0.6, 1.35);
  color *= 0.85 + 0.15 * smoothstep(0.0, 0.025, texUV.x); // wrap shadow
  color *= 1.0 + (fract(sin(dot(floor(vUV * 200.0), vec2(127.1, 311.7))) * 43758.5453) - 0.5) * 0.03; // grain

  // Pole — behind flag
  if (pole > 0.01 && a < 0.5) {
    float grad = clamp((texUV.x - poleX + w) / (2.0 * w), 0.0, 1.0);
    color = vec3(0.42, 0.40, 0.38) * (0.75 + 0.25 * grad);
  }

  gl_FragColor = vec4(color, totalAlpha);
}
