import { useChat } from 'context/ChatContext';
import { useResolved } from 'hooks';
import { Loader } from 'semantic-ui-react';
import React from 'react';
import { ChatList } from 'components';

const LeftRail = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);
  return (
    <div className="left-rail">
      {chatsResolved ? (
        <>
          <ChatList />
          {!!myChats.length ? (
            <div className="chat-list-container"> YES CHATS</div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>NO CHATS YET</h3>
            </div>
          )}

          <button className="create-chat-button" onClick={createChatClick}>
            Create Chat
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};

export default LeftRail;
