const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.handleReport = functions.region('europe-west1').firestore
    .document('posts/{id}')
    .onUpdate(async (change, context) => {
        const post = change.after.data();
        const score = post.comments.length + post.likes;
        if(post.reports > 2 && post.reports * 3 > score){
            const removed = admin.firestore().collection('removedPosts');
            await removed.doc(change.after.ref.id).set(post);
            await change.after.ref.delete();
        }
    });