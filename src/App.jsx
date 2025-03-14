
import Titulo from "./components/Titulo";
import FindAuthor from "./components/findAuthor";
import Table from "./components/table";
import Points from "./components/Points";
import Canvas from "./components/Canvas";

function App() {

  return (
    <div className="gobla">
      <Titulo />
      <FindAuthor /> 
      <div className="Blueprint">
        <div className="info">
          <Table />
          <Points />
        </div>
        
        <div className ="blueprint-display">
          <Canvas />
        </div>
      </div>
    </div>
    
  );
}

export default App;
