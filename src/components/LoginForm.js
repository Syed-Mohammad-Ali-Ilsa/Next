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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className={styles.inputField}>
        <label className={styles.inputButton}>Email or Phone</label>
        <input type="text" onChange={(e) => handleChange(e.target.value)} />
      </div>
      <div className={styles.inputField}>
        <label className={styles.inputButton}>Password</label>
        <input
          type="password"
          onChange={(e) => {
            handlePassword(e.target.value);
          }}
          min="6"
          max="20"
        />
      </div>
      <div className={styles.inputButton}>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
}

export default LoginForm;
