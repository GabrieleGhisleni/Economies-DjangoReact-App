import createAuthRefreshInterceptor from 'axios-auth-refresh';
import authSlice from './../features/userSlice';
import store from './../features/store';
import axios from 'axios';

const baseURL = 'http://localhost:8000/'

const axiosService = axios.create({
    baseURL: baseURL,
    headers: {'Content-Type': 'application/json'}
});

axiosService.interceptors.request.use(async (config) => {

    const { token } = store.getState().auth;
    if (token !== null) {config.headers.Authorization = 'Bearer ' + token}
    return config;});

axiosService.interceptors.response.use(

    (res) => {
        return Promise.resolve(res);
    },
    (err) => {
        console.debug(
            '[Response]',
            err.config.baseURL + err.config.url,
            err.response.status,
            err.response.data
        );
        return Promise.reject(err);
    }
);

const refreshAuthLogic = async (failedRequest) => {
    const { refreshToken } = store.getState().auth;
    if (refreshToken !== null) {
        return axios
            .post(
                '/auth/refresh/',
                {
                    refresh: refreshToken,
                },
                {
                    baseURL: baseURL
                }
            )
            .then((resp) => {
                const { access, refresh } = resp.data;
                failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
                store.dispatch(
                    authSlice.actions.setAuthTokens({ token: access, refreshToken: refresh })
                );
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(authSlice.actions.setLogout());
                }
            });
    }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url) {
    return axiosService.get(url).then((res) => res.data);
}

export default axiosService;