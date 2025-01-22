import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { Todo } from '../entity/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<{
    data?: Todo[];
    status: string;
    statusCode: number;
    message?: string;
  }> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<{ data: Todo; status: string; statusCode: number }> {
    return this.todoService.findOne(Number(id));
  }

  @Post()
  async create(@Body() todoData: Partial<Todo>): Promise<{
    data?: Todo;
    status: string;
    statusCode: number;
    message?: string;
  }> {
    return await this.todoService.create(todoData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Todo>,
  ): Promise<{
    data?: Todo;
    status: string;
    statusCode: number;
    message?: string;
  }> {
    return this.todoService.update(Number(id), updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{
    status: string;
    statusCode: number;
    message?: string;
  }> {
    return this.todoService.remove(Number(id));
  }
}
