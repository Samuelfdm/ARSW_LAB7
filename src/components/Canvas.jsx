import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function Canvas({ selectedBlueprint, setSelectedBlueprint }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Función para dibujar el blueprint
    const drawBlueprint = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!selectedBlueprint || !selectedBlueprint.points) return;

        // Configuración del estilo de dibujo
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'blue';

        // Dibujar puntos y líneas
        selectedBlueprint.points.forEach((point, index) => {
            // Dibujar el punto
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            ctx.fill();

            // Dibujar línea al punto anterior si existe
            if (index > 0) {
                ctx.beginPath();
                ctx.moveTo(selectedBlueprint.points[index - 1].x, selectedBlueprint.points[index - 1].y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        });
    };

    // Efecto para dibujar cuando cambia el blueprint seleccionado
    useEffect(() => {
        drawBlueprint();
    }, [selectedBlueprint]);

    // Efecto para manejar los eventos de puntero
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !selectedBlueprint) return;

        const handlePointerDown = (e) => {
            const canvas = canvasRef.current;
            if (!canvas || !selectedBlueprint) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Crear COPIA profunda del array de puntos
            const newPoints = JSON.parse(JSON.stringify(selectedBlueprint.points));
            newPoints.push({ x, y });

            setSelectedBlueprint({
                ...selectedBlueprint,
                points: newPoints
            });
        };

        const handlePointerUp = () => {
            setIsDrawing(false);
        };

        const handlePointerMove = (e) => {
            if (!isDrawing) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Agregar el nuevo punto al blueprint
            const updatedBlueprint = {
                ...selectedBlueprint,
                points: [...selectedBlueprint.points, { x, y }]
            };

            setSelectedBlueprint(updatedBlueprint);
        };

        // Agregar event listeners
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointerout', handlePointerUp); // Para cuando el puntero sale del canvas
        canvas.addEventListener('pointermove', handlePointerMove);

        // Limpieza al desmontar el componente
        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointerout', handlePointerUp);
            canvas.removeEventListener('pointermove', handlePointerMove);
        };
    }, [selectedBlueprint, isDrawing, setSelectedBlueprint]);

    return (
        <div>
            <h3>
                Current blueprint: <span id="current-blueprint">
                    {selectedBlueprint ? selectedBlueprint.name : '----'}
                </span>
            </h3>
            <div className="blueprint-box">
                <canvas
                    ref={canvasRef}
                    id="blueprint-canvas"
                    width="600"
                    height="600"
                    style={{ touchAction: 'none' }} // Importante para dispositivos táctiles
                ></canvas>
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
                y: PropTypes.number.isRequired
            })
        ).isRequired
    }),
    setSelectedBlueprint: PropTypes.func.isRequired
};

export default Canvas;