import { useEffect, useRef, useState } from 'react';

import useCanvasLineChart from './hooks/use-line-chart';
import useCanvasBarChart from './hooks/use-bar-chart';
import usePaintGrid from './hooks/use-paint-grid';

const Chart = () => {

    const data = JSON.parse(localStorage.getItem('data'));

    const canvasRef = useRef(null);

    const [colors, setColors] = useState( data?.colors || {
        line1: '#FF6B6B',
        line2: '#4ECDC4',
        line3: '#F7B32B',
    });

    const [changeGrid, setChangeGrid] = useState(false);

    const [lines, setLines] = useState( data?.lines || {
        gridX: '',
        gridY: ''
    });

    const [typeChart, setTypeChart] = useState( data?.typeChart || null);

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const datasets = [
        { data: [10, 20, 15, 5, 30, 25, 40], color: colors.line1 },
        { data: [5, 15, 10, 20, 25, 30, 35], color: colors.line2 },
        { data: [20, 10, 25, 15, 10, 20, 30], color: colors.line3 }
    ];

    const CONFIG = {
        labels: labels,
        chartWidth: 400,
        chartHeight: 400,
        padding: 40,
    }

    useEffect(() => {
        
        localStorage.setItem('data', JSON.stringify({
            lines,
            colors,
            typeChart
        }));

    }, [typeChart, lines, colors]);

    useEffect(() => {

        if (typeChart === 'line') useCanvasLineChart(canvasRef, CONFIG, datasets);
        
        if (typeChart === 'bar') useCanvasBarChart(canvasRef, CONFIG, datasets);

        usePaintGrid(canvasRef, lines.gridX, lines.gridY);

    }, [colors, changeGrid, typeChart])

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

    const lineChartChange = () => setTypeChart('line');
    const barChartChange = () => setTypeChart('bar');

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
                <section className='type-chart'>
                    <h4>Tipo de grafico</h4>
                    <div>
                        <button className='button-chart' onClick={lineChartChange}>Line</button>
                        <button className='button-chart' onClick={barChartChange}>Bar</button>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Chart;
