import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import store from './store';

const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = store.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(process.env.API || 'http://localhost:3001', httpClient);

export default dataProvider;
