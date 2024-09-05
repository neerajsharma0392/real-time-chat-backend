import {database} from "./database";

export const getUser = async (userId) => {
    const user = await database.getConnection().collection('users').findOne({id: userId});
    return user;
}
