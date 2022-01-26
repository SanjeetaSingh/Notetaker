import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// imports from internal file
import config from '../../env'

/**
 * The firebase configuration. Information is 
 * according to the project created in firebase. 
 */

export const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    databaseURL: config.DATABASE_URL,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGESENDER_ID,
    appId: config.APP_ID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };