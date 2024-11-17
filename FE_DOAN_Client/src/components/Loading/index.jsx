import React from "react";
import * as Styles from "./styles";
function Loading(props) {
  return <Styles.CustomLoading spinning={props.load} />;
}

export default Loading;
