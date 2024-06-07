import { useState } from 'react'
import { Navbar } from './components/Navbar'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Course } from './components/Course'
import { ItemListContainer } from './components/ItemListContainer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <>
        <header>
          <Navbar />
        </header>
        <ItemListContainer />
      </>
    </ChakraProvider>
  )
}

export default App
