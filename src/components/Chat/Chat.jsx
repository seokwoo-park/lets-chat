import { ChatToolbar, LeftRail } from 'components';
import { useChat } from 'context/index';
import React from 'react';
import { getChats, ChatEngine } from 'react-chat-engine';

const Chat = () => {
  const { chatConfig, myChats, setMyChats, selectedChat } = useChat();

  return (
    <>
      <LeftRail />

      <div style={{ display: 'none' }}>
        {!!chatConfig && (
          <ChatEngine
            hideUI={true}
            userName={chatConfig.userName}
            projectID={chatConfig.projectID}
            userSecret={chatConfig.userSecret}
            onConnect={() => {
              getChats(chatConfig, setMyChats);
            }}
          />
        )}
      </div>

      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <div className="chatr">
              <ChatToolbar />
            </div>
          ) : (
            <div className="no-chat-selected ">
              <img
                src="/img/pointLeft.png"
                alt="point-left"
                className="point-left"
              />
              Select A Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
