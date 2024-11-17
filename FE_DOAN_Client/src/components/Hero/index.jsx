import React from "react";
import BreadcrumbUI from "../Breadcrumb";
import * as Style from "./style";

function Hero({ title }) {
  return (
    <Style.Hero>
      <Style.Breadcrumb>
        <BreadcrumbUI />
      </Style.Breadcrumb>

      <Style.HeroTitle>{title}</Style.HeroTitle>
    </Style.Hero>
  );
}

export default Hero;
