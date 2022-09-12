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

  const [otp, setOtp] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [user, setUser] = useState(getUserFromCookie());

  const handleChange = (value = "") => {
    setInputValue(value);


    phoneRegex.test(value) ? setInputValue(value) : setInputValue("");

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

    inputValue !== ""
      ? signInWithPhoneNumber(auth, inputValue, recaptchaVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            setErrorMessage("SMS sent please check your phone.");
            setConfirmationResult(confirmationResult);
            setOtp(true);
            alert("OTP sent please Check your phone.");
            // ...
          })
          .catch((error) => {
            setErrorMessage("Couldn't Send SMS.");
          })
      : alert("Please enter a valid Phone number with +92 Prefix.");
  };

  const onSignInSubmit = (value) => {

    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = otpCode;
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

  const handlePassword = (value = "") => {

    value !== "" ? setOtpCode(value) : setOtpCode("");
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
          value="Generate OTP"
          onClick={signInPhone}
          className={`${styles.inputButton} ${styles.secondaryColor}`}
        />
      </div>

      {otp && (
        <>
          <label className={styles.inputHeadings}>OTP</label>
          <input
            name="otp"
            className={styles.inputField}
            type="text"
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
        </>
      )}
    </form>
  );
}

export default LoginFormPhone;
