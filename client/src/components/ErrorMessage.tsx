import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

function ErrorMessage() {
  const error = useSelector((state: RootState) => state.error);
  //   console.log("error", error);
  return <div>{error.message && <div>{error.message}</div>}</div>;
}

export default ErrorMessage;
