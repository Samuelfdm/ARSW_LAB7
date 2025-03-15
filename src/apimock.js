const apimock = {
    getBlueprintsByAuthor: (author, callback) => {
        const blueprints = {
            "john": [
                { name: "house", points: [{ x: 10, y: 10 }, { x: 20, y: 20 }] },
                { name: "gear", points: [{ x: 30, y: 30 }, { x: 40, y: 40 }, { x: 50, y: 50 }] },
            ],
            "mary": [
                { name: "bridge", points: [{ x: 10, y: 10 }, { x: 100, y: 100 }, { x: 200, y: 50 }] },
                { name: "tower", points: [{ x: 35, y: 35 }, { x: 45, y: 45 }] },
            ],
        };
        setTimeout(() => callback(blueprints[author] || []), 1000); // Simula una llamada asíncrona
    },
};

export default apimock;