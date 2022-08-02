import CustomStore from 'devextreme/data/custom_store';

export const dataStoreFactory = (api, endpoint, idField) => {
    return new CustomStore({
        key: idField,
        load: async () => {
            const { data } = await api.get(endpoint);
            return data;
        },
        insert: async (values) => {
            await api.post(`${endpoint}/`, values);
        },
        update: async (key, values) => {
            await api.patch(`${endpoint}/${key}/`, values);
        },
        remove: async (key) => {
            await api.delete(`${endpoint}/${key}/`);
        },
    });
};