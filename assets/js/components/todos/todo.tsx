import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { AddTodoForm } from "./add_todo_form";
import { TodoList } from "./todo_list";
import { Todo, AddTodo, ToggleComplete } from "./types";

interface LiveViewProps {
    name: string;
    todos: Array<Todo>;
    pushEvent: any;
    pushEventTo: any;
    handleEvent: any;
}

const Todo: React.FC<LiveViewProps> = (props: LiveViewProps) => {
    const { name, todos, pushEvent, pushEventTo, handleEvent } = props;

    useEffect(() => {
        console.log("refreshTodos")
        console.log(todos)
    }, [])

    useEffect(() => {
        if (!handleEvent) return;
        handleEvent("add_todo_result", (data) => {
            // use data to update your component
            console.log("add_todo_result")
            console.log(data)
        })
    }, [handleEvent])

    useEffect(() => {
        if (!todos) return
        console.log("todos")
        console.log(todos)
    }, [todos])

    const toggleComplete: ToggleComplete = selectedTodo => {
        const _updatedTodos = todos.map(todo => {
            if (todo === selectedTodo) {
                pushEvent("update_todo", { ...todo, completed: !todo.completed }); // sync to server
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
    };

    const addTodo: AddTodo = newTodo => {
        newTodo.trim() !== "" 
        && pushEvent("add_todo", {"text": newTodo})
    };

    return (
        <div>this is {name}
            <React.Fragment>
                <TodoList todos={todos} toggleComplete={toggleComplete} />
                <AddTodoForm addTodo={addTodo} />
            </React.Fragment>
        </div>
    );
};

export default Todo;
