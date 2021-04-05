import { observer, useLocalObservable } from 'mobx-react';
import { SyncIcon } from '@primer/octicons-react';
import Moment from 'react-moment';
import { useStore } from '../../store/store';

export default observer(({ chatId, chatUser, messages, inputHeight }) => {
  const { loadChatMessages, loadingChatsIds, cantLoadChatsIds } = useStore();
  const observable = useLocalObservable(() => ({
    popUpDate: '',
    setPopUpDate: (id = '') => (observable.popUpDate = id),
  }));
  const { popUpDate, setPopUpDate } = observable;
  return (
    <div
      id={chatId}
      className="messages-container"
      style={{ height: 331 - (inputHeight || 46) - 48 - 12 }}
      onScroll={({ target: { scrollTop } }) => {
        if (scrollTop === 0 && messages[0]) {
          loadChatMessages(chatId, messages[0].created);
        }
      }}
    >
      {loadingChatsIds[chatId] ? (
        <div className="loading-chats">
          <SyncIcon />
        </div>
      ) : !cantLoadChatsIds[chatId] && messages.length ? (
        <div className="load-chats" onClick={() => loadChatMessages(chatId, messages[0].created)}>
          show older...
        </div>
      ) : null}
      {messages.map((m, i, arr) => (
        <div
          key={m._id}
          className={`message-wrapper ${m.sender === chatUser._id ? 'receiving' : ''} ${
            i !== 0 && arr[i - 1].sender === m.sender ? 'same-top' : ''
          } ${i < arr.length - 1 && arr[i + 1].sender === m.sender ? 'same-bottom' : ''} ${
            i !== 0 && arr[i - 1].sender !== m.sender ? 'diff' : ''
          }`}
          onMouseEnter={() => setPopUpDate(m._id)}
          onMouseLeave={() => setPopUpDate()}
        >
          <div className="group">
            <div className="message">
              {m.content}
              <span className="date">
                {popUpDate === m._id ? <Moment date={m.created} interval={60000} fromNow /> : '.'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
