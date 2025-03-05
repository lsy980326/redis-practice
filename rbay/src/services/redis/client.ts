// redis 패키지에서 createClient 함수를 가져옴
import { createClient } from 'redis';

// Redis 클라이언트를 생성하고 설정함
const client = createClient({
    socket: {
        // 환경 변수에서 Redis 호스트를 가져옴
        host: process.env.REDIS_HOST,
        // 환경 변수에서 Redis 포트를 가져와 정수로 변환함
        port: parseInt(process.env.REDIS_PORT)
    },
    // 환경 변수에서 Redis 비밀번호를 가져옴
    password: process.env.REDIS_PW
});

// 에러 발생 시 콘솔에 에러를 출력함
client.on('error', (err) => console.error(err));

// Redis 클라이언트와 연결함
client.connect();

// 클라이언트를 외부로 내보냄
export { client };