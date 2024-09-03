import {createChatController} from './chatController';
import {getUsers} from './userController';

export const routes = [createChatController, getUsers];

export {protectRoute} from './protectRoute';
