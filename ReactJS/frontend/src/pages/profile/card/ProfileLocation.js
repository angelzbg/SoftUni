import { observer, useLocalObservable } from 'mobx-react';
import { useStore } from '../../../store/store';
import { CheckCircleIcon, XCircleIcon, PencilIcon, LocationIcon } from '@primer/octicons-react';

export default observer(({ profile, isSelf, setSync, setEditField, editField, syncing }) => {
  const { updateUserProperty } = useStore().profileStore;
  const observable = useLocalObservable(() => ({
    value: '',
    error: '',
    setInput: (value = '') => {
      observable.value = value;
      observable.error = !value.length ? 'error' : '';
    },
    updateField: async () => {
      setSync(true);
      const oldValue = profile.city;
      const newValue = observable.value;
      if (newValue !== oldValue) {
        const response = await updateUserProperty('city', newValue);
        if (response.okay) {
          setEditField(false);
          setSync(false);
        }
      } else {
        setEditField(false);
      }
    },
  }));

  const { value, error, setInput, updateField } = observable;

  return editField === 'city' ? (
    <div className="profile-card-location-input-wrap">
      <div className="profile-card-icon-location">
        <LocationIcon size="medium" />
      </div>
      <input
        className={error}
        type="text"
        placeholder="City"
        value={value}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
        onKeyDown={(e) => (e.key === 'Escape' ? setEditField(false) : null)}
      />
      {!syncing && (
        <>
          {!error && value !== profile.city && (
            <div className="accept-button" onClick={updateField}>
              <CheckCircleIcon size="medium" />
            </div>
          )}
          <div className="cancel-button" onClick={() => setEditField(false)}>
            <XCircleIcon size="medium" />
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="profile-card-location-text">
      <div className="profile-card-icon-location">
        <LocationIcon size="medium" />
      </div>
      {profile.city}
      {isSelf && (
        <div className="edit-button-location" onClick={() => setInput(profile.city) & setEditField('city')}>
          <PencilIcon size="small" />
        </div>
      )}
    </div>
  );
});
