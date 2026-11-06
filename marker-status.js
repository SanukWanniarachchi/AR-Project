/* Owner: dulendayarathna — marker state, accessible messages, camera errors and testing. */
(function(){'use strict';
AFRAME.registerComponent('reef-status',{
  init(){
    const banner=document.getElementById('status'),notice=document.getElementById('notice');
    const preview=new URLSearchParams(location.search).has('preview');let cameraFailed=false,modelFailed=false;
    const show=(message,state)=>{banner.textContent=message;banner.dataset.state=state;};
    this.found=()=>{LittleReef.visible=true;if(!modelFailed)show('Marker found — welcome to Little Reef','found');};
    this.lost=()=>{LittleReef.visible=false;if(!cameraFailed&&!modelFailed)show('Marker lost — point your camera at the Hiro marker','lost');};
    this.cameraError=e=>{cameraFailed=true;LittleReef.visible=false;console.warn('Camera unavailable',e.detail);show('Camera unavailable. Allow camera permission, close other camera apps and reload this HTTPS page.','lost');};
    this.cameraReady=()=>{if(!modelFailed)show('Camera ready — point at the Hiro marker','lost');};
    this.modelError=()=>{modelFailed=true;show('The fish model could not load. Check that models/fish.glb was uploaded, then reload.','lost');};
    this.modelReady=()=>{if(preview)show('3D preview — camera and marker tracking are off','found');};
    this.action=e=>{notice.textContent=e.detail.message;};
    const marker=document.getElementById('hiro');marker.addEventListener('markerFound',this.found);marker.addEventListener('markerLost',this.lost);
    window.addEventListener('camera-error',this.cameraError);window.addEventListener('camera-init',this.cameraReady);
    this.el.addEventListener('reef-model-error',this.modelError);this.el.addEventListener('reef-model-ready',this.modelReady);this.el.addEventListener('reef-action',this.action);
    this.buttons=[];
    const wire=(id,handler)=>{const b=document.getElementById(id);b.addEventListener('click',handler);this.buttons.push([b,handler]);};
    wire('bubble-button',()=>{if(!LittleReef.visible)return;document.getElementById('bubble').emit('click');});
    wire('chest-button',()=>{if(!LittleReef.visible)return;document.getElementById('treasure').emit('click');});
    const pause=document.getElementById('pause-button');const label=()=>{pause.textContent=LittleReef.paused?'Play motion':'Pause motion';pause.setAttribute('aria-pressed',String(LittleReef.paused));};
    wire('pause-button',()=>{LittleReef.paused=!LittleReef.paused;label();});label();
    show(preview?'3D preview — camera and marker tracking are off':'Starting camera — allow access when asked',preview?'found':'loading');
  },
  remove(){const marker=document.getElementById('hiro');if(marker){marker.removeEventListener('markerFound',this.found);marker.removeEventListener('markerLost',this.lost);}window.removeEventListener('camera-error',this.cameraError);window.removeEventListener('camera-init',this.cameraReady);this.el.removeEventListener('reef-model-error',this.modelError);this.el.removeEventListener('reef-model-ready',this.modelReady);this.el.removeEventListener('reef-action',this.action);this.buttons.forEach(([b,h])=>b.removeEventListener('click',h));}
});})();
