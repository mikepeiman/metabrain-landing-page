import{S as m,i as u,s as h,j as I,m as p,o as v,x as g,u as _,v as j,z as b}from"../../../../chunks/vendor-4c0561e8.js";import{D as f}from"../../../../chunks/discord-db2ca6fe.js";import k from"../../MainUI.svelte-fea5fcec.js";import"../../Server.svelte-5e07db3e.js";import"../../../../chunks/stores-6e146982.js";import"../../Channels.svelte-ef4c32bd.js";import"../../../../chunks/Channel-62316566.js";import"../../Messages.svelte-27b6df6d.js";function y(r){let n,s;return n=new k({props:{serverId:r[0],channelId:r[1]}}),{c(){I(n.$$.fragment)},l(e){p(n.$$.fragment,e)},m(e,t){v(n,e,t),s=!0},p(e,[t]){const a={};t&1&&(a.serverId=e[0]),t&2&&(a.channelId=e[1]),n.$set(a)},i(e){s||(g(n.$$.fragment,e),s=!0)},o(e){_(n.$$.fragment,e),s=!1},d(e){j(n,e)}}}const w=async({page:{params:r}})=>{const{serverId:n,channelId:s}=r;return{props:{serverId:n,channelId:s}}};function C(r,n,s){let{serverId:e,channelId:t}=n,a;b(()=>{a=f.load(),l()});async function l(){let o=a.findIndex(c=>c.id===e),i=a[o];i&&i.channels.forEach(async c=>{c.channels.forEach(async d=>{d.id===t&&d.messages.length<1&&f.generateMessages(e,t)})})}return r.$$set=o=>{"serverId"in o&&s(0,e=o.serverId),"channelId"in o&&s(1,t=o.channelId)},[e,t]}class z extends m{constructor(n){super();u(this,n,C,y,h,{serverId:0,channelId:1})}}export{z as default,w as load};