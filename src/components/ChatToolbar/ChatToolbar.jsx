import React, { useState } from 'react';
import { useChat } from 'context/ChatContext';
import { joinUserNames } from 'helpers/joinUserNames';
import { Icon } from 'semantic-ui-react';

const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);

  console.log(selectedChat);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {joinUserNames(selectedChat.people, chatConfig.userName).slice(
            0,
            100,
          )}
        </div>
        <div className="add-user-icon">
          <Icon
            color="grey"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      {!!searching && <h1>SEARCHING!!</h1>}
    </>
  );
};

export default ChatToolbar;
