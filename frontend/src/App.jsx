import { Navbar } from './components/Navbar'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ItemListContainer } from './components/ItemListContainer'
import './App.css'
import SearchBar from "./components/SearchBar.jsx";

function App() {
  return (
    <ChakraProvider>
      <>
        <header>
          <Navbar />
        </header>
          <SearchBar/>
        <ItemListContainer/>
      </>
    </ChakraProvider>
  )
}

export default App
