import { z } from 'zod';

export const SchemaForm = z.object({
  title: z
    .string()
    .min(5, 'El titulo debe tener minimo 5 caracteres'),
  description: z
    .string()
    .nonempty('La descripcion es requerida'),
  completed: z
    .boolean()
})


export type SchemaFormType = z.infer<typeof SchemaForm>;
