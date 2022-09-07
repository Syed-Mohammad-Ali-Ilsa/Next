import React, { useState } from "react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import styles from "../../styles/Home.module.css";

const login = () => {
  return (
    <div className={styles.loginForm}>
      <Header />
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default login;
