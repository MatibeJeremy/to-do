import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './controller/todo.controller';
import { TodoValidator } from './validations/todo.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService, TodoValidator],
  controllers: [TodoController],
})
export class TodoModule {}
