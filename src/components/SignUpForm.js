import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { signUp } from "../firebase/index";
import { useRouter } from "next/router";

function SignUpForm() {
  let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  let phoneRegex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
  let emailCheck;
  let phoneCheck;

  const route = useRouter();
  const [inputValue, setInputValue] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

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

    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello Next");
    console.log("Submit Confirm Password", e.target.confirmPassword.value);
    console.log("Submit Password", e.target.password.value);

    console.log();

    e.target.confirmPassword.value === e.target.password.value &&
    password &&
    confirmPassword &&
    inputValue
      ? signUp(e.target.emailPhone.value, e.target.password.value)
      : console.log("Password didn't Match");

    route.replace("/user/dashboard");
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

  const handleConfirmPassword = (value = "") => {
    console.log(
      "Password matched",
      /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        value.length > 6 &&
        value.length < 20
    );

    setConfirmPassword(
      /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        value.length > 6 &&
        value.length < 20
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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

      <label className={styles.inputHeadings}>Confirm Password</label>
      <input
        name="confirmPassword"
        className={styles.inputField}
        type="password"
        onChange={(e) => {
          handleConfirmPassword(e.target.value);
        }}
        min="6"
        max="20"
      />

      <div className={styles.inputHeadings}>
        <input
          className={`${styles.inputButton} ${styles.secondaryColor}`}
          type="submit"
          value="Sign Up"
        />
      </div>
    </form>
  );
}

export default SignUpForm;
