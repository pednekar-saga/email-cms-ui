import React, { useEffect } from "react";

import { Layout } from "antd";
import Navbar from "../Navbar";
import ContentWrapper from "../ContentWrapper";
import { setItem } from "../../shared/store";
import FooterWrap from "../FooterWrap";

function Home(props) {
  const goto = url => props.history.push(url);
  console.log();
  useEffect(() => {
    const token = props.history.location.search.split("=")[1];
    if (token) {
      setItem("token", token);
      goto("/");
    } else {
      console.log("Please login");
    }
  }, []);

  return (
    <>
      <Layout>
        <Navbar />
        <ContentWrapper />
        {/* <FooterWrap /> */}
      </Layout>
    </>
  );
}
export default Home;
