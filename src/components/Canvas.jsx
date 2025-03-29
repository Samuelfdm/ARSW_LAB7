import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

function Canvas() {
    const canvasRef = useRef(null);
    const stompClientRef = useRef(null);
    const [blueprint, setBlueprint] = useState({ name: 'default', points: [] });

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket');

                // 🔹 Solicitar el blueprint actual
                stompClient.publish({
                    destination: '/app/get-blueprint',
                    body: JSON.stringify({ blueprintId: 'default' })
                });

                // 🔹 Suscribirse a cambios completos del blueprint
                stompClient.subscribe('/topic/blueprints', (message) => {
                    const updatedBlueprint = JSON.parse(message.body);
                    console.log('📩 Blueprint actualizado:', updatedBlueprint);
                    setBlueprint(updatedBlueprint);
                });

                // 🔹 Suscribirse a nuevos puntos en tiempo real
                stompClient.subscribe('/topic/newpoint', (message) => {
                    const newPoint = JSON.parse(message.body);
                    console.log('🎯 Nuevo punto recibido:', newPoint);

                    // Agregar punto recibido al blueprint y redibujar
                    setBlueprint((prev) => ({
                        ...prev,
                        points: [...prev.points, newPoint]
                    }));
                });
            },
            onStompError: (error) => console.error('⚠️ STOMP Error:', error),
        });

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => stompClient.deactivate();
    }, []);

    useEffect(() => {
        drawBlueprint();
    }, [blueprint]);

    const drawBlueprint = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'blue';

        blueprint.points.forEach((point, index) => {
            // Dibujar el punto
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            ctx.fill();

            // Dibujar líneas entre los puntos
            if (index > 0) {
                ctx.beginPath();
                ctx.moveTo(blueprint.points[index - 1].x, blueprint.points[index - 1].y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        });
    };

    const handlePointerDown = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newPoint = { x, y };
        setBlueprint((prev) => ({
            ...prev,
            points: [...prev.points, newPoint]
        }));

        // Enviar punto al servidor
        if (stompClientRef.current?.connected) {
            stompClientRef.current.publish({
                destination: '/app/newpoint',
                body: JSON.stringify(newPoint),
            });
        }
    };

    return (
        <div>
            <h3>Blueprint: {blueprint.name}</h3>
            <canvas
                ref={canvasRef}
                width="600"
                height="600"
                style={{ border: '1px solid black', touchAction: 'none' }}
                onPointerDown={handlePointerDown}
            ></canvas>
        </div>
    );
}

export default Canvas;
