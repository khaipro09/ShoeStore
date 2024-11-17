import React from "react";
import { useSelector } from "react-redux";
import LoadingOverlay from "../LoadingOverlay";

function Notify() {
  const { load } = useSelector((state) => state.commonReducer);
  return <>{load && <LoadingOverlay />}</>;
}

export default Notify;
