// 페이지 캐시 키를 생성하는 함수
export const pageCacheKey = (id: string) => `pagecache#${id}`;

// 사용자 키를 생성하는 함수
export const usersKey = (userId: string) => `users#${userId}`;
