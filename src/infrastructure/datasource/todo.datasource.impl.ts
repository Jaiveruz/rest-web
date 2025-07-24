import { prisma } from '../../data/postgres';
import { TodoEntity, CreateTodoDto, UpdateTodoDto, TodoDataSource } from '../../domain';

export class TodoDataSourceImpl implements TodoDataSource {
 
    async create( createTodoDto: CreateTodoDto ): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        
        return TodoEntity.fromObj(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObj(todo));
    }

    async findById( id: number ): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        if ( !todo ) throw new Error('Todo not found');

        return TodoEntity.fromObj(todo);
    }

    async updateById( updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById( updateTodoDto.id );

        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObj(updatedTodo);
    }

    async deleteById( id: number ): Promise<TodoEntity> {
        const todo = await this.findById( id );

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        return TodoEntity.fromObj(deleted);
    }

}