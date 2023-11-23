precision highp float;

attribute float aDelay;
attribute float vertexrandam;
attribute vec3 helloPos;
attribute vec3 sphere;
attribute vec3 plane;
varying float updelay;
varying float downdelay;
varying vec2 vUv;
varying float vN;
uniform float progressPlane;
uniform float uTick;

//#pragma glslify: snoise = require(glsl-noise/simplex/3d);

void main() {

 vUv = uv;

 float delay = distance(vec2(0.0, 1.0), uv) / distance(vec2(0.0, 1.0), vec2(1.0, 0.0));

 // float n = snoise(vec3(position.xy, uTick * 0.01)) * 0.5 + 0.5;
 // float progress = 1.0 - abs(2.0 * progressPlane - 1.0);

 vec3 pos = position;
 // pos.z += progress * vertexrandam;
 // pos.x += progressPlane * vertexrandam;
 // pos.y += progressPlane * vertexrandam;
 // pos.z += progress * vertexrandam * 200.0 * n;
 // pos.z += progress * 2000.0 * n;
 // pos.x += progress * 2000.0 * n;

 // pos = mix(plane, sphere, progressPlane);

 vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
 gl_PointSize = 1.0 * (3000.0 / -mvPosition.z);
 gl_Position = projectionMatrix * mvPosition;

 // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
