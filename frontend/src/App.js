import React, { Component } from 'react';
import socket from "socket.io-client";
import api from "./services/api";
import Chat from './components/Chat';
import './App.css';

export default class App extends Component {
  state = {
    chats: [],
    newChat: "",
    user: "",
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get("chats");

    this.setState({ chats: response.data });
  }

  subscribeToEvents = () => {
    const io = socket("http://ln022559:3001");

    io.on("chat", data => {
      this.setState({ chats: [data, ...this.state.chats] });
    });

  };

  handleNewChat = async e => {
    if (e.keyCode !== 13) return;

    e.preventDefault();

    const content = this.state.newChat;
    const author = this.state.user;

    await api.post("chats", { content, author });

    this.setState({ newChat: '' });
  };

  handleChatChange = e => {
    this.setState({ newChat: e.target.value });
  };

  handleUserChange = e => {
    this.setState({ user: e.target.value });
  };

  render() {
    return (
      <div class="container">
        <form class="pt-5">
          <div class="form-group">
            <label for="user">User</label>
            <input type="text" class="form-control" id="user" placeholder="Quem é você?" value={this.state.user} onChange={this.handleUserChange} />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              value={this.state.newChat}
              onChange={this.handleChatChange}
              onKeyDown={this.handleNewChat}
              placeholder="O que está acontecendo?"
              class="form-control"
              id="content"
            />
          </div>
        </form>
          <ul class="list-group list-group-flush">
            {this.state.chats.map(chat => (
              <Chat chat={chat} />
            ))}
          </ul>
      </div>
    );
  }
}
