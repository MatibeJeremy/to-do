import { Todo } from '../entity/todo.entity';
import { BadRequestException } from '@nestjs/common';

export class TodoValidator {
  validatePayload(payload: Partial<Todo>): any {
    if (payload.Name == undefined) {
      throw new BadRequestException({
        status: 'Failed',
        statusCode: 400,
        message: 'The Name field is required',
      });
    } else if (payload.Description == undefined) {
      throw new BadRequestException({
        status: 'Failed',
        statusCode: 400,
        message: 'The Description field is required',
      });
    }
  }
}
