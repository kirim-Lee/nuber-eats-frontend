import logo from './logo.svg';
import 'tailwindcss/tailwind.css';

function App() {
  return (
    <div className="bg-gray-100 rounded-xl p-8">
      <header className="App-header bg-yellow-100">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
