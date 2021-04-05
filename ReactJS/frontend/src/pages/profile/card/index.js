import './styles/profile-card.css';
import { useEffect } from 'react';
import { useStore } from '../../../store/store';
import { observer, useLocalObservable } from 'mobx-react';
import { runInAction } from 'mobx';
import ProfileLoader from '../../../components/loaders/ProfileLoader';
import ProfileSync from './ProfileSync';
import ProfileAvatar from './ProfileAvatar';
import ProfileName from './ProfileName';
import ProfileLocation from './ProfileLocation';
import ProfileRating from './ProfileRating';
import ProfileLink from './ProfileLink';

export default observer(({ id }) => {
  const store = useStore();
  const observable = useLocalObservable(() => ({
    syncing: false,
    setSync: (isSync = true) => runInAction(() => (observable.syncing = isSync)),
    sync: async (id) => {
      observable.setSync(true);
      observable.setEditField(false);
      await (id ? store.profileStore.getUserProfile(id) : store.auth.getUserInfo(true));
      observable.setSync(false);
    },
    editField: false,
    setEditField: (field = '') => runInAction(() => (observable.editField = field)),
  }));

  useEffect(() => {
    if (store.user && store.user._id === id && !store.isLoading) {
      store.auth.getUserInfo(true);
    } else {
      store.profileStore.getUserProfile(id);
    }
  }, [store, id]);

  useEffect(() => {
    const notLoading = !store.isLoading && !store.profileStore.loadingProfile;
    if (!store.user && (!store.profileStore.profile || store.profileStore.profile._id !== id) && notLoading) {
      store.profileStore.getUserProfile(id);
    }
  }, [store, store.isLoading, id]);

  const { syncing, setSync, sync, editField, setEditField } = observable;
  const isSelf = !!store.user && store.user._id === id;
  const isLoading = (!store.profileStore.profile && !isSelf) || store.isLoading;
  const profile = isSelf ? store.user : store.profileStore.profile;

  const name = (isSelf ? store.user.name : store.profileStore?.profile?.name) || 'User';
  document.title = `${name}'s profile - Webby`;

  return (
    <div className="profile-card">
      {isLoading ? (
        <ProfileLoader />
      ) : (
        <>
          <ProfileSync {...{ syncing, sync, isSelf, id }} />
          <ProfileAvatar {...{ setSync, isSelf, avatar: profile.avatar }} />
          <div className="profile-card-info">
            <ProfileName {...{ profile, isSelf, setSync, setEditField, editField, syncing }} />
            <div className="profile-card-account-type">{profile.type}</div>
            <ProfileLocation {...{ profile, isSelf, setSync, setEditField, editField, syncing }} />
            <ProfileRating {...{ id, profile, isSelf, sync, setSync, syncing }} />
            {!!store.user && store.user._id !== id && <ProfileLink {...{ id, syncing, setSync, sync }} />}
          </div>
        </>
      )}
    </div>
  );
});
