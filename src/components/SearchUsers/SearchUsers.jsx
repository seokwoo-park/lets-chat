import React, { useEffect, useState, useRef } from 'react';
import { Search } from 'semantic-ui-react';
import { useChat } from 'context/ChatContext';
import { addPerson, getOtherPeople } from 'react-chat-engine';
import { useDebounce } from 'hooks';

const SearchUsers = ({ visible, closeFn }) => {
  let searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (visible && searchRef) {
      searchRef.focus();
    }
  }, [visible]);

  const { myChats, setMyChats, chatConfig, selectedChat, setSelectedChat } =
    useChat();

  const selectUser = username => {
    addPerson(chatConfig, selectedChat.id, username, () => {
      const filteredChats = myChats.filter(c => c.id !== selectedChat.id);

      const updatedChat = {
        ...selectedChat,
        people: [...selectedChat.people, { person: { username } }],
      };

      setSelectedChat(updatedChat);
      setMyChats([...filteredChats, updatedChat]);
      closeFn();
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      getOtherPeople(chatConfig, selectedChat.id, (chatId, data) => {
        const userNames = Object.keys(data)
          .map(key => data[key].username)
          .filter(u =>
            u.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
          );
        setSearchResults(userNames.map(u => ({ title: u })));
        setLoading(false);
      });
    } else {
      setSearchResults(null);
    }
  }, [debouncedSearchTerm, chatConfig, selectedChat]);

  return (
    <div
      className="user-search"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <Search
        fluid
        onBlur={closeFn}
        loading={loading}
        value={searchTerm}
        placeholder="Search For Users"
        open={!!searchResults && !loading}
        input={{ ref: r => (searchRef = r) }}
        onSearchChange={e => setSearchTerm(e.target.value)}
        results={searchResults}
        onResultSelect={(e, data) => {
          if (data.result?.title) {
            selectUser(data.result.title);
          }
        }}
      />
    </div>
  );
};

export default SearchUsers;
