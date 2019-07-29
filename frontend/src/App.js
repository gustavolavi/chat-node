import React, { Component } from 'react';
import socket from "socket.io-client";
import lavi from "./services/lavi";
import googleTranslate from "./services/googleTranslate";
import Chat from './components/Chat';
import './App.css';

export default class App extends Component {
  state = {
    chats: [],
    newChat: "",
    user: "",
    translate: "pt",
    languages: [],
    key: "AIzaSyAMwFNuIQs2BN5BjRTmaaeRBU2kI9e9kTg"
  };


  async componentDidMount() {
    this.subscribeToEvents();

    let languages = await googleTranslate.get(`languages?key=${this.state.key}`);

    this.setState({ languages: languages.data.data.languages })

    console.log(this.state.languages);
    /*
    const response = await lavi.get("chats");
    var chats = response.data;

    chats.forEach(element => {
      this.languageDetect(element);
      this.translate(element);
    });*/
  }

  subscribeToEvents = () => {
    const io = socket("http://ln022559:3001");

    io.on("chat", data => {
      this.languageDetect(data);
      this.translate(data);
    });

  };

  getLanguages = async () => {
  }

  translate = async data => {
    let translate = await googleTranslate.post(`?key=${this.state.key}`, {
      "format": "text",
      "q": [
        data.content
      ],
      "target": this.state.translate,
      "source": data.language
    });
    data.content = translate.data.data.translations[0].translatedText;
    this.setState({ chats: [data, ...this.state.chats] });
  }

  languageDetect = async data => {
    let detect = await googleTranslate.post(`detect/?key=${this.state.key}`, {
      "q": [
        data.content
      ]
    });

    data.language = detect.data.data.detections[0][0].language;
    return data;
  }

  handleNewChat = async e => {

    if (e.keyCode !== 13) return;

    e.preventDefault();

    const content = this.state.newChat;
    const author = this.state.user;

    await lavi.post("chats", { content, author });

    this.setState({ newChat: '' });
  };

  handleChatChange = e => {
    this.setState({ newChat: e.target.value });
  };

  handleUserChange = e => {
    this.setState({ user: e.target.value });
  };


  handleTranslateChange = e => {
    this.setState({ translate: e.target.value });
  };

  render() {
    return (
      <div class="container">
        <form class="pt-5">

          <div class="row">
            <div class="form-group col-2">
              <label for="tranlate">Translate to:</label>
              <select class="form-control" id="tranlate" value={this.state.translate} onChange={this.handleTranslateChange}>
                {this.state.languages.map((team) => <option key={team.language} value={team.language}>{team.language}</option>)}
              </select>
            </div>
            <div class="form-group col-10">
              <label for="user">User</label>
              <input type="text" class="form-control" id="user" placeholder="Quem é você?" value={this.state.user} onChange={this.handleUserChange} />
            </div>
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
