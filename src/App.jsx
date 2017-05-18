import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        connectionCount: 0,
        // user is assigned color upon connection
        currentUser: {name: 'Anonymous',
                      color: ''
                     },
        messages: []
      }
  }

  onNewMessage(event) {
    const newMessage = {type: 'postMessage',
                        username: this.state.currentUser.name,
                        content: event.target.value,
                        color: this.state.currentUser.color};
    this.socket.send(JSON.stringify(newMessage));
    event.target.value = '';
  }


  onUserChange(event) {
    const oldUsername = this.state.currentUser.name;
    const newUsername = event.target.value;
    const newNotification = {type: 'postNotification',
                             username: newUsername,
                             content: `${oldUsername} has changed their name to ${newUsername}.`,
                             color: this.state.currentUser.color};
    this.socket.send(JSON.stringify(newNotification));
  }


  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <div className='connection-count'>{this.state.connectionCount} user(s) online</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser}
                 onNewMessage={this.onNewMessage.bind(this)}
                 onUserChange={this.onUserChange.bind(this)} />
      </div>
    );
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onmessage = event => {
      const incomingData = JSON.parse(event.data);
      // use data being sent from the server to adjusted the state of App
      switch (incomingData.type) {
        case 'setColor':
          this.setState({currentUser: {
              name: this.state.currentUser.name,
              color: incomingData.color
            }
          });
          break;
        case 'incomingMessage':
          let totalMessages = this.state.messages.concat(incomingData);
          this.setState({messages: totalMessages });
          break;
        case 'incomingNotification':
          let totalMessages2 = this.state.messages.concat(incomingData);
          this.setState({messages: totalMessages2});
          this.setState({currentUser: {name: incomingData.username,
                                       color: incomingData.color}});
          break;
        case 'connectionCountChange':
          this.setState({connectionCount: incomingData.content});
          break;
        default:
          throw new Error('Unknown event type ' + incomingData.type);
      }
    }
  }



}
export default App;