import React from "react";
import Header from "../../components/Header";
import SignUpForm from "../../components/SignUpForm";
import styles from "../../styles/Home.module.css";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";



export const getServerSideProps = ({ req, res }) => {
  const user = getCookie("auth", { req, res }) || null;
  console.log("This is server side cookie: ", user);

  if (user !== null) {
    return {
      redirect: {
        destination: "/user/dashboard",
        permanent: false,
      },
    };
  }
  else {
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
