/* Shared modeling helpers. The group may adjust its own feature files without editing this file. */
(function(global){'use strict';
global.LittleReef=global.LittleReef||{};
global.LittleReef.makeContext=function(THREE,reef){
const ink=new THREE.Color(0x17243a),bg=new THREE.Color(0xf5f5f0),blue=new THREE.Color(0x3195e0),orange=new THREE.Color(0xf89930),purple=new THREE.Color(0xa071e5),green=new THREE.Color(0x31a98b),yellow=new THREE.Color(0xe4bc55),red=new THREE.Color(0xe86c72);
const pale=bg.clone().lerp(yellow,.55),deep=ink.clone().lerp(blue,.3),coral=red.clone().lerp(orange,.2),teal=blue.clone().lerp(green,.5);
const renderer={capabilities:{getMaxAnisotropy:()=>2}};
let seed=37;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const materialCache=new Map();function mat(color,opts={}){const key=new THREE.Color(color).getHexString()+JSON.stringify(opts);if(!materialCache.has(key))materialCache.set(key,new THREE.MeshStandardMaterial({color,roughness:.64,...opts}));return materialCache.get(key);}
const sandMat=mat(pale),baseMat=mat(deep),coralMat=mat(coral),leafMat=mat(green),goldMat=mat(yellow,{metalness:.65,roughness:.3}),woodMat=mat(orange.clone().lerp(ink,.58));
function mesh(g,m,p,s,parent=reef){const o=new THREE.Mesh(g,m);if(p)o.position.set(...p);if(s)o.scale.set(...s);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
const sphereG=new THREE.SphereGeometry(1,16,10), boxG=new THREE.BoxGeometry(1,1,1);
function ball(p,s,m,parent=reef){return mesh(sphereG,m,p,s,parent);}
function box(p,s,m,parent=reef){return mesh(boxG,m,p,s,parent);}
function branch(a,b,r,m,parent=reef){const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),d=vb.clone().sub(va);const o=mesh(new THREE.CylinderGeometry(r*.73,r,d.length(),9),m,va.clone().add(vb).multiplyScalar(.5).toArray(),null,parent);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;}
function painted(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return t;}
function batchStatic(parent,skip=[]){
  parent.updateWorldMatrix(true,true);const inverse=parent.matrixWorld.clone().invert(),bins=new Map();
  function visit(o){if(skip.includes(o))return;if(o.isMesh&&!o.isInstancedMesh&&!Array.isArray(o.material)&&!o.material.transparent){let bin=bins.get(o.material);if(!bin){bin=[];bins.set(o.material,bin);}bin.push(o);}for(const child of o.children)visit(child);}
  for(const child of parent.children)visit(child);
  for(const [material,objects]of bins){if(objects.length<2)continue;const arrays={position:[],normal:[],uv:[],color:[]};let total=0;
    for(const o of objects){const g=(o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone());g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse,o.matrixWorld));const n=g.attributes.position.count;total+=n;for(const [key,size]of [['position',3],['normal',3],['uv',2],['color',3]]){const a=g.attributes[key];for(let i=0;i<n;i++)for(let j=0;j<size;j++)arrays[key].push(a?a.array[i*size+j]:(key==='color'?1:0));}g.dispose();}
    const geo=new THREE.BufferGeometry();for(const [key,size]of [['position',3],['normal',3],['uv',2],['color',3]])geo.setAttribute(key,new THREE.Float32BufferAttribute(arrays[key],size));geo.computeBoundingSphere();objects.forEach(o=>o.parent.remove(o));mesh(geo,material,null,null,parent);
  }
}

return {THREE,reef,ink,bg,blue,orange,purple,green,yellow,red,pale,deep,coral,teal,renderer,rnd,mat,sandMat,baseMat,coralMat,leafMat,goldMat,woodMat,mesh,sphereG,boxG,ball,box,branch,painted,batchStatic};};
global.LittleReef.dispose=function(group){const gs=new Set(),ms=new Set(),ts=new Set();group.traverse(o=>{if(o.geometry)gs.add(o.geometry);for(const m of(Array.isArray(o.material)?o.material:[o.material]))if(m){ms.add(m);for(const v of Object.values(m))if(v&&v.isTexture)ts.add(v);}});gs.forEach(g=>g.dispose());ts.forEach(t=>t.dispose());ms.forEach(m=>m.dispose());};
})(globalThis);
