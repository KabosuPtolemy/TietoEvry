import React, { useState } from "react"
import "./App.css"
import People from "./people"
import Vehicle from "./vehicle"

function App() {
  // search functionality
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }
  //
  return (
    <div className="App">
      <input
        type="search"
        name="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search..."
        className="searchInput"
        autoComplete="off"
        autoCorrect="off"
      />
      <People searchQuery={searchQuery} />
      <Vehicle searchQuery={searchQuery} />
    </div>
  )
}

export default App
