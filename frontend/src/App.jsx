import { useState } from 'react'
import { Navbar } from './components/Navbar'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Course } from './components/Course'
import { ItemListContainer } from './components/ItemListContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
    <>
      <header>
        <Navbar/>
      </header>
      <div>
      <h2><ItemListContainer/></h2>
      </div>
    </>
    </ChakraProvider>
  )
}

export default App
