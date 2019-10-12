<template>
    <section>
        <p>My posts</p>
        <ul>
            <li v-for="post in posts" :key="post.id">
                {{post.text}}
            </li>
        </ul>
        <p>My comments</p>
        <ul>
            <li v-for="comment in comments" :key="comment.id">
                {{comment.comment}}
            </li>
        </ul>
    </section>
</template>

<script>
import { logEvent, default as firebase } from '@/firebaseinit'
const db = firebase.firestore();

export default {
    created(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.loadPosts(user);
                this.loadComments(user);
            }
        });
    },
    data(){
        return {
            posts: [],
            comments: []
        }
    },
    methods: {
        async loadPosts(user){
            const ref = await db.collection('users').doc(user.uid).collection('posts').get();
            for(const doc of ref.docs){
                this.posts.push({id: doc.id, ...doc.data()});
            }
        },
        async loadComments(user){
            const ref = await db.collection('users').doc(user.uid).collection('comments').get();
            for(const doc of ref.docs){
                this.comments.push({id: doc.id, ...doc.data()});
            }
        }
    }
}
</script>