<template>
    <section>
        <article>
            {{post.text}}
        </article>
        <div class="responses">
            <ul>
                <li v-for="comment in post.comments" :key="comment.id">
                    {{comment.text}}
                </li>
            </ul>
        </div>
        <div class="input-wrapper">
            <input type="text" v-model="resp" placeholder="Comment something cool.."/>
            <AddButton size="35" :corner="false" v-on:clicked="comment"/>
        </div>
    </section>
</template>

<script>
import firebase from '@/firebaseinit'
const db = firebase.firestore();

const emptyUntilLoaded = {
    text: ''
}

export default {
    async created(){
        db.collection('posts').doc(this.$route.params.id).onSnapshot(doc => {
            this.post = doc.data();
        });
    },
    data(){
        return{
            post: emptyUntilLoaded,
            resp: ''
        }
    },
    methods:{
        comment(){
            db.runTransaction(async transaction => {
                const ref = db.collection('posts').doc(this.$route.params.id)
                const doc = await transaction.get(ref);
                if(!doc.exists){
                    //alert and navigate
                }
                const p = doc.data();
                p.comments.push({
                    id: p.comments.length,
                    text: this.resp
                });
                transaction.update(ref, { comments: p.comments });
            });
            this.resp = '';
        }
    },
    components: {
        AddButton: () => import('@/components/AddButton')
    }
}
</script>

<style scoped>
article{
    border-bottom: 5px solid white;
    padding: 25px;
    background: linear-gradient(rgba(241, 81, 86, 0.65), var(--main-color-red));
}

section{
    height: 100%;
    display: flex;
    flex-direction: column;
}

.responses{
    flex: 1;
    background: linear-gradient(rgba(241, 81, 86, 0.65), var(--main-color-red));
}

.input-wrapper{
    padding: 15px 20px;
    display: flex;
}

input{
    flex: 1;
    border: none;
    width: 100%;
    border-bottom: 3px solid var(--main-color-green);
    font: inherit;
}
</style>