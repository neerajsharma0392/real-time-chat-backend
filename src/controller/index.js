import {createChatController} from './chatController';
import {getUsers,getUserChats} from './userController';

export const routes = [createChatController, getUsers,getUserChats];


export {protectRoute} from './protectRoute';
