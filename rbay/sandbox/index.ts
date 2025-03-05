import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
    await client.hSet('car',{
        color: 'red',
        year: 2020
    })

    const car = await client.hGetAll('car#234');
    if(Object.keys(car).length === 0){
        console.log('404')
        return
    }
    console.log(car);
};
run();
