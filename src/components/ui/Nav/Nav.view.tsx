import React from "react";

import classes from "./Nav.module.scss";

const NavView = () => {
  return (
    <nav className={classes["nav"]}>
      <div className={classes["innerNav"]}>
        <span className={classes["navLink"]}>History</span>
        <button className={classes["navLinkButton"]}>NEW RECONCILIATION</button>
      </div>
    </nav>
  );
};

NavView.displayName = "Nav";
NavView.defaultProps = {};

export default NavView;
