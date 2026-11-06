/* Owner: pasindu0720 — seabed, coral, rocks, seaweed and scene label. */
(function(){'use strict';LittleReef.createEnvironment=function(THREE){const group=new THREE.Group();
const {reef,ink,bg,blue,orange,purple,green,yellow,red,pale,deep,coral,teal,renderer,rnd,mat,sandMat,baseMat,coralMat,leafMat,goldMat,woodMat,mesh,sphereG,boxG,ball,box,branch,painted,batchStatic}=LittleReef.makeContext(THREE,group);
box([0,-.26,0],[4.75,.25,3.65],baseMat);box([0,-.09,0],[4.61,.18,3.51],sandMat);
// Deterministic small pebbles and sand grains.
for(let i=0;i<8;i++){const r=.012+rnd()*.021;ball([(rnd()-.5)*4.4,.012,(rnd()-.5)*3.3],[r,r*.45,r],mat(pale.clone().lerp(orange,rnd()*.14)));}
const rockMat=mat(ink.clone().lerp(bg,.63));
for(const [x,z,s] of [[-1.7,-.58,.42],[-1.37,-.75,.31],[1.65,-.78,.43],[1.3,-1.05,.32],[-1.65,.74,.23]]){const o=mesh(new THREE.DodecahedronGeometry(1,0),rockMat,[x,s*.35,z],[s,s*.7,s*.8]);o.rotation.set(rnd(),rnd(),rnd());}
// Rounded branching coral.
function coralTree(x,z,scale,m){const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(scale);reef.add(g);const segs=[[[0,0,0],[0,.66,0],.095],[[0,.35,0],[-.28,.65,.03],.065],[[-.28,.65,.03],[-.3,.99,.03],.05],[[0,.58,0],[.28,.86,0],.065],[[.28,.86,0],[.29,1.2,0],.045],[[0,.66,0],[-.03,1.16,0],.06],[[0,.43,0],[.1,.64,.24],.06],[[.1,.64,.24],[.14,.96,.24],.045],[[-.28,.7,.03],[-.5,.87,.05],.04]];segs.forEach(([a,b,r])=>{branch(a,b,r,m,g);ball(b,[r*.75,r*.75,r*.75],m,g);});return g;}
coralTree(-1.5,-.42,.92,coralMat);coralTree(1.55,-.65,.85,mat(purple));coralTree(-.85,-1.12,.48,mat(coral.clone().lerp(pale,.3)));
// Cone corals retain an obvious primitive for the assignment.
for(let i=0;i<5;i++)mesh(new THREE.ConeGeometry(.09,.28+i*.035,8),mat(purple.clone().lerp(blue,i*.1)),[-.9+i*.15,.14+i*.017,.75+Math.sin(i)*.09]);
// Curved ribbon seaweed.
const weeds=[];
for(let i=0;i<13;i++){const g=new THREE.Group();const right=i>6;g.position.set((right?1:-1)*(1.75+rnd()*.2),.02,-1.1+rnd()*.3);g.rotation.y=rnd()*Math.PI;const h=.65+rnd()*.8;const verts=[],inds=[];for(let k=0;k<=12;k++){const t=k/12,x=Math.sin(t*5+i)*.13*t,w=.075*Math.sin(Math.PI*(t*.92+.04));verts.push(x-w,t*h,Math.cos(t*4)*.1*t,x+w,t*h,Math.cos(t*4)*.1*t);if(k<12){let q=k*2;inds.push(q,q+1,q+2,q+1,q+3,q+2);}}const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geom.setIndex(inds);geom.computeVertexNormals();mesh(geom,mat(green.clone().lerp(teal,rnd()*.5),{side:THREE.DoubleSide}),null,null,g);reef.add(g);weeds.push(g);}
// Starfish and a ridged shell.
const starShape=new THREE.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5,r=i%2?.1:.25;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?starShape.lineTo(x,y):starShape.moveTo(x,y);}starShape.closePath();const star=mesh(new THREE.ExtrudeGeometry(starShape,{depth:.055,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.023,bevelThickness:.018}),mat(coral),[-.55,.06,1.1]);star.rotation.x=-Math.PI/2;star.rotation.z=.25;
for(let i=0;i<7;i++){const shell=ball([.08+(i-3)*.04,.055,.8],[.035,.055,.16],mat(pale.clone().lerp(coral,i*.025)));shell.rotation.y=(i-3)*.14;}
// Label integrated into the front edge of the miniature display.
const labelCanvas=document.createElement('canvas');labelCanvas.width=1024;labelCanvas.height=160;const ctx=labelCanvas.getContext('2d');ctx.fillStyle=deep.getStyle();ctx.fillRect(0,0,1024,160);ctx.fillStyle=pale.getStyle();ctx.font='500 64px sans-serif';ctx.textAlign='center';ctx.fillText('L I T T L E   R E E F',512,101);const labelTexture=new THREE.CanvasTexture(labelCanvas);labelTexture.colorSpace=THREE.SRGBColorSpace;mesh(new THREE.PlaneGeometry(1.9,.3),new THREE.MeshBasicMaterial({map:labelTexture}),[0,-.22,1.833]);
const leafPaint=painted(128,256,(c,w,h)=>{
  const gradient=c.createLinearGradient(0,h,0,0);gradient.addColorStop(0,green.clone().lerp(deep,.45).getStyle());gradient.addColorStop(.6,green.getStyle());gradient.addColorStop(1,green.clone().lerp(yellow,.5).getStyle());c.fillStyle=gradient;c.fillRect(0,0,w,h);
  c.strokeStyle=bg.clone().lerp(yellow,.4).getStyle();c.globalAlpha=.42;c.lineWidth=2;c.beginPath();c.moveTo(64,h);c.lineTo(64,0);c.stroke();c.lineWidth=1;
  for(let y=16;y<h;y+=22)for(const side of [-1,1]){c.beginPath();c.moveTo(64,y+13);c.quadraticCurveTo(64+side*22,y+2,64+side*58,y-15);c.stroke();}c.globalAlpha=1;
});
for(const plant of weeds){const leaf=plant.children[0],g=leaf.geometry,uv=[];for(let i=0;i<g.attributes.position.count;i++)uv.push(i%2,Math.floor(i/2)/12);g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));leaf.material.map=leafPaint;leaf.material.color.copy(bg);leaf.material.needsUpdate=true;}
const sandPaint=painted(512,512,(c,w,h)=>{
  c.fillStyle=pale.getStyle();c.fillRect(0,0,w,h);c.strokeStyle=orange.clone().lerp(pale,.7).getStyle();c.globalAlpha=.18;c.lineWidth=2;
  for(let j=-30;j<h+30;j+=24){c.beginPath();for(let x=0;x<=w;x+=8)c.lineTo(x,j+Math.sin(x*.024+j)*8);c.stroke();}
  for(let i=0;i<9000;i++){c.fillStyle=(i%3?orange.clone().lerp(pale,.5):bg).getStyle();c.globalAlpha=.1+rnd()*.18;const s=.5+rnd()*1.4;c.fillRect(rnd()*w,rnd()*h,s,s);}c.globalAlpha=1;
});sandMat.map=sandPaint;sandMat.color.copy(bg);sandMat.needsUpdate=true;
const coralPaint=painted(128,128,(c,w,h)=>{c.fillStyle=bg.getStyle();c.fillRect(0,0,w,h);c.fillStyle=deep.getStyle();c.globalAlpha=.22;for(let i=0;i<160;i++){const x=rnd()*w,y=rnd()*h;c.beginPath();c.arc(x,y,1+rnd()*1.2,0,Math.PI*2);c.fill();}c.globalAlpha=1;});coralPaint.wrapS=coralPaint.wrapT=THREE.RepeatWrapping;coralPaint.repeat.set(2,3);
reef.traverse(o=>{if(o.isMesh&&o.geometry.type==='CylinderGeometry'){o.material.map=coralPaint;o.material.needsUpdate=true;}});
const rockPaint=painted(128,128,(c,w,h)=>{c.fillStyle=bg.getStyle();c.fillRect(0,0,w,h);for(let i=0;i<800;i++){c.fillStyle=ink.getStyle();c.globalAlpha=rnd()*.2;c.fillRect(rnd()*w,rnd()*h,1+rnd()*5,1+rnd()*2);}c.globalAlpha=1;});rockMat.map=rockPaint;rockMat.roughness=1;rockMat.needsUpdate=true;
batchStatic(reef,weeds);
return {group,update(t){weeds.forEach((w,i)=>{w.rotation.z=Math.sin(t*1.2+i)*.055;});}};};
AFRAME.registerComponent('reef-environment',{init(){this.feature=LittleReef.createEnvironment(AFRAME.THREE);this.el.setObject3D('mesh',this.feature.group);},tick(time){if(!LittleReef.paused)this.feature.update(time/1000);},remove(){LittleReef.dispose(this.feature.group);this.el.removeObject3D('mesh');}});
})();
