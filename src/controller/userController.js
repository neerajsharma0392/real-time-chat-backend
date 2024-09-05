import {getUsers as getUsersFromDB} from './../database';

export const getUsers = {
    method: "get",
    path: "/users",
    requestProcessor: async (req, res) => {
        const users = await getUsersFromDB();



