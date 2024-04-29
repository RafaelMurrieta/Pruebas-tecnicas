import React, { useState } from 'react'
import './App.css'

type ItemID = `${string}-${string}-${string}-${string}-${string}`

interface  Item{
  id:  ItemID,
  timestamp:number,
  text: string
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text:'Videojuegos'
  },
  {
    id: crypto.randomUUID(),
    timestamp:Date.now(),
    text:'Libros'
  }
] 

function App() {
  const[items, setItems] = useState(INITIAL_ITEMS)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()

    const { elements } = event.currentTarget
    const input = elements.namedItem('item')
    const isinput = input instanceof HTMLInputElement
    if (!isinput || input == null) return 

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }

    setItems((prevItems) =>{
      return [...prevItems, newItem]
    })

    input.value = ''
  }

  const createHandleRemoveItem = (id: ItemID) => ()=>{
    setItems(prevItems =>{
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }
  return (
    <main>
      <aside>
        <h1>Prueba técnica de React</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>

        <form onSubmit={handleSubmit}>
          <label >Elemento a introducir
          <input type="text" name="item" required placeholder='Videojuegos ' />
          </label>
          <button>Añadir elemento a la lista </button>
        </form>
      </aside>
      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {
            items.length === 0 ?
            (
              <p>
              <strong>No hay elementos en la lista</strong>
              </p>
            )
            :
            (
              <ul>
                {
                items.map(item =>{
                return(
                <li key={item.id}>
                  {item.text}
                  <button onClick={createHandleRemoveItem(item.id)}>
                    Eliminar elemento</button>
                </li>
                )
              })
              }
              </ul>
            )
          }
        </ul>
      </section>
    </main>
  )
}

export default App
