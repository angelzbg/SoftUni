import no_profile from '../../../images/no_profile.png';
import { FileMediaIcon } from '@primer/octicons-react';
import React from 'react';
import { resizeBase64Img } from '../../../utils/utils';

const RegisterAvatar = ({ avatar, setAvatar, avatarRef }) => (
  <div className={`auth-avatar-wrapper ${avatar ? 'uploaded' : ''}`}>
    <img src={avatar || no_profile} alt="avatar" style={{ width: 100, height: 100, borderRadius: '50%' }} />
    <div className="auth-media-icon" onClick={() => avatarRef.current.click()}>
      <FileMediaIcon size="medium" />
    </div>
    <input name="avatar" type="text" value={avatar} style={{ display: 'none' }} onChange={() => {}} />
    <input
      ref={avatarRef}
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = async (ev) => setAvatar(await resizeBase64Img(ev.target.result, 100, 100));
          reader.readAsDataURL(e.target.files[0]);
        }
      }}
    />
  </div>
);

export default RegisterAvatar;
