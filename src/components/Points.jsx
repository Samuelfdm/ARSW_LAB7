import PropTypes from 'prop-types';

function Points({ totalPoints }) {
    return (
        <div className="mb-4">
            <p className="lead">
                <strong>Total user points:</strong> {totalPoints}
            </p>
        </div>
    );
}

// Validación de prop-types
Points.propTypes = {
    totalPoints: PropTypes.number.isRequired,
};

export default Points;