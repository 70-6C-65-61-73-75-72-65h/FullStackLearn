import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity() // corespondes to database table
export class Post {

  @PrimaryKey() // serial primary key
  id!: number;

  // only after creation  Django  auto_now_add=true
  @Property({type: 'date'})  
  createdAt = new Date(); // jsonb ->

  // on update create date like  Django auto_now=true
  @Property({type: 'date', onUpdate: () => new Date() }) 
  updatedAt = new Date(); // jsonb 

  @Property({type: 'text'}) // varchar(255) ->
  title!: string;
 
}