<template>
    <article>
        <p :class="{ cut: !inComment }" @click="toPost">{{post.text}}</p>
        <LikeButton class="like" size="30" v-on:clicked="like" :likes="post.likes"/>
        <CommentCounter v-if="!inComment" size="20" :count="post.comments" @click="toPost" />
        <Report size="20" v-if="inComment && !reported" v-on:clicked="report" />
    </article>
</template>

<script>
import { logEvent, default as firebase } from '@/firebaseinit'
const db = firebase.firestore();

export default {
    props: ['id', 'post', 'inComment'],
    data(){
        return{
            reported: false
        }
    },
    methods: {
      like(){
        db.collection('posts').doc(this.id).update({ likes: firebase.firestore.FieldValue.increment(1) });
        logEvent('add_like');
      },
      report(){
        db.collection('posts').doc(this.id).update({ reports: firebase.firestore.FieldValue.increment(1) });
        logEvent('add_report');
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
    padding: 5px 20px;
    border-bottom: 5px solid white;
    min-height: 60px;
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-template-rows: auto auto;
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
}
</style>