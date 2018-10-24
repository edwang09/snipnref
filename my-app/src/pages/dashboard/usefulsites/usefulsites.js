import React, { Component } from "react";

class Usefulsites extends Component {
  render() {
    const { sitelist } = this.props;
    let sitenavRender;
    let sitelistRender;
    if (sitelist.length) {
      sitenavRender = sitelist.map((cat, id) => {
        const href = "#" + cat.name;
        let className;
        if (id === 0) {
          className = "nav-item nav-link active";
        } else {
          className = "nav-item nav-link";
        }
        return (
          <a
            className={className}
            data-toggle="tab"
            href={href}
            role="tab"
            aria-controls="nav-categoryone"
          >
            {cat.name}
          </a>
        );
      });
      sitelistRender = sitelist.map((cat, id) => {
        let className;
        if (id === 0) {
          className = "tab-pane fade show active";
        } else {
          className = "tab-pane fade";
        }
        const sites = cat.content.map(site => {
          return (
            <div className="site">
              <a href={site.url} target="_blank">
                <strong>{site.name}</strong>
              </a>
              <small>{site.description}</small>
            </div>
          );
        });
        return (
          <div
            className={className}
            id={cat.name}
            role="tabpanel"
            aria-labelledby="nav-categoryone-tab"
          >
            <p>{cat.description}</p>
            {sites}
          </div>
        );
      });
    }
    return (
      <div className="sitestab">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {sitenavRender}
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          {sitelistRender}
        </div>
      </div>
    );
  }
}
export default Usefulsites;
