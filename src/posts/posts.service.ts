import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from './posts.entity';
import { Repository } from 'typeorm';
export interface PostsRo {
    list: PostsEntity[];
    count: number;
}
@Injectable()
export class PostsService {
    constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    ){}

    // 创建文章
    async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
        const { title } = post;
        const doc = await this.postsRepository.findOne({ where: { title } });
        if (doc) {
        throw new HttpException('文章已存在', 401);
        }
        return await this.postsRepository.save(post);
    }

      // 获取文章列表
  async findAll(query): Promise<PostsRo> {
    const qb = await this.postsRepository.createQueryBuilder('post');
    qb.orderBy('post.create_time', 'DESC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }
    
}
