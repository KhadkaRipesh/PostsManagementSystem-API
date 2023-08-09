import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from 'src/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';

@Module({
  imports: [ScheduleModule.forRoot(), forwardRef(() => UsersModule)],
  controllers: [PostsController],
  providers: [PostsService, FileSizeValidationPipe],
  exports: [PostsService],
})
export class PostsModule {}
