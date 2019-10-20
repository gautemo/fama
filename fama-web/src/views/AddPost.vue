<template>
    <section>
        <textarea v-model="text" placeholder="Write something cool..." maxlength="300"/>
        <div class="add-section">
            <button @click="add">ADD</button>
            <div class="img-btn" v-if="camera">
                <input type="file" v-on:change="addImg" accept="image/*" id="file">
                <label for="file" >ADD W/ IMAGE</label>
            </div>
        </div>
    </section>
</template>

<script>
import { default as firebase, logEvent, remoteConfig } from '@/firebaseinit';
const db = firebase.firestore();

function generateUniqueId() {
  return new Date().getTime();
}

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
            logEvent('add_post');
            this.addToDb(this.text);
        },
        async addImg(e){
            const file = e.target.files[0];
            const storage = firebase.storage().ref();
            const uid = firebase.auth().currentUser.uid;
            const res = await storage.child(`${uid}/${generateUniqueId()}-${file.name}`).put(file);
            logEvent('add_img_post');
            this.addToDb(this.text, res.ref.fullPath);
        },
        async addToDb(text, img = null){
            const post = {
                text: text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0,
                reports: 0,
                comments: 0,
                imgPath: img
            }
            const ref = await db.collection('posts').add(post);
            const uid = firebase.auth().currentUser.uid;
            await db.collection('users').doc(uid).collection('posts').doc(ref.id).set({timestamp: firebase.firestore.FieldValue.serverTimestamp()});
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

button, [type="file"] + label{
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

.add-section{
    display: flex;
}

.img-btn, button{
    flex: 1;
}

.img-btn{
    display: flex;
}

[type="file"] + label{
    flex: 1;
    text-align: center;
}

[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}
</style>