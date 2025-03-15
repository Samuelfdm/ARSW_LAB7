import { useState } from 'react';
import apimock from './apimock'; // Para usar datos simulados
import apiclient from './apiclient'; // Para usar datos reales
import Titulo from "./components/Titulo";
import FindAuthor from "./components/FindAuthor";
import Table from "./components/Table";
import Points from "./components/Points";
import Canvas from "./components/Canvas";

function App() {

    // Aqui decidimos si usar apimock o apiclient
    const api = apiclient; // apimock o apiclient
    // Estado para manejar el autor seleccionado
    const [author, setAuthor] = useState("");
    // Estado para manejar la lista de planos del autor
    const [blueprints, setBlueprints] = useState([]);
    // Estado para manejar el plano seleccionado
    const [selectedBlueprint, setSelectedBlueprint] = useState(null);
    // Estado para manejar el total de puntos
    const [totalPoints, setTotalPoints] = useState(0);

    // Función para obtener los planos del autor
    const fetchBlueprints = async () => {
        try {
            api.getBlueprintsByAuthor(author, (data) => {
                setBlueprints(data);
                calculateTotalPoints(data);
            });
        } catch (error) {
            console.error('Error fetching blueprints:', error);
        }
    };

    // Función para calcular el total de puntos
    const calculateTotalPoints = (blueprints) => {
        const total = blueprints.reduce((sum, blueprint) => sum + blueprint.points.length, 0);
        setTotalPoints(total);
    };

    return (
        <div className="container mt-4">
            <Titulo />
            <div className="row">
                <div className="col-md-6">
                    <FindAuthor author={author} setAuthor={setAuthor} fetchBlueprints={fetchBlueprints}/>
                    <Table blueprints={blueprints} setSelectedBlueprint={setSelectedBlueprint}/>
                    <Points totalPoints={totalPoints}/>
                </div>
                <div className="col-md-6">
                <Canvas selectedBlueprint={selectedBlueprint} />
                </div>
            </div>
        </div>
    );
}

export default App;