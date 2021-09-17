import { useState, useEffect } from "react";
import { db, auth, collection, addDoc } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupUserWithEmailAndPassword = async (iUser: {
  email: string;
  fullname: string;
  username: string;
  password: string;
}) => {
  // validate credentails first..

  console.log("user email ", iUser.email, "user pass: ", iUser.password);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      iUser.email,
      iUser.password
    );
    console.log("userCredential", userCredential);
    const user = userCredential.user;
    console.log("user signed in: ", user);
    console.log("user id: ", user.uid);

    // set user to redux state

    // create user in firestore
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: iUser.email,
      fullname: iUser.fullname,
      username: iUser.username,
      password: iUser.password,
      isVerified: false,
    });
    console.log("document written with ID: ", docRef.id);

    // set user token to local storage
    window.localStorage.setItem("token", user.uid);
  } catch (error) {
    console.error("error!: ", error);
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log("errorMessage: ", errorMessage);
  }
};

export { SignupUserWithEmailAndPassword };
