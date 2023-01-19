import logo from "../images/logo.svg";
import { Button } from "./Button";

export const Header = () => {
  return (
    <div className="header_container">
      <div className="header">
        <img src={logo} alt="logo" />

        <div className="blocks">
          <a href="#users">
            <Button text="User" />
          </a>
          <a href="#form">
            <Button text="Sign Up" />
          </a>
        </div>
      </div>
    </div>
  );
};
