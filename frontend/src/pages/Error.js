import React from "react";
import PageContent from "../components/PageContents";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "An Error occurred";
  let message = "SomeThings wrong!!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }
  if (error.status === 404) {
    title = "Not Found!";
    message = "Cound not find resource";
  }
  return (
    <>
      <MainNavigation></MainNavigation>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
