import React, { Component } from "react";
import axios from "axios";
import { loadModal } from "../../../actions/modalActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Karaokeclient extends Component {
  constructor(props) {
    super(props);
    this.top = React.createRef();
    this.state = {
      controller:false,
      room:"",
      currentroom: {},
      search:""
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    
  }
  seachChange = () => e => {
    this.setState({search:e.target.value})
  }
  submitSearch= () => e => {
    e.preventDefault()
    axios.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyACXG0BY_of5_4SHtgG8H9bVrHrUVnfX24&part=snippet&maxResults=25&q="+ this.state.search).then(res=>{
    console.log(res.data)  
    this.setState({
        nextPageToken:res.data.nextPageToken,
        prevPageToken :res.data.prevPageToken,
        items: res.data.items
      })
      console.log(res.data.items)
    }).catch(err=>{
      console.log(err)
    })
  }
  nextPage= () => e => {
    e.preventDefault()
    axios.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyACXG0BY_of5_4SHtgG8H9bVrHrUVnfX24&part=snippet&maxResults=25&q="+ this.state.search+"&pageToken="+ this.state.nextPageToken).then(res=>{
    console.log(res.data)  
    this.setState({
        nextPageToken:res.data.nextPageToken,
        prevPageToken :res.data.prevPageToken,
        items: res.data.items
      })
      window.scrollTo(0, this.top.current.offsetTop);
      console.log(res.data.items)
    }).catch(err=>{
      console.log(err)
    })
  }
  prevPage= () => e => {
    e.preventDefault()
    axios.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyACXG0BY_of5_4SHtgG8H9bVrHrUVnfX24&part=snippet&maxResults=25&q="+ this.state.search+"&pageToken="+ this.state.prevPageToken).then(res=>{
    console.log(res.data)  
    this.setState({
        nextPageToken:res.data.nextPageToken,
        prevPageToken :res.data.prevPageToken,
        items: res.data.items
      })
      window.scrollTo(0, this.top.current.offsetTop);
      console.log(res.data.items)
    }).catch(err=>{
      console.log(err)
    })
  }
  roomidChange = () => e => {
    this.setState({room:e.target.value})
  }
  submitRoomid= () => e => {
    e.preventDefault()
    axios.post("/api/karaokes/room",{
      roomid:this.state.room
    }).then(res=>{
      console.log(res)
      this.setState({
        currentroom: res.data
      })
      this.connection = new WebSocket((process.env.NODE_ENV === "production"? "ws://www.yoshio.space": "ws://localhost:8080"));
      this.connection.onopen = evt => { 
        console.log("connection open")
        this.connection.send(JSON.stringify({
          "type":"register",
          "role":"client",
          "roomid":res.data.roomid
        }))
        setInterval(()=>{
          this.connection.send("ping")
        },30000)
      };
      this.connection.onmessage = evt => {
        if (evt.data) {
          const result = JSON.parse(evt.data)
          console.log(result)
          switch (result.type) {
            case "register":
              this.setState({clientID: result.clientID})
              break;
            case "push":
              this.setState({currentroom:result.data})
              break;

            default:
              break;
          }
        }
      };
      this.connection.onclose = evt => {
        alert("websocket closed")
      };
      this.connection.onerror = evt => { 
        console.log("error recieved")
        console.log(evt)
      };
    }).catch(err=>{
      console.log(err)
    })
  }
  switch=()=>e=>{
    if (!this.state.controller){
      axios.post("/api/karaokes/room",{
        roomid:this.state.room,
      }).then(res=>{
        this.setState({
          currentroom: res.data
        })
      }).catch(err=>{
        console.log(err)
      })
    }
    this.setState({controller:!this.state.controller})
  }
  switchVocal = () => e =>{
    let sockettype
    if(e.target.checked){
      sockettype="novocal"
    }else{
      sockettype="withvocal"
    }
    if (this.connection){
      this.connection.send(JSON.stringify({
        "type":sockettype,
        "role":"client",
        "roomid":this.state.currentroom.roomid,
        "clientID":this.state.clientID
      }))
    }
  }


  nextSong = () => e => {
    if (this.connection){
      this.connection.send(JSON.stringify({
        "type":"next",
        "role":"client",
        "roomid":this.state.currentroom.roomid,
        "clientID":this.state.clientID
      }))
    }
  }
  render() {
    let ItemsRender 
    let QueueRender 
    if (this.state.items && this.state.items.length > 0){
      ItemsRender = this.state.items.map((item, idx)=>{
        return (
          <div className="itemcard" 
          onClick={()=>this.props.loadModal("KARAOKEORDER_MODAL",{
            video: {img: item.snippet.thumbnails.medium.url,
            link: item.id.videoId,
            title: item.snippet.title},
            roomid: this.state.currentroom.roomid
          })} 
          key={idx}>
          <div className="thumbnail">
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.thumbnails.title}/>
          </div>
          <div className="information">
            <h2>{item.snippet.title}</h2>
            <p>{item.snippet.channelTitle}{" | "}{item.snippet.publishedAt}
            </p>
            <p>
            {item.snippet.description}
            </p>
          </div>
          </div>
        )
      })
    }
    if (this.state.currentroom &&  this.state.currentroom.queue){
      QueueRender = this.state.currentroom.queue.map((item, idx)=>{
        return (
          <tr key={idx} onClick={()=>this.props.loadModal("KARAOKEEDIT_MODAL",{})}>
          <td >
          <img src={item.img} alt={item.title} width={140}/>
          </td>
          <td>{item.title}</td>
        </tr>
        )
      })
    }
    return (
        <div className="karaoke-client" >
            <h1 ref={this.top}>Karaoke Order</h1>
            { this.state.currentroom.roomid && 
            <div className="room">
              <div className="roomhead">
                  <div className="switch">
                    <input id="switch" type="checkbox" className="toggle" onClick={this.switch()} value={this.state.controller}/>
                    <label htmlFor="switch" className="toggle-button" data-tg-off = "Search Panel" data-tg-on = "Remote Panel"></label>
                  </div>
                  <h4>Current Room: {this.state.currentroom.roomid || "Please enter your roomid"}</h4>
                  
              </div>
              {this.state.controller &&
                <div className="controller">
                  <div className="panel">
                  <div className="switch">
                    <input id="vocal" type="checkbox" className="toggle" onClick={this.switchVocal()} />
                    <label htmlFor="vocal" className="toggle-button" data-tg-off = "Original" data-tg-on = "Accompany"></label>
                  </div>
                  <button className="button--secondary" onClick={this.nextSong()}>Next Song</button>
                </div>

                  <div className="results">
                  <h4>Currently Playing: </h4>
                  <div className="itemcard">
                    <div className="thumbnail">
                      <img src={this.state.currentroom.current.img} alt={this.state.currentroom.current.title}/>
                    </div>
                    <div className="information">
                      <h2>{this.state.currentroom.current.title}</h2>
                    </div>
                  </div>
                  <h4>Queue: </h4>
                  <table>
                    <tbody>
                    {QueueRender}
                    </tbody>
                  </table>
                  </div>
                </div>
              }
              {!this.state.controller &&
                <div className="search">
                  <form  onSubmit={this.submitSearch()}>
                    <div className="formgroup--inline">
                    <label htmlFor="search">Search:</label>
                    <input name="search" type = "text" value={this.state.search} onChange={this.seachChange()}/>
                    <span  className="searchicon" onClick={this.submitSearch()}><i className="fas fa-search"></i></span>
                    </div>
                  </form>
                  <div className="results">
                    {ItemsRender}
                  </div>
                  <div className="navigation">
                    {this.state.prevPageToken && <button className="button--success" onClick={this.prevPage()}>Prev Page</button>}
                    {this.state.nextPageToken && <button className="button--secondary" onClick={this.nextPage()}>Next Page</button>}
                  </div>
                </div>
                }
            </div>
            }
            
            
            { !this.state.currentroom.roomid  && 
            <div className="roomid">
              <form action="">
                <div className="formgroup">
                <label htmlFor="room">Roomid:</label>
                <input name="room" type = "text" value={this.state.room} onChange={this.roomidChange()}/>
                </div>
                <button className="button--success" onClick={this.submitRoomid()}>Enter</button>
              </form>
            </div>
            }
        </div>
    );
  }
}

Karaokeclient.propTypes = {
  loadModal: PropTypes.func.isRequired
};
export default connect(
  null,
  {
    loadModal,
  }
)(Karaokeclient);