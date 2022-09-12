import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";
import styles from "../../styles/Home.module.css";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";
import { auth, currentUser } from "../../firebase";
import { removeUserCookie } from "../../lib/userCookies";
import { authenticateUser } from "../../firebase/admin";





export const getServerSideProps = ({ req, res }) => {

  
  let user = getCookie("auth", { req, res }) || null;


  console.log("User in cookies: ", user);
  console.log("User in auth: ", currentUser);
  const response = authenticateUser(user);

  if (user === null) {

      

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

function dashboard({ user }) {
  return (
    <div className={styles.container}>
      <Header userToken={user} />
      <h1>Dashboard</h1>
    </div>
  );
}

export default dashboard;
