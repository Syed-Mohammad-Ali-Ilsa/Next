import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";
import styles from "../../styles/Home.module.css";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { removeUserCookie } from "../../lib/userCookies";
import { auth, currentUser } from "../../firebase";



export const getServerSideProps = ({ req, res }) => {
  let user = getCookie("auth", { req, res }) || null;


  console.log("User in cookies: ", user);
  console.log("User in auth: ", currentUser);

  if (user === null || user !== currentUser) {
    removeUserCookie();
    user = null;
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

function profile({ user }) {
  return (
    <div className={styles.container}>
      <Header userToken={user} />
      <h1>Profile</h1>
    </div>
  );
}

export default profile;
