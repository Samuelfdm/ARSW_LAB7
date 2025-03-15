import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Canvas({ selectedBlueprint }) {
    useEffect(() => {
        if (selectedBlueprint) {
            const canvas = document.getElementById('blueprint-canvas');
            const ctx = canvas.getContext('2d');

            // Limpiar el Canvas antes de dibujar
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Obtener las coordenadas de los puntos
            const points = selectedBlueprint.points;

            // Si no hay puntos, no dibujar nada
            if (points.length === 0) return;

            // Dibujar los segmentos de recta
            ctx.beginPath();
            points.forEach((point, index) => {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y); // Mover al primer punto
                } else {
                    ctx.lineTo(point.x, point.y); // Dibujar línea al siguiente punto
                }
            });
            ctx.stroke(); // Renderizar las líneas
        }
    }, [selectedBlueprint]);

    return (
        <div>
            <h3>
                Current blueprint: <span id="current-blueprint">
          {selectedBlueprint ? selectedBlueprint.name : '----'}
        </span>
            </h3>
            <div className="blueprint-box">
                <canvas id="blueprint-canvas" width="600" height="600"></canvas>
            </div>
        </div>
    );
}

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