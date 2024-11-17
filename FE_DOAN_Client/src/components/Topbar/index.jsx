import React from "react";
import * as Style from "./styles";
function TopBar({ text }) {
  return (
    <Style.TopBar>
      <Style.TopBarText>{text}</Style.TopBarText>
    </Style.TopBar>
  );
}

export default TopBar;
