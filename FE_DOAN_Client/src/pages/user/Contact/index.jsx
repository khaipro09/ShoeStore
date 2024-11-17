import React from "react";
import Hero from "../../../components/Hero";
import { TITLE } from "../../../constants/title";
import { Container } from "../../../styles/styles";
import * as Style from "./style";

function ContactPage() {
  document.title = TITLE.CONTACT;
  return (
    <Style.Contact>
      <Hero title="Liên hệ" />
      <Container>
        <Style.ContactContent>
          <h2>SHOESTORE</h2>
          <p>Website bán giày</p>
        </Style.ContactContent>
      </Container>
    </Style.Contact>
  );
}

export default ContactPage;
