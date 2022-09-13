import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { getUserFromCookie, removeUserCookie } from "../lib/userCookies";
import { useSession } from "next-auth/react";


const Header = ({ userToken }) => {
  const [user, setUser] = useState(userToken);
  const route = useRouter();

  // const { data: session, status } = useSession();

  // console.log("Session Data: ", session);
  // console.log("Session Status: ", status);

  

  const handleLogout = (e) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        removeUserCookie();
        setUser(getUserFromCookie());
        route.replace("/auth/login");
      })
      .catch((error) => {
        // An error happened.
        const errorMessage = error.message;
      });
  };

  return user !== null ? (
    <ul className={`${styles.header} ${styles.left}`}>
      <li className={styles.left}>
        <Link className={styles.link} href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className={styles.link} href="/user/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <Link className={styles.link} href="/user/profile">
          Profile
        </Link>
      </li>
      <li>
        <a className={styles.link} onClick={handleLogout}>
          Logout
        </a>
      </li>
    </ul>
  ) : (
    <ul className={`${styles.header} ${styles.right}`}>
      <li className={styles.left}>
        <Link className={styles.link} href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className={styles.link} href="/auth/login">
          Login
        </Link>
      </li>
      <li>
        <Link className={styles.link} href="/auth/register">
          Sign Up
        </Link>
      </li>
    </ul>
  );
};

export default Header;
