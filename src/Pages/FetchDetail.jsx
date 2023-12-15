import React, { useEffect } from "react";
import { sendSessionCode } from "../Services/unAuthServices";

const FetchDetail = () => {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
   if(codeParam){sendSessionCode(codeParam)}
  }, []);

  return <div>FetchDetail</div>;
};

export default FetchDetail;
