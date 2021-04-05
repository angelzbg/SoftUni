import { observer } from 'mobx-react';
import { useStore } from '../../store/store';
import { useEffect, useRef } from 'react';
import Events from '../../utils/events';
import { useResizeDetector } from 'react-resize-detector';
import { useChatObservable } from './constants';
import Header from './Header';
import MessageBox from './MessageBox';
import MessagesContainer from './MessagesContainer';
import { ArrowSwitchIcon } from '@primer/octicons-react';

export default observer(({ activeChat, idx }) => {
  const store = useStore();
  const { loadingChats, closeActiveChat, chats, switchChats, chatHighlights, removeChatHighlight } = store;
  const { height: inputHeight, ref: inputWrapRef } = useResizeDetector();
  const messageRef = useRef(null);
  const messageRefB = useRef(null);
  const observable = useChatObservable(store, messageRef);
  const { content, setContent, sendMessage, isSending } = observable;
  const chatUser = activeChat.chatUser;
  const { _id, chatId } = activeChat;
  const messages = chats[chatId] || [];

  useEffect(() => {
    const canLoad = !loadingChats && activeChat && !store.loadingChatsIds[chatId];
    if (canLoad && store.chats[chatId]?.length === 1) {
      store.loadChatMessages(chatId, store.chats[chatId][0].created, true);
    }

    if (!loadingChats) {
      Events.trigger('scroll-to-bottom-chat', { chatId });
    }
  }, [store, activeChat, chatId, loadingChats]);

  return (
    <div
      className={`active-chat-wrapper ${chatHighlights[chatId] ? 'new' : ''}`}
      onClick={() => removeChatHighlight(chatId)}
    >
      <Header {...{ chatUser, closeActiveChat, _id }} />
      <MessageBox {...{ chatId, content, setContent, isSending, sendMessage, inputWrapRef, messageRef, messageRefB }} />
      <MessagesContainer {...{ chatId, chatUser, messages, inputHeight }} />
      <div className="active-chat-switcher" onClick={() => switchChats(idx)}>
        <ArrowSwitchIcon />
      </div>
    </div>
  );
});
