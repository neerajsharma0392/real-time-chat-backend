import {createChatController} from './chatController';
import {getUsers} from './userController';

export const routes = [createChatController, getUsers];

import {getUserController} from './userController';

export const routes = [createChatController, getUserController];


export {protectRoute} from './protectRoute';
