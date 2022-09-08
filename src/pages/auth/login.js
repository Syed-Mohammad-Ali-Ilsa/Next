import React, { useState } from "react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import styles from "../../styles/Home.module.css";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";




export const getServerSideProps = ({ req, res }) => {
  const user = getCookie("auth", { req, res }) || null;
  console.log("This is server side cookie: ", user);

  if (user === null) {
    
    return {
      props: { user },
    };
  }
  else {
    return {
      redirect: {
        destination: "/user/dashboard",
        permanent: false,
      },
    };
  }

  
};

const login = ({ user }) => {
  return (
    <div className={styles.loginForm}>
      <Header userToken={user} />
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default login;
