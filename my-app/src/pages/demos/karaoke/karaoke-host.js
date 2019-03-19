import React, { Component } from "react";
import axios from "axios";
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player'

class Karaokehost extends Component {
  constructor(props) {
    super(props);
    this.youtubeplayer = React.createRef();
    this.reactplayer = React.createRef();
    this.state = {
      changeroom:""
    };
  }
  roomChange=()=>e=>{
    this.setState({changeroom:e.target.value})
  }
  changeRoom=()=>e=>{
    e.preventDefault()
    this.setState({roomid:this.state.changeroom})
    const fetchCurrent = setInterval(async ()=>{
      const res = await axios.post("/api/karaokes/room",{
        roomid: this.state.roomid
      })
      console.log(res.data.current)
      if (res.data.current && res.data.current.link !== "placeholder"){
        this.setState({current:res.data.current})
        clearInterval(fetchCurrent)
      }
    },3000)
  }
  waitForOrder = () => {
    const fetchCurrent = setInterval(async ()=>{
      const res = await axios.post("/api/karaokes/room",{
        roomid: this.state.roomid
      })
      if (res.data.current && res.data.current.link !== "placeholder"){
        this.setState({current : res.data.current, queue : res.data.queue})
        clearInterval(fetchCurrent)
      }
    },3000)
  }
  waitForReady = (e) =>{
    const waitToPlay = setInterval(()=>{
      console.log("wait to start audio")
      if (this.state.reactplayerReady){
        console.log("start audio")
        e.target.playVideo()
        e.target.mute()
        setTimeout(()=>{
          this.reactplayer.current.seekTo(0)
        },500)
        //this.reactplayer.current.props.playing = true
        clearInterval(waitToPlay)
      }
    },200)
  }

  componentWillMount() {
    // const roomid = Math.floor((Math.random() * 10000000) + 1).toString()
    const roomid = "9761353"
    this.setState({roomid:roomid})
    // axios.post("/api/karaokes/create",{
    //   roomid: roomid
    // }).then(res=>{
    //   if (res.data.roomid){
    //     console.log("karaoke host created " + res.data.roomid)
    //     this.setState({roomid:res.data.roomid})
    //   }
    // })
    this.waitForOrder()
  }
  play = () => e => {
    this.waitForReady(e)
  }

  reactplayerReady = () => e =>{
    
  }
  neworder = () => e => {
    if(e.data === 5){
      this.waitForReady(e)
    }
  }
  
  next = () => e => {
    axios.post("/api/karaokes/next",{
      roomid: this.state.roomid
    }).then(res=>{
      console.log(res.data)
        this.setState({current : {link:"placeholder"}})
        setTimeout(()=>
        this.setState({current : res.data.current, queue : res.data.queue}),300)
      if (res.data.current && res.data.current.link === "placeholder" ){
        this.waitForOrder()
      }
    }).catch(err=>console.log(err))
  }

  playerError = ()=>e =>{
    console.log(e)
  }

  switchOnVocal = () => e=>{
    this.reactplayer.current.player.player.mute()
    this.youtubeplayer.current.internalPlayer.unMute()
  }
  switchOffVocal = () => e=>{
    this.reactplayer.current.player.player.unmute()
    this.youtubeplayer.current.internalPlayer.mute()
  }
  render() {
    return (
        <div className="karaoke-host">
        <div className="header">
        
        <h1>
            Welcome to Karaoke room {this.state.roomid}
        </h1>
        {/* <form >
          <div className="formgroup--inline">
            <label htmlFor="roomid">Roomid:</label>
            <input name="roomid" type = "text" value={this.state.changeroom} onChange={this.roomChange()}/>
          </div>
          <button className="button--success" onClick={this.changeRoom()}>switch room</button>
        </form> */}
        <h4>
          Current:
        </h4>
        <p>
          {this.state.current && this.state.current.title}
        </p>
        <h4>
          Queue:
        </h4>
          {(this.state.queue && this.state.queue.length > 0) && this.state.queue.map((item,idx)=>{return (
            <p key={idx}>
              {item.title}
            </p>
          )})}
          {(!this.state.queue || this.state.queue.length === 0) && 
            <p>
              Nothing in queue
            </p>
          }
          <div className="control">
          <button className="button--secondary optionbutton" onClick={this.switchOnVocal()}>With Vocal</button>
          <button className="button--secondary optionbutton" onClick={this.switchOffVocal()}>No Vocal</button>
          <button className="button--secondary optionbutton" onClick={this.next()}>Next Song</button>
          </div>
        </div>
            {(this.state.current && this.state.current.link && this.state.current.link!=="placeholder") && 
              <div>
              <YouTube
                  className="youtubeplayer"
                  containerClassName="youtubecontainer"
                  videoId={this.state.current.link}
                  onReady = {this.waitForReady.bind(this)}
                  onStateChange={this.neworder()}
                  onEnd={this.next()}
                  ref={this.youtubeplayer}
                />
                <ReactPlayer url={"/api/karaokes/audio/"+this.state.current.link} 
                playing
                  onError = {this.playerError()}
                  onReady = {() => this.setState({reactplayerReady:true})}
                  ref={this.reactplayer}
                />
              </div>
            }
        </div>
        
    );
  }
}
export default Karaokehost;
