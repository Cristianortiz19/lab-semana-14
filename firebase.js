
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNL9fS2bhLWplcdozQU-7LpWgYRTUd_wQ",
  authDomain: "cristian-todo-list.firebaseapp.com",
  projectId: "cristian-todo-list",
  storageBucket: "cristian-todo-list.appspot.com",
  messagingSenderId: "594569578294",
  appId: "1:594569578294:web:a9658f2b6ab4609fed9597",
  measurementId: "G-FWHW277FKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getTasks() {
  const allTasks = [];

  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc) => {
  //console.log(`${doc.id} => ${doc.data()}`);
  allTasks.push({...doc.data(), id: doc.id});
  });
  return allTasks;
}


export async function addTask(taskTitle) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: taskTitle,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export async function editDocument(title, id) {
  await setDoc(doc(db, "tasks", id), {
    title: title,
    completed: true,
  });
}
