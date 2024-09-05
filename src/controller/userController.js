import {getUsers as getUsersFromDB,getUserChats as getUserChatsFromDB} from './../database';

export const getUsers = {
    method: "get",
    path: "/users",
    requestProcessor: async (req, res) => {
        const users = await getUsersFromDB();
        res.status(200).json(users);
    }
}

export const getUserChats={
    method: "get",
    path: "/users/:id/chats",
    requestProcessor: async (req, res) => {
        const id= req.params.id;
        const chats = await getUserChatsFromDB(id);
        res.status(200).json(chats);
    }
}

