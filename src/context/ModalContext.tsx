import { createContext, useState } from "react";

interface ProviderProps {
  children: React.ReactNode
}

interface ContextProps {
  isShow: boolean
  handleModal: (show: boolean) => void
}

const DEFAULT_VALUE = {
  isShow: false,
  handleModal: () => { }
}

export const ModalContext = createContext<ContextProps>(DEFAULT_VALUE)

export const ModalProvider = ({ children }: ProviderProps) => {
  const [isShow, setIsShow] = useState(false);

  const handleModal = (show: boolean) => {
    setIsShow(show)
  }

  return (
    <ModalContext.Provider value={{ isShow, handleModal }}>
      {children}
    </ModalContext.Provider>
  )
}