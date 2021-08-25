import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

/**
 * The firebase configuration. Information is 
 * according to the project created in firebase. 
 */
const firebaseConfig = {
    apiKey: 'AIzaSyBBHzPsXDrmnaBa4xz2jTqrg-BfbFdUAK4',
    authDomain: 'notetakingapplication-7c312',
    databaseURL: 'https://notetakingapplication-7c312-default-rtdb.firebaseio.com/',
    projectId: 'notetakingapplication-7c312',
    storageBucket: 'notetakingapplication-7c312.appspot.com',
    messagingSenderId: '317956323910',
    appId: '1:317956323910:ios:abc6d555030202273fe847',
  };
  
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  
  export { firebase };