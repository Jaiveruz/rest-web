import { Request, Response } from "express";
import { prisma } from '../../data/postgres/index';

// const todos = [
//     {id: 1, text: 'Learn Node.js', completedAt: new Date()},
//     {id: 2, text: 'Learn Express.js', completedAt: null},
//     {id: 3, text: 'Learn TypeScript', completedAt: new Date()},
// ];

export class TodosController {

    constructor() {}

    public getTodos = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();

        return res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID format' });

        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        ( todo )
        ? res.json(todo)
        : res.status(404).json({ error: `TODO with id ${ id } not found` });
    };

    public createTodo = async (req: Request, res: Response) => {
        const { text } = req.body;
        if ( !text ) return res.status(400).json({ error: 'Text is required' });

        const todo = await prisma.todo.create({
            data: { text }
        });

        res.json(todo);
    };

    // public updateTodo = (req: Request, res: Response) => {
    //     const id = +req.params.id;
    //     if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID format' });

    //     const todo = todos.find(todo => todo.id === id);
    //     if ( !todo ) return res.status(404).json({ error: `TODO with id ${ id } not found` });


    //     const { text, completedAt } = req.body;
        
    //     todo.text = text || todo.text; // si no se proporciona, mantiene el texto actual
    //     ( completedAt === 'null' )
    //         ? todo.completedAt = null
    //         : todo.completedAt = new Date( completedAt || todo.completedAt );

    //     return res.json(todo);

    // };

    // public deleteTodo = (req: Request, res: Response) => {
    //     const id = +req.params.id;
    //     if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID format' });

    //     const index = todos.findIndex(todo => todo.id === id);
    //     if (index === -1) return res.status(404).json({ error: `TODO with id ${ id } not found` });

    //     todos.splice(index, 1);
    //     return res.json({ message: `TODO with id ${ id } deleted successfully` });
    // }
}