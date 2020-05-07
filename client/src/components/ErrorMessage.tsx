import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

function ErrorMessage() {
  const error = useSelector((state: RootState) => state.error);
  //   console.log("error", error);
  return <>{error.message && <div className="error">{error.message}</div>}</>;
}

export default ErrorMessage;
