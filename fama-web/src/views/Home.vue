<template>
  <section>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <p @click="$router.push(`post/${post.id}`)">{{post.text}}</p>
        <LikeButton class="like" size="30" v-on:clicked="like(post.id)"/>
        <CommentCounter size="20" :count="post.comments.length" @click="$router.push(`post/${post.id}`)" />
        <span class="likes-count" :class="{ hide: post.likes === 0 }" v-on:clicked="like(post.id)">{{post.likes}}</span>
      </li>
    </ul>
    <AddButton size="50" :corner="true" v-on:clicked="$router.push('add-post')"/>
  </section>
</template>

<script>
import firebase from '@/firebaseinit'
const db = firebase.firestore();

export default {
    async created(){
      const d = new Date();
      d.setDate(d.getDate() - 2);
      db.collection('posts').where('timestamp', '>', d).onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              this.postsMap.set(change.doc.id, {...change.doc.data(), id: change.doc.id});
            }else if (change.type === 'removed') {
              this.postsMap.delete(change.doc.id);
            }
            this.updates++;
        });
      });
    },
    methods: {
      like(id){
        db.collection('posts').doc(id).update({ likes: firebase.firestore.FieldValue.increment(1) });
      }
    },
    data(){
      return{
        updates: 0,
        postsMap: new Map()
      }
    },
    computed:{
      posts(){
        return this.updates && [...this.postsMap.values()].sort((a,b) => {
          const hours = (b.timestamp.seconds - a.timestamp.seconds) / 3600;
          const likes = b.likes - a.likes;
          const comments = b.comments.length - a.comments.length;
          return hours + likes + comments;
        });
      }
    },
    components: {
        AddButton: () => import('@/components/AddButton'),
        LikeButton: () => import('@/components/LikeButton'),
        CommentCounter: () => import('@/components/CommentCounter')
    }
}
</script>

<style scoped>
section{
  flex: 1;
  background: linear-gradient(var(--faded-color-blue), var(--main-color-blue));
}

li{
    padding: 5px 20px;
    border-bottom: 5px solid white;
    min-height: 60px;
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-template-columns: 1fr 30px;
}

li:last-child{
    border: none;
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
}

.likes-count{
  text-align: center;
  color: white;
}

.hide{
  visibility: hidden;
}
</style>
