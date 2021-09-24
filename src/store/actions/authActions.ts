import { ThunkAction } from "redux-thunk";

import {
  SignUpData,
  AuthAction,
  SET_USER,
  User,
  SET_LOADING,
  SIGN_OUT,
  SignInData,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
} from "../types";
import { RootState } from "..";
import {
  db,
  auth,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  serverTimestamp,
  doc,
  getDoc,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  query,
  where,
  getDocs,
  setDoc,
} from "../../firebase/config";

// Create User
export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (res.user) {
        const userData: User = {
          id: res.user.uid,
          email: data.email,
          fullName: data.fullName,
          userName: data.userName,
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          email: data.email,
          fullName: data.fullName,
          userName: data.userName,
          createdAt: serverTimestamp(),
        });
        await sendEmailVerification(res.user);
        dispatch({
          type: NEED_VERIFICATION,
        });
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      }
    } catch (error) {
      console.log(error);
      onError();
      if (error instanceof Error) {
        dispatch({
          type: SET_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

// Get user by id
export const getUserById = (
  id: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      console.log("getUserById: ", id);

      const userRequest = auth.currentUser;
      console.log("auth currentUser: ", userRequest);

      // if (userRequest) {
      // const userRef = collection(db, "users");
      // // console.log("userRef: ", userRef);
      // const q = query(userRef, where("id", "==", id));
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
      // doesnt work
      const docRef = doc(db, "users", id);
      console.log("docRef: ", docRef);
      const docSnap = await getDoc(docRef);
      console.log("docSnap: ", docSnap);
      if (docSnap.exists()) {
        console.log("user.exists: ", docSnap.data());
        const userData = docSnap.data() as User;
        console.log("get user by id userData: ", userData);
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      } else {
        console.log("failed to get user by id", docSnap.exists());
      }
      // }

      // const userRef = collection(db, "users");
      // // console.log("userRef: ", userRef);
      // const q = query(userRef, where("id", "==", id));
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });

      /*
      const docRef = doc(db, "users", id);
      console.log("docRef: ", docRef);
      const user = await getDoc(docRef);
      console.log("user: ", user);

      if (user.exists()) {
        console.log("user.exists: ", user.data());
        const userData = user.data() as User;
        console.log("get user by id userData: ", userData);
        dispatch({
          type: SET_USER,
          payload: userData,
        });
      } else {
        console.log("failed to get user by id", user.exists());
      }
      */
    } catch (error) {
      console.log(error);
    }
  };
};

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

// Log in
export const signin = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      /* From the firebase docs
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        */
      console.log("signed in: ", user);
    } catch (error) {
      console.log(error);
      onError();
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    }
  };
};

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await signOut(auth);
      /* From the firebase docs
      .then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      */
      dispatch({
        type: SIGN_OUT,
      });
    } catch (error) {
      console.log("error");
      dispatch(setLoading(false));
    }
  };
};

// Set Error
export const setError = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg,
    });
  };
};

// Set need verification
export const setNeedVerification = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  console.log("setNeedVerification");
  return (dispatch) => {
    dispatch({
      type: NEED_VERIFICATION,
    });
  };
};

// Set success
export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg,
    });
  };
};

// Send password reset email
export const sendPasswordResetByEmail = (
  email: string,
  successMsg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch(setSuccess(successMsg));
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    }
  };
};
