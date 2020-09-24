import { __prod__ } from "./constans";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";


export default {
    migrations: {
        path: path.join(__dirname, "./migrations"), 
        pattern: /^[\w-]+\d+\.[jt]s$/,
    },
    entities: [Post],
    dbName: "lireddit",
    type: "postgresql",
    password: "111",
    user: "postgres",
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0]; 
//  кастануть типом функции MikroORM.init для передачи параметров внутрь