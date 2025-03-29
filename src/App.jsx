import { useState } from 'react';
//import apimock from './apimock'; // Para usar datos simulados
import apiclient from './apiclient'; // Para usar datos reales
import Titulo from "./components/Titulo";
import FindAuthor from "./components/FindAuthor";
import Table from "./components/Table";
import Points from "./components/Points";
import Canvas from "./components/Canvas";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newBlueprintName, setNewBlueprintName] = useState("");
    const [isNewBlueprint, setIsNewBlueprint] = useState(false);

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

    const handleCreateNew = () => {
        setSelectedBlueprint(null); // Limpiar canvas
        setShowCreateModal(true);
    };

    const handleCreateConfirm = () => {
        if (!newBlueprintName.trim()) {
            alert("Por favor ingrese un nombre para el blueprint");
            return;
        }

        const newBlueprint = {
            author: author,
            name: newBlueprintName,
            points: [] // Inicializar con array vacío
        };

        // 1. Crear el nuevo blueprint (POST)
        apiclient.createBlueprint(newBlueprint, (createdBp) => {
            console.log("Blueprint creado:", createdBp);
            // NO cambiar isNewBlueprint aquí todavía
            setSelectedBlueprint({
                ...createdBp,
                points: [] // Mantener puntos vacíos inicialmente
            });
            setShowCreateModal(false);
            setNewBlueprintName("");
        });
    };

    const handleSaveBlueprint = async () => {
        if (!selectedBlueprint) return;

        try {
            // Para nuevos blueprints (primer Save)
            if (isNewBlueprint) {
                await new Promise((resolve) => {
                    apiclient.createBlueprint(selectedBlueprint, (createdBp) => {
                        console.log("Primer guardado:", createdBp);
                        resolve(createdBp);
                    });
                });

                // Ahora marcamos como NO nuevo
                setIsNewBlueprint(false);

                // Hacer PUT con los puntos actualizados
                await new Promise((resolve) => {
                    apiclient.updateBlueprint(
                        selectedBlueprint.author,
                        selectedBlueprint.name,
                        selectedBlueprint,
                        (updatedBp) => {
                            console.log("Actualización después de crear:", updatedBp);
                            resolve(updatedBp);
                        }
                    );
                });
            }
            // Para blueprints existentes (Update)
            else {
                await new Promise((resolve) => {
                    apiclient.updateBlueprint(
                        selectedBlueprint.author,
                        selectedBlueprint.name,
                        selectedBlueprint,
                        (updatedBp) => {
                            console.log("Blueprint actualizado:", updatedBp);
                            resolve(updatedBp);
                        }
                    );
                });
            }

            // Actualizar lista y puntos
            await new Promise((resolve) => {
                apiclient.getAllBlueprints((allBlueprints) => {
                    const authorBlueprints = allBlueprints.filter(bp => bp.author === author);
                    setBlueprints(authorBlueprints);
                    calculateTotalPoints(authorBlueprints);
                    resolve();
                });
            });

            alert('Blueprint guardado exitosamente!');
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar el blueprint');
        }
    };

    const handleDeleteBlueprint = async () => {
        if (!selectedBlueprint || !window.confirm('¿Estás seguro de eliminar este blueprint?')) {
            return;
        }

        try {
            // 1. Eliminar el blueprint (DELETE)
            await new Promise((resolve) => {
                apiclient.deleteBlueprint(
                    selectedBlueprint.author,
                    selectedBlueprint.name,
                    (deletedBp) => {
                        console.log("Blueprint eliminado:", deletedBp);
                        resolve(deletedBp);
                    }
                );
            });

            // 2. Limpiar el canvas
            setSelectedBlueprint(null);
            setIsNewBlueprint(false);

            // 3. Actualizar la lista (GET)
            await new Promise((resolve) => {
                apiclient.getAllBlueprints((allBlueprints) => {
                    const authorBlueprints = allBlueprints.filter(bp => bp.author === author);
                    setBlueprints(authorBlueprints);
                    calculateTotalPoints(authorBlueprints);
                    resolve();
                });
            });

            alert('Blueprint eliminado exitosamente!');
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar el blueprint');
        }
    };

    return (
        <div className="container mt-4">
            <Titulo />
            <div className="row">
                <div className="col-md-6">
                    <FindAuthor author={author} setAuthor={setAuthor} fetchBlueprints={fetchBlueprints}/>

                    <div className="d-flex gap-2 mb-3">
                        <button
                            className="btn btn-success"
                            onClick={handleCreateNew}
                            disabled={!author}
                        >
                            Create new blueprint
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSaveBlueprint}
                            disabled={!selectedBlueprint}
                        >
                            {isNewBlueprint ? "Save" : "Update"}
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleDeleteBlueprint}
                            disabled={!selectedBlueprint}
                        >
                            Delete
                        </button>
                    </div>

                    <Table blueprints={blueprints} setSelectedBlueprint={setSelectedBlueprint}/>
                    <Points totalPoints={totalPoints}/>
                </div>
                <div className="col-md-6">
                    <Canvas
                        selectedBlueprint={selectedBlueprint}
                        setSelectedBlueprint={setSelectedBlueprint}
                    />
                </div>
            </div>

            {/* Modal para crear nuevo blueprint */}
            <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Blueprint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Blueprint name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={newBlueprintName}
                            onChange={(e) => setNewBlueprintName(e.target.value)}
                            placeholder="Enter blueprint name"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCreateConfirm}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;