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

function LoginForm({ mode = "email", handleToggleMode }) {
  const route = useRouter();

  let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  let phoneRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
  const [emailCheck, setEmailCheck] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState();
  const [confirmationResult, setConfirmationResult] = useState();

  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState(true);
  const [user, setUser] = useState(getUserFromCookie());

  const handleChange = (value = "") => {
    setInputValue(value);
    setEmailCheck(emailRegex.test(value));
    setPhoneCheck(phoneRegex.test(value));

    emailCheck
      ? setInputValue(emailCheck)
      : phoneCheck
      ? setInputValue(phoneCheck)
      : setInputValue(false);
  };

  const signInEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
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
  };

  useEffect(() => {
    setRecaptcha();
  }, []);

  const setRecaptcha = () => {
    setRecaptchaVerifier(
      new RecaptchaVerifier(
        "smsButton",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      )
    );
  };

  const signInPhone = () => {
    // var appVerifier = recaptchaVerifier;
    signInWithPhoneNumber(
      auth,
      document.getElementById("emailPhone").value,
      recaptchaVerifier
    )
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setErrorMessage("SMS sent please check your phone.");
        setConfirmationResult(confirmationResult);
        showVarificationCode();
        alert("set");
        // ...
      })
      .catch((error) => {
        setErrorMessage("Couldn't Send SMS.");
      });
  };

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const res = emailCheck
    //   ? signInEmail(e.target.emailPhone.value, e.target.password.value)
    //   : phoneCheck
    //   ? onSignInSubmit(e.target.password.value)
    //   : setErrorMessage("Please enter Valid Phone number or Email");
  };

  const handlePassword = (value = "") => {
    // console.log(
    //   "Password matched",
    //   /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) &&
    //     /[a-z]/.test(value) &&
    //     /\d/.test(value) &&
    //     value.length > 6 &&
    //     value.length < 20
    // );
    // setPassword(
    //   /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) &&
    //     /[a-z]/.test(value) &&
    //     /\d/.test(value) &&
    //     value.length > 6 &&
    //     value.length < 20
    // );
  };

  return (
    <>
      <button onClick={handleToggleMode}>Login with Phone? </button>
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

        <div className={styles.inputHeadings}>
          <input
            type="button"
            id="smsButton"
            value="Login"
            onClick={signInPhone}
            className={`${styles.inputButton} ${styles.secondaryColor}`}
          />
        </div>

        <label className={styles.inputHeadings}>Password or OTP</label>
        <input
          name="password"
          className={styles.inputField}
          type="password"
          onChange={(e) => {
            handlePassword(e.target.value);
          }}
          min="6"
          max="20"
        />

        <div className={styles.inputHeadings}>
          <input
            className={`${styles.inputButton} ${styles.secondaryColor}`}
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </>
  );
}

export default LoginForm;
