import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';

@Injectable()
export class PostsService {
  constructor(private scheduleRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(PostsService.name);
  posts = [
    { id: 100, title: 'Title 1', description: 'This is a first post' },
    { id: 101, title: 'Title 2', description: 'This is a second post' },
    { id: 102, title: 'Title 3', description: 'This is a third post' },
  ];

  getPosts() {
    return this.posts;
  }

  // @Cron(CronExpression.EVERY_10_SECONDS, {
  //   name: 'tenSec',
  // })
  // handleCron() {
  //   this.logger.debug('Called in every 10 sec');
  // }

  // @Interval(1000)
  // handleInterval() {
  //   this.logger.debug('called every sec from interval.');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('called once in given timeout');
  // }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for ${name} to run`);
      // const data = this.getPosts();
      // console.log(data);
    });
    this.scheduleRegistry.addCronJob(name, job);
    job.start();
    this.logger.log('job started.');
  }

  deleteCron(name: string) {
    try {
      this.scheduleRegistry.deleteCronJob(name);
      this.logger.warn('Job deleted');
    } catch (e) {
      throw new BadRequestException('Try to delete the started job');
    }
  }

  addInterval(name: string, millisecond: number) {
    const callback = () => {
      // method here..
    };
    const interval = setInterval(callback, millisecond);
    this.scheduleRegistry.addInterval(name, interval);
  }

  addTimeout(name: string, millisecond: number) {
    const callback = () => {
      // method here.
    };
    const timeout = setTimeout(callback, millisecond);
    this.scheduleRegistry.addTimeout(name, timeout);
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

  findPostById(id: number) {
    return this.posts.filter((post) => post.id === id);
  }
}
