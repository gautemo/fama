<template>
    <article @click="toPost" :class="{ big: img && inComment }">
        <p :class="{ cut: !inComment, hover: img }" v-if="!img || inComment">{{post.text}}</p>
        <LikeButton class="like" size="30" v-on:clicked="like" :likes="post.likes"/>
        <CommentCounter v-if="!inComment" size="20" :count="post.comments" @click="toPost" />
        <Report size="20" v-if="inComment && !reported && allowReport" v-on:clicked="report" />
        <img v-if="img" :src="img" :class="{ blur: !inComment }"/>
    </article>
</template>

<script>
import { logEvent, remoteConfig, default as firebase } from '@/firebaseinit'
const db = firebase.firestore();

export default {
    props: ['id', 'post', 'inComment'],
    data(){
        return{
            reported: false,
            allowReport: true,
            loadedImg: ''
        }
    },
    computed:{
        img(){
            if(this.post.imgPath){
                firebase.storage().ref(this.post.imgPath).getDownloadURL().then(url => this.loadedImg = url);
                if(this.loadedImg){
                    return this.loadedImg;
                }
                return require("@/assets/faded.jpg")
            }
        }
    },
    created(){
        if(this.inComment){
            this.allowReport = remoteConfig.getBoolean('allow_reporting');
        }
    },
    methods: {
      like(){
        db.collection('posts').doc(this.id).update({ likes: firebase.firestore.FieldValue.increment(1) });
        logEvent('add_like');
      },
      report(){
        db.collection('posts').doc(this.id).update({ reports: firebase.firestore.FieldValue.increment(1) });
        this.reported = true;
      },
      toPost(){
          if(!this.inComment){
              this.$router.push(`post/${this.id}`)
          }
      }
    },
    components: {
        AddButton: () => import('@/components/AddButton'),
        LikeButton: () => import('@/components/LikeButton'),
        CommentCounter: () => import('@/components/CommentCounter'),
        PostDisplay: () => import('@/components/PostDisplay'),
        Report: () => import('@/components/Report')
    }
}
</script>

<style scoped>
article{
    position: relative;
    padding: 5px 20px;
    border-bottom: 5px solid white;
    min-height: 60px;
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-template-rows: 1fr auto;
    overflow: hidden;
}

.big{
    height: 300px;
}

p{
  margin: 5px 0;
}

.cut{
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.like{
  align-self: end;
  grid-row: span 2;
  grid-column: 2;
}

img{
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

article >>> :not(img){
    z-index: 1;
}

.hover{
    background: #0000007a;
    color: white;
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 55px;
}

.blur{
    filter: blur(15px);
}
</style>