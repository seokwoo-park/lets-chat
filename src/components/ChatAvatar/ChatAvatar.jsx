import { Chat } from 'components';
import { useChat } from 'context/ChatContext';
import { notMe } from 'helpers/notMe';
import React, { useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { fb } from 'service';

const ChatAvatar = ({ chat, username, className }) => {
  const { chatConfig } = useChat();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    fb.firestore
      .collection('chatUsers')
      .where('userName', '==', username)
      .get()
      .then(snap => {
        const data = snap.docs[0]?.data();
        if (data?.avatar) {
          setAvatar(data.avatar);
        }
      });
  }, [chat, chatConfig, username]);

  return avatar ? (
    <Image className={className || 'chat-list-avatar'} src={avatar} />
  ) : (
    <div className={className || 'empty-avatar'}>
      {notMe(chatConfig, chat)[0].toUpperCase()}
    </div>
  );
};

export default ChatAvatar;
