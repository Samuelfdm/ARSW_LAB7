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
};

export default apiclient;