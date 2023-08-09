import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPosts(@Query('title') title: 'Title 1' | 'Title 2' | 'Title 3') {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(+id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file1', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
  ) {
    return 'Succcess';
  }

  @Post(':name/:second')
  addCornJob(@Param('name') name: string, @Param('second') second: string) {
    return this.postsService.addCronJob(name, second);
  }

  @Post(':name')
  deleteCornJob(@Param('name') name: string) {
    return this.postsService.deleteCron(name);
  }
}
