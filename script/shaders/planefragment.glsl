// precision highp float;

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

uniform float colorR;
uniform float colorG;
uniform float colorB;
uniform float alpha;
uniform float progressPlane;
uniform float uTick;

varying vec2 vUv;
varying float updelay;
varying float downdelay;
varying float vN;

void main() {
 vec4 tex1 = texture2D(uTexture1, vUv);
 vec4 tex2 = texture2D(uTexture2, vUv);
 // float colorSin = sin(uTick * 0.02) * 0.5 + 0.5;
 // float colorCos = sin(uTick * 0.02) * 0.5 + 0.5;
 // float updelayColor = step(colorCos, updelay);
 // float downdelayColor = step(colorCos, downdelay);
 // gl_FragColor = vec4(progressPlane, colorG, colorB, alpha);
 vec4 color = mix(tex1, tex2, progressPlane);
 gl_FragColor = color;
}