import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";


// this class are  ObjectType and Entity at a same time ( stack decors..)
@ObjectType()
@Entity() // corespondes to database table
export class Post {

  @Field( ) // {nullable:true}
  @PrimaryKey() // serial primary key
  id!: number;


  // only after creation  Django  auto_now_add=true
  @Field(() => String)
  @Property({type: 'date'})  
  createdAt = new Date(); // jsonb -> timespampz


  // on update create date like  Django auto_now=true
  @Field(() => String)
  @Property({type: 'date', onUpdate: () => new Date() }) 
  updatedAt = new Date(); // jsonb  -> timespampz

  // if i want differ my database and graphsql schema exposes can delete @field
  @Field()
  @Property({type: 'text'}) // varchar(255) ->
  title!: string;
 
}

// query принимает тип стринг  - в базу данных записывает с типом таймстампз