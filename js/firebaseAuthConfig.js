import app from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export default auth;