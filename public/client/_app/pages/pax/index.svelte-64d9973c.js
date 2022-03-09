import{S as we,i as ke,s as ye,Y as Ce,w as k,k as F,e as ne,x as y,m as Y,c as te,a as ie,d as b,b as Z,y as C,g as X,F as re,O as qe,q,o as I,B as j,v as Ie,a0 as je,a2 as O,a3 as G,a4 as R,ax as Ee,ay as Fe}from"../../chunks/vendor-0f79dfe6.js";import{C as Ye}from"../../chunks/CanvasManager-8c9c1c4c.js";import{S as T}from"../../chunks/Slider-58dcbe6f.js";import{C as Xe}from"../../chunks/Checkbox-import-0bfa8a73.js";import{O as Oe}from"../../chunks/OptionSelect-405478ae.js";import Pe from"./grid.svelte-87d749f3.js";/* empty css                                                        */import"../../chunks/supabaseClient-46cd2d69.js";import"../../chunks/stores-4423f7a5.js";/* empty css                                                              */const{window:ae}=je;function Ge(n){let d,a,m,u,p,i,r,$,g,t,l,_,c,L,z,v,V,A,M,N,B,S,W,D,w,J,H;function x(e){n[6](e)}let K={label:"Number of stars",min:"1",max:"50",step:"1"};n[3].numStars!==void 0&&(K.value=n[3].numStars),d=new T({props:K}),O.push(()=>G(d,"value",x));function ee(e){n[7](e)}let Q={label:"Ships min",min:"1",max:"50",step:"1"};n[3].shipsMin!==void 0&&(Q.value=n[3].shipsMin),u=new T({props:Q}),O.push(()=>G(u,"value",ee));function s(e){n[8](e)}let h={label:"Ships max",min:"5",max:"250",step:"5"};n[3].shipsMax!==void 0&&(h.value=n[3].shipsMax),r=new T({props:h}),O.push(()=>G(r,"value",s));function f(e){n[9](e)}let E={label:"Speed",min:"5",max:"100",step:"5"};n[3].speed!==void 0&&(E.value=n[3].speed),t=new T({props:E}),O.push(()=>G(t,"value",f));function P(e){n[10](e)}let U={label:"FPS",min:"1",max:"60",step:"1"};n[3].fps!==void 0&&(U.value=n[3].fps),c=new T({props:U}),O.push(()=>G(c,"value",P));function be(e){n[11](e)}let oe={label:"Orbit X mod",min:".1",max:"5",step:".1"};n[3].orbitXmod!==void 0&&(oe.value=n[3].orbitXmod),v=new T({props:oe}),O.push(()=>G(v,"value",be));function ve(e){n[12](e)}let le={label:"Orbit Y mod",min:".1",max:"5",step:".1"};n[3].orbitYmod!==void 0&&(le.value=n[3].orbitYmod),M=new T({props:le}),O.push(()=>G(M,"value",ve));function Me(e){n[13](e)}let ue={duration:"200",label:"Random color functions?"};n[3].randomColors!==void 0&&(ue.checked=n[3].randomColors),S=new Xe({props:ue}),O.push(()=>G(S,"checked",Me));function Se(e){n[14](e)}let fe={items:n[3].colorFunctions};return n[3].colorFunctionsIndex!==void 0&&(fe.selected=n[3].colorFunctionsIndex),w=new Oe({props:fe}),O.push(()=>G(w,"selected",Se)),{c(){k(d.$$.fragment),m=F(),k(u.$$.fragment),i=F(),k(r.$$.fragment),g=F(),k(t.$$.fragment),_=F(),k(c.$$.fragment),z=F(),k(v.$$.fragment),A=F(),k(M.$$.fragment),B=F(),k(S.$$.fragment),D=F(),k(w.$$.fragment)},l(e){y(d.$$.fragment,e),m=Y(e),y(u.$$.fragment,e),i=Y(e),y(r.$$.fragment,e),g=Y(e),y(t.$$.fragment,e),_=Y(e),y(c.$$.fragment,e),z=Y(e),y(v.$$.fragment,e),A=Y(e),y(M.$$.fragment,e),B=Y(e),y(S.$$.fragment,e),D=Y(e),y(w.$$.fragment,e)},m(e,o){C(d,e,o),X(e,m,o),C(u,e,o),X(e,i,o),C(r,e,o),X(e,g,o),C(t,e,o),X(e,_,o),C(c,e,o),X(e,z,o),C(v,e,o),X(e,A,o),C(M,e,o),X(e,B,o),C(S,e,o),X(e,D,o),C(w,e,o),H=!0},p(e,o){const me={};!a&&o[0]&8&&(a=!0,me.value=e[3].numStars,R(()=>a=!1)),d.$set(me);const pe={};!p&&o[0]&8&&(p=!0,pe.value=e[3].shipsMin,R(()=>p=!1)),u.$set(pe);const de={};!$&&o[0]&8&&($=!0,de.value=e[3].shipsMax,R(()=>$=!1)),r.$set(de);const _e={};!l&&o[0]&8&&(l=!0,_e.value=e[3].speed,R(()=>l=!1)),t.$set(_e);const ce={};!L&&o[0]&8&&(L=!0,ce.value=e[3].fps,R(()=>L=!1)),c.$set(ce);const he={};!V&&o[0]&8&&(V=!0,he.value=e[3].orbitXmod,R(()=>V=!1)),v.$set(he);const ge={};!N&&o[0]&8&&(N=!0,ge.value=e[3].orbitYmod,R(()=>N=!1)),M.$set(ge);const $e={};!W&&o[0]&8&&(W=!0,$e.checked=e[3].randomColors,R(()=>W=!1)),S.$set($e);const se={};o[0]&8&&(se.items=e[3].colorFunctions),!J&&o[0]&8&&(J=!0,se.selected=e[3].colorFunctionsIndex,R(()=>J=!1)),w.$set(se)},i(e){H||(q(d.$$.fragment,e),q(u.$$.fragment,e),q(r.$$.fragment,e),q(t.$$.fragment,e),q(c.$$.fragment,e),q(v.$$.fragment,e),q(M.$$.fragment,e),q(S.$$.fragment,e),q(w.$$.fragment,e),H=!0)},o(e){I(d.$$.fragment,e),I(u.$$.fragment,e),I(r.$$.fragment,e),I(t.$$.fragment,e),I(c.$$.fragment,e),I(v.$$.fragment,e),I(M.$$.fragment,e),I(S.$$.fragment,e),I(w.$$.fragment,e),H=!1},d(e){j(d,e),e&&b(m),j(u,e),e&&b(i),j(r,e),e&&b(g),j(t,e),e&&b(_),j(c,e),e&&b(z),j(v,e),e&&b(A),j(M,e),e&&b(B),j(S,e),e&&b(D),j(w,e)}}}function Re(n){let d,a,m,u,p,i,r,$,g,t;return Ce(n[4]),d=new Pe({}),r=new Ye({props:{data:n[3],$$slots:{default:[Ge]},$$scope:{ctx:n}}}),{c(){k(d.$$.fragment),a=F(),m=ne("div"),u=ne("canvas"),p=F(),i=ne("div"),k(r.$$.fragment),this.h()},l(l){y(d.$$.fragment,l),a=Y(l),m=te(l,"DIV",{class:!0});var _=ie(m);u=te(_,"CANVAS",{id:!0,class:!0}),ie(u).forEach(b),p=Y(_),i=te(_,"DIV",{class:!0});var c=ie(i);y(r.$$.fragment,c),c.forEach(b),_.forEach(b),this.h()},h(){Z(u,"id","canvas"),Z(u,"class","svelte-v1peie"),Z(i,"class","controls flex flex-col p-5 svelte-v1peie"),Z(m,"class","sketch-wrapper svelte-v1peie")},m(l,_){C(d,l,_),X(l,a,_),X(l,m,_),re(m,u),n[5](u),re(m,p),re(m,i),C(r,i,null),$=!0,g||(t=qe(ae,"resize",n[4]),g=!0)},p(l,_){const c={};_[0]&8&&(c.data=l[3]),_[0]&8|_[1]&256&&(c.$$scope={dirty:_,ctx:l}),r.$set(c)},i(l){$||(q(d.$$.fragment,l),q(r.$$.fragment,l),$=!0)},o(l){I(d.$$.fragment,l),I(r.$$.fragment,l),$=!1},d(l){j(d,l),l&&b(a),l&&b(m),n[5](null),j(r),g=!1,t()}}}function ze(n,d,a){let m,u,p,i,r=[],$=0,g=!1,t={TITLE:"Pax01-vanilla",fps:60,numStars:20,shipsMin:1,shipsMax:50,orbitXmod:1,orbitYmod:1,speed:10};Ie(()=>{z(),_()});function l(){console.log("click"),g?g=!1:g=!0,g&&A()}async function _(){a(2,p=document.getElementById("canvas")),a(0,m=a(2,p.width=window.innerWidth*.8,p)),a(1,u=a(2,p.height=window.innerHeight,p)),a(2,p.style.backgroundColor="#222",p),a(2,p.style.cursor="pointer",p),i=p.getContext("2d"),i.fillStyle="#222",i.fillRect(0,0,m,u),p.addEventListener("click",l),r=await c(t.numStars),r.forEach(s=>{V(s)})}async function c(s){r=[];for(let h=0;h<s;h++){let f=new M(Math.random()*m,Math.random()*u,Math.random()*30+10,Math.random()*360,Math.random()*50);f.ships=await L(f),r=[...r,f]}return r}function L(s){console.log("\u{1F680} ~ file: index.svelte ~ line 76 ~ generateShips ~ star",s);let h=[];for(let f=0;f<s.numShips;f++){let E=`hsla(${s.hue+Math.random()*f}, ${Math.random>.5?50+Math.random()*f*5:50-Math.random()*f}%, ${Math.random>.5?75+Math.random()*f*5:50-Math.random()*f}%, ${Math.random>.75?Math.random()+.25:Math.random()-.25})`,P=new N(Math.random()*5,E,Math.random()*5);h=[...h,P]}return s.ships=h,h}function z(){const s=Ee({size:50});Fe(s).rectangle({width:12,height:12}).forEach(f=>{i.fillStyle="#f00",i.fillRect(f.x,f.y,f.width,f.height),i.fill()})}function v(s){let h=1,f=1;s.ships,s.ships.forEach((E,P)=>{$=$+P/1e4*t.speed/500,h=s.x+(s.radius+10)*Math.cos($+P/t.orbitXmod),f=s.y+(s.radius+10)*Math.sin($+P/t.orbitYmod),i.beginPath(),i.arc(h,f,4,0,2*Math.PI),i.fillStyle=E.color,i.fill()})}function V(s){i.beginPath(),i.arc(s.x,s.y,s.radius,0,2*Math.PI),i.fillStyle=`hsla(${s.hue}, 50%, 50%, 1)`,i.fill()}function A(){if(r.length<t.numStars&&(r=[...r,...c(t.numStars-r.length)]),g)setTimeout(function(){requestAnimationFrame(A),i.fillStyle="#222",i.fillRect(0,0,m,u),i.save(),r.forEach(s=>{V(s),v(s)}),z(),i.restore()},1e3/t.fps);else return}class M{constructor(h,f,E,P,U){this.x=h,this.y=f,this.radius=E,this.hue=P,this.numShips=U}}class N{constructor(h,f,E){this.radius=h,this.color=f,this.orbit=E}}function B(){a(0,m=ae.innerWidth),a(1,u=ae.innerHeight)}function S(s){O[s?"unshift":"push"](()=>{p=s,a(2,p)})}function W(s){n.$$.not_equal(t.numStars,s)&&(t.numStars=s,a(3,t))}function D(s){n.$$.not_equal(t.shipsMin,s)&&(t.shipsMin=s,a(3,t))}function w(s){n.$$.not_equal(t.shipsMax,s)&&(t.shipsMax=s,a(3,t))}function J(s){n.$$.not_equal(t.speed,s)&&(t.speed=s,a(3,t))}function H(s){n.$$.not_equal(t.fps,s)&&(t.fps=s,a(3,t))}function x(s){n.$$.not_equal(t.orbitXmod,s)&&(t.orbitXmod=s,a(3,t))}function K(s){n.$$.not_equal(t.orbitYmod,s)&&(t.orbitYmod=s,a(3,t))}function ee(s){n.$$.not_equal(t.randomColors,s)&&(t.randomColors=s,a(3,t))}function Q(s){n.$$.not_equal(t.colorFunctionsIndex,s)&&(t.colorFunctionsIndex=s,a(3,t))}return n.$$.update=()=>{n.$$.dirty[0]&3&&console.log(m,u),n.$$.dirty[0]&3,n.$$.dirty[0]&1,n.$$.dirty[0]&2},[m,u,p,t,B,S,W,D,w,J,H,x,K,ee,Q]}class Ke extends we{constructor(d){super();ke(this,d,ze,Re,ye,{},null,[-1,-1])}}export{Ke as default};