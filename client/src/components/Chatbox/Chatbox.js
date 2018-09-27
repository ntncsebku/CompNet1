import React, { Component } from 'react';

import MessageContainer from './MessageContainer/MessageContainer';
import EmojiPanel from './EmojiPanel/EmojiPanel';
import StickerPanel from './StickerPanel/StickerPanel';

import './Chatbox.css';


const thumbup = (
    <svg aria-labelledby="js_9be" version="1.1" viewBox="0 0 40.16 42.24" preserveAspectRatio="xMinYMax meet" style={{ height: '85%', width: '66%' }}>
        <title id="js_9be">Send a thumb up</title>
        <path d="M935.36,1582.44a0,0,0,0,0,0,.06,3.59,3.59,0,0,1-.72,6.53,0,0,0,0,0,0,0,3.56,3.56,0,0,1,.71,2.13,3.6,3.6,0,0,1-3,3.54, 0,0,0,0,0,0,.05,3.56,3.56,0,0,1,.38,1.61,3.61,3.61,0,0,1-3.42,3.6H910v-19.6l5.27-7.9a4,4,0,0,0,.66-2.31l-0.1-4c-0.22-2.4-.09-2.06, 1.13-2.37,2-.51,7.16,1.59,5.13,12.17h11.06A3.59,3.59,0,0,1,935.36,1582.44ZM899,1581h7v22h-7v-22Z"
            transform="translate(-898.5 -1563.26)" fill="transparent" fillRule="evenodd" stroke="rgb(220,20,60)"
            strokeLinecap="round" strokeWidth="5%">
        </path>
    </svg>
);

class Chatbox extends Component {
    state = {
        emojiPanelVisible: false,
        stickerPanelVisible: false,
        LHSTyping: false,
        RHSTyping: false,
        textInput: ''
    }

    emojiButtonClickedHandler = () => {
        if (!this.state.emojiPanelVisible) {
            document.addEventListener('click', this.handleEmojiOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleEmojiOutsideClick, false);
        }
      
        this.setState(prevState => ({
            emojiPanelVisible: !prevState.emojiPanelVisible,
        }));
    }

    handleEmojiOutsideClick = (e) => {
        if (!this.emojiPanel.contains(e.target)) {
            this.emojiButtonClickedHandler();
        }
    }

    stickerButtonClickedHandler = () => {
        if (!this.state.stickerPanelVisible) {
            document.addEventListener('click', this.handleStickerOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleStickerOutsideClick, false);
        }
      
        this.setState(prevState => ({
            stickerPanelVisible: !prevState.stickerPanelVisible,
        }));
    }

    handleStickerOutsideClick = (e) => {
        if (!this.stickerPanel.contains(e.target)) {
            this.stickerButtonClickedHandler();
        }
    }

    textInputChangedHandler = (e) => {
        this.setState({ textInput: e.target.value });

        if (e.target.value === '') {
            this.setState({ RHSTyping: false });
        } else {
            if (!this.state.RHSTyping) {
                this.setState({ RHSTyping: true });
            }
        }
    }
    
    textInputSubmittedHandler = (e) => {
        e.preventDefault();

        // TODO: handle socket emit here

        this.setState({ textInput: '', RHSTyping: false });
    }

    render() {
        return (
            <div className="chatbox">
                <MessageContainer LHSTyping={this.state.LHSTyping} RHSTyping={this.state.RHSTyping} />

                <div className="chatbox__inputs">
                    <form className="chatbox__inputs__text" onSubmit={this.textInputSubmittedHandler} >
                        <input type="text" placeholder="Type a message..." onChange={this.textInputChangedHandler} value={this.state.textInput}/>
                    </form>
                    <ul className="chatbox__inputs__actions">
                        <label htmlFor="file">
                            <li className="chatbox__actions__file">
                                <input type="file" name="file" id="file" />
                            </li>
                        </label>
                        <li className="chatbox__actions__emoji" onClick={this.emojiButtonClickedHandler} ref={el => this.emojiPanel = el}>
                            {this.state.emojiPanelVisible && <EmojiPanel />}
                        </li>
                        <li className="chatbox__actions__sticker" onClick={this.stickerButtonClickedHandler} ref={el => this.stickerPanel = el}>
                            {this.state.stickerPanelVisible && <StickerPanel />}
                        </li>
                        <li className="chatbox__actions__thumbup">
                            {thumbup}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Chatbox;