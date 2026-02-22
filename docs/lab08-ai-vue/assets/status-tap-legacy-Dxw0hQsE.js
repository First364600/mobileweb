System.register(["./index-legacy-Dzs4J7U4.js"],function(e,t){"use strict";var n,r,s,o,i;return{setters:[e=>{n=e.A,r=e.B,s=e.C,o=e.D,i=e.E}],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
e("startStatusTap",()=>{const e=window;e.addEventListener("statusTap",()=>{n(()=>{const t=e.innerWidth,n=e.innerHeight,a=document.elementFromPoint(t/2,n/2);if(!a)return;const c=r(a);c&&new Promise(e=>s(c,e)).then(()=>{o(async()=>{c.style.setProperty("--overflow","hidden"),await i(c,300),c.style.removeProperty("--overflow")})})})})})}}});
