<template>
    <article>
        <p @click="toPost">{{post.text}}</p>
        <LikeButton class="like" size="30" v-on:clicked="like" :likes="post.likes"/>
        <CommentCounter v-if="!inComment" size="20" :count="post.comments.length" @click="toPost" />
    </article>
</template>

<script>
import firebase from '@/firebaseinit'
const db = firebase.firestore();

export default {
    props: ['id', 'post', 'inComment'],
    methods: {
      like(){
        db.collection('posts').doc(this.id).update({ likes: firebase.firestore.FieldValue.increment(1) });
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
        PostDisplay: () => import('@/components/PostDisplay')
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
    grid-template-rows: 1fr 30px;
}

p{
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  margin: 5px 0;
}

.like{
  align-self: end;
  grid-row: span 2;
}
</style>