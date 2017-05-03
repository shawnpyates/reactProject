
// Render the top-level React component
import React, { Component } from 'react';

class Chatbar extends Component {
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder= {this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default Chatbar;
