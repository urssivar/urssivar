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
  // Looking up perspective — top narrows, bottom widens
  float perspective = 0.15;
  float yNorm = c.y + 0.5;
  c.x *= 1.0 + perspective * (yNorm - 0.5);
  vec2 texUV = c + 0.5;

  // Rope along hoist — centered on texture edge so flag wraps around it
  float ropeCenter = 0.01;
  float ropeDist = abs(texUV.x - ropeCenter);
  float ropeWidth = 0.008;
  float rope = smoothstep(ropeWidth, ropeWidth * 0.3, ropeDist);
  vec3 ropeColor = vec3(0.0);
  if (rope > 0.01) {
    ropeColor = vec3(0.35, 0.28, 0.18);
    // Spiral wrap — angle shifts with distance from center like a cylinder
    float angle = atan(texUV.x - ropeCenter, ropeWidth * 0.5);
    float spiral = fract(texUV.y * 20.0 + angle * 0.5);
    float twist = smoothstep(0.3, 0.7, spiral) * 0.15;
    // Rounded cross-section
    float roundness = 1.0 - (ropeDist / ropeWidth) * (ropeDist / ropeWidth);
    ropeColor *= 0.72 + roundness * 0.35 + twist;
  }

  // Texture with soft edges
  float edge = smoothstep(0.0, 0.005, texUV.x) * smoothstep(0.0, 0.005, texUV.y)
             * smoothstep(0.0, 0.005, 1.0 - texUV.x) * smoothstep(0.0, 0.005, 1.0 - texUV.y);
  vec4 tex = texture2D(uTexture, clamp(texUV, 0.0, 1.0));
  float a = tex.a * edge;

  // Combine: either flag or rope or both
  float totalAlpha = max(a, rope);
  if (totalAlpha < 0.001) discard;

  vec3 color = tex.rgb;
  color *= clamp(0.95 + vFold * 0.3, 0.6, 1.35);

  // Fabric grain
  vec2 gp = vUV * 200.0;
  float g1 = fract(sin(dot(floor(gp), vec2(127.1, 311.7))) * 43758.5453);
  float g2 = fract(sin(dot(floor(gp * 0.7 + 3.1), vec2(269.5, 183.3))) * 43758.5453);
  float g3 = fract(sin(dot(floor(gp * 1.3 + 7.9), vec2(419.2, 371.9))) * 43758.5453);
  float grain = (g1 + g2 + g3) / 3.0 - 0.5;
  color *= 1.0 + grain * 0.06;

  // Composite: rope behind flag where flag is opaque, visible where flag is transparent
  if (rope > 0.01) {
    if (a > 0.5) {
      // Flag is opaque — rope peeks through subtly as a shadow/indent
      color = mix(color, ropeColor * 0.7, rope * 0.3);
    } else {
      // Flag is transparent — rope fully visible
      color = mix(color, ropeColor, rope);
    }
  }

  gl_FragColor = vec4(color, totalAlpha);
}
