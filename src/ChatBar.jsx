
// Render the top-level React component
import React, { Component } from 'react';

class Chatbar extends Component {
  
  constructor(props) {
    super(props);
  }

  // chat messages submitted upon hitting 'enter' key
  handleKeyPressMessage(event) {
    if (event.key === 'Enter') {
       this.props.onNewMessage(event);
    }
  }

  // send notification if user leaves the text field and name has been changed
  handleKeyPressUser(event) {
    if (event.target.value !== this.props.currentUser.name) {
      this.props.onUserChange(event);
    }
  }

  render() {
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
