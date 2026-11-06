/* Owner: VidumuniTharika — new custom tap-to-grow interaction and chest appearance. */
(function(){'use strict';LittleReef.createTreasure=function(THREE){const group=new THREE.Group();
const {reef,ink,bg,blue,orange,purple,green,yellow,red,pale,deep,coral,teal,renderer,rnd,mat,sandMat,baseMat,coralMat,leafMat,goldMat,woodMat,mesh,sphereG,boxG,ball,box,branch,painted,batchStatic}=LittleReef.makeContext(THREE,group);
// Treasure chest with planks, gold straps, feet and a rounded lid.
const chest=new THREE.Group();chest.position.set(1.05,.06,.72);chest.rotation.y=-.22;reef.add(chest);box([0,.22,0],[.85,.44,.58],woodMat,chest);
for(let i=0;i<5;i++){box([-.34+i*.17,.23,.299],[.012,.39,.012],mat(ink.clone().lerp(orange,.22)),chest);}
for(const x of [-.29,.29]){box([x,.22,.01],[.063,.46,.61],goldMat,chest);box([x,.02,0],[.1,.08,.66],goldMat,chest);}
const lid=new THREE.Group();lid.position.set(0,.45,0);chest.add(lid);const arc=new THREE.Shape();arc.moveTo(-.3,0);arc.absarc(0,0,.3,Math.PI,0,true);arc.lineTo(-.3,0);const lidG=new THREE.ExtrudeGeometry(arc,{depth:.86,bevelEnabled:false,curveSegments:16});const lidMesh=mesh(lidG,woodMat,[.43,0,0],null,lid);lidMesh.rotation.y=-Math.PI/2;
for(const x of [-.29,.29]){const band=mesh(new THREE.TorusGeometry(.306,.027,6,24,Math.PI),goldMat,[x,0,0],null,lid);band.rotation.y=Math.PI/2;}
box([0,.4,.325],[.14,.17,.045],goldMat,chest);ball([0,.4,.354],[.022,.032,.012],mat(deep),chest);
const woodPaint=painted(256,256,(c,w,h)=>{
  c.fillStyle=orange.clone().lerp(ink,.54).getStyle();c.fillRect(0,0,w,h);
  for(let i=0;i<6;i++){c.fillStyle=orange.clone().lerp(ink,.48+i%3*.045).getStyle();c.fillRect(i*w/6+2,0,w/6-3,h);}
  c.strokeStyle=ink.getStyle();c.globalAlpha=.28;c.lineWidth=1;
  for(let i=0;i<85;i++){const x=rnd()*w;c.beginPath();c.moveTo(x,0);for(let y=0;y<=h;y+=12)c.lineTo(x+Math.sin(y*.04+i)*2+Math.sin(y*.09+i)*.7,y);c.stroke();}
  for(const [x,y] of [[32,65],[140,175],[209,100]]){for(let r=2;r<13;r+=3){c.beginPath();c.ellipse(x,y,r*.45,r,0,0,Math.PI*2);c.stroke();}}
  c.globalAlpha=.55;c.lineWidth=2;for(let i=1;i<6;i++){c.beginPath();c.moveTo(i*w/6,0);c.lineTo(i*w/6,h);c.stroke();}c.globalAlpha=1;
});woodMat.map=woodPaint;woodMat.color.copy(bg);woodMat.roughness=.87;woodMat.needsUpdate=true;
const metalPaint=painted(128,128,(c,w,h)=>{c.fillStyle=yellow.getStyle();c.fillRect(0,0,w,h);c.strokeStyle=bg.getStyle();c.globalAlpha=.16;c.lineWidth=1;for(let i=0;i<80;i++){const x=rnd()*w,y=rnd()*h;c.beginPath();c.moveTo(x,y);c.lineTo(x+5+rnd()*15,y-1);c.stroke();}c.fillStyle=ink.getStyle();c.globalAlpha=.12;for(let i=0;i<60;i++)c.fillRect(rnd()*w,rnd()*h,1+rnd()*2,1);c.globalAlpha=1;});goldMat.map=metalPaint;goldMat.color.copy(bg);goldMat.metalness=.4;goldMat.roughness=.43;goldMat.needsUpdate=true;
// Chest rivets, corner protectors and rear hinges share their materials.
for(const x of [-.29,.29])for(const y of [.09,.23,.36])for(const z of [-.312,.312])ball([x,y,z],[.018,.018,.009],goldMat,chest);
for(const x of [-.405,.405])for(const z of [-.275,.275]){box([x,.08,z],[.075,.14,.075],goldMat,chest);}
for(const x of [-.26,.26]){const hinge=mesh(new THREE.CylinderGeometry(.025,.025,.14,8),goldMat,[x,.46,-.31],null,chest);hinge.rotation.z=Math.PI/2;}
batchStatic(chest);let grown=false;const target=new THREE.Vector3(1,1,1);
return {group,toggle(){grown=!grown;return grown;},update(dt){chest.scale.lerp(target.setScalar(grown?1.38:1),1-Math.exp(-Math.min(dt,.05)*9));}};};
AFRAME.registerComponent('reef-treasure',{init(){this.feature=LittleReef.createTreasure(AFRAME.THREE);this.el.setObject3D('mesh',this.feature.group);this.onClick=()=>{const grown=this.feature.toggle();this.el.sceneEl.emit('reef-action',{message:grown?'Treasure chest enlarged':'Treasure chest restored'});};this.el.addEventListener('click',this.onClick);},tick(time,dt){this.feature.update(dt/1000);},remove(){this.el.removeEventListener('click',this.onClick);LittleReef.dispose(this.feature.group);this.el.removeObject3D('mesh');}});
})();
