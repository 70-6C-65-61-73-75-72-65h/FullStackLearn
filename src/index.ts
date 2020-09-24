import { MikroORM } from '@mikro-orm/core'; 
import { __prod__ } from './constans';
import microConfig from "./mikro-orm.config";

import express from 'express';



const main = async () => {
    const orm = await MikroORM.init(microConfig); 
    await orm.getMigrator().up();

    const app = express();
    // app.get('/', (_, res) => {
    //     res.send('hello');
    // })
    app.listen(4000, () => {
        console.log('server started on localhos:4000')
    })
    // // this does nothing with the database rigth now
    // const post = orm.em.create(Post, {title: 'my first post'});
    // // const post = new Post('my first project');
    // await orm.em.persistAndFlush(post);


    // // console.log('_______sql-2_________-');
    // // not creating a class so its not created a dates
    // // await orm.em.nativeInsert(Post, {title: 'my first post 2'});

    // const posts = await orm.em.find(Post, {}); // {} -> like where parameter
    // console.log(posts);
} 


main().catch(err => {
    console.log(err)
}); 

// type-graphql -for scheme creation