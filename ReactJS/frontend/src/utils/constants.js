import { OctofaceIcon, OrganizationIcon } from '@primer/octicons-react';

export const networkCodes = {
  UNEXPECTED_ERROR: 'Unexpected error occured.',
  TOKEN_NOT_FOUND: 'Invalid user.',
  WRONG_CREDENTIALS: 'Wrong credentials.',
  LOGON_TAKEN: 'Logon name already taken.',
  NAME_TAKEN: 'Name already taken.',
  REGISTER_SUCCESSFUL: 'Signed up successfully.',
  LOGIN_SUCCESSFUL: 'Signed in successfully.',
  LOGOUT_SUCCESSFUL: 'Signed out successfully.',
  USER_PROFILE_NOT_FOUND: 'No profile found.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  COMMENT_CONTENT_ERROR: 'Comment must containt between 10 and 255 characters.',
  COMMENT_DELETED: 'Comment have been deleted successfully.',
};

export const profileTypes = {
  Developer: 'Developer',
  Oragnization: 'Organization',
};

export const toggles = {
  main: 'main',
  themes: 'themes',
  notifications: 'notifications',
  closed: '',
};

export const iconsByType = {
  [profileTypes.Developer]: OctofaceIcon,
  [profileTypes.Oragnization]: OrganizationIcon,
};
