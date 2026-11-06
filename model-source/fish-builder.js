/* Model source for SanukWanniarachchi. Original AI-assisted procedural geometry; review and document your own modifications. */
(function(global){'use strict';global.LittleReef=global.LittleReef||{};
LittleReef.createFishModel=function(THREE){const group=new THREE.Group();
const {reef,ink,bg,blue,orange,purple,green,yellow,red,pale,deep,coral,teal,renderer,rnd,mat,sandMat,baseMat,coralMat,leafMat,goldMat,woodMat,mesh,sphereG,boxG,ball,box,branch,painted,batchStatic}=LittleReef.makeContext(THREE,group);
// Original procedural clownfish: striped body, fins, tail, eyes and mouth.
const fish=new THREE.Group();reef.add(fish);const bodyG=new THREE.SphereGeometry(1,32,20),pos=bodyG.attributes.position,colors=[];
for(let i=0;i<pos.count;i++){const x=pos.getX(i);const stripe=Math.abs(x+.4)<.105||Math.abs(x-.23)<.115||Math.abs(x-.72)<.08;const edge=Math.abs(Math.abs(x+.4)-.105)<.025||Math.abs(Math.abs(x-.23)-.115)<.025;const c=stripe?pale:edge?deep:orange;colors.push(c.r,c.g,c.b);}bodyG.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));mesh(bodyG,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.38}),[0,0,0],[.56,.3,.195],fish);
const finMat=mat(orange,{side:THREE.DoubleSide}),finDark=mat(deep,{side:THREE.DoubleSide});
function fin(points,material,parent){const sh=new THREE.Shape();sh.moveTo(...points[0]);points.slice(1).forEach(p=>sh.lineTo(...p));sh.closePath();return mesh(new THREE.ExtrudeGeometry(sh,{depth:.035,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.012,bevelThickness:.01}),material,null,null,parent);}
const tail=new THREE.Group();tail.position.x=-.49;fish.add(tail);fin([[0,0],[-.35,.24],[-.4,-.22]],finDark,tail);const innerTail=fin([[-.045,0],[-.32,.18],[-.35,-.17]],finMat,tail);innerTail.position.z=.035;
fin([[-.25,.2],[-.14,.43],[.11,.4],[.28,.21]],finMat,fish);fin([[-.18,-.22],[-.12,-.37],[.19,-.23]],finMat,fish);
const sideFins=[];for(const side of [-1,1]){const f=ball([-.06,-.07,side*.19],[.17,.07,.022],finMat,fish);f.rotation.z=-.45;sideFins.push(f);ball([.35,.09,side*.145],[.083,.09,.045],mat(pale),fish);ball([.374,.092,side*.184],[.042,.05,.016],mat(deep),fish);ball([.389,.114,side*.197],[.013,.016,.006],mat(bg),fish);}
const mouth=mesh(new THREE.TorusGeometry(.042,.012,8,24),mat(deep),[.53,-.035,0],null,fish);mouth.rotation.y=Math.PI/2;
fish.position.set(0,0,0);
const fishPaint=painted(512,256,(c,w,h)=>{
  const image=c.createImageData(w,h),rgb={};
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const v=y/h,u=x/w,px=-Math.cos(u*Math.PI*2)*Math.sin(v*Math.PI);
    const bands=[[-.4,.105],[.23,.115],[.72,.08]];
    const stripe=bands.some(([a,b])=>Math.abs(px-a)<b),border=bands.some(([a,b])=>Math.abs(px-a)<b+.035);
    const color=(stripe?bg.clone().lerp(yellow,.08):border?deep:orange.clone().lerp(red,.15*(1-v))).clone();
    color.multiplyScalar(.83+.17*Math.sin(v*Math.PI));color.getRGB(rgb,THREE.SRGBColorSpace);
    const k=(y*w+x)*4;image.data[k]=rgb.r*255;image.data[k+1]=rgb.g*255;image.data[k+2]=rgb.b*255;image.data[k+3]=255;
  }c.putImageData(image,0,0);
  c.strokeStyle=deep.getStyle();c.globalAlpha=.14;c.lineWidth=.8;
  for(let y=32;y<230;y+=10)for(let x=(y/10%2)*6;x<w;x+=13){c.beginPath();c.arc(x,y,6,.13,Math.PI-.13);c.stroke();}
  c.globalAlpha=.11;c.strokeStyle=bg.getStyle();c.lineWidth=1;
  for(let y=36;y<225;y+=10)for(let x=(y/10%2)*6;x<w;x+=13){c.beginPath();c.arc(x,y-1,6,.13,Math.PI-.13);c.stroke();}c.globalAlpha=1;
});
const fishBody=fish.children.find(o=>o.isMesh&&o.geometry===bodyG);fishBody.material.vertexColors=false;fishBody.material.map=fishPaint;fishBody.material.needsUpdate=true;
const finPaint=painted(128,128,(c,w,h)=>{const gradient=c.createLinearGradient(0,0,w,h);gradient.addColorStop(0,orange.getStyle());gradient.addColorStop(.75,orange.clone().lerp(red,.35).getStyle());gradient.addColorStop(1,deep.getStyle());c.fillStyle=gradient;c.fillRect(0,0,w,h);c.strokeStyle=deep.getStyle();c.globalAlpha=.4;c.lineWidth=1.5;for(let i=-10;i<150;i+=11){c.beginPath();c.moveTo(0,0);c.lineTo(i,h);c.stroke();}c.globalAlpha=1;});finMat.map=finPaint;finMat.needsUpdate=true;
// Gill grooves and a small iris use a few line segments, not separate scale meshes.
const gillPoints=[];for(const side of [-1,1])for(let j=0;j<2;j++)for(let k=0;k<10;k++){for(const t of [k/10,(k+1)/10]){const a=-1.05+t*2.1;gillPoints.push(.19+j*.035+.055*Math.cos(a),.15*Math.sin(a),side*.18);}}
const gillGeo=new THREE.BufferGeometry();gillGeo.setAttribute('position',new THREE.Float32BufferAttribute(gillPoints,3));fish.add(new THREE.LineSegments(gillGeo,new THREE.LineBasicMaterial({color:deep,transparent:true,opacity:.65})));
const irisMat=mat(yellow.clone().lerp(orange,.5));for(const side of [-1,1]){const iris=mesh(new THREE.TorusGeometry(.044,.006,5,20),irisMat,[.374,.092,side*.196],null,fish);iris.scale.y=1.16;}
fishBody.geometry.deleteAttribute('color');
fish.name='LittleReefFish';tail.name='Tail';sideFins[0].name='FinLeft';sideFins[1].name='FinRight';
batchStatic(fish,[tail,...sideFins]);batchStatic(tail);
const times=[0,.2,.4,.6,.8], tracks=[];
for(const [name,amount]of [['Tail',.25],['FinLeft',.18],['FinRight',-.18]]){const values=[];times.forEach(t=>{const q=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),Math.sin(t/.8*Math.PI*2)*amount);values.push(...q.toArray());});tracks.push(new THREE.QuaternionKeyframeTrack(name+'.quaternion',times,values));}
return {object:fish,animations:[new THREE.AnimationClip('Swim',.8,tracks)]};};})(globalThis);
