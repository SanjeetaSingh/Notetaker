import { firebase } from '../config'

export async function loginUser(email, password) {
    try {
        firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user.uid
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .get()
                        .then(firestoreDocument => {
                            if (!firestoreDocument.exists) {
                                alert("User does not exist anymore.")
                                return;
                            }
                        })
                        .catch(error => {
                            alert(error)
                        });
                })
                .catch(error => {
                    alert(error)
                })
    } catch (error){
        console.log(error);
    }
}

export async function registerUser(fullName, email, password) {
    try {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((response) => {
                        const uid = response.user.uid
                        const data = {
                            id: uid,
                            email,
                            fullName,
                        };
                        const usersRef = firebase.firestore().collection('users')
                        usersRef
                            .doc(uid)
                            .set(data)
                            .catch((error) => {
                                alert(error)
                            });
                    })
                    .catch((error) => {
                        alert(error)
                });
    } catch (error) {
        console.log(error);

        return false;
    }
}
