import React, { useEffect, useRef, useState } from 'react';
import useCanvasChart from './hooks/use-line-chart';

const RainChart = () => {

    const canvasRef = useRef(null);

    const [colors, setColors] = useState({
        line1: '#FF6B6B',
        line2: '#4ECDC4',
        line3: '#F7B32B',
    });

    const [changeGrid, setChangeGrid] = useState(false);

    const [lines, setLines] = useState({
        gridX: '',
        gridY: ''
    });

    useEffect(() => {
        useCanvasChart(canvasRef, colors, lines.gridX, lines.gridY)
    }, [colors, changeGrid])

    const handleColorChange = (line, color) => {
        setColors(prevColors => ({
            ...prevColors,
            [line]: color
        }));
    };

    const handleXGridChange = (e) => {
        setLines(prevLines => ({
            ...prevLines,
            gridX: Number(e.target.value)
        }));
    };

    const handleYGridChange = (e) => {
        setLines(prevLines => ({
            ...prevLines,
            gridY: Number(e.target.value)
        }));
    };

    const handleGridChange = () => {
        setChangeGrid(prevChangeGrid => !prevChangeGrid);
    };

    const handleReset = () => {
        setLines({
            gridX: '',
            gridY: ''
        });
        setChangeGrid(false);
    };

    return (
        <div className='chart-container'>
            <div>
            <div className="legend">
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: colors.line1 }}></span>
                    <span>Función 1</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: colors.line2 }}></span>
                    <span>Función 2</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: colors.line3 }}></span>
                    <span>Función 3</span>
                </div>
            </div>
            <canvas ref={canvasRef} width={400} height={400} />
            </div>
            <section className='options'>
                <section className='color-picker'>
                    <div>
                        <label>Línea 1 Color: </label>
                        <input
                            type="color"
                            value={colors.line1}
                            onChange={(e) => handleColorChange('line1', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Línea 2 Color: </label>
                        <input
                            type="color"
                            value={colors.line2}
                            onChange={(e) => handleColorChange('line2', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Línea 3 Color: </label>
                        <input
                            type="color"
                            value={colors.line3}
                            onChange={(e) => handleColorChange('line3', e.target.value)}
                        />
                    </div>
                </section>
                <section className='grid-settings'>
                    <div>
                        <p>Linea verticales y: </p>
                        <input
                            value={lines.gridY}
                            type="text"
                            placeholder='jumero de lineas'
                            onChange={handleYGridChange}
                        />
                    </div>
                    <div>
                        <p>Linea verticales x: </p>
                        <input
                            value={lines.gridX}
                            type="text"
                            placeholder='jumero de lineas'
                            onChange={handleXGridChange}
                        />
                    </div>
                    <div className='buttons'>
                        <button onClick={handleGridChange} >Aplicar</button>
                        <button className='delete' onClick={handleReset}>Borrar</button>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default RainChart;
