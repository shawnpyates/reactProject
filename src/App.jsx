import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        // optional. if currentUser is not defined, it means the user is Anonymous
        connectionCount: 0,
        currentUser: {name: "Anonymous",
                      color: ""
                     },
        messages: []
      }
  }

  onNewMessage(event) {
    // const id = this.state.messages.length + 1;
    const newMessage = {type: "postMessage",
                        username: this.state.currentUser.name,
                        content: event.target.value,
                        color: this.state.currentUser.color};
    // const newMessage = {id: id, username: this.state.currentUser.name, content: event.target.value};
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});
    this.socket.send(JSON.stringify(newMessage));
    event.target.value = "";
  }


  onUserChange(event) {
    const oldUsername = this.state.currentUser.name;
    const newUsername = event.target.value;
    const newNotification = {type: "postNotification",
                             username: newUsername,
                             content: `${oldUsername} has changed their name to ${newUsername}.`,
                             color: this.state.currentUser.color};
    this.socket.send(JSON.stringify(newNotification));
    // this.setState({currentUser: {name: event.target.value}});
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="connection-count">{this.state.connectionCount} user(s) online</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser}
                 // we need to bind here, because otherwise 'this' will refer to the
                 // component in which its being called
                 // in other words, if onNewMessage gets passed to Chatbar without being
                 // bound, when it's called, it'll be like "i'm in chatbar, so *this* refers
                 // to chatbar... but chatbar has no state called 'currentUser, so wtf are you
                 // talking about?"
                 onNewMessage={this.onNewMessage.bind(this)}
                 onUserChange={this.onUserChange.bind(this)} />
      </div>
    );
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onopen = event => {
      console.log("HELLO FROM THIS.SOCKET.ONOPEN");
    }
    this.socket.onmessage = event => {
      const incomingData = JSON.parse(event.data);
      console.log("INCOMING DATA HERE: " + incomingData);
      switch (incomingData.type) {
        case "setColor":
          this.setState({currentUser: {
              name: this.state.currentUser.name,
              color: incomingData.color
            }
          });
        case "incomingMessage":
          let totalMessages = this.state.messages.concat(incomingData);
          this.setState({messages: totalMessages });
          break;
        case "incomingNotification":
          let totalMessages2 = this.state.messages.concat(incomingData);
          this.setState({messages: totalMessages2});
          this.setState({currentUser: {name: incomingData.username,
                                       color: incomingData.color}});
          break;
        case "connectionCountChange":
          this.setState({connectionCount: incomingData.content});
        default:
          throw new Error("Unknown event type " + incomingData.type);
      }
    }
  }



}
export default App;

// import subcomponents here!!
    //elements from other components here




























