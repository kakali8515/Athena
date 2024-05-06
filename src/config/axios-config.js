import axios from 'axios';
// import { create } from 'core-js/core/object';

window.axios = axios;
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    const Ip = localStorage.getItem('ip_address');
    // config.headers.source = 'nutrabbit';
    //config.headers.apiKey = 'anE4ser6h1vIc2pM22weB02t02A2ipA8';
    config.headers['x-api-key'] = 'anE4ser6h1vIc2pM22weB02t02A2ipA8';
    config.headers['client-ip-address'] = `${Ip}`;
    config.headers['Accept-Language'] = 'ko';
    config.headers['Access-Control-Allow-Origin'] = '*';
    if (token) {
        config.headers.token = `${token}`;
    }

    return config;
}, function (err) {
    return Promise.reject(err);
});

// Token expire redirection
// axios.interceptors.response.use((response) => {
//     return response
// }, async function (error) {
//     if (error.response.status === 403) {
//         // Toast.fire({ title: "Session Expired" });
//         window.location.href = '/login';
//         localStorage.clear();
//         return axios(originalRequest);

//     }
//     return Promise.reject(error);
// });