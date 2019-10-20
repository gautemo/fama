<template>
    <section>
        <div v-show="!signedIn" id="firebaseui-auth-container"></div>
        <div v-if="signedIn">
            <h3 class="cred">Street cred: {{cred}}</h3>
            <div class="list posts">
                <h3>My posts</h3>
                <ul>
                    <li v-for="post in posts" :key="post.id">
                        {{post.text}}
                    </li>
                </ul>
            </div>
            <div class="list comments">
                <h3>My comments</h3>
                <ul>
                    <li v-for="comment in comments" :key="comment.id">
                        {{comment.text}}
                    </li>
                </ul>
            </div>
            <div class="buttons">
                <button @click="signOut">SIGN OUT</button>
                <button @click="deleteAccount">DELETE ACCOUNT</button>
            </div>
        </div>
    </section>
</template>

<script>
import { logEvent, default as firebase } from '@/firebaseinit'
import 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
const db = firebase.firestore();
const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default {
    created(){
        firebase.auth().onAuthStateChanged(user => {
            if (user && !user.isAnonymous) {
                this.signedIn = true;
                this.loadPosts(user);
                this.loadComments(user);
                logEvent('signed_in_profile');
            }else{
                this.signedIn = false;
                this.showSignInUi();
                logEvent('to_profile_sign_in_ui');
            }
        });
    },
    data(){
        return {
            signedIn: false,
            postsId: [],
            posts: [],
            comments: [],
            cred: 0
        }
    },
    methods: {
        async loadPosts(user){
            const ref = await db.collection('users').doc(user.uid).collection('posts').orderBy('timestamp', 'desc').get();
            for(const doc of ref.docs){
                const post = await db.collection('posts').doc(doc.id).get();
                if(post.exists){
                    const data = post.data();
                    this.posts.push({id: doc.id, text: data.text});
                    this.cred += (data.likes * 25) + (data.comments * 10);
                }else{
                    //TODO: delete from user
                }
            }
        },
        async loadComments(user){
            const ref = await db.collection('users').doc(user.uid).collection('comments').orderBy('timestamp', 'desc').get();
            for(const doc of ref.docs){
                const postId = doc.data().postId;
                const comment = await db.collection('posts').doc(postId).collection('comments').doc(doc.id).get();
                if(comment.exists){
                    this.comments.push({id: doc.id, text: comment.data().text});
                    this.cred += 5;
                }else{
                    //TODO: delete from user
                }
            }
        },
        showSignInUi(){
            const uiConfig = {
                autoUpgradeAnonymousUsers: true,
                signInSuccessUrl: "/profile",
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    signInFailure: async error => {
                        if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                            return Promise.resolve();
                        }
                        const cred = error.credential;

                        //TODO: Get all user data
                        //TODO: Delete all user data
                        
                        await firebase.auth().signInWithCredential(cred);

                        //TODO: Add all user data
                    },
                    uiShown: () => {
                        document.querySelectorAll('.firebaseui-list-item>button').forEach(el => el.addEventListener('click', e => logEvent('started_email_sign_in')));
                    }
                }
            };
            ui.start('#firebaseui-auth-container', uiConfig);
        },
        signOut(){
            firebase.auth().signOut();
        },
        deleteAccount(){
            firebase.auth().currentUser.delete().then(function() {
                logEvent('user_deleted');
            }).catch(function(error) {
                alert('Could not delete account, only recently signed in accounts can be deleted. Please try to sign out, sign in and delete again.');
            });
        }
    }
}
</script>

<style scoped>
section{
    height: 100%;
}

#firebaseui-auth-container{
    display: flex;
    align-items: center;
    height: 100%;
}

.list{
    padding: 15px 0 5px 0;
}

.posts{
    background: linear-gradient(var(--faded-color-orange), var(--main-color-orange));
    border-bottom: 3px solid white;
}

.comments{
    background: linear-gradient(var(--faded-color-red), var(--main-color-red));
}

.list h3{
    border-bottom: 2px solid var(--main-color-green);
    margin-top: 0;
    display: inline-block;
    margin-left: 15px;
}

li{
    border-bottom: 2px solid white;
    padding: 15px 5px 0 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
}

li:last-child{
    border-bottom: none;
}

.buttons{
    display: flex;
    margin: 20px 5px 5px 5px;
}

.buttons button{
    flex: 1; 
    border: 1px solid rgba(128, 128, 128, 0.3);
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    font-size: 1em;
}

.cred{
    margin: 15px;
    border-bottom: 2px solid var(--main-color-green);
    display: inline-block;
}
</style>