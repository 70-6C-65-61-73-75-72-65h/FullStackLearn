import { MyContext } from './../types';
import { Post } from './../entities/Post';
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {

    @Query(() => [Post])
    posts( @Ctx() {em} : MyContext ): Promise<Post[]>{
        return em.find(Post, {});
    }

    @Query(() => Post, {nullable:true})
    post(@Arg("postId") id : number, @Ctx() { em } : MyContext): Promise<Post | null> {
            return em.findOne(Post, {id});
    } 
    // where 
    // Promise<Post | null> - ts implementation of checking types
    // and 
    // () => Post, {nullable:true} - graphql imp of checking return-type
    // @Arg("postId") - its alias that schows to our schema ( to be able asked query) 

    // inference  power for graphql from ts types like 
    // @Arg("postId") id : number -> @Arg("postId", () => Int)
    // ts type number will make postId of Int type

    @Mutation(() => Post)
    async createPost(@Arg("title") title : string, 
                @Ctx() { em } : MyContext
                ): Promise<Post> {
                const post = em.create(Post, {title: title}) 
                await em.persistAndFlush(post)
                // const post2 = em.create(Post, {title: "2 title"}) 
                // await em.persist(post)
                // await em.persist(post2)
                // await em.flush()
                // em.persist(post)
                // em.persist(post) => allow to perstist it entity in manager and be managed by manager
                // await em.flush() // without flush it will never comes to db
                return post
    }

    @Mutation(() => Post, {nullable: true})
    async updatePost(
                @Arg("id") id : number, 
                // optional field -> + {nullable: true}
                @Arg("title", () => String, {nullable: true}) title : string, 
                @Ctx() { em } : MyContext
                ): Promise<Post | null> {
                    const post = await em.findOne(Post, {id})
                    if(!post){
                        return null
                    }
                    if(typeof title !== 'undefined'){
                        post.title = title
                        await em.persistAndFlush(post)
                    } 
                    return post
        }

    @Mutation(() => Boolean)
    async deletePost(
                @Arg("id") id : number,
                @Ctx() { em } : MyContext
                ): Promise<boolean> {
                    const post = await em.findOne(Post, {id})
                    if(!post){
                        return false
                    } 
                    await em.removeAndFlush(post)
                    // console.log(post)
                    return true;


                    // const post = await em.findOne(Post, {id}); // может найти либо null
                    // console.log('start')
                    // console.log(post); 
                    // if(!post){
                    //     return false
                    // }
                    // em.persist(post);
                    // await em.nativeDelete(Post, {id}) 
                    // // post удалился но все еще сохраняется в памяти 
                    // console.log(post)
                    // return true
        }

    
            


}
// i thought that perstst and flush used to 
// collect all nessesary quieries  and while 
// flush after all send just 1 querry to database ( susb many q to 1 q)