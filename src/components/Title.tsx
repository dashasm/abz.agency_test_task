import background from "../images/background.jpeg";
import { Button } from "./Button";

export const Title = () => {
  return (
    <div className="block">
      <div className="title">
        <div className="gradient">
          <img src={background} alt="background" className="gradient_image" />
        </div>

        <div className="title_container">
          <h1 className="title_h1">Test assignment for front-end developer</h1>
          <p className="title_content">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>

          <a href="#form">
            <Button text="Sign Up" />
          </a>
        </div>
      </div>
    </div>
  );
};
