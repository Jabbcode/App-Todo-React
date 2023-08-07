import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';

import { ModalContext, TodoContext, UIContext } from '../../context';
import { SchemaForm, SchemaFormType } from '../../schema';

import { alertBasic } from '../../utils';

export const Form = () => {

  const { handleModal } = useContext(ModalContext);
  const { isNew } = useContext(UIContext);
  const { createTodo, updateTodo, todo } = useContext(TodoContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<SchemaFormType>({ resolver: zodResolver(SchemaForm) })

  useEffect(() => {
    setValue('title', todo?.title)
    setValue('description', todo?.description)
    setValue('completed', false)
  }, [todo]);

  const onSubmit: SubmitHandler<SchemaFormType> = (data) => {

    if (isNew) {
      createTodo({ id: uuidv4(), title: data.title, description: data.description, date: new Date(), completed: false })
      alertBasic('Tarea creada correctamente')
    } else {
      updateTodo({ ...todo!, title: data.title, description: data.description })
      alertBasic('Tarea editada correctamente')
    }
    reset()
    handleModal(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h5> {isNew ? 'Nueva' : 'Editar'} tarea</h5>
      </div>
      <div>
        <label
          htmlFor="title"
        >Titulo</label>
        <input
          type="text"
          id="title"
          placeholder="Titulo"
          {...register('title')}
        />
        {errors.title && <span>{errors.title.message?.toString()}</span>}
      </div>
      <div>
        <label htmlFor="description">Descripcion</label>
        <textarea
          cols={30}
          rows={10}
          id='description'
          {...register('description')}
        ></textarea>
        {errors.description && <span>{errors.description.message?.toString()}</span>}
      </div>
      <button type='submit'>{isNew ? 'Crear' : 'Actualizar'}</button>
      <button type='button' onClick={() => handleModal(false)}>Cancelar</button>
    </form>
  );
};
