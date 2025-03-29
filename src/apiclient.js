const apiclient = {
    getBlueprintsByAuthor: (author, callback) => {
        fetch(`http://localhost:8080/blueprints/${author}`)
            .then((response) => response.json())
            .then((data) => callback(data))
            .catch((error) => console.error('Error fetching blueprints:', error));
    },

    getBlueprintByNameAndAuthor: (author, name, callback) => {
        fetch(`http://localhost:8080/blueprints/${author}/${name}`)
            .then((response) => response.json())
            .then((data) => callback(data))
            .catch((error) => console.error('Error fetching blueprint:', error));
    },

    updateBlueprint: (author, name, blueprint, callback) => {
        fetch(`http://localhost:8080/blueprints`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blueprint),
        })
            .then((response) => response.json())
            .then((data) => callback(data))
            .catch((error) => console.error('Error updating blueprint:', error));
    },

    getAllBlueprints: (callback) => {
        fetch('http://localhost:8080/blueprints')
            .then((response) => response.json())
            .then((data) => callback(data))
            .catch((error) => console.error('Error fetching all blueprints:', error));
    },

    createBlueprint: (blueprint, callback) => {
        console.log("Enviando a backend:", JSON.stringify(blueprint));
        fetch('http://localhost:8080/blueprints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blueprint),
        })
            .then(response => {
                console.log("Respuesta del backend:", response);
                return response.json();
            })
            .then(data => {
                console.log("Datos recibidos:", data);
                callback(data);
            })
            .catch(error => {
                console.error('Error creating blueprint:', error);
                callback(null);
            });
    }
};

export default apiclient;