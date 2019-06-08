import API_ROOT from './api-config';

export const urlConstants = {
  HOME_URL: `${API_ROOT}/`,
  API_URL: `${API_ROOT}/api`,
  REGISTER_URL: `${API_ROOT}/register`,
  LOGIN_URL: `${API_ROOT}/login`,
  LOGOUT_URL: `${API_ROOT}/logout`,
  SEARCH_URL: `${API_ROOT}/search`,
  USER_URL: `${API_ROOT}/user`,
  ROOM_URL: `${API_ROOT}/admin/rooms`,
  STATS_URL: `${API_ROOT}/admin/rooms/usage`,
  RESERVATION_URL: `${API_ROOT}/reservation`,
  ADMIN_RESERVATIONS: `${API_ROOT}/admin/reservations`,
  GET_USER: `${API_ROOT}/getuser`,
  ADMIN_USERS: `${API_ROOT  }/admin/users`,
  RECOVER_PASSWORD: `${API_ROOT  }/recoverpassword`,
};
