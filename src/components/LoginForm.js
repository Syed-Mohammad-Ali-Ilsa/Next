import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getUserFromCookie, setUserCookie } from "../lib/userCookies";
import { useRouter } from "next/router";

function LoginForm() {

  const route = useRouter();
  let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  let phoneRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
  let emailCheck;
  let phoneCheck;
  const [errorMessage, setErrorMessage] = useState("");

  const [inputValue, setInputValue] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState(getUserFromCookie());
  console.log(user);

  const handleChange = (value = "") => {
    console.log("Value: ", value);
    emailCheck = emailRegex.test(value);
    phoneCheck = phoneRegex.test(value);

    console.log("Email matched", emailCheck);
    console.log("Phone matched", phoneCheck);

    emailCheck
      ? setInputValue(emailCheck)
      : phoneCheck
      ? setInputValue(phoneCheck)
      : setInputValue(false);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello Next");
    const res = inputValue
      ? password
        ? signInWithEmailAndPassword(
            auth,
            e.target.emailPhone.value,
            e.target.password.value
          )
            .then((userCredential) => {
              // Signed in
              user = userCredential.user.accessToken;
              console.log("This is Users response", user);
              setUserCookie(JSON.stringify(user));
              route.replace('/user/dashboard');
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
              console.log(error.message);
            })
        : setErrorMessage(
            "Password must contain atleast one Capital, one small, one symbol and one digit"
          )
      : setErrorMessage("Email must contain @sample.com");

    console.log("This is the response: ", res);
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

    setPassword(
      /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        value.length > 6 &&
        value.length < 20
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p>{errorMessage}</p>
      <label className={styles.inputHeadings}>Email or Phone</label>
      <input
        name="emailPhone"
        className={styles.inputField}
        type="text"
        onChange={(e) => handleChange(e.target.value)}
      />

      <label className={styles.inputHeadings}>Password</label>
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
  );
}

export default LoginForm;
