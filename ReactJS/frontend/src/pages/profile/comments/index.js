import './styles/comments.css';
import { useEffect, useRef } from 'react';
import { useStore } from '../../../store/store';
import { observer, useLocalObservable } from 'mobx-react';
import { commentsFilters } from '../constants';
import events from '../../../utils/events';
import ProfileCommentsLoader from '../../../components/loaders/ProfileCommentsLoader';
import CommentsHeader from './CommentsHeader';
import CommentBox from './CommentBox';
import NoComments from './NoComments';
import CommentsContainer from './CommentsContainer';
import CommentLeaveModal from './modals/CommentLeaveModal';
import { screwEvent, getHashFromEv } from '../../../utils/utils';

export default observer(({ id }) => {
  const { comments, getComments, loadingComments } = useStore().profileStore;
  const commentRef = useRef(null);
  const observable = useLocalObservable(() => ({
    syncing: false,
    setSync: (isSync = true) => (observable.syncing = isSync),
    sync: async (id, isSync = true) => {
      observable.setSync(true);
      await getComments(id, isSync);
      observable.setSync(false);
    },
    filter: commentsFilters.newest,
    setFilter: (filter) => (observable.filter = filter),
    modalRef: '',
    setModalRef: (ref = '') => (observable.modalRef = ref),
    modalOpen: false,
    toggleModal: (open) => (observable.modalOpen = open ?? !observable.modalOpen),
    content: '',
    setContent: (val = '') => (observable.content = val),
  }));

  useEffect(() => {
    observable.sync(id, false);
    observable.setFilter(commentsFilters.newest);
    events.listen('commented', 'profileComments', (id) => observable.sync(id));

    if (commentRef && commentRef.current && !observable.modalOpen) {
      commentRef.current.textContent = '';
      observable.setContent();
    }

    const locationChange = (e) => {
      const hash = getHashFromEv(e);
      if (hash && observable.content) {
        screwEvent(e);
        observable.setModalRef(hash);
        observable.toggleModal(true);
      }
    };

    window.addEventListener('click', locationChange, { capture: true });

    return () => {
      events.unlisten('commented', 'profileComments');
      window.removeEventListener('click', locationChange, { capture: true });
    };
  }, [id, observable]);

  const { syncing, setSync, sync, filter, setFilter, modalRef } = observable;
  const { setModalRef, modalOpen, toggleModal, content, setContent } = observable;

  return (
    <div className="comments-profile-wrapper">
      {loadingComments ? (
        <ProfileCommentsLoader />
      ) : (
        <>
          {modalOpen && <CommentLeaveModal {...{ toggleModal, modalRef, setModalRef, setContent }} />}
          <CommentsHeader {...{ id, filter, setFilter, syncing, sync }} />
          <CommentBox {...{ id, setFilter, syncing, setSync, sync, content, setContent, commentRef }} />
          {!comments.length ? (
            <NoComments />
          ) : (
            <CommentsContainer {...{ id, filter, syncing, setSync, sync, commentRef }} />
          )}
          <div className="bottom-hr" />
        </>
      )}
    </div>
  );
});
