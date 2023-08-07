import { createContext, useState } from 'react';

interface ProviderProps {
  children: React.ReactNode
}

interface ContextProps {
  isNew: boolean
  handleIsNew: (value: boolean) => void
}

const DEFAULT_VALUE = {
  isNew: true,
  handleIsNew: () => { }
}

export const UIContext = createContext<ContextProps>(DEFAULT_VALUE)

export const UIProvider = ({ children }: ProviderProps) => {

  const [isNew, setIsNew] = useState(true);

  const handleIsNew = (value: boolean) => {
    setIsNew(value)
  }

  return (
    <UIContext.Provider value={{ isNew, handleIsNew }}>
      {children}
    </UIContext.Provider>
  )
}