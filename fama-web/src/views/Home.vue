<template>
  <section>
    <ul>
      <li v-for="post in posts" :key="post.id" @click="$router.push(`post/${post.id}`);">
        {{post.text}}
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
    data(){
      return{
        updates: 0,
        postsMap: new Map()
      }
    },
    computed:{
      posts(){
        return this.updates && [...this.postsMap.values()].sort((a,b) => {
          return a.timestamp - b.timestamp;
        });
      }
    },
    components: {
        AddButton: () => import('@/components/AddButton')
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
    display: flex;
    align-items: flex-end;
}

li:last-child{
    border: none;
}
</style>
