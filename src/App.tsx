import { useContext } from "react"
import { CardsContainer, Form, Modal } from "./components"
import { ModalContext, TodoContext, UIContext } from "./context";

function App() {

  const { handleModal } = useContext(ModalContext);
  const { handleIsNew } = useContext(UIContext);
  const { searchTodo } = useContext(TodoContext);

  const handleForm = () => {
    handleModal(true)
    handleIsNew(true)
  }

  return (
    <div>
      <div>
        <h3>Tareas</h3>
        <button onClick={handleForm}>Crear</button>
        <input
          type="search"
          name="search"
          placeholder="Buscar..."
          onChange={(e) => searchTodo(e.target.value)}
        />
      </div>
      <div>
        <Modal>
          <Form />
        </Modal>
      </div>
      <CardsContainer />
    </div>
  )
}

export default App
