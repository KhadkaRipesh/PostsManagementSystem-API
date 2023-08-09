import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class UsersService {
  constructor(private readonly postService: PostsService) {}
  users: User[] = [
    { id: 1, username: 'John' },
    { id: 2, username: 'Jane' },
    { id: 3, username: 'Bob' },
  ];

  getUsers() {
    return this.users.map((user, index) => {
      return {
        ...user,
        posts: this.postService.findPostById(index) || [],
      };
    });
  }
}
