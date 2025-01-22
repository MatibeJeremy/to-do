import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoValidator } from '../validations/todo.validator';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private _todoRepository: Repository<Todo>,
    private _validator: TodoValidator,
  ) {}

  /**
   * Retrieves all to-do items from the repository.
   *
   * @returns {Promise<{
   *    data?: Todo[];
   *    status: string;
   *    statusCode: number;
   *    message?: string;
   * }>}
   *    - An object containing the following:
   *      - `data` (optional): An array of to-do items if found.
   *      - `status`: A string indicating the success or failure of the operation ("success" or "failed").
   *      - `statusCode`: The HTTP status code corresponding to the operation result (e.g., 200, 204, or 500).
   *      - `message` (optional): A message providing additional context, especially when no records are found or an error occurs.
   */
  async findAll(): Promise<{
    data?: Todo[];
    status: string;
    statusCode: number;
    message?: string;
  }> {
    try {
      const results = await this._todoRepository.find();
      if (results.length > 0) {
        return {
          status: 'success',
          statusCode: HttpStatus.OK,
          data: results,
        };
      } else {
        return {
          status: 'success',
          statusCode: HttpStatus.NO_CONTENT,
          message: 'No records found',
        };
      }
    } catch (e: any) {
      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }

  /**
   * Finds a single to-do item by its ID.
   *
   * @param {number} id - The unique identifier of the to-do item to retrieve.
   *
   * @returns {Promise<{ data: Todo; status: string; statusCode: number }>}
   *    - An object containing the following:
   *      - `data`: The retrieved to-do item if found, or an error message if not found or an exception occurs.
   *      - `status`: A string indicating the success or failure of the operation ("success" or "failed").
   *      - `statusCode`: The HTTP status code corresponding to the operation result (e.g., 200, 404, or 500).
   *
   * @throws {NotFoundException} - If the to-do item with the specified ID does not exist.
   */
  async findOne(
    id: number,
  ): Promise<{ data: Todo; status: string; statusCode: number }> {
    try {
      const todo = await this._todoRepository.findOne({
        where: {
          _id: id,
        },
      });
      if (!todo) {
        throw new NotFoundException({
          status: 'Failed',
          statusCode: HttpStatus.NOT_FOUND,
          message: 'The to-do with that id does not exist',
        });
      }
      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: todo,
      };
    } catch (e: any) {
      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: e.message,
      };
    }
  }

  /**
   * Creates a new to-do item and saves it to the repository.
   *
   * @param todoData - A partial object containing the details of the to-do item to be created.
   *   - `Name` (string): The name of the to-do item (required).
   *   - `Description` (string): A description of the to-do item (required).
   *   - `Done` (boolean, optional): Indicates whether the to-do item is marked as completed.
   *
   * @returns A promise that resolves to an object containing:
   *   - `data` (optional): The newly created and saved to-do item.
   *   - `status` (string): A string indicating the operation's status ("success" or "failed").
   *   - `statusCode` (number): The HTTP status code for the operation (e.g., 201 for success, 500 for failure).
   *   - `message` (optional): A string containing an error message, if the operation fails.
   *
   * @throws {ValidationException} If the provided payload fails validation.
   */
  async create(todoData: Partial<Todo>): Promise<{
    data?: Todo;
    status: string;
    statusCode: number;
    message?: string;
  }> {
    this._validator.validatePayload(todoData);

    try {
      const newTodo = this._todoRepository.create();

      newTodo.Name = todoData.Name;
      newTodo.Description = todoData.Description;
      newTodo.Done = todoData.Done;

      await this._todoRepository.save(newTodo);

      return {
        status: 'success',
        statusCode: HttpStatus.CREATED,
        data: newTodo,
      };
    } catch (e: any) {
      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: e.message,
      };
    }
  }

  /**
   * Updates an existing Todo entity by its ID.
   *
   * @param id - The unique identifier of the Todo to update.
   * @param updateData - A partial object containing the fields to update in the Todo entity.
   * @returns A promise that resolves to an object containing:
   *  - `data` (optional): The updated Todo entity if the update is successful.
   *  - `status`: A string indicating the operation's status ("success" or "Failed").
   *  - `statusCode`: The HTTP status code of the operation (e.g., 200, 404, 500).
   *  - `message` (optional): A string containing additional information, typically in case of errors.
   *
   * @throws NotFoundException if no Todo entity is found with the given ID.
   */
  async update(
    id: number,
    updateData: Partial<Todo>,
  ): Promise<{
    data?: Todo;
    status: string;
    statusCode: number;
    message?: string;
  }> {
    try {
      const todo = await this._todoRepository.findOne({
        where: {
          _id: id,
        },
      });
      if (!todo) {
        throw new NotFoundException({
          status: 'Failed',
          statusCode: HttpStatus.NOT_FOUND,
          message: 'The to-do with that id does not exist',
        });
      }

      Object.assign(todo, updateData);

      await this._todoRepository.save(todo);
      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        data: todo,
      };
    } catch (e: any) {
      return {
        status: 'success',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }

  /**
   * Removes a to-do item by its ID.
   *
   * @param {number} id - The ID of the to-do item to remove.
   *
   * @returns {Promise<{
   *   status: string;
   *   statusCode: number;
   *   message?: string;
   * }>} - A promise that resolves with an object containing:
   *   - `status` (string): Indicates the success or failure of the operation.
   *   - `statusCode` (number): The HTTP status code for the operation (e.g., 200 for success, 404 for not found, 500 for errors).
   *   - `message` (string, optional): A message providing additional information about the operation result.
   *
   * @throws {NotFoundException} If the to-do item with the specified ID does not exist.
   */
  async remove(id: number): Promise<{
    status: string;
    statusCode: number;
    message?: string;
  }> {
    try {
      const todo = await this._todoRepository.findOne({
        where: {
          _id: id,
        },
      });
      if (!todo) {
        throw new NotFoundException({
          status: 'Failed',
          statusCode: HttpStatus.NOT_FOUND,
          message: 'The to-do with that id does not exist',
        });
      }
      await this._todoRepository.remove(todo);

      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'Todo successfully deleted',
      };
    } catch (e: any) {
      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }
}
