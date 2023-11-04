import { createMachine, assign } from "xstate";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQBtUEMIBLAOygGIMSwtSA3VAaxrQ2z0NKgXtQGN8yIqhIBtAAwBdCZMSgADpiJCRckAA9EAJgDMAdiwBWPQA4AjFsMAaEAE9E5owF8nN1plwFiZcmABOfqh+WPI4ggBmQQC2WO7sXlw8JAwCKmJSMmqKsMrCJGqaCLoGxuaWNvYIZnoALFgAnIY6FoYuriAk6HBqcVlKaQWIALQAbBXDIy5u6B4c3lB9OQNIGog1WuMI9XVaWiOGI5ZTIHGehJCLuaorhTVmZlgtm2biOlg1evuHre2n4fhEHAXFbZK75G5re6Pcp2RBmeojBpaBEmPQ-FxAA */
    id: "todos",
    initial: "loading",
    schema: {
      //   events: {} as
      //     | {
      //         type: "FETCH";
      //       }
      //     | { type: "LOADED"; todos: string[] }
      //     | { type: "FAILED"; errorMessage: string },
      services: {} as {
        loadTodos: {
          data: Todo[];
        };
      },
    },
    tsTypes: {} as import("./todosMachine.typegen").Typegen0,
    context: {
      todos: [] as Todo[],
      errorMessage: "" as string,
    },
    states: {
      loading: {
        invoke: {
          src: "loadTodos",
          onDone: {
            target: "loaded",
            actions: "assignTodos",
          },
          onError: { target: "failed", actions: "assignError" },
        },
      },

      loaded: {},
      failed: {},
    },
  },
  {
    actions: {
      assignTodos: assign((context, event) => ({ todos: event.data })),
      assignError: assign((context, event) => ({
        errorMessage: (event.data as Error).message,
      })),
    },
  }
);
