import PropTypes from 'prop-types';

function FindAuthor({ author, setAuthor, fetchBlueprints }) {
    return (
        <div>
            <label htmlFor="author">Author</label>
            <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <button onClick={fetchBlueprints}>Get blueprints</button>
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