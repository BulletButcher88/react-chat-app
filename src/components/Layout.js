import React, { Component } from 'react'
import io from 'socket.io-client'
import LoginForm from "./LoginForm"
import ChatContainer from './chat/ChatContainer'

import { USER_CONNECTED, LOGOUT } from "../Events"


export default class Layout extends Component {

  constructor(props) {
    super(props)

    this.state = {
      socket:null,
      user:null,
      socketURL: 'http://localhost:3231'
    };
  }

  componentWillMount() {
    this.initSocket()
  }
  
  initSocket = ()=> {
    // socket connect
      const socket = io(this.state.socketURL)
      socket.on('connect', () => {
        console.log("Connected")
      })
     this.setState({socket})
  }

  setUser = (user) => {
      const { socket } = this.state
      socket.emit(USER_CONNECTED, user);
      this.setState({user})
  }

  // set the state to null for logout
  logout = () => {
    const { socket } = this.state
    socket.emit(LOGOUT)
    this.setState({user:null})
  }

  render() {
    const { title } = this.props
    const { socket, user } = this.state
    return (
      <div className="container">
        {
          !user ?
          <LoginForm socket={socket} setUser={this.setUser}/>
          :
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        }
      </div>
    )
  }
}
