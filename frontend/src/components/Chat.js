import React, { Component } from "react";
import './Chat.css';

export default class Chat extends Component{
    render(){
        const { chat } = this.props;
        return(
            <li class="list-group-item">
                <div class="row">
                    <div class="col-2"><strong>{chat.author}</strong></div> <div class="col-10">{chat.content}</div>
                </div>
            </li>
        );
    }
}