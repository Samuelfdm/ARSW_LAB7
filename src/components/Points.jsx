import PropTypes from 'prop-types';

function Points({ totalPoints }) {
    return <p><strong>Total user points:</strong> {totalPoints}</p>;
}

// Validación de prop-types
Points.propTypes = {
    totalPoints: PropTypes.number.isRequired,
};

export default Points;