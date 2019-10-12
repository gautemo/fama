<template>
    <section>
        <PostDisplay :id="$route.params.id" :post="post" :inComment="true" />
        <div class="responses">
            <ul>
                <li v-for="comment in post.comments" :key="comment.id">
                    {{comment.text}}
                </li>
            </ul>
        </div>
        <div class="input-wrapper">
            <input type="text" v-model="resp" placeholder="Comment something cool.." maxlength="200"/>
            <AddButton size="35" :corner="false" v-on:clicked="comment"/>
        </div>
    </section>
</template>

<script>
import { logEvent, default as firebase } from '@/firebaseinit';
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
            if(!this.resp){
                return;
            }
            db.runTransaction(async transaction => {
                const ref = db.collection('posts').doc(this.$route.params.id)
                const doc = await transaction.get(ref);
                if(!doc.exists){
                    //TODO: alert and navigate
                }
                const p = doc.data();
                p.comments.push({
                    id: p.comments.length,
                    text: this.resp
                });
                transaction.update(ref, { comments: p.comments });
                this.resp = '';
            });
            logEvent('add_comment');
        }
    },
    components: {
        AddButton: () => import('@/components/AddButton'),
        PostDisplay: () => import('@/components/PostDisplay')
    }
}
</script>

<style scoped>
article{
    border-bottom: 5px solid white;
    padding: 25px;
    background: linear-gradient(var(--faded-color-red), var(--main-color-red));
}

section{
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.responses{
    flex: 1;
    background: linear-gradient(var(--faded-color-red), var(--main-color-red));
}

.input-wrapper{
    padding: 15px 20px;
    display: flex;
    box-shadow: 0 -1px 1px rgba(0,0,0,0.12), 
                0 -2px 2px rgba(0,0,0,0.12), 
                0 -4px 4px rgba(0,0,0,0.12),
                0 -8px 8px rgba(0,0,0,0.12),
                0 -16px 16px rgba(0,0,0,0.12);
}

input{
    flex: 1;
    border: none;
    width: 100%;
    border-bottom: 3px solid var(--main-color-green);
    font: inherit;
}

li{
    padding: 5px 20px;
    border-bottom: 2px solid white;
    min-height: 50px;
    display: flex;
    align-items: flex-end;
}

li:last-child{
    border: none;
}
</style>