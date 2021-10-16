import { useChat } from 'context/index';
import React, { useEffect } from 'react';
import { getChats, ChatEngine } from 'react-chat-engine';

const Chat = () => {
  const { chatConfig, myChats, setMyChats, selectedChat } = useChat();

  useEffect(() => {
    console.log('myChats:', myChats);
    console.log('chatConfig:', chatConfig);
  }, [myChats, chatConfig]);
  return (
    <>
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

      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <> </>
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
