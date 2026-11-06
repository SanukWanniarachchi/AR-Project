/* Owner: void-neo-7 — page integration, preview camera and dependency loading. */
(function(){'use strict';
const preview=new URLSearchParams(location.search).has('preview');
const stage=document.getElementById('stage'),banner=document.getElementById('status');
function fail(message){banner.textContent=message;banner.dataset.state='lost';stage.innerHTML='<div class="loading">Little Reef could not start.<br>Please check the message above.</div>';}
function script(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Could not load '+src));document.head.appendChild(s);});}
async function start(){
  if(!preview&&!window.isSecureContext){fail('Camera access needs HTTPS. Open the hosted website, or use localhost for desktop development.');return;}
  await script('https://aframe.io/releases/1.6.0/aframe.min.js');
  if(!preview)await script('https://cdn.jsdelivr.net/npm/@ar-js-org/ar.js@3.4.8/aframe/build/aframe-ar.js');
  for(const path of ['js/core.js','js/environment.js','js/fish-motion.js','js/bubble.js','js/treasure.js','js/marker-status.js'])await script(path);
  LittleReef.paused=matchMedia('(prefers-reduced-motion: reduce)').matches;LittleReef.visible=preview;
  AFRAME.registerComponent('reef-renderer',{init(){this.el.addEventListener('renderstart',()=>{const r=this.el.renderer;r.toneMapping=AFRAME.THREE.ACESFilmicToneMapping;r.toneMappingExposure=.9;r.setPixelRatio(Math.min(devicePixelRatio,1.5));},{once:true});}});
  AFRAME.registerComponent('reef-orbit',{
    init(){this.theta=.42;this.phi=1.02;this.distance=3.1;this.drag=null;this.updateCamera=()=>{const aspect=innerWidth/innerHeight;const d=this.distance*Math.max(1,.85/aspect);this.el.object3D.position.set(d*Math.sin(this.phi)*Math.sin(this.theta),.18+d*Math.cos(this.phi),d*Math.sin(this.phi)*Math.cos(this.theta));this.el.getObject3D('camera').lookAt(new AFRAME.THREE.Vector3(0,.18,0));};this.down=e=>{this.drag={x:e.clientX,y:e.clientY};};this.move=e=>{if(!this.drag)return;this.theta-=(e.clientX-this.drag.x)*.008;this.phi=Math.max(.35,Math.min(1.48,this.phi+(e.clientY-this.drag.y)*.006));this.drag={x:e.clientX,y:e.clientY};this.updateCamera();};this.up=()=>{this.drag=null;};this.wheel=e=>{e.preventDefault();this.distance=Math.max(1.8,Math.min(4,this.distance+e.deltaY*.002));this.updateCamera();};this.ready=()=>{const c=this.el.sceneEl.canvas;c.style.touchAction='none';c.addEventListener('pointerdown',this.down);c.addEventListener('wheel',this.wheel,{passive:false});window.addEventListener('pointermove',this.move);window.addEventListener('pointerup',this.up);window.addEventListener('pointercancel',this.up);window.addEventListener('resize',this.updateCamera);this.updateCamera();};this.el.sceneEl.addEventListener('renderstart',this.ready,{once:true});},
    remove(){const c=this.el.sceneEl.canvas;if(c){c.removeEventListener('pointerdown',this.down);c.removeEventListener('wheel',this.wheel);}window.removeEventListener('pointermove',this.move);window.removeEventListener('pointerup',this.up);window.removeEventListener('pointercancel',this.up);window.removeEventListener('resize',this.updateCamera);}
  });
  document.body.classList.toggle('preview',preview);
  document.getElementById('mode-link').href=preview?'./':'?preview=1';document.getElementById('mode-link').textContent=preview?'Open camera AR':'3D preview';
  document.getElementById('help').textContent=preview?'Drag to rotate. Scroll to zoom. Tap the bubble or treasure chest.':'Allow camera access and point at the Hiro marker. Tap the bubble to change colour; tap the treasure chest to change size.';
  const anchor=preview?'a-entity':'a-marker';
  stage.innerHTML=`<a-scene embedded loading-screen="enabled: false" vr-mode-ui="enabled: false" renderer="antialias: true; colorManagement: true; maxCanvasWidth: 1280; maxCanvasHeight: 1280" cursor="rayOrigin: mouse; fuse: false" raycaster="objects: .tappable; far: 20" ${preview?'background="color: #dceeea"':'arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono; sourceWidth: 640; sourceHeight: 480;"'} reef-status reef-renderer>
    <a-assets timeout="20000"><a-asset-item id="fish-model" src="models/fish.glb"></a-asset-item></a-assets>
    <${anchor} id="hiro" ${preview?'':'preset="hiro" emitevents="true" smooth="true" smooth-count="5"'}>
      <a-entity id="aquarium" scale="0.26 0.26 0.26">
        <a-entity reef-environment></a-entity>
        <a-entity id="fish" reef-fish gltf-model="#fish-model" position="0 1.33 0"></a-entity>
        <a-entity id="bubble" class="tappable" reef-bubble></a-entity>
        <a-entity id="treasure" class="tappable" reef-treasure></a-entity>
        <a-text value="LITTLE REEF" align="center" color="#123c42" width="2.4" position="0 0.12 -1.32" rotation="-65 0 0"></a-text>
      </a-entity>
    </${anchor}>
    <a-entity light="type: ambient; color: #dff0f1; intensity: 1.6"></a-entity>
    <a-entity light="type: directional; color: #fff7e6; intensity: 2.1" position="-2 5 3"></a-entity>
    <a-entity camera="near: 0.01; far: 30; fov: 42" look-controls="enabled: false" wasd-controls="enabled: false" ${preview?'reef-orbit':''}></a-entity>
  </a-scene>`;
  // The preview is a separate mode. It neither requests a camera nor claims marker tracking.
  window.addEventListener('pagehide',()=>{document.querySelectorAll('video').forEach(v=>{if(v.srcObject)v.srcObject.getTracks().forEach(t=>t.stop());});},{once:true});
}
start().catch(error=>{console.error(error);fail('A project file or library could not load. Check the internet connection and make sure all member files have been merged.');});
})();
