import auth from "./js/firebaseAuthConfig.js";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const inputs = document.getElementsByTagName("input");

//state change handler
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "/app.html";
  } else {
  }
});

//sign up
document.querySelector("#handleSignup").addEventListener("click", () => {
  const email = inputs[0].value;
  const password = inputs[1].value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => console.log(user.user))
    .catch((error) => console.log(error.message));
});

//sign in
document.querySelector("#handleSignin").addEventListener("click", () => {
  const email = inputs[2].value;
  const password = inputs[3].value;
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => console.log(user.user))
    .catch((error) => console.log(error.message));
});

let signUp = true;

document.querySelector("#switchState").addEventListener("click", () => {
  if (!signUp) {
    document.querySelector("#signUpForm").style.display = "none";
    document.querySelector("#logInForm").style.display = "flex";
  } else {
    document.querySelector("#signUpForm").style.display = "flex";
    document.querySelector("#logInForm").style.display = "none";
  }
  signUp = !signUp
});
