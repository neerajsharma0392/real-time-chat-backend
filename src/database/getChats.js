import {ObjectId} from 'mongodb';
import {database} from '../database';
import {getUser} from './getUser';

export const getChats=async(chatId)=>{
    const chats = await database.getConnection().collection("chats").findOne({_id:new ObjectId(chatId)});

    const usersForMessages= await Promise.all(chats.messages.map(m=>getUser(m.postedById)));

    const messages = chats.messages.map((message,index)=>({
        ...message,
        postedBy: usersForMessages[index]
    }));

    return messages;
}