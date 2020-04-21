import * as actionType from "../actions/actionTypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
  };
};

export const logOut = () => {
  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDOk-XlU6rZCbt9JFB9E3zBGqCGHiSSNk";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDOk-XlU6rZCbt9JFB9E3zBGqCGHiSSNk";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

// // <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-analytics.js"></script>

// <script>
//    Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyDDOk-XlU6rZCbt9JFB9E3zBGqCGHiSSNk",
//     authDomain: "burgerbuilder-7940b.firebaseapp.com",
//     databaseURL: "https://burgerbuilder-7940b.firebaseio.com",
//     projectId: "burgerbuilder-7940b",
//     storageBucket: "burgerbuilder-7940b.appspot.com",
//     messagingSenderId: "558832565598",
//     appId: "1:558832565598:web:be95d10f7f7bf554e623cf",
//     measurementId: "G-E955TXEBJY"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>

// "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDOk-XlU6rZCbt9JFB9E3zBGqCGHiSSNk";
