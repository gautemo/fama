(function(e){function t(t){for(var r,o,s=t[0],i=t[1],u=t[2],d=0,l=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&l.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(l.length)l.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function s(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-1ae29d3b":"13e13f3d","chunk-2b425a74":"fea6614a","chunk-2d217357":"fddac9e2","chunk-383d5e26":"07ad2cce","chunk-5132740f":"6dfa7861","chunk-9fb4be18":"7c927d8b","chunk-c6c65440":"1c525216"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-1ae29d3b":1,"chunk-2b425a74":1,"chunk-383d5e26":1,"chunk-5132740f":1,"chunk-9fb4be18":1,"chunk-c6c65440":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-1ae29d3b":"21f2ee67","chunk-2b425a74":"97c20237","chunk-2d217357":"31d6cfe0","chunk-383d5e26":"7b8cce9b","chunk-5132740f":"2e023676","chunk-9fb4be18":"4839ef11","chunk-c6c65440":"d8b18314"}[e]+".css",a=i.p+r,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var u=c[s],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===r||d===a))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){u=l[s],d=u.getAttribute("data-href");if(d===r||d===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],f.parentNode.removeChild(f),n(c)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=s(e);var l=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}a[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=d;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"3b9a":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",[n("nav",[n("router-link",{attrs:{to:"/"}},[e._v("SOCIAL FEED")]),n("router-link",{attrs:{to:"/profile"}},[e._v("PROFILE")])],1),n("router-view")],1)},a=[],c=(n("034f"),n("2877")),s={},i=Object(c["a"])(s,o,a,!1,null,null,null),u=i.exports,d=n("8c4f"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("ul",e._l(e.posts,(function(e){return n("li",{key:e.id},[n("PostDisplay",{staticClass:"post",attrs:{id:e.id,post:e,inComment:!1}})],1)})),0),n("AddButton",{attrs:{size:"50",corner:!0},on:{clicked:function(t){return e.$router.push("add-post")}}})],1)},f=[],p=n("ff72");const h=p["a"].firestore();var m={async created(){const e=new Date;e.setDate(e.getDate()-2),h.collection("posts").where("timestamp",">",e).onSnapshot(e=>{e.docChanges().forEach(e=>{"added"===e.type||"modified"===e.type?this.postsMap.set(e.doc.id,{...e.doc.data(),id:e.doc.id}):"removed"===e.type&&this.postsMap.delete(e.doc.id),this.updates++})})},data(){return{updates:0,postsMap:new Map}},computed:{posts(){return this.updates&&[...this.postsMap.values()].sort((e,t)=>{const n=(t.timestamp.seconds-e.timestamp.seconds)/3600,r=t.likes-e.likes,o=t.comments.length-e.comments.length;return n+r+o})}},components:{AddButton:()=>n.e("chunk-1ae29d3b").then(n.bind(null,"b4e4")),PostDisplay:()=>n.e("chunk-383d5e26").then(n.bind(null,"1cf1"))}},b=m,g=(n("8153"),Object(c["a"])(b,l,f,!1,null,"d832eb18",null)),v=g.exports;r["a"].use(d["a"]);var k=new d["a"]({mode:"history",base:"/",routes:[{path:"/",component:v},{path:"/profile",component:()=>n.e("chunk-2d217357").then(n.bind(null,"c66d"))},{path:"/post/:id",component:()=>n.e("chunk-2b425a74").then(n.bind(null,"37d3"))},{path:"/add-post",component:()=>n.e("chunk-5132740f").then(n.bind(null,"ef2e"))}]}),y=n("9483");Object(y["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({router:k,render:function(e){return e(u)}}).$mount("#app")},"64a9":function(e,t,n){},8153:function(e,t,n){"use strict";var r=n("3b9a"),o=n.n(r);o.a},ff72:function(e,t,n){"use strict";var r=n("59ca");n("000b"),n("e71f");const o={apiKey:"AIzaSyBauetwfNZVpw-hi_xbDO9XtWZN7KujRhE",authDomain:"fama-social-feed.firebaseapp.com",databaseURL:"https://fama-social-feed.firebaseio.com",projectId:"fama-social-feed",storageBucket:"fama-social-feed.appspot.com",messagingSenderId:"676767442584",appId:"1:676767442584:web:1dbc7375f1241278fb12ed",measurementId:"G-P48R198ZYZ"};r["initializeApp"](o),r["analytics"](),t["a"]=r}});
//# sourceMappingURL=app.542769fe.js.map