import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

import { auth } from "../firebase";
import { getUserFromCookie, removeUserCookie } from "../lib/userCookies";


const Header = ({ userToken }) => {

  const [user, setUser] = useState(userToken);

  console.log("This is auth in header: ", user);
  const route = useRouter();

  const handleLogout = (e) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        removeUserCookie();
        setUser(getUserFromCookie());
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
        <button className={styles.link} href="/auth/login"  onClick={handleLogout}>
          Logout
        </button>
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
