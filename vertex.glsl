attribute float aDelay;
attribute vec3 helloGeome;
attribute vec3 planeGeome;
attribute vec3 helloPos;
varying float updelay;
varying float downdelay;
varying vec2 vUv;
varying float vN;
uniform float progress;
uniform float uTick;

#pragma glslify: snoise = require(glsl-noise/simplex/3d)

void main() {
 vUv = uv;
 vec3 pos = position;
 updelay = distance(vec2(0.0, 1.0), uv) / distance(vec2(0.0, 1.0), vec2(1.0, 0.0));
 float n = snoise(vec3(position.xy, uTick * 0.01)) * 0.5 + 0.5;
 float vN = n;

 // pos.z += progress * 100.0;
 // pos = mix(helloGeome, planeGeome, progress);

 // pos.x += progress * 10.0;
 pos.y += n * progress * 100.0;
 // pos.z += progress * 10.0;
 // pos.y += n;
 // pos.z += n;
 // downdelay = distance(vec2(0.0, 1.0), vec2(0.0, 1.0)) / distance(vec2(1.0, 0.0), uv) - distance(vec2(0.0, 1.0), vec2(0.0, 1.0));

 // vDelay = delay;
 // vUv.x = progress;
 gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}