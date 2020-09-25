import "reflect-metadata"; //  reqire for type-graphql

import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constans';
import microConfig from "./mikro-orm.config";

import express from 'express'; 
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';


// em -  etnity manager
const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: () => ({ em: orm.em }) // accessable to all my resolvers
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on localhos:4000')
    });
}


main().catch(err => {
    console.log(err)
});

// type-graphql -for scheme creation