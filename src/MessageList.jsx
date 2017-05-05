

// Render the top-level React component
import React, { Component } from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    let messages = this.props.messages;
    let messagesRendered = messages.map((message) => {
      return (
        <Message type={message.type} color={message.color} username={message.username} content={message.content} key={message.id} />
      );
    });
    return (
<main className="messages"> {messagesRendered} </main>)
  }
}

export default MessageList;


