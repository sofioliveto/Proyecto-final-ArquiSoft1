import { useState } from 'react'
import { Navbar } from './components/Navbar'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Course } from './components/Course'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
    <>
      <header>
        <Navbar/>
      </header>
      <div>
      <h2><Course/></h2>
      </div>
    </>
    </ChakraProvider>
  )
}

export default App
