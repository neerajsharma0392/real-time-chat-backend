import {createChatController} from './chatController';
import {getUserController} from './userController';

export const routes = [createChatController, getUserController];

export {protectRoute} from './protectRoute';
