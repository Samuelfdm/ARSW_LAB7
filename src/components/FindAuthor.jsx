import PropTypes from 'prop-types';

function FindAuthor({ author, setAuthor, fetchBlueprints }) {
    return (
        <div className="mb-4">
            <label htmlFor="author" className="form-label">Author</label>
            <div className="input-group">
                <input
                    type="text"
                    id="author"
                    className="form-control"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button className="btn btn-primary" onClick={fetchBlueprints}>
                    Get blueprints
                </button>
            </div>
        </div>
    );
}

// Validación de prop-types
FindAuthor.propTypes = {
    author: PropTypes.string.isRequired,
    setAuthor: PropTypes.func.isRequired,
    fetchBlueprints: PropTypes.func.isRequired,
};

export default FindAuthor;