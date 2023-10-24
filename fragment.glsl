// precision mediump float;

uniform float colorR;
uniform float colorG;
uniform float colorB;
uniform float alpha;
uniform float progress;
uniform float uTick;

varying vec2 vUv;
varying float updelay;
varying float downdelay;
varying float vN;

void main() {
 float colorSin = sin(uTick * 0.02) * 0.5 + 0.5;
 float colorCos = sin(uTick * 0.02) * 0.5 + 0.5;
 float updelayColor = step(colorCos, updelay);
 float downdelayColor = step(colorCos, downdelay);
 gl_FragColor = vec4(colorSin, colorG, colorB, alpha);
}