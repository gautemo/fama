(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-383d5e26"],{"1cf1":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("article",[n("p",{on:{click:t.toPost}},[t._v(t._s(t.post.text))]),n("LikeButton",{staticClass:"like",attrs:{size:"30",likes:t.post.likes},on:{clicked:t.like}}),t.inComment?t._e():n("CommentCounter",{attrs:{size:"20",count:t.post.comments.length},on:{click:t.toPost}})],1)},s=[],i=n("ff72");const c=i["a"].firestore();var l={props:["id","post","inComment"],methods:{like(){c.collection("posts").doc(this.id).update({likes:i["a"].firestore.FieldValue.increment(1)})},toPost(){this.inComment||this.$router.push(`post/${this.id}`)}},components:{AddButton:()=>n.e("chunk-1ae29d3b").then(n.bind(null,"b4e4")),LikeButton:()=>n.e("chunk-9fb4be18").then(n.bind(null,"92f8")),CommentCounter:()=>n.e("chunk-c6c65440").then(n.bind(null,"3553")),PostDisplay:()=>Promise.resolve().then(n.bind(null,"1cf1"))}},u=l,r=(n("d0b4"),n("2877")),a=Object(r["a"])(u,o,s,!1,null,"65905546",null);e["default"]=a.exports},"6c1c":function(t,e,n){},d0b4:function(t,e,n){"use strict";var o=n("6c1c"),s=n.n(o);s.a}}]);
//# sourceMappingURL=chunk-383d5e26.07ad2cce.js.map