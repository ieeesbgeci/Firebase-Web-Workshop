import app from "./firebaseConfig";
import auth from "./firebaseAuthConfig";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

//state change handler
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector("span").innerText = "hi " + user.email;
    run(user);
  } else {
    window.location.replace("/index.html");
  }
});

async function run(user) {
  const querySnapshot = await getDocs(
    collection(db, "users/" + user.uid + "/tasks")
  );
  querySnapshot.forEach((doc) => {
    const card = document.createElement("div");
    const task = document.createElement("p");
    task.innerText = doc.data().task;
    card.appendChild(task);
    card.classList.add("taskCard");
    document.querySelector("#allTasks").appendChild(card);
    console.log(doc.id, " => ", doc.data());
  });
}

document.querySelector("#addNewTask").addEventListener("click", () => {
  const task = document.querySelector("#task").value;
  const time = document.querySelector("#time").value;

  const user = getAuth().currentUser;

  addDoc(collection(db, "users/" + user.uid + "/tasks"), {
    task,
    time,
  });
});

//log out
document.querySelector("#logOut").addEventListener("click", () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => console.log(error));
});
