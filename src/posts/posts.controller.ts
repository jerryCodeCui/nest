import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dot';

@ApiTags("文章")
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService:PostsService){}
    @ApiOperation({summary:'创建文章'})
    @Post('create')
    async create(@Body() post:CreatePostDto){
        return await this.postsService.create(post)
    }
    @ApiOperation({summary:'查询文章'})
    @Get('query')
    async query(@Query() query){
       return this.postsService.findAll(query)
    }
}
