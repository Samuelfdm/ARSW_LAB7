import { useState } from 'react';
import apimock from './apimock';
import Titulo from "./components/Titulo";
import FindAuthor from "./components/FindAuthor";
import Table from "./components/Table";
import Points from "./components/Points";
import Canvas from "./components/Canvas";

function App() {
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
            // Aquí iría la llamada a la API o al mock
            // Ejemplo: apimock.getBlueprintsByAuthor(author, (data) => { ... });
            apimock.getBlueprintsByAuthor(author, (data) => {
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
        <div className="gobla">
            <Titulo />
            <FindAuthor author={author} setAuthor={setAuthor} fetchBlueprints={fetchBlueprints} />
            <div className="Blueprint">
                <div className="info">
                    <Table blueprints={blueprints} setSelectedBlueprint={setSelectedBlueprint} />
                    <Points totalPoints={totalPoints} />
                </div>
                <div className="blueprint-display">
                    <Canvas selectedBlueprint={selectedBlueprint} />
                </div>
            </div>
        </div>
    );
}

export default App;