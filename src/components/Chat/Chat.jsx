import { ChatInput, ChatToolbar, LeftRail } from 'components';
import { useChat } from 'context/index';
import React from 'react';
import { getChats, ChatEngine } from 'react-chat-engine';

const Chat = () => {
  const {
    chatConfig,
    myChats,
    setMyChats,
    selectedChat,
    selectChatClick,
    setSelectedChat,
  } = useChat();

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
            onNewChat={chat => {
              if (chat.admin.username === chatConfig.userName) {
                selectChatClick(chat);
              }
              setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
            }}
            onDeleteChat={chat => {
              if (selectedChat?.id === chat.id) {
                setSelectedChat(null);
              }
              setMyChats(
                myChats
                  .filter(c => c.id !== chat.id)
                  .sort((a, b) => a.id - b.id),
              );
            }}
            onNewMessage={(chatId, message) => {
              if (selectedChat && chatId === selectedChat.id) {
                setSelectedChat({
                  ...selectedChat,
                  messages: [selectedChat.messages, message],
                });
              }
              const chatThatMessageBelongsTo = myChats.find(
                c => c.id === chatId,
              );
              const filteredChats = myChats.filter(c => c.id !== chatId);
              const updatedChat = {
                ...chatThatMessageBelongsTo,
                last_message: message,
              };
              setMyChats(
                [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
              );
            }}
          />
        )}
      </div>

      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <div className="chatr">
              <ChatToolbar />
              <ChatInput />
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
