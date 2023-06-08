import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot({ 
    "type": "mysql",
    "host": "127.0.0.1", 
    "port": 3306, 
    "username": "root", 
    "password": "123456", 
    "database": "blog", 
    "entities": [], 
    "synchronize": true ,
    autoLoadEntities: true,
}),PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
