import React, { Fragment } from "react";
import { Card } from "reactstrap";
import { Btn, LI } from "Core/Components";
import { LogOut } from "react-feather";
import { useNavigate } from "react-router-dom";

const LogoutClass = () => {
  const history = useNavigate();
  const Logout = () => {
    history(`${process.env.PUBLIC_URL}/logout`);
  };

  return (
    <Fragment>
      <LI attrLI={{ className: "onhover-dropdown p-0", onClick: Logout }}>
        <Btn attrBtn={{ as: Card.Header, className: "btn btn-primary-light", color: "default" }}>
          <LogOut />
          Log out
        </Btn>
      </LI>
    </Fragment>
  );
};

export default LogoutClass;
