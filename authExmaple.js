// this showes how to create 3 types of users in your firestore , Simple sloution 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { saveUser } from "../api"
const db = getFirestore(); //add your config 

async function saveUser(userId, { email, firstName, lastName, role }) {
await setDoc(doc(db, "users", userId), { email, firstName, lastName, role });
}

/** User role should be either ADMIN,ASK or ANSWER for this case it will not be pupuleted with other **/
function signup({ email, password, firstName, lastName, role }) {
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
// Signed in
const user = userCredential.user;
const userId = user.uid;

  // Save new user to database
  saveUser(userId, { email, firstName, lastName, role });
  // wirte Your Own fanction 
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
});


}
