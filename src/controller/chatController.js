import {createChat} from './../database';

export const createChatController = {
    method: 'post',
    path: '/new-chat',
    requestProcessor: async (req, res) => {
        const {name, memberIds} = req.body;

        const insertedId = await createChat(name, memberIds);

        res.status(200).json(insertedId);
    }
}
