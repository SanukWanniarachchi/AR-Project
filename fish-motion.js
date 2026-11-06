/* Owner: void-neo-7 — load the separate GLB, play its fin animation and move it gently. */
(function(){'use strict';
AFRAME.registerComponent('reef-fish',{
  init(){this.elapsed=0;this.mixer=null;this.onLoaded=e=>{const model=e.detail.model;this.mixer=new AFRAME.THREE.AnimationMixer(model);for(const clip of model.animations||[])this.mixer.clipAction(clip).play();this.el.sceneEl.emit('reef-model-ready');};this.onError=()=>this.el.sceneEl.emit('reef-model-error');this.el.addEventListener('model-loaded',this.onLoaded);this.el.addEventListener('model-error',this.onError);},
  tick(time,dt){if(LittleReef.paused)return;const delta=Math.min(dt/1000,.05);this.elapsed+=delta;const t=this.elapsed;if(this.mixer)this.mixer.update(delta);this.el.object3D.position.set(Math.sin(t*.6)*.5,1.33+Math.sin(t*1.1)*.07,0);this.el.object3D.rotation.y=-.2+Math.sin(t*.6)*.3;},
  remove(){this.el.removeEventListener('model-loaded',this.onLoaded);this.el.removeEventListener('model-error',this.onError);if(this.mixer)this.mixer.stopAllAction();}
});})();
