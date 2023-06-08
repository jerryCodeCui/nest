import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
enum Type {
    '文学',
    '科技',
    '爱情',
    '动画'
  }

// dto/create-post.dot.ts
export class CreatePostDto {
    @ApiProperty({description:'文章标题'})
    @IsNotEmpty({ message: '文章标题必填' })
    readonly title: string;
    @ApiProperty({description:'文章作者'})
    @IsNotEmpty({ message: '缺少作者信息' })
    readonly author: string;
    @ApiProperty({description:'文章内容'})
    readonly content: string;
    @ApiProperty({description:'文章封面', required:false})
    readonly cover_url: string;
    @IsNumber()
    @ApiProperty({description:'文章类型',enum:Type})
    readonly type: number;
  }

 