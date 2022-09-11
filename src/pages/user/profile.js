<<<<<<< HEAD
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";
import styles from "../../styles/Home.module.css";
import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";



export const getServerSideProps = ({ req, res }) => {
  const user = getCookie("auth", { req, res });
  console.log("This is server side cookie: ", user);

  if (user === undefined) {
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
=======
import React from 'react'

function profile() {
  return (
    <div>profile</div>
  )
}

export default profile
>>>>>>> 8bfc36669512b1d6b44725613ef12035939494d2
