import { useRef } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/store';
import no_profile from '../../../images/no_profile.png';
import { resizeBase64Img } from '../../../utils/utils';

export default observer(({ setSync, isSelf, avatar }) => {
  const { updateUserProperty } = useStore().profileStore;
  const avatarRef = useRef(null);
  const updateAvatar = (files) => {
    if (files && files[0]) {
      setSync(true);
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64String = await resizeBase64Img(ev.target.result, 100, 100);
        const response = await updateUserProperty('avatar', base64String);
        if (response.okay) {
          setSync(false);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
      <div
        className={`profile-card-avatar ${isSelf ? 'self' : ''}`}
        onClick={() => (isSelf ? avatarRef.current.click() : null)}
      >
        <img src={avatar ? `/avatars/${avatar}` : no_profile} alt="profile avatar" />
      </div>
      <input
        ref={avatarRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => updateAvatar(e.target.files)}
      />
    </>
  );
});
