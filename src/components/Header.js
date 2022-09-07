import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Header = ({ auth = false }) => {
  return auth === true ? (
    <ul className={`${styles.header} ${styles.left}`}>
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
    </ul>
  ) : (
    <ul className={`${styles.header} ${styles.right}`}>
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
