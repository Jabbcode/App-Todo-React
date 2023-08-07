import { useContext, useState } from 'react';

import { ModalContext, TodoContext, UIContext } from "../../context";
import { ITodo } from "../../types";

interface Props {
  info: ITodo
}

export const Card = ({ info }: Props) => {

  const { handleIsNew } = useContext(UIContext);
  const { handleModal } = useContext(ModalContext);
  const { showTodo, deleteTodo, updateTodo } = useContext(TodoContext);

  const [isChecked, setIsChecked] = useState(info.completed);

  const handleForm = (id: string) => {
    handleModal(true)
    handleIsNew(false)
    showTodo(id)
  }

  const handleChange = () => {
    setIsChecked(!isChecked)

    updateTodo({
      ...info,
      completed: !isChecked
    })
  }

  return (
    <>
      <h5>{info.title}</h5>
      <p>{info.description}</p>
      <span>{info.date?.toString()}</span>
      <input
        type="checkbox"
        name="completed"
        id=""
        checked={isChecked}
        onChange={() => handleChange()}
      />
      {isChecked ? 'Completada' : 'Pendiente'}
      <div>
        <button onClick={() => handleForm(info.id)}>Editar</button>
        <button onClick={() => deleteTodo(info.id)}>Eliminar</button>
      </div>
    </>
  );
};
