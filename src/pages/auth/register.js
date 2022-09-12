import React from "react";
import Header from "../../components/Header";
import SignUpForm from "../../components/SignUpForm";
import styles from "../../styles/Home.module.css";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { auth, currentUser } from "../../firebase";
import { removeUserCookie } from "../../lib/userCookies";

export const getServerSideProps = ({ req, res }) => {
  let user = getCookie("auth", { req, res }) || null;

  console.log("User in cookies: ", user);
  console.log("User in auth: ", currentUser);

  if (user !== null && user === currentUser) {
    return {
      redirect: {
        destination: "/user/dashboard",
        permanent: false,
      },
    };
  } else {
    user = null;
    return {
      props: { user },
    };
  }
};

function register({ user }) {
  return (
    <div className={styles.loginForm}>
      <Header userToken={user} />
      <h2>Register</h2>
      <SignUpForm />
    </div>
  );
}

export default register;
