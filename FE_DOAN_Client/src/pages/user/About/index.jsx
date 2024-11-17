import Hero from "../../../components/Hero";
import { TITLE } from "../../../constants/title";

function AboutPage() {
  document.title = TITLE.ABOUT;
  return (
    <div>
      <Hero title="Giới Thiệu" /> About Page
    </div>
  );
}

export default AboutPage;
