import { Button } from "antd";
import React from "react";

import { Container } from "../../../../../styles/styles";
import history from "../../../../../utils/history";

import * as Style from "./style";

function SectionHome({ title, text, params, children, noContainer }) {
  return (
    <Style.Section>
      <Style.SectionHeading>
        <Style.SectionTitle>{title}</Style.SectionTitle>
      </Style.SectionHeading>
      {noContainer ? <>{children}</> : <Container>{children}</Container>}
      {text && (
        <Style.Button>
          <Button type="default" onClick={() => history.push(params)}>
            {text}
          </Button>
        </Style.Button>
      )}
    </Style.Section>
  );
}

export default SectionHome;
