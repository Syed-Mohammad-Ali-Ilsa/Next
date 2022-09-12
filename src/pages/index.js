import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import MyApp from "./_app";
import { useState } from "react";
import { getUserFromCookie, removeUserCookie } from "../lib/userCookies";
import { getCookie } from "cookies-next";
import { auth } from "../firebase";
import { authenticateUser } from "../firebase/admin";


export const getServerSideProps = async ({ req, res }) => {
  let user = getCookie("auth", { req, res }) || "";
  let response;
  const userToken = user !== null ? (response = await authenticateUser(user)) : "";

  console.log("This is problem: ", userToken);
  if (userToken === "" || userToken === null ) {
    removeUserCookie();
    user = null;
    return {
      props: { user },
    };
  } else {
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
