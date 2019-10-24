<template>
  <section>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <PostDisplay :id="post.id" :post="post" :inComment="false"  class="post"/>
      </li>
    </ul>
    <AddButton size="50" :corner="true" v-on:clicked="$router.push('add-post')"/>
  </section>
</template>

<script>
import { perf, default as firebase } from '@/firebaseinit';
const db = firebase.firestore();

export default {
    async created(){
      const d = new Date();
      d.setDate(d.getDate() - 2);
      const trace = perf.trace('initialPostsLoading');
      trace.start();
      db.collection('posts')
        .where('timestamp', '>', d)
        .onSnapshot(snapshot => {
          if(trace.state === 2){
            trace.incrementMetric('numberOfPosts', snapshot.size);
            trace.stop();
          }
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
          const comments = b.comments - a.comments;
          return hours + likes + comments;
        });
      }
    },
    components: {
        AddButton: () => import('@/components/AddButton'),
        PostDisplay: () => import('@/components/PostDisplay')
    }
}
</script>

<style scoped>
section{
  flex: 1;
  background: linear-gradient(var(--faded-color-blue), var(--main-color-blue));
}

.post{
  cursor: pointer;
}
</style>
