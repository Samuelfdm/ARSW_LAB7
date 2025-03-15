import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Canvas({ selectedBlueprint }) {
    useEffect(() => {
        if (selectedBlueprint) {
            const canvas = document.getElementById('blueprint-canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            selectedBlueprint.points.forEach((point, index) => {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });
            ctx.stroke();
        }
    }, [selectedBlueprint]);

    return (
        <div>
            <h3>Current blueprint:
                <span id="current-blueprint">{selectedBlueprint ? selectedBlueprint.name : '-----------'}</span>
            </h3>
            <div className="blueprint-box">
                <canvas id="blueprint-canvas" width="300" height="300"></canvas>
            </div>
        </div>
    );
}

// Validación de prop-types
Canvas.propTypes = {
    selectedBlueprint: PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
            })
        ).isRequired,
    }),
};

export default Canvas;