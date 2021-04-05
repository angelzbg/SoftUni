import { useHistory } from 'react-router-dom';
import { useStore } from '../../../store/store';
import { observer } from 'mobx-react';
import { commentsFilters } from '../constants';
import no_profile from '../../../images/no_profile.png';
import { screwEvent } from '../../../utils/utils';

export default observer(({ id, setFilter, syncing, setSync, sync, content, setContent, commentRef }) => {
  const history = useHistory();
  const { user, profileStore } = useStore();
  const comment = async (id) => {
    setSync(true);
    const result = await profileStore.commentUser(content, id);
    if (result.okay) {
      setContent();
      commentRef.current.textContent = '';
      setFilter(commentsFilters.newest);
      sync(id);
    } else {
      setSync(false);
    }
  };

  const avatar = user && user.avatar ? `/avatars/${user.avatar}` : no_profile;
  const counterColor = content.length < 10 ? 'var(--error2)' : content.length < 255 ? 'var(--link1)' : 'var(--darker)';
  const commentBtnStyle = content.length < 10 ? { left: 16 + 27.2 * content.length } : { right: 16 };

  return (
    <div className="comment-content-wrap" onClick={() => (!user ? history.push('/login') : null)}>
      <img src={avatar} alt="profile avatar" className="comment-avatar" />
      <div className="comment-area-wrap">
        <div className="comment-area">
          <span style={{ color: !content ? 'var(--light)' : 'transparent' }}>
            {!content ? 'Write a comment...' : content}
          </span>
          {content && !syncing && (
            <div className="comment-button-wrap" style={commentBtnStyle}>
              <span style={{ color: counterColor }}>{content.length}</span>
              <span> / {content.length < 10 ? 10 : 255}</span>
              {content.length < 10 ? (
                <div>―</div>
              ) : (
                <div className="comment-button" onClick={comment}>
                  Send »
                </div>
              )}
            </div>
          )}
        </div>
        <div
          ref={commentRef}
          className="comment-area shadow"
          contentEditable={true}
          onInput={(e) => setContent(e.target.textContent)}
          onKeyDownCapture={(e) => {
            (() => (e.key !== 'Backspace' && e.key !== 'Control' && content.length === 255 ? screwEvent(e) : null))();
            if (e.key === 'Enter') {
              screwEvent(e);
              (() => (content.length >= 10 ? comment(id) : null))();
            }
          }}
          onPasteCapture={(e) => {
            screwEvent(e);
            const text = (e.clipboardData || window.clipboardData).getData('Text');
            const newContent = content + text.substring(0, 255 - content.length);
            setContent(newContent);
            commentRef.current.textContent = newContent;
            e.target.focus();
            document.execCommand('selectAll', false, null);
            document.getSelection().collapseToEnd();
          }}
        />
      </div>
    </div>
  );
});
