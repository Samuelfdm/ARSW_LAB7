import PropTypes from 'prop-types';

function Table({ blueprints, setSelectedBlueprint }) {
    return (
        <div className="mb-4">
            <p><strong>Blueprints:</strong></p>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Blueprint name</th>
                    <th>Number of points</th>
                    <th>Open</th>
                </tr>
                </thead>
                <tbody>
                {blueprints.map((blueprint) => (
                    <tr key={blueprint.name}>
                        <td>{blueprint.name}</td>
                        <td>{blueprint.points.length}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => setSelectedBlueprint(blueprint)}
                            >
                                Open
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

// Validación de prop-types
Table.propTypes = {
    blueprints: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            points: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.number.isRequired,
                    y: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    setSelectedBlueprint: PropTypes.func.isRequired,
};

export default Table;
  

