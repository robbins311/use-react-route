import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

const RootLayout = () => {
  // loading중인지 파악하기
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />

      <main>
        {/* {navigation.state === "loading" && <p>loading...</p>} */}
        {/* 라우팅 아울렛 설정(children들) */}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
