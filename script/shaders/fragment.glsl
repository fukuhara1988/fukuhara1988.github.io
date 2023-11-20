// precision mediump float;

uniform float colorR;
uniform float colorG;
uniform float colorB;
uniform float alpha;
uniform float progressText;
uniform float uTick;
// uniform vec3 lightDirection;
uniform float shininess;
uniform vec3 specularColor;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec4 ambientLight;
uniform vec3 viewPosition;

varying vec2 vUv;
varying float updelay;
varying float downdelay;
varying float vN;
varying vec3 vPosition;
varying vec3 vViewPosition;
varying vec3 vNormal;

void main() {

 //＜光源の設定＞
 //ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

//各光源の共通設定
 vec3 normal = normalize(vNormal);//normalize()によって正規化している
 // vec3 normal = normalize(normalMatrix * normal);
 // vec3 fNormal = normalize(normalMatrix * normal);

 //[平行光源の設定]

 vec3 lightDirection = normalize(lightPosition - vPosition);//頂点から光源への方向ベクトルを算出し正規化している
 // vec3 lightDirection = normalize(lightPosition);//頂点から光源への方向ベクトルを算出し正規化している
 // vec3 lightDirection = lightPosition;//頂点から光源への方向ベクトルを算出し正規化している
 // vec3 lightDirection = normalize(lightPosition - vViewPosition);//頂点から光源への方向ベクトルを算出し正規化している

 // vec3 view = normalize(viewPosition);
 // vec3 halfLV = normalize(lightDirection + view);
 // float specular = pow(clamp(dot(normal, halfLV), 0.0, 1.0), 50.0);
 // float intensity = clamp(dot(fNormal, lightDirection), 0.0, 1.0);
 float intensity = max(dot(normal, lightDirection), 0.0);
 // float intensity = max(0.0, dot(lightDirection, fNormal));
 vec3 diffuse = lightColor * intensity;
 // vec3 diffuse = lightColor;
 // vec3 finalColor = diffuse;
 vec3 color3 = vec3(colorR, colorG, colorB) * diffuse;
 // vec3 color3 = vec3(colorR, colorG, colorB);
 //ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

 // float colorSin = sin(uTick * 0.02) * 0.5 + 0.5;
 // float colorCos = sin(uTick * 0.02) * 0.5 + 0.5;
 // float updelayColor = step(colorCos, updelay);
 // float downdelayColor = step(colorCos, downdelay);
 // gl_FragColor = vec4(normal, 1.0, 1.0, 1.0);
 gl_FragColor = vec4(color3, 1.0);
 // gl_FragColor = vec4(finalColor, 1.0);
 // gl_FragColor = vec4(vec3(1.0, 1.0, 1.0) * intensity + specular, 1.0);
 // gl_FragColor = vec4(lightDirection * 0.5 + 0.5, 1.0);
 // gl_FragColor = vec4(normal * 0.5 + 0.5, 1.0);
}