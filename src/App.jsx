import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        // optional. if currentUser is not defined, it means the user is Anonymous
        currentUser: {name: "Bob"},
        messages: []
      }
  }

  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

  onNewMessage(event) {
    // const id = this.state.messages.length + 1;
    const newMessage = {username: this.state.currentUser.name, content: event.target.value};
    // const newMessage = {id: id, username: this.state.currentUser.name, content: event.target.value};
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});
    this.socket.send(JSON.stringify(newMessage));
    event.target.value = "";
  }




  onUserChange(event) {
    this.setState({currentUser: {name: event.target.value}});
  }


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser}
                 onNewMessage={this.onNewMessage.bind(this)}
                 onUserChange={this.onUserChange.bind(this)} />
      </div>
    );
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onopen = () => {
      console.log("Connected to server.");
    }
    this.socket.onmessage = event => {
      const incomingMessage = JSON.parse(event.data);
      let totalMessages = this.state.messages.concat(incomingMessage);
      this.setState({messages: totalMessages });
    }
  }



}
export default App;

// import subcomponents here!!
    //elements from other components here




























