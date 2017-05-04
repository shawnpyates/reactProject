
// Render the top-level React component
import React, { Component } from 'react';

class Chatbar extends Component {


  handleKeyPressMessage(event) {
    if (event.key === "Enter") {
       this.props.onNewMessage(event);
    }
  }


  handleKeyPressUser(event) {
    this.props.onUserChange(event);
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name"
        defaultValue={this.props.currentUser.name} onBlur={this.handleKeyPressUser.bind(this)} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
        onKeyPress={this.handleKeyPressMessage.bind(this)} />
      </footer>
    );
  }
}

export default Chatbar;
