// Render the top-level React component
import React, { Component } from 'react';

class Message extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type === 'incomingMessage') {
      return (
        <div className="message" id={this.props.id}>
          <span className="message-username"><font color={this.props.color}> {this.props.username} </font></span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else {
      return (
        <div className="message system">
          {this.props.content}
        </div>
      );
    }
  }
}

export default Message;