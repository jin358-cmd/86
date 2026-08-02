"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[299],{1039:(e,t,r)=>{r.d(t,{s:()=>d});var a=r(8945),n=r(2115),i=r(5339),o=r(9037),s=r(8587);class l extends i.BKk{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${s.r>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}}let f=e=>e&&e.constructor===Float32Array,u=e=>e instanceof i.I9Y||e instanceof i.Pq0||e instanceof i.IUQ,c=e=>Array.isArray(e)?e:u(e)?e.toArray():[e,e,e];function m(e,t,r){return n.useMemo(()=>{if(void 0!==t)if(f(t))return t;else{if(t instanceof i.Q1f){let r=Array.from({length:3*e},()=>[t.r,t.g,t.b]).flat();return Float32Array.from(r)}if(u(t)||Array.isArray(t)){let r=Array.from({length:3*e},()=>c(t)).flat();return Float32Array.from(r)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},r)},[t])}let d=n.forwardRef(({noise:e=1,count:t=100,speed:r=1,opacity:s=1,scale:u=1,size:d,color:p,children:v,...h},g)=>{n.useMemo(()=>(0,o.e)({SparklesImplMaterial:l}),[]);let b=n.useRef(null),y=(0,o.C)(e=>e.viewport.dpr),w=c(u),P=n.useMemo(()=>Float32Array.from(Array.from({length:t},()=>w.map(i.cj9.randFloatSpread)).flat()),[t,...w]),x=m(t,d,Math.random),M=m(t,s),A=m(t,r),C=m(3*t,e),E=m(void 0===p?3*t:t,f(p)?p:new i.Q1f(p),()=>1);return(0,o.D)(e=>{b.current&&b.current.material&&(b.current.material.time=e.clock.elapsedTime)}),n.useImperativeHandle(g,()=>b.current,[]),n.createElement("points",(0,a.A)({key:`particle-${t}-${JSON.stringify(u)}`},h,{ref:b}),n.createElement("bufferGeometry",null,n.createElement("bufferAttribute",{attach:"attributes-position",args:[P,3]}),n.createElement("bufferAttribute",{attach:"attributes-size",args:[x,1]}),n.createElement("bufferAttribute",{attach:"attributes-opacity",args:[M,1]}),n.createElement("bufferAttribute",{attach:"attributes-speed",args:[A,1]}),n.createElement("bufferAttribute",{attach:"attributes-color",args:[E,3]}),n.createElement("bufferAttribute",{attach:"attributes-noise",args:[C,3]})),v||n.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:y,depthWrite:!1}))})},3617:(e,t,r)=>{r.d(t,{o:()=>n});var a=r(5339);class n{setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}}new a.qUd(-1,1,1,-1,0,1);class i extends a.LoY{constructor(){super(),this.setAttribute("position",new a.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new a.qtW([0,2,0,0,2,0],2))}}new i},8381:(e,t,r)=>{r.d(t,{mK:()=>P,s0:()=>b});var a=r(5155),n=r(2115),i=r(5339),o=r(9037),s=r(3303);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}new i.I9Y,new i.I9Y;function f(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}var u=function e(t,r,a){var n=this;f(this,e),l(this,"dot2",function(e,t){return n.x*e+n.y*t}),l(this,"dot3",function(e,t,r){return n.x*e+n.y*t+n.z*r}),this.x=t,this.y=r,this.z=a},c=[new u(1,1,0),new u(-1,1,0),new u(1,-1,0),new u(-1,-1,0),new u(1,0,1),new u(-1,0,1),new u(1,0,-1),new u(-1,0,-1),new u(0,1,1),new u(0,-1,1),new u(0,1,-1),new u(0,-1,-1)],m=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],d=Array(512),p=Array(512);!function(e){e>0&&e<1&&(e*=65536),(e=Math.floor(e))<256&&(e|=e<<8);for(var t,r=0;r<256;r++)t=1&r?m[r]^255&e:m[r]^e>>8&255,d[r]=d[r+256]=t,p[r]=p[r+256]=c[t%12]}(0);function v(e){var t=function(e){if("number"==typeof e)e=Math.abs(e);else if("string"==typeof e){var t=e;e=0;for(var r=0;r<t.length;r++)e=(e+(r+1)*(t.charCodeAt(r)%96))%0x7fffffff}return 0===e&&(e=311),e}(e);return function(){var e=48271*t%0x7fffffff;return t=e,e/0x7fffffff}}new function e(t){var r=this;f(this,e),l(this,"seed",0),l(this,"init",function(e){r.seed=e,r.value=v(e)}),l(this,"value",v(this.seed)),this.init(t)}(Math.random());i.LoY;r(1948);let h=(0,n.createContext)(null),g=e=>(2&e.getAttributes())==2,b=(0,n.memo)((0,n.forwardRef)(({children:e,camera:t,scene:r,resolutionScale:l,enabled:f=!0,renderPriority:u=1,autoClear:c=!0,depthBuffer:m,enableNormalPass:d,stencilBuffer:p,multisampling:v=8,frameBufferType:b=i.ix0},y)=>{let{gl:w,scene:P,camera:x,size:M}=(0,o.C)(),A=r||P,C=t||x,[E,S,_]=(0,n.useMemo)(()=>{let e=new s.s0(w,{depthBuffer:m,stencilBuffer:p,multisampling:v,frameBufferType:b});e.addPass(new s.AH(A,C));let t=null,r=null;return d&&((r=new s.Xe(A,C)).enabled=!1,e.addPass(r),void 0!==l&&((t=new s.SP({normalBuffer:r.texture,resolutionScale:l})).enabled=!1,e.addPass(t))),[e,r,t]},[C,w,m,p,v,b,A,d,l]);(0,n.useEffect)(()=>E?.setSize(M.width,M.height),[E,M]),(0,o.D)((e,t)=>{if(f){let e=w.autoClear;w.autoClear=c,p&&!c&&w.clearStencil(),E.render(t),w.autoClear=e}},f?u:0);let j=(0,n.useRef)(null);(0,n.useLayoutEffect)(()=>{let e=[],t=j.current.__r3f;if(t&&E){let r=t.children;for(let t=0;t<r.length;t++){let a=r[t].object;if(a instanceof s.Mj){let n=[a];if(!g(a)){let e=null;for(;(e=r[t+1]?.object)instanceof s.Mj&&!g(e);)n.push(e),t++}let i=new s.Vu(C,...n);e.push(i)}else a instanceof s.oF&&e.push(a)}for(let t of e)E?.addPass(t);S&&(S.enabled=!0),_&&(_.enabled=!0)}return()=>{for(let t of e)E?.removePass(t);S&&(S.enabled=!1),_&&(_.enabled=!1)}},[E,e,C,S,_]),(0,n.useEffect)(()=>{let e=w.toneMapping;return w.toneMapping=i.y_p,()=>{w.toneMapping=e}},[w]);let z=(0,n.useMemo)(()=>({composer:E,normalPass:S,downSamplingPass:_,resolutionScale:l,camera:C,scene:A}),[E,S,_,l,C,A]);return(0,n.useImperativeHandle)(y,()=>E,[E]),(0,a.jsx)(h.Provider,{value:z,children:(0,a.jsx)("group",{ref:j,children:e})})})),y=0,w=new WeakMap;s.Mj;let P=((e,t)=>function({blendFunction:r=t?.blendFunction,opacity:i=t?.opacity,...s}){let l=w.get(e);if(!l){let t=`@react-three/postprocessing/${e.name}-${y++}`;(0,o.e)({[t]:e}),w.set(e,l=t)}let f=(0,o.C)(e=>e.camera),u=n.useMemo(()=>[...t?.args??[],...s.args??[{...t,...s}]],[JSON.stringify(s)]);return(0,a.jsx)(l,{camera:f,"blendMode-blendFunction":r,"blendMode-opacity-value":i,...s,args:u})})(s.bv,{blendFunction:0});s.i,s.hH;var x=(e=>(e[e.Linear=0]="Linear",e[e.Radial=1]="Radial",e[e.MirroredLinear=2]="MirroredLinear",e))(x||{});s.Mj,s.To;s.Mj;s.Mj;s.Mj},8587:(e,t,r)=>{r.d(t,{r:()=>a});let a=parseInt(r(5339).sPf.replace(/\D+/g,""))},9625:(e,t,r)=>{r.d(t,{A:()=>f});var a=r(2115),n=r(9037),i=r(5339),o=r(8587);class s extends i.BKk{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${o.r>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}let l=e=>new i.Pq0().setFromSpherical(new i.YHV(e,Math.acos(1-2*Math.random()),2*Math.random()*Math.PI)),f=a.forwardRef(({radius:e=100,depth:t=50,count:r=5e3,saturation:o=0,factor:f=4,fade:u=!1,speed:c=1},m)=>{let d=a.useRef(null),[p,v,h]=a.useMemo(()=>{let a=[],n=[],s=Array.from({length:r},()=>(.5+.5*Math.random())*f),u=new i.Q1f,c=e+t,m=t/r;for(let e=0;e<r;e++)c-=m*Math.random(),a.push(...l(c).toArray()),u.setHSL(e/r,o,.9),n.push(u.r,u.g,u.b);return[new Float32Array(a),new Float32Array(n),new Float32Array(s)]},[r,t,f,e,o]);(0,n.D)(e=>d.current&&(d.current.uniforms.time.value=e.clock.elapsedTime*c));let[g]=a.useState(()=>new s);return a.createElement("points",{ref:m},a.createElement("bufferGeometry",null,a.createElement("bufferAttribute",{attach:"attributes-position",args:[p,3]}),a.createElement("bufferAttribute",{attach:"attributes-color",args:[v,3]}),a.createElement("bufferAttribute",{attach:"attributes-size",args:[h,1]})),a.createElement("primitive",{ref:d,object:g,attach:"material",blending:i.EZo,"uniforms-fade-value":u,depthWrite:!1,transparent:!0,vertexColors:!0}))})}}]);