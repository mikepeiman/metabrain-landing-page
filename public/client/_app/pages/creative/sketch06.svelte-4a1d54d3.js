import{S as le,i as oe,s as re,e as O,k as P,w as b,c as Q,a as U,d as y,m as F,x as k,b as H,g as B,F as Z,y as D,q as C,o as L,B as I,v as de,R as W,a2 as R,a3 as q,a4 as j}from"../../chunks/vendor-0f79dfe6.js";import{S as N}from"../../chunks/Slider-58dcbe6f.js";/* empty css                                                        *//* empty css                                                            *//* empty css                                                          */import{C as he}from"../../chunks/CanvasManager-8c9c1c4c.js";import"../../chunks/supabaseClient-46cd2d69.js";import"../../chunks/stores-4423f7a5.js";function ue(a){let o,r,f,m,i,c,d,n,s,l,x,S,u,E,p,g,w,$;function X(e){a[5](e)}let z={label:"Min Distance",min:"1",max:"500",step:"5",color:"text-sky-400"};a[1].minDist!==void 0&&(z.value=a[1].minDist),o=new N({props:z}),R.push(()=>q(o,"value",X));function Y(e){a[6](e)}let _={label:"Number of lines",min:"1",max:"1000",step:"1"};a[1].maxLines!==void 0&&(_.value=a[1].maxLines),m=new N({props:_}),R.push(()=>q(m,"value",Y));function ee(e){a[7](e)}let G={label:"Speed",min:"1",max:"1000",step:"1"};a[1].speed!==void 0&&(G.value=a[1].speed),d=new N({props:G}),R.push(()=>q(d,"value",ee));function te(e){a[8](e)}let J={label:"Maxdist Factor",min:"1",max:"25",step:"1"};a[1].maxDistFactor!==void 0&&(J.value=a[1].maxDistFactor),l=new N({props:J}),R.push(()=>q(l,"value",te));function ie(e){a[9](e)}let K={label:"Min Width",min:"1",max:"100",step:"1"};a[1].minWidth!==void 0&&(K.value=a[1].minWidth),u=new N({props:K}),R.push(()=>q(u,"value",ie));function t(e){a[10](e)}let v={label:"Max Width",min:"1",max:"100",step:"1"};return a[1].maxWidth!==void 0&&(v.value=a[1].maxWidth),g=new N({props:v}),R.push(()=>q(g,"value",t)),{c(){b(o.$$.fragment),f=P(),b(m.$$.fragment),c=P(),b(d.$$.fragment),s=P(),b(l.$$.fragment),S=P(),b(u.$$.fragment),p=P(),b(g.$$.fragment)},l(e){k(o.$$.fragment,e),f=F(e),k(m.$$.fragment,e),c=F(e),k(d.$$.fragment,e),s=F(e),k(l.$$.fragment,e),S=F(e),k(u.$$.fragment,e),p=F(e),k(g.$$.fragment,e)},m(e,h){D(o,e,h),B(e,f,h),D(m,e,h),B(e,c,h),D(d,e,h),B(e,s,h),D(l,e,h),B(e,S,h),D(u,e,h),B(e,p,h),D(g,e,h),$=!0},p(e,h){const M={};!r&&h[0]&2&&(r=!0,M.value=e[1].minDist,j(()=>r=!1)),o.$set(M);const A={};!i&&h[0]&2&&(i=!0,A.value=e[1].maxLines,j(()=>i=!1)),m.$set(A);const T={};!n&&h[0]&2&&(n=!0,T.value=e[1].speed,j(()=>n=!1)),d.$set(T);const V={};!x&&h[0]&2&&(x=!0,V.value=e[1].maxDistFactor,j(()=>x=!1)),l.$set(V);const ne={};!E&&h[0]&2&&(E=!0,ne.value=e[1].minWidth,j(()=>E=!1)),u.$set(ne);const se={};!w&&h[0]&2&&(w=!0,se.value=e[1].maxWidth,j(()=>w=!1)),g.$set(se)},i(e){$||(C(o.$$.fragment,e),C(m.$$.fragment,e),C(d.$$.fragment,e),C(l.$$.fragment,e),C(u.$$.fragment,e),C(g.$$.fragment,e),$=!0)},o(e){L(o.$$.fragment,e),L(m.$$.fragment,e),L(d.$$.fragment,e),L(l.$$.fragment,e),L(u.$$.fragment,e),L(g.$$.fragment,e),$=!1},d(e){I(o,e),e&&y(f),I(m,e),e&&y(c),I(d,e),e&&y(s),I(l,e),e&&y(S),I(u,e),e&&y(p),I(g,e)}}}function fe(a){let o,r,f,m,i,c,d;return c=new he({props:{settings:a[2],data:a[1],hidePanel:a[0],$$slots:{default:[ue]},$$scope:{ctx:a}}}),{c(){o=O("div"),r=O("div"),f=O("canvas"),m=P(),i=O("div"),b(c.$$.fragment),this.h()},l(n){o=Q(n,"DIV",{class:!0});var s=U(o);r=Q(s,"DIV",{id:!0});var l=U(r);f=Q(l,"CANVAS",{id:!0}),U(f).forEach(y),l.forEach(y),m=F(s),i=Q(s,"DIV",{class:!0,id:!0});var x=U(i);k(c.$$.fragment,x),x.forEach(y),s.forEach(y),this.h()},h(){H(f,"id","c"),H(r,"id","canvasContainer"),H(i,"class","controls flex flex-col p-4"),H(i,"id","controlPanel"),H(o,"class","flex h-full w-full sketch")},m(n,s){B(n,o,s),Z(o,r),Z(r,f),Z(o,m),Z(o,i),D(c,i,null),d=!0},p(n,s){const l={};s[0]&2&&(l.data=n[1]),s[0]&1&&(l.hidePanel=n[0]),s[0]&2|s[1]&2&&(l.$$scope={dirty:s,ctx:n}),c.$set(l)},i(n){d||(C(c.$$.fragment,n),d=!0)},o(n){L(c.$$.fragment,n),d=!1},d(n){n&&y(o),I(c)}}}function ae(){let o=document.getElementById("sideNav").offsetWidth;console.log("\u{1F680} ~ file: sketch05.svelte ~ line 31 ~ onMount ~ sideNavWidth",o);let f=document.getElementById("controlPanel").offsetWidth;console.log("\u{1F680} ~ file: sketch05.svelte ~ line 34 ~ onMount ~ controlPanelWidth",f);let i=document.getElementById("sketchLayout").offsetWidth;console.log("\u{1F680} ~ file: sketch05.svelte ~ line 37 ~ onMount ~ sketchLayoutWidth",i);let d=document.getElementById("canvasContainer").offsetWidth;console.log("\u{1F680} ~ file: sketch05.svelte ~ line 47 ~ getElementSizing ~ canvasContainerWidth",d);let n=window.innerWidth,s=i-o-f;console.log("\u{1F680} ~ file: sketch05.svelte ~ line 48 ~ getElementSizing ~ calculatedLayoutRemaining",s);let l=n-o-f;return console.log("\u{1F680} ~ file: sketch05.svelte ~ line 50 ~ getElementSizing ~ calculatedWindowRemaining",l),console.log("\u{1F680} ~ file: sketch05.svelte ~ line 49 ~ getElementSizing ~ windowWidth ",n),{calculatedLayoutRemaining:s,calculatedWindowRemaining:l}}function me(a,o,r){let f,{hidePanel:m=!1}=o;const i={TITLE:"Sketch06",outline:!0,arclen:.5,angle:0,radius:.33,background:"#527A9B",foreground:"#F4B9A7",lineWidth:20,minDist:20,maxDistFactor:6,maxLines:200,speed:1,minWidth:1,maxWidth:10},c={scaleToView:!0,dimensions:[1280,1280]};let d,n,s,l;de(()=>{let{calculatedLayoutRemaining:t,calculatedWindowRemaining:v}=ae();d=document.getElementById("c");let e=document.getElementById("canvasContainer"),h=e.offsetWidth;v<t?r(3,s=d.width=e.width=v):h>t?r(3,s=d.width=t):r(3,s=d.width=h),r(4,l=d.height=sketchLayout.offsetHeight),n=d.getContext("2d"),window.addEventListener("resize",function(){let{calculatedLayoutRemaining:M,calculatedWindowRemaining:A}=ae(),T=document.getElementById("canvasContainer"),V=T.offsetWidth;A<M?r(3,s=d.width=T.width=A):V>M?r(3,s=d.width=M):r(3,s=d.width=V),r(4,l=d.height=sketchLayout.offsetHeight),X()}),X(),Y()});let x=1,S=125,u=[],E=0,p={},g=0,w=[[1,0],[.5,.866],[-.5,.866],[-1,0],[-.5,-.866],[.5,-.866]];function $(){p.x=W.range(0,s),p.y=W.range(0,l)}function X(){u.length=0;for(let t=0;t<S;++t)$(),u.push(new _(p));n.fillStyle="#222",n.fillRect(0,0,s,l),n.lineCap="round"}function z(t,v,e){return`hsla( ${t/s*180+Math.cos(E)%360}, 50%, 50%, ${e} )`}function Y(){window.requestAnimationFrame(Y),++E,n.shadowBlur=0,n.fillStyle="rgba(0,0,0,.02)",n.fillRect(0,0,s,l),n.shadowBlur=.5;for(let t=0;t<u.length;++t)u[t].reverse?u[t].width*=.998:u[t].width*=1.002,u[t].step()&&(u.splice(t,1),--t);if(++g,u.length<i.maxLines&&g>10&&Math.random()<.5){g=0,$();let t=new _(p),v=Math.random()*w.length|0;t.dirIndex=v,u.push(t),n.fillStyle=n.shadowColor=z(p.x,p.y,Math.random()),n.beginPath()}}function _(t){this.x=t.x|0,this.y=t.y|0,this.width=W.range(x,i.maxWidth),this.reverse=!1,this.dirIndex=t.dirIndex+1,this.randomFactor=W.range(.1,1);do{let v=w[Math.random()*w.length|0];this.dirIndex++,this.vx=v[0]*i.speed,this.vy=v[1]*i.speed}while(this.vx===-t.vx&&this.vy===-t.vy||this.vx===t.vx&&this.vy===t.vy);this.lineDist=i.minDist,this.hexDist=f}_.prototype.wrap=function(){this.x=(this.x+s)%s,this.y=(this.y+l)%l},_.prototype.bounce=function(){(this.x<=0||this.x>=s)&&(this.vx*=-1),(this.y<=0||this.y>=l)&&(this.vy*=-1)},_.prototype.step=function(){let t=!1,v=this.x,e=this.y;if(this.x+=this.vx,this.y+=this.vy,this.lineDist-=1*i.speed,this.hexDist-=1*i.speed,(this.x<0||this.x>s||this.y<0||this.y>l)&&this.bounce(),this.lineDist<=0){let h;Math.random>.5&&this.dirIndex>=1?this.dirIndex--:this.dirIndex++,h=w[this.dirIndex%6],this.vx=h[0]*i.speed,this.vy=h[1]*i.speed,this.lineDist=i.minDist,u.length<i.maxLines&&u.push(new _(this)),u.length<i.maxLines*2&&Math.random()<.5&&u.push(new _(this))}if(this.width>i.maxWidth/2?this.width/5:this.width*5,n.strokeStyle=n.shadowColor=z(this.x,this.y,1),n.beginPath(),n.lineWidth=this.width,n.moveTo(this.x,this.y),n.lineTo(v,e),n.stroke(),this.width>i.maxWidth?this.reverse=!0:this.width<i.minWidth&&(this.reverse=!1),this.hexDist<=0&&(t=!0),t)return!0};function ee(t){a.$$.not_equal(i.minDist,t)&&(i.minDist=t,r(1,i))}function G(t){a.$$.not_equal(i.maxLines,t)&&(i.maxLines=t,r(1,i))}function te(t){a.$$.not_equal(i.speed,t)&&(i.speed=t,r(1,i))}function J(t){a.$$.not_equal(i.maxDistFactor,t)&&(i.maxDistFactor=t,r(1,i))}function ie(t){a.$$.not_equal(i.minWidth,t)&&(i.minWidth=t,r(1,i))}function K(t){a.$$.not_equal(i.maxWidth,t)&&(i.maxWidth=t,r(1,i))}return a.$$set=t=>{"hidePanel"in t&&r(0,m=t.hidePanel)},a.$$.update=()=>{a.$$.dirty[0]&2&&(f=i.minDist*i.maxDistFactor),a.$$.dirty[0]&26&&(p={x:W.range(0,s),y:W.range(0,l),vx:0,vy:0,width:W.range(x,i.maxWidth),reverse:!1,dirIndex:3,randomFactor:W.range(.1,1)})},[m,i,c,s,l,ee,G,te,J,ie,K]}class We extends le{constructor(o){super();oe(this,o,me,fe,re,{hidePanel:0},null,[-1,-1])}}export{We as default};
