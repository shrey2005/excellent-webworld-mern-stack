import { api } from "./client";

export const fetchCards = async () => {
    const response = await api.get('/card');
    return response;
}

export const createCard = async (data) => {
    const response = await api.post('/card/add', data);
    return response;
}

export const updateCard = async (id, data) => {
    console.log('data : ', data, id)
    const response = await api.patch(`/card/${id}`, data);
    return response;
}

export const deleteCard = async (id) => {
    const response = await api.delete(`/card/${id}`);
    return response;
}