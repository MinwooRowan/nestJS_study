import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { NotFoundError } from 'rxjs';
/** 
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface PostModel {
  id: number;
  author : string;
  title : string;
  content : string;
  likeCount : number;
  commentCount : number;
  
}


let posts : PostModel[] = [

  {
    id : 1,
    author : 'newjeans_official',
    title : '뉴진스 민지',
    content : '내가 만든 쿠기 민지',
    likeCount : 23,
    commentCount : 2141,
  },
  {
    id : 2,
    author : 'newjeans_official',
    title : '뉴진스 해린',
    content : '마니 쿠기 해린',
    likeCount : 2,
    commentCount : 2141,
  },
  {
    id : 3,
    author : 'newjeans_official',
    title : '뉴진스 혜인',
    content : '마니 쿠기 혜인',
    likeCount : 2,
    commentCount : 211,
  },

];


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET/posts
  // 모든 post를 다 가져온다.
  @Get()
  getAllPosts() : PostModel[] {
    return posts;
  }

  // 2) GET/posts/:id
  // id에 해당하는 post를 가져온다.
  @Get(':id')
  getPost(@Param('id') id:string)  {
    const post = posts.find((post)=>post.id === +id);
    if(!post){
      throw new NotFoundException();
    }
    return post;
  }

  // 3) POST/posts
  // 새로운 post를 생성한다.
  @Post()
  postPost(
    @Body('author') author:string,
    @Body('title') title:string,
    @Body('content') content:string,
  ){
    const post = {
      id : posts[posts.length -1].id + 1,
      author,
      title,
      content,
      likeCount : 0,
      commentCount : 0,
    };

    posts = [...posts, post];
    return post;
  }
  


  // 4) PUT/posts/:id
  // id에 해당하는 post를 수정한다.
  @Put(':id')
  putPost(
    @Param('id') id:string,
    @Body('author') author?:string,
    @Body('title') title?:string,
    @Body('content') content?:string,
    ){
      const post = posts.find((post)=>post.id === +id);
      if(!post){
        throw new NotFoundException();
      }

      if(author){
        post.author = author;
      }
      if(title){
        post.title = title;
      }
      if(content){
        post.content = content;
      }

      posts = posts.map((prevPost)=> prevPost.id === +id ? post : prevPost);

      return post;
  }


  // 5) DELETE/posts/:id
  // id에 해당하는 post를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id') id:string){

    const post = posts.find((post)=>post.id === +id);
    if(!post){
      throw new NotFoundException();
    }
    
    posts = posts.filter((post)=>post.id !== +id);
    return id;
  }
}
