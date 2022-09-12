import React, { useState } from "react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";
import styles from "../../styles/Home.module.css";
import { getCookie } from "cookies-next";
import { currentUser } from "../../firebase";
import { removeUserCookie } from "../../lib/userCookies";
import { authenticateUser } from "../../firebase/admin";
// import { adminApp } from "../../firebase/admin";


export const getServerSideProps = ({ req, res }) => {
  let user = getCookie("auth", { req, res }) || null;

  const response = authenticateUser(user);

  console.log("this is our res: ", response);

  

  console.log("User in cookies: ", user);
  // console.log("User in auth: ", a()(user));
  
  if (user === null || user !== currentUser) {
    removeUserCookie();
    user = null;

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


  return (
    <div className={styles.loginForm}>
      <Header userToken={user} />
      <h2>Login with Email</h2>
      <LoginForm />
    </div>
  ) 
};

export default login;
