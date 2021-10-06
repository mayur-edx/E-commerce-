import { Suspense } from 'react';
import './App.css';
import MainRoute from './route'

function App() {
 
  return (
    <div className="App">
        <Suspense fallback="Loading....">
          <MainRoute />
        </Suspense>
    </div>
  );
}

export default App;
