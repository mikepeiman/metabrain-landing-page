import{S as K,i as O,s as Q,e as p,t as M,k as j,c as d,a as g,h as N,d as u,m as y,b as _,g as S,F as h,j as P,M as G,L as H,Z as L}from"../../chunks/vendor-0f79dfe6.js";function U(r,t,a){const s=r.slice();return s[1]=t[a],s}function Z(r,t,a){const s=r.slice();return s[4]=t[a],s}function $(r){let t,a=r[4].ability.name+"",s,n;return{c(){t=p("span"),s=M(a),n=j(),this.h()},l(i){t=d(i,"SPAN",{class:!0});var m=g(t);s=N(m,a),m.forEach(u),n=y(i),this.h()},h(){_(t,"class","p-2 m-2 bg-gradient-to-bl from-lightBlue-700 to-purple-700 text-white")},m(i,m){S(i,t,m),h(t,s),S(i,n,m)},p(i,m){m&1&&a!==(a=i[4].ability.name+"")&&P(s,a)},d(i){i&&u(t),i&&u(n)}}}function z(r){let t,a=r[1].move.name+"",s;return{c(){t=p("span"),s=M(a),this.h()},l(n){t=d(n,"SPAN",{class:!0});var i=g(t);s=N(i,a),i.forEach(u),this.h()},h(){_(t,"class","p-2 m-2 bg-gradient-to-bl from-lightBlue-700 to-purple-700 text-white")},m(n,i){S(n,t,i),h(t,s)},p(n,i){i&1&&a!==(a=n[1].move.name+"")&&P(s,a)},d(n){n&&u(t)}}}function R(r){let t,a,s,n=r[0].name+"",i,m,k,B,x,V,q,b,A,I,E=r[0].abilities,o=[];for(let l=0;l<E.length;l+=1)o[l]=$(Z(r,E,l));let D=r[0].moves,c=[];for(let l=0;l<D.length;l+=1)c[l]=z(U(r,D,l));return{c(){t=p("div"),a=p("div"),s=p("h1"),i=M(n),m=j(),k=p("div");for(let l=0;l<o.length;l+=1)o[l].c();B=j(),x=p("img"),q=j(),b=p("div");for(let l=0;l<c.length;l+=1)c[l].c();A=j(),I=p("div"),this.h()},l(l){t=d(l,"DIV",{class:!0});var f=g(t);a=d(f,"DIV",{class:!0});var e=g(a);s=d(e,"H1",{class:!0});var v=g(s);i=N(v,n),v.forEach(u),m=y(e),k=d(e,"DIV",{class:!0});var C=g(k);for(let w=0;w<o.length;w+=1)o[w].l(C);C.forEach(u),B=y(e),x=d(e,"IMG",{src:!0}),e.forEach(u),q=y(f),b=d(f,"DIV",{class:!0});var F=g(b);for(let w=0;w<c.length;w+=1)c[w].l(F);F.forEach(u),A=y(f),I=d(f,"DIV",{class:!0});var J=g(I);J.forEach(u),f.forEach(u),this.h()},h(){_(s,"class","text-4xl text-center min-w-min my-8 uppercase bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-sky-500"),_(k,"class","flex flex-wrap flex-row justify-center"),G(x.src,V=r[0].sprites.other["official-artwork"].front_default)||_(x,"src",V),_(a,"class","flex flex-col"),_(b,"class","flex flex-wrap flex-row"),_(I,"class","flex"),_(t,"class","pokeman flex flex-col items-center justify-center")},m(l,f){S(l,t,f),h(t,a),h(a,s),h(s,i),h(a,m),h(a,k);for(let e=0;e<o.length;e+=1)o[e].m(k,null);h(a,B),h(a,x),h(t,q),h(t,b);for(let e=0;e<c.length;e+=1)c[e].m(b,null);h(t,A),h(t,I)},p(l,[f]){if(f&1&&n!==(n=l[0].name+"")&&P(i,n),f&1){E=l[0].abilities;let e;for(e=0;e<E.length;e+=1){const v=Z(l,E,e);o[e]?o[e].p(v,f):(o[e]=$(v),o[e].c(),o[e].m(k,null))}for(;e<o.length;e+=1)o[e].d(1);o.length=E.length}if(f&1&&!G(x.src,V=l[0].sprites.other["official-artwork"].front_default)&&_(x,"src",V),f&1){D=l[0].moves;let e;for(e=0;e<D.length;e+=1){const v=U(l,D,e);c[e]?c[e].p(v,f):(c[e]=z(v),c[e].c(),c[e].m(b,null))}for(;e<c.length;e+=1)c[e].d(1);c.length=D.length}},i:H,o:H,d(l){l&&u(t),L(o,l),L(c,l)}}}async function X({params:r}){const a=`https://pokeapi.co/api/v2/pokemon/${r.id}`;return{props:{pokeman:await(await fetch(a)).json()}}}function T(r,t,a){let{pokeman:s}=t;return r.$$set=n=>{"pokeman"in n&&a(0,s=n.pokeman)},[s]}class Y extends K{constructor(t){super();O(this,t,T,R,Q,{pokeman:0})}}export{Y as default,X as load};
