attribute float aDelay;
attribute float vertexrandam;
attribute vec3 sphere;
attribute vec3 plane;
// attribute vec3 scale;
// attribute vec3 normal;   // 法線ベクトル

varying float updelay;
varying float downdelay;
varying vec2 vUv;
varying float vN;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;
uniform float progressText;
uniform float uTick;
uniform float uScale;

#pragma glslify: snoise = require(glsl-noise/simplex/3d);

void main() {
 vUv = uv;
 vec3 pos = position;
 vec3 vPosition = pos;
 // vec3 vPosition = position;

//normalMatrix → 法線(normal)に逆転置行列をかけるもの
 // vNormal = normal;//回転行列の逆行列を求め、それに転置をかけることで、法線(normal)の回転の影響を元に戻す。
 vNormal = normalMatrix * normal;//回転行列の逆行列を求め、それに転置をかけることで、法線(normal)の回転の影響を元に戻す。
 // vNormal = normalize(normalMatrix * normal);//回転行列の逆行列を求め、それに転置をかけることで、法線(normal)の回転の影響を元に戻す。

 // vViewPosition = -mvPosition.xyz;
 // scale += pos * progressText;
 // pos = mix(plane, sphere, progressText);
 // updelay = distance(vec2(0.0, 1.0), uv) / distance(vec2(0.0, 1.0), vec2(1.0, 0.0));
 // float n = snoise(vec3(position.xy, uTick * 0.01)) * 0.5 + 0.5;
 // float vN = n;

 // pos.z += n * progressText * vertexrandam;
 // pos = mix(helloGeome, planeGeome, progressText);

 // pos.x += progress * 10.0;
 // pos.y += n * progressText * vertexrandam;
 // pos.z += progress * 10.0;
 // pos.y += n;
 // pos.z += progressText * n;
 // downdelay = distance(vec2(0.0, 1.0), vec2(0.0, 1.0)) / distance(vec2(1.0, 0.0), uv) - distance(vec2(0.0, 1.0), vec2(0.0, 1.0));

 // vDelay = delay;
 // vUv.x = progress;
 // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
 // modelPosition.x *= progressText * 2.0;
 // modelPosition.y *= progressText * 2.0;
 // modelPosition.z *= progressText * 2.0;
 // vec4 viewPosition = viewMatrix * modelPosition;
 // vec4 projectionPosition = projectionMatrix * viewPosition;

 // gl_Position = projectionPosition;
 gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
 // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}