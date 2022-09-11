<<<<<<< HEAD
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import MyApp from "./_app";
import { useState } from "react";
import { getUserFromCookie } from "../lib/userCookies";


export default function Home() {

 const userToken = getUserFromCookie();
  return (
    <div className={styles.container}>
      <Header userToken={userToken} />
    </div>
  );
=======
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header auth="false" />
    </div>
  )
>>>>>>> 8bfc36669512b1d6b44725613ef12035939494d2
}
