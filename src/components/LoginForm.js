<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../firebase";
import { getUserFromCookie, setUserCookie } from "../lib/userCookies";
import { useRouter } from "next/router";
import LoginFormPhone from "./LoginFormPhone";

function LoginForm({}) {
  const route = useRouter();
  let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const [errorMessage, setErrorMessage] = useState("");
  const [mode, setMode] = useState("email");

  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(getUserFromCookie());

  const handleChange = (value = "") => {
    emailRegex.test(value)
      ? setInputValue(value)
      : setInputValue("");
  };


  // const setRecaptcha = () => {
  //   setRecaptchaVerifier(
  //     new RecaptchaVerifier(
  //       "smsButton",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         },
  //       },
  //       auth
  //     )
  //   );
  // };

  // const signInPhone = () => {
  //   // var appVerifier = recaptchaVerifier;
  //   signInWithPhoneNumber(
  //     auth,
  //     document.getElementById("emailPhone").value,
  //     recaptchaVerifier
  //   )
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       setErrorMessage("SMS sent please check your phone.");
  //       setConfirmationResult(confirmationResult);
  //       showVarificationCode();
  //       alert("set");
  //       // ...
  //     })
  //     .catch((error) => {
  //       setErrorMessage("Couldn't Send SMS.");
  //     });
  // };

  const onSignInSubmit = (value) => {
    const code = value;
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        user = result.user.accessToken;

        setUserCookie(JSON.stringify(user));
        route.replace("/user/dashboard");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        setErrorMessage(error.message);
      });
=======
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

function LoginForm() {
  var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  var phoneRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;

  const [inputValue, setInputValue] = useState(false);
  const [password, setPassword] = useState(false);

  const handleChange = (value = "") => {
    console.log("Value: ", value);
    let emailCheck = emailRegex.test(value);
    let phoneCheck = phoneRegex.test(value);

    console.log("Email matched", emailCheck);
    console.log("Phone matched", phoneCheck);

    emailCheck
      ? setInputValue(emailCheck)
      : phoneCheck
      ? setInputValue(phoneCheck)
      : setInputValue(false);

    setInputValue(value);
>>>>>>> 8bfc36669512b1d6b44725613ef12035939494d2
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    inputValue !== "" &&
      password !== "" &&
      signInWithEmailAndPassword(auth, inputValue, password)
        .then((userCredential) => {
          // Signed in
          user = userCredential.user.accessToken;
          setUserCookie(JSON.stringify(user));
          route.replace("/user/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage(
            error.message.includes("auth/user-not-found")
              ? "User not Found."
              : error.message.includes("auth/wrong-password")
              ? "Incorrect Password."
              : "Firebase Error."
          );
        });
=======
>>>>>>> 8bfc36669512b1d6b44725613ef12035939494d2
  };

  const handlePassword = (value = "") => {
    console.log(
      "Password matched",
      /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        value.length > 6 &&
        value.length < 20
    );
<<<<<<< HEAD
=======

>>>>>>> 8bfc36669512b1d6b44725613ef12035939494d2
    setPassword(
      /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        value.length > 6 &&
        value.length < 20
<<<<<<< HEAD
        ? value
        : ""
    );
  };

  return mode === "email" ? (
    <>
      <button
        onClick={() => {
          mode === "email" ? setMode("phone") : setMode("email");
        }}
      >
        Login with Phone?
      </button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>{errorMessage}</p>
        <label className={styles.inputHeadings}>Email or Phone</label>
        <input
          name="emailPhone"
          id="emailPhone"
          className={styles.inputField}
          type="text"
          onChange={(e) => handleChange(e.target.value)}
        />

        <label className={styles.inputHeadings}>Password</label>
        <input
          name="password"
          className={styles.inputField}
=======
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputField}>
        <label className={styles.inputButton}>Email or Phone</label>
        <input type="text" onChange={(e) => handleChange(e.target.value)} />
      </div>
      <div className={styles.inputField}>
        <label className={styles.inputButton}>Password</label>
        <input
>>>>>>> 8bfc36669512b1d6b44725613ef12035939494d2
          type="password"
          onChange={(e) => {
            handlePassword(e.target.value);
          }}
          min="6"
          max="20"
        />
<<<<<<< HEAD

        <div className={styles.inputHeadings}>
          <input
            className={`${styles.inputButton} ${styles.secondaryColor}`}
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </>
  ) : (
    <>
      <button
        onClick={() => {
          mode === "email" ? setMode("phone") : setMode("email");
        }}
      >
        Login with Email?
      </button>
      <LoginFormPhone />
    </>
=======
      </div>
      <div className={styles.inputButton}>
        <input type="submit" value="Login" />
      </div>
    </form>
>>>>>>> 8bfc36669512b1d6b44725613ef12035939494d2
  );
}

export default LoginForm;
