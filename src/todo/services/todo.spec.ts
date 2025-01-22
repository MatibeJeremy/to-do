import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoValidator } from '../validations/todo.validator';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from '../entity/todo.entity';
import { HttpStatus } from '@nestjs/common';

describe('Todo Functionality tests', () => {
  let service: TodoService;

  const mockTodoRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        TodoValidator,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = app.get<TodoService>(TodoService);
  });

  describe('Todo functionality', () => {
    it('Should return a list of all todos present in the db', async () => {
      const mockTodos = [
        { Name: 'Test Todo 1', Description: 'Test', Done: false },
        { Name: 'Test Todo 2', Description: 'Bakuggan', Done: true },
      ];
      mockTodoRepository.find.mockResolvedValue(mockTodos);
      const response = await service.findAll();
      expect(response.statusCode).toBe(200);
      expect(response.status).toBe('success');
      expect(response.data).toEqual(mockTodos);
    });
    it('Should create a new todo and return it', async () => {
      const inputTodo = {
        Name: 'Test',
        Description: 'Test is running',
        Done: false
      };
      mockTodoRepository.create.mockReturnValue(inputTodo);
      mockTodoRepository.save.mockResolvedValue(inputTodo);

      const response = await service.create(inputTodo);

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.status).toBe('success');
      expect(response.data).toEqual(inputTodo);
      expect(mockTodoRepository.create).toHaveBeenCalledTimes(1);
      expect(mockTodoRepository.save).toHaveBeenCalledTimes(1);
    })
  });
});
