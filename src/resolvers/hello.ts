import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello(@Arg("helloId") d: string ){
        return `hello ${d}`     
    }
}