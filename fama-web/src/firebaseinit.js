import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/performance";

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

const logEvent = event => {
    firebase.analytics().logEvent(event);
}

export { logEvent, perf, firebase as default };