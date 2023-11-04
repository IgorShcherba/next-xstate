"use client";
import { type Todo, todoMachine } from "@/machines/todosMachine";
import { useMachine } from "@xstate/react";

export default function Home() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const todos: Todo[] = await response.json();
        return todos;
      },
    },
  });
  console.log(state.value);
  console.log(state.context);

  return (
    <main className="flex min-h-screen items-start justify-between p-24">
      {state.value === "loading" && <div>Loading...</div>}
      {state.value === "failed" && <div>{state.context.errorMessage}</div>}
      {state.value === "loaded" && (
        <div>
          {state.context.todos.map((todo) => {
            return (
              <div key={todo.id} className="flex gap-2">
                {todo.title}

                <input type="checkbox" checked={todo.completed} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
