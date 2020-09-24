"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constans_1 = require("./constans");
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[jt]s$/,
    },
    entities: [Post_1.Post],
    dbName: "lireddit",
    type: "postgresql",
    password: "111",
    user: "postgres",
    debug: !constans_1.__prod__
};
//# sourceMappingURL=mikro-orm.config.js.map