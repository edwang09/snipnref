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
      sitelistRender = sitelist.map((cat, tabid) => {
        let className;
        if (tabid === 0) {
          className = "tab-pane fade show active";
        } else {
          className = "tab-pane fade";
        }
        const sites = cat.content.map((site, urlid) => {
          return (
            <div className="site">
              <div>
                <a href={site.url} target="_blank" className="d-inline">
                  <strong>{site.name}</strong>
                </a>
                <span className="action">
                  <small
                    onClick={() =>
                      this.props.loadModal("CONFIRM_MODAL", {
                        tabkey: tabid,
                        urlkey: urlid
                      })
                    }
                  >
                    <i class="far fa-trash-alt" />
                  </small>
                </span>
              </div>
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
            <p>
              {cat.description}
              <span className="action">
                <small
                  onClick={() =>
                    this.props.loadModal("EDITUSEFULSITETAB_MODAL", {
                      tabkey: tabid
                    })
                  }
                >
                  <i class="far fa-edit" />
                </small>
              </span>
              <span className="action">
                <small
                  onClick={() =>
                    this.props.loadModal("ADDUSEFULSITEITEM_MODAL", {
                      tabkey: tabid
                    })
                  }
                >
                  <i class="fas fa-plus" />
                </small>
              </span>
            </p>
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
