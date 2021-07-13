import './App.css';
import Home from './components/Home';
import { DetailsContextProvider } from './contexts/DetailsContext';
import { ViewPortContextProvider } from './contexts/ViewPortContext';

function App() {
  return (
    <div className="App">
      <ViewPortContextProvider>
      <DetailsContextProvider>
        <Home />
      </DetailsContextProvider>
      </ViewPortContextProvider>
    </div>
  );
}

export default App;
