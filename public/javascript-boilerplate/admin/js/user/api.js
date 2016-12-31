/* globals ADMIN_API_URL */
import fetchFactory from '../../../common/fetch/fetch';

export const fetchSignIn = fetchFactory(`/auth/signin`, 'POST');
export const fetchSignUp = fetchFactory(`/sign-up`, 'POST');

export const storeLocalUser = ({ id, username, exp, token }) => {
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('expires', exp);
};

export const removeLocalUser = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
};
