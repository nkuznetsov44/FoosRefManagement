import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';

export const dataStoreFactory = (endpoint, idField) => {
    return new CustomStore({
        key: idField,
        load: async () => {
            const { data } = await axios.get(endpoint);
            return data;
        },
        insert: async (values) => {
            await axios.post(`${endpoint}/`, values);
        },
        update: async (key, values) => {
            await axios.patch(`${endpoint}/${key}/`, values);
        },
        remove: async (key) => {
            await axios.delete(`${endpoint}/${key}/`);
        },
    });
};