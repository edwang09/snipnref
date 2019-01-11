import React, { Component } from "react";

class Usefulsites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currenttab : 0
    };
  }
  switchtab = (id)=>(e)=>{
    this.setState({currenttab:id})
  }
  render() {
    const { sitelist } = this.props;
    let sitenavRender;
    let sitelistRender;
    if ( sitelist.length > 0 ) {
      sitenavRender = sitelist.map((cat, id) => {
        let className;
        if (id === this.state.currenttab) {
          className = "tab-item active";
        } else {
          className = "tab-item";
        }
        return (
          <a
            key={id}
            className={className}
            onClick={this.switchtab(id)}
          >
            {cat.name}
          </a>
        );
      });
      sitelistRender = sitelist.map((cat, tabid) => {
        let className;
        if (tabid === this.state.currenttab) {
          className = "tab-pane show";
        } else {
          className = "tab-pane";
        }
        const sites = cat.content.map((site, urlid) => {
          return (
            <div className="site" key={urlid}>
              <div>
                <a href={site.url} target="_blank" rel="noopener noreferrer">
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
                    <i className="far fa-trash-alt" />
                  </small>
                </span>
              </div>
              <small>{site.description}</small>
            </div>
          );
        });
        return (
          <div
            key={tabid}
            className={className}
            id={cat.name}
          >
            <p className="description" >
              {cat.description}
              <span className="action">
                <small
                  onClick={() =>
                    this.props.loadModal("EDITUSEFULSITETAB_MODAL", {
                      tabkey: tabid
                    })
                  }
                >
                  <i className="far fa-edit" />
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
                  <i className="fas fa-plus" />
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
          <div className="tab-nav" id="nav-tab" role="tablist">
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
