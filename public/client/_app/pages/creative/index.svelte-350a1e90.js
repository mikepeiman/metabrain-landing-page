import{S as pe,i as ke,s as de,k as m,e as h,t as ue,w as v,$ as _e,d as n,m as u,c as o,a as i,h as ve,x as $,b as a,g as Y,F as s,y as p,L as ge,q as k,o as d,B as _,v as we,a0 as je}from"../../chunks/vendor-0f79dfe6.js";import Se from"./sketch02.svelte-7c1f59f2.js";import ye from"./sketch03.svelte-072f86d4.js";import Ee from"./sketch04.svelte-1d573e2f.js";import be from"./sketch01.svelte-6adccc70.js";import Ce from"./sketch05.svelte-9450a073.js";import xe from"./sketch06.svelte-4a1d54d3.js";import Ae from"./sketch07.svelte-c052fc2b.js";import Pe from"./sketch08.svelte-8308e621.js";import Ie from"./sketch09.svelte-811368a1.js";import"../../chunks/CanvasSketchEditor-89928560.js";/* empty css                                                        */import"../../chunks/stores-4423f7a5.js";import"../../chunks/Slider-58dcbe6f.js";import"../../chunks/ColorInput-0ad08486.js";/* empty css                                                            */import"../../chunks/OptionSelect-405478ae.js";/* empty css                                                              */import"../../chunks/Checkbox-import-0bfa8a73.js";import"../../chunks/Checkbox-1c363ee3.js";/* empty css                                                          */import"../../chunks/CanvasManager-8c9c1c4c.js";import"../../chunks/supabaseClient-46cd2d69.js";const{document:$e}=je;function qe(g){let l,f,c,T,G,V,J,H,t,w,j,K,S,y,Q,E,b,R,C,x,U,A,P,X,I,q,Z,z,B,ee,M,O,te,D,L,N;return j=new be({props:{hidePanel:"true"}}),y=new Se({props:{hidePanel:"true"}}),b=new ye({props:{hidePanel:"true"}}),x=new Ee({props:{hidePanel:"true"}}),P=new Ce({props:{hidePanel:"true"}}),q=new xe({props:{hidePanel:"true"}}),B=new Ae({props:{hidePanel:"true"}}),O=new Pe({props:{hidePanel:"true"}}),L=new Ie({props:{hidePanel:"true"}}),{c(){l=m(),f=h("div"),c=h("h1"),T=ue("Creative coding"),G=m(),V=h("p"),J=ue("Sketches and animations"),H=m(),t=h("div"),w=h("a"),v(j.$$.fragment),K=m(),S=h("a"),v(y.$$.fragment),Q=m(),E=h("a"),v(b.$$.fragment),R=m(),C=h("a"),v(x.$$.fragment),U=m(),A=h("a"),v(P.$$.fragment),X=m(),I=h("a"),v(q.$$.fragment),Z=m(),z=h("a"),v(B.$$.fragment),ee=m(),M=h("a"),v(O.$$.fragment),te=m(),D=h("a"),v(L.$$.fragment),this.h()},l(e){_e('[data-svelte="svelte-1wb84fe"]',$e.head).forEach(n),l=u(e),f=o(e,"DIV",{class:!0});var W=i(f);c=o(W,"H1",{class:!0});var se=i(c);T=ve(se,"Creative coding"),se.forEach(n),G=u(W),V=o(W,"P",{});var ae=i(V);J=ve(ae,"Sketches and animations"),ae.forEach(n),W.forEach(n),H=u(e),t=o(e,"DIV",{class:!0});var r=i(t);w=o(r,"A",{href:!0,class:!0});var re=i(w);$(j.$$.fragment,re),re.forEach(n),K=u(r),S=o(r,"A",{href:!0,class:!0});var ne=i(S);$(y.$$.fragment,ne),ne.forEach(n),Q=u(r),E=o(r,"A",{href:!0,class:!0});var le=i(E);$(b.$$.fragment,le),le.forEach(n),R=u(r),C=o(r,"A",{href:!0,class:!0});var ce=i(C);$(x.$$.fragment,ce),ce.forEach(n),U=u(r),A=o(r,"A",{href:!0,class:!0});var he=i(A);$(P.$$.fragment,he),he.forEach(n),X=u(r),I=o(r,"A",{href:!0,class:!0});var oe=i(I);$(q.$$.fragment,oe),oe.forEach(n),Z=u(r),z=o(r,"A",{href:!0,class:!0});var ie=i(z);$(B.$$.fragment,ie),ie.forEach(n),ee=u(r),M=o(r,"A",{href:!0,class:!0});var fe=i(M);$(O.$$.fragment,fe),fe.forEach(n),te=u(r),D=o(r,"A",{href:!0,class:!0});var me=i(D);$(L.$$.fragment,me),me.forEach(n),r.forEach(n),this.h()},h(){$e.title="MetaBrain: Your Life OS",a(c,"class","svelte-wk9h2l"),a(f,"class","title flex flex-col items-center p-6"),a(w,"href","/creative/sketch01"),a(w,"class","svelte-wk9h2l"),a(S,"href","/creative/sketch02"),a(S,"class","svelte-wk9h2l"),a(E,"href","/creative/sketch03"),a(E,"class","svelte-wk9h2l"),a(C,"href","/creative/sketch04"),a(C,"class","svelte-wk9h2l"),a(A,"href","/creative/sketch05"),a(A,"class","svelte-wk9h2l"),a(I,"href","/creative/sketch06"),a(I,"class","svelte-wk9h2l"),a(z,"href","/creative/sketch07"),a(z,"class","svelte-wk9h2l"),a(M,"href","/creative/sketch08"),a(M,"class","svelte-wk9h2l"),a(D,"href","/creative/sketch09"),a(D,"class","svelte-wk9h2l"),a(t,"class","main justify-items-center svelte-wk9h2l")},m(e,F){Y(e,l,F),Y(e,f,F),s(f,c),s(c,T),s(f,G),s(f,V),s(V,J),Y(e,H,F),Y(e,t,F),s(t,w),p(j,w,null),s(t,K),s(t,S),p(y,S,null),s(t,Q),s(t,E),p(b,E,null),s(t,R),s(t,C),p(x,C,null),s(t,U),s(t,A),p(P,A,null),s(t,X),s(t,I),p(q,I,null),s(t,Z),s(t,z),p(B,z,null),s(t,ee),s(t,M),p(O,M,null),s(t,te),s(t,D),p(L,D,null),N=!0},p:ge,i(e){N||(k(j.$$.fragment,e),k(y.$$.fragment,e),k(b.$$.fragment,e),k(x.$$.fragment,e),k(P.$$.fragment,e),k(q.$$.fragment,e),k(B.$$.fragment,e),k(O.$$.fragment,e),k(L.$$.fragment,e),N=!0)},o(e){d(j.$$.fragment,e),d(y.$$.fragment,e),d(b.$$.fragment,e),d(x.$$.fragment,e),d(P.$$.fragment,e),d(q.$$.fragment,e),d(B.$$.fragment,e),d(O.$$.fragment,e),d(L.$$.fragment,e),N=!1},d(e){e&&n(l),e&&n(f),e&&n(H),e&&n(t),_(j),_(y),_(b),_(x),_(P),_(q),_(B),_(O),_(L)}}}function ze(){let g=document.getElementsByTagName("canvas");console.log("\u{1F680} ~ file: index.svelte ~ line 21 ~ resetCanvasSizes ~ c",g);for(let l=0;l<g.length;l++){let c=g[l].parentElement.offsetWidth;console.log("\u{1F680} ~ file: index.svelte ~ line 28 ~ resetCanvasSizes ~ w",c),g[l].setAttribute("style",`width: ${c}; height: ${c};`)}}function Be(g,l,f){let{posts:c}=l;return we(()=>{setTimeout(()=>{ze()},10)}),g.$$set=T=>{"posts"in T&&f(0,c=T.posts)},[c]}class rt extends pe{constructor(l){super();ke(this,l,Be,qe,de,{posts:0})}}export{rt as default};