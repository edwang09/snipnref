import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

class Sidenav extends Component {
  render() {
    const { navlist, cat, logo } = this.props;
    const navItems = navlist.map(navItem => (
      <Link
        className={classnames("nav-link", {
          active: cat == navItem.cat
        })}
        to={navItem.link}
      >
        {navItem.name}
      </Link>
    ));
    return (
      <div className="nav flex-column nav-pills" aria-orientation="vertical">
        <div>
          <img
            src={require(`../logos/${logo}`)}
            alt=""
            className="w-100 py-3"
          />
        </div>
        {navItems}
      </div>
    );
  }
}

export default Sidenav;
