import React, { useState } from 'react';
import { useChat } from 'context/ChatContext';
import { Icon } from 'semantic-ui-react';
import { sendMessage } from 'react-chat-engine';

const ChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState('');

  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };

  return (
    <div className="chat-controls">
      <div
        onClick={() => console.log('Add attachment Click')}
        className="attachment-icon"
      >
        <Icon name="attach" color="grey" />
      </div>

      <input
        className="chat-input"
        value={chatInputText}
        placeholder="Send a message"
        onChange={e => setChatInputText(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            sendChatMessage();
          }
        }}
      />
      <div onClick={() => sendChatMessage} className="sned-message-icon">
        <Icon name="send" color="grey" />
      </div>
    </div>
  );
};

export default ChatInput;
