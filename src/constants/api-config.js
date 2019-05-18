let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(/localhost/.test(hostname)) {
    backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:5000';
} else {
    backendHost = 'https://bookingexpert-api.herokuapp.com';
}

export const API_ROOT = `${backendHost}`;

export default API_ROOT