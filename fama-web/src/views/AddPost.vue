<template>
    <section>
        <textarea v-model="text" placeholder="Write something cool..." maxlength="300"/>
        <button @click="add">ADD</button>
        <button v-if="camera">CAMERA</button>
    </section>
</template>

<script>
import { default as firebase, logEvent, remoteConfig } from '@/firebaseinit';
const db = firebase.firestore();

export default {
    data(){
        return {
            text: '',
            camera: false
        }
    },
    async created(){
        await remoteConfig.fetchAndActivate();
        this.camera = remoteConfig.getBoolean('upload_photos');
    },
    methods: {
        async add(){
            if(!this.text){
                return;
            }
            const post = {
                text: this.text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0,
                reports: 0,
                comments: 0
            }
            const ref = await db.collection('posts').add(post);
            const uid = firebase.auth().currentUser.uid;
            await db.collection('users').doc(uid).collection('posts').doc(ref.id).set({timestamp: firebase.firestore.FieldValue.serverTimestamp()});
            logEvent('add_post');
            this.$router.push(`post/${ref.id}`);
        }
    }
}
</script>

<style scoped>
section{
    display: flex;
    flex-direction: column;
    height: 100%;
}
textarea{
    flex: 1;
    border: none;
    resize: none;
    padding: 25px;
    background: linear-gradient(var(--faded-color-orange), var(--main-color-orange));
    font: inherit;
    font-size: 1.2em;
}

button{
    background: none;
    border: none;
    box-shadow: 0 -1px 1px rgba(0,0,0,0.12), 
                0 -2px 2px rgba(0,0,0,0.12), 
                0 -4px 4px rgba(0,0,0,0.12),
                0 -8px 8px rgba(0,0,0,0.12),
                0 -16px 16px rgba(0,0,0,0.12);
    padding: 20px;
    color: #333;
    font: inherit;
    font-weight: bold;
    cursor: pointer;
}
</style>