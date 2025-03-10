import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis';
import { usersKey } from '$services/keys';

// 사용자 이름으로 사용자 정보를 가져오는 함수
export const getUserByUsername = async (username: string) => {};

// 사용자 ID로 사용자 정보를 가져오는 함수
export const getUserById = async (id: string) => {
    const user = await client.hGetAll(usersKey(id));
    return deserialize(id, user);
};

// 새로운 사용자를 생성하는 함수
export const createUser = async (attrs: CreateUserAttrs) => {
    const id = genId();
    await client.hSet(usersKey(id), serialize(attrs));
    return id;
};

// 사용자 정보를 직렬화하는 함수
const serialize = (user: CreateUserAttrs) => {
    return{
        username: user.username,
        password: user.password,
    };
};

// 사용자 정보를 역직렬화하는 함수
const deserialize = (id: string, user:{[key: string]: string}) => {
    return{
        id,
        username: user.username,
        password: user.password,
    };
}