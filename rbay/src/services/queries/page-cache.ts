//사용자가 엑세스하려는 경로를 유일한 인수로 받음
//캐싱할 대상 목록에 있는 경록인지 확인

import { client } from "$services/redis";
import { pageCacheKey } from "$services/keys";

//캐싱 대상 페이지면 해당 페이지를 반환
const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

/**
 * 주어진 경로에 대해 캐시된 페이지를 반환함.
 * @param {string} route - 캐시된 페이지를 확인할 경로.
 * @returns {Promise<string | null>} - 캐시된 페이지 내용 또는 null.
 */
export const getCachedPage = (route: string) => {
    if (cacheRoutes.includes(route)) {
        return client.get(pageCacheKey(route));
    }

    return null;
};

/**
 * 주어진 경로에 대해 페이지를 캐싱함.
 * @param {string} route - 페이지를 캐싱할 경로.
 * @param {string} page - 캐싱할 페이지 내용.
 * @returns {Promise<string>} - set 작업의 결과.
 */
export const setCachedPage = (route: string, page: string) => {
    if (cacheRoutes.includes(route)) {
        return client.set(pageCacheKey(route), page, {
            EX: 10
        }); // 키 이름 생성
    }
};
