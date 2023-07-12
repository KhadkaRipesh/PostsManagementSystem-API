import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  posts = [
    { id: 100, title: 'Title 1', description: 'This is a first post' },
    { id: 101, title: 'Title 2', description: 'This is a second post' },
    { id: 102, title: 'Title 3', description: 'This is a third post' },
  ];

  getPosts(title?: 'Title 1' | 'Title 2' | 'Title 3') {
    if (title) {
      return this.posts.filter((post) => post.title === title);
    }
    return this.posts;
  }

  getPost(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error();
    }
    return post;
  }

  createPost(createPostDto: CreatePostDto) {
    const toPost = { ...createPostDto, id: Date.now() };
    this.posts.push(toPost);
    return toPost;
  }

  updatePost(id: number, updatePostDto: UpdatePostDto) {
    this.posts = this.posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          ...updatePostDto,
        };
      }
      return post;
    });
    return this.getPost(id);
  }

  deletePost(id: number) {
    const toRemove = this.getPost(id);
    this.posts = this.posts.filter((post) => {
      return post.id !== id;
    });
    return toRemove;
  }
}
