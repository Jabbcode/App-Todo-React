import Swal from 'sweetalert2'

export const alertBasic = (title: string) => {
  return Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1500
  })
}

export const alertDelete = async () => {
  const result = await Swal.fire({
    title: 'Esta seguro?',
    text: "Esto no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  })
  if (result.isConfirmed) {
    Swal.fire(
      'Eliminada!',
      'La tarea fue borrara correctamente.',
      'success'
    )
  }
}