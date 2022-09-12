import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";
import styles from "../../styles/Home.module.css";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { removeUserCookie } from "../../lib/userCookies";
import { auth, currentUser } from "../../firebase";
import { authenticateUser } from "../../firebase/admin";




export const getServerSideProps = async ({ req, res }) => {
  let user = getCookie("auth", { req, res }) || null;
  let userToken = user;
  let response;
  console.log("User in cookies: ", user);
  console.log("User in auth: ", currentUser);
  userToken = user !== null ? (response = await authenticateUser(user)) : "";

  if (userToken === "") {
    console.log("this is our res: ", response);
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
