

// Render the top-level React component
import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    let messages = this.props.messages;
    console.log("IN MESSAGE LIST");
    let messagesRendered = messages.map((message) => {
      return (
        <Message username={message.username} content={message.content} key={message.id} />
      );
    });
    return (
<main className="messages"> {messagesRendered} </main>)
  }
}

export default MessageList;


