import { useContext } from 'react';
import { Card } from "../";

import { TodoContext } from "../../context";

import { ITodo } from "../../types";

export const CardsContainer = () => {

  const { todos } = useContext(TodoContext);

  return (
    <ul>
      {
        todos.length > 0
          ? todos.map((card: ITodo) => {
            return (
              <li key={card.id}>
                <Card info={card} />
              </li>
            )
          })
          : 'No hay tareas'
      }
    </ul>
  );
};
