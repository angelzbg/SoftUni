import { runInAction } from 'mobx';
import { useLocalObservable } from 'mobx-react';
import Events from '../../utils/events';

const useChatObservable = (store, messageRef) => {
  const observable = useLocalObservable(() => ({
    content: '',
    setContent: (val = '') => (observable.content = val),
    sendMessage: async (chatId) => {
      const { content, isSending } = observable;
      if (content.length < 1 || content.length > 1000 || content.trim().length < 1 || isSending) {
        return;
      }

      runInAction(() => (observable.isSending = true));
      const response = await store.sendMessage(chatId, content);
      if (response.okay) {
        runInAction(() => observable.setContent(''));
        if (messageRef?.current) {
          messageRef.current.textContent = '';
        }
      }
      runInAction(() => (observable.isSending = false));
      Events.trigger('scroll-to-bottom-chat', { chatId });
      Events.trigger('focus-chat', chatId);
    },
    isSending: false,
  }));

  return observable;
};

export { useChatObservable };
