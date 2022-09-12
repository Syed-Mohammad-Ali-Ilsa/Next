import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import MyApp from "./_app";
import { useState } from "react";
import { getUserFromCookie, removeUserCookie } from "../lib/userCookies";
import { getCookie } from "cookies-next";
import { auth } from "../firebase";

export const getServerSideProps = ({ req, res }) => {
  let user = getCookie("auth", { req, res }) || null;
  const loggedInUser = auth.currentUser;

  console.log("User in cookies: ", user);
  console.log("User in auth: ", loggedInUser);

  if (user === null || user !== loggedInUser) {
    removeUserCookie();
    user = null;
    return {
      props: { user },
    };
  }
};

export default function Home({ user }) {


  return (
    <div className={styles.container}>
      <Header userToken={user} />
    </div>
  );
}
