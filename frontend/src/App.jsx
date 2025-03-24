import './App.css';

function App() {

  return (
    <div className="app-container">
      <div className="nav-bar-container">
        <nav>

        </nav>
      </div>
      <div className="body-container">
        <div className="title-container">
          <h1>PhishShield</h1>
          <p>Description</p>
        </div>
        <div className="main-content-container">
          <div className="input-container">
            <form>
              <input/>
            </form>
          </div>
          <div className="result-container">
            { /* Return from API call */ }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
