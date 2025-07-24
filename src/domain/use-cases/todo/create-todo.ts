import { CreateTodoDto } from "../../dtos";
import { TodoEntity, TodoRepository } from "../../";




export interface CreateTodoUseCase {
  execute( dto: CreateTodoDto ): Promise<TodoEntity>
}


export class CreateTodo implements CreateTodoUseCase {
  
  constructor(
    private readonly repository: TodoRepository,
  ) {}
  
  execute( dto: CreateTodoDto ): Promise<TodoEntity> {
    return this.repository.create(dto);
  }

}