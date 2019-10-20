import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/performance";
import "firebase/auth";
import "firebase/remote-config";

const firebaseConfig = {
    apiKey: "AIzaSyBauetwfNZVpw-hi_xbDO9XtWZN7KujRhE",
    authDomain: "fama-social-feed.firebaseapp.com",
    databaseURL: "https://fama-social-feed.firebaseio.com",
    projectId: "fama-social-feed",
    storageBucket: "fama-social-feed.appspot.com",
    messagingSenderId: "676767442584",
    appId: "1:676767442584:web:1dbc7375f1241278fb12ed",
    measurementId: "G-P48R198ZYZ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const perf = firebase.performance();
const remoteConfig = firebase.remoteConfig();
remoteConfig.settings = {
    minimumFetchIntervalMillis: 1000 * 60,
};
remoteConfig.defaultConfig = ({
    'allow_reporting': 'true',
    'upload_photos': 'false'
});
remoteConfig.fetchAndActivate();

const logEvent = event => {
    firebase.analytics().logEvent(event);
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("signed in");
        firebase.analytics().setUserId(user.uid);
    } else {
        firebase.auth().signInAnonymously().catch(function (error) {
            console.error(`${error.code}: ${error.message}`);
        });
    }
});

export { logEvent, perf, remoteConfig, firebase as default };