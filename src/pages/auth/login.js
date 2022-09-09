import React, { useState } from "react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import styles from "../../styles/Home.module.css";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { handleClientScriptLoad } from "next/script";
import LoginFormPhone from "../../components/LoginFormPhone";

export const getServerSideProps = ({ req, res }) => {
  const user = getCookie("auth", { req, res }) || null;
  console.log("This is server side cookie: ", user);

  if (user === null) {
    return {
      props: { user },
    };
  } else {
    return {
      redirect: {
        destination: "/user/dashboard",
        permanent: false,
      },
    };
  }
};

const login = ({ user }) => {
  let mode = "email";

  const handleToggleMode = () => {
    console.log("mode before: ", mode);
    mode === "email" ? (mode = "phone") : (mode = "email");
    console.log("mode after: ", mode);
  };

  return mode === "email" ? (
    <div className={styles.loginForm}>
      <Header userToken={user} />
      <h2>Login with Email</h2>
      <button onClick={handleToggleMode}>Login with Phone? </button>

      <LoginForm />
    </div>
  ) : (
    <div className={styles.loginForm}>
      <Header userToken={user} />
      <h2>Login with Phone</h2>
      <button onClick={handleToggleMode}>Login with Phone? </button>

      <LoginFormPhone />
    </div>
  );
};

export default login;
