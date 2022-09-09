import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";
import { getUserFromCookie, setUserCookie } from "../lib/userCookies";
import { useRouter } from "next/router";

function LoginFormPhone() {
  const route = useRouter();
  let phoneRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState();
  const [confirmationResult, setConfirmationResult] = useState();
  const [opt, setOtp] = useState(false);

  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    setRecaptcha();
  }, [recaptchaVerifier]);

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
      document.getElementById("phone").value,
      recaptchaVerifier
    )
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setErrorMessage("SMS sent please check your phone.");
        setConfirmationResult(confirmationResult);
        setOtp(true);
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
    //   ? signInEmail(e.target.phone.value, e.target.password.value)
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <p>{errorMessage}</p>
      <label className={styles.inputHeadings}>Email or Phone</label>
      <input
        name="phone"
        id="phone"
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

      {otp && (
        <div>
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
        </div>
      )}
    </form>
  );
}

export default LoginFormPhone;
