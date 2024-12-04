import * as React from "react"
import ReactDOM from "react-dom"
import Wrapper from "./Components/Wrapper"

const App = () => {
  return(
    <div>
      <Wrapper />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

export default App