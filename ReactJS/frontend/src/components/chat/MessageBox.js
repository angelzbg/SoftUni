import { observer } from 'mobx-react';
import { PaperAirplaneIcon, SyncIcon } from '@primer/octicons-react';
import { screwEvent } from '../../utils/utils';
import Events from '../../utils/events';

export default observer((props) => {
  const { chatId, content, setContent, isSending, sendMessage, inputWrapRef, messageRef, messageRefB } = props;
  return (
    <div className="comment-content-wrap" ref={inputWrapRef}>
      <div className="comment-area-scroll">
        <div className="comment-area-wrap">
          <div ref={messageRefB} className="comment-area">
            <span style={{ color: !content ? 'var(--light)' : 'transparent' }}>
              {!content ? 'Send a message...' : content}
            </span>
          </div>
          <div
            id={`chat-input-${chatId}`}
            ref={messageRef}
            className="comment-area shadow"
            onScroll={() => {
              if (messageRef.current.scrollTop !== messageRefB.current.scrollTop) {
                messageRefB.current.scrollTo({ top: messageRef.current.scrollTop, behavior: 'smooth' });
              }
            }}
            contentEditable={!isSending}
            onInput={({ target: { textContent } }) => {
              setContent(textContent);
              setTimeout(() => Events.trigger('scroll-to-bottom-chat', { chatId }), 20);
            }}
            onKeyDownCapture={(e) => {
              (() =>
                e.key !== 'Backspace' && e.key !== 'Control' && content.length === 1000 ? screwEvent(e) : null)();
              if (e.key === 'Enter') {
                screwEvent(e);
                sendMessage(chatId);
              }
            }}
            onPasteCapture={(e) => {
              screwEvent(e);
              const oldContent = content;
              const text = (e.clipboardData || window.clipboardData).getData('Text');
              const newContent = oldContent + text.substring(0, 1000 - content.length);
              setContent(newContent);
              messageRef.current.textContent = newContent;
              e.target.focus();
              document.execCommand('selectAll', false, null);
              document.getSelection().collapseToEnd();
              setTimeout(() => Events.trigger('scroll-to-bottom-chat', { chatId }), 20);
            }}
          />
        </div>
      </div>
      {!isSending ? (
        <div className="send-button" onClick={() => sendMessage(chatId)} title="Send">
          <PaperAirplaneIcon />
        </div>
      ) : (
        <div className="send-button-sending">
          <SyncIcon size="medium" />
        </div>
      )}
    </div>
  );
});
