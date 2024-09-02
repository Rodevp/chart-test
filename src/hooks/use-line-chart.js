const useCanvasLineChart = (canvasRef, config, dataSets = []) => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    console.log(config)

    const { labels, chartHeight, chartWidth, padding } = config

    const pointRadius = 5;
    const lineDrawDuration = 1000;
    const pointDrawDelay = 1000;

    // Fondo del canvas
    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, chartWidth, chartHeight);

    // Dibujar etiquetas en el eje X
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
        const x = padding + (index / (labels.length - 1)) * (chartWidth - 2 * padding);
        const y = chartHeight - padding / 2;
        ctx.fillText(label, x, y);
    });

    const drawLineForDataSet = (data, color, index) => {
        let currentIndex = 0;

        const drawPoint = () => {
            const x = padding + (currentIndex / (labels.length - 1)) * (chartWidth - 2 * padding);
            const y = chartHeight - padding - (data[currentIndex] / Math.max(...data)) * (chartHeight - 2 * padding);

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, pointRadius, 0, 2 * Math.PI);
            ctx.fill();

            setTimeout(() => {
                currentIndex++;
                if (currentIndex < labels.length) {
                    drawLine();
                }
            }, pointDrawDelay);
        };

        const drawLine = () => {
            if (currentIndex === 0) {
                drawPoint();
                return;
            }

            const prevIndex = currentIndex - 1;
            const prevX = padding + (prevIndex / (labels.length - 1)) * (chartWidth - 2 * padding);
            const prevY = chartHeight - padding - (data[prevIndex] / Math.max(...data)) * (chartHeight - 2 * padding);
            const x = padding + (currentIndex / (labels.length - 1)) * (chartWidth - 2 * padding);
            const y = chartHeight - padding - (data[currentIndex] / Math.max(...data)) * (chartHeight - 2 * padding);

            const startTime = Date.now();

            const animateLine = () => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / lineDrawDuration, 1);

                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(prevX + (x - prevX) * progress, prevY + (y - prevY) * progress);
                ctx.stroke();

                if (progress < 1) {
                    requestAnimationFrame(animateLine);
                } else {
                    drawPoint();
                }
            };

            animateLine();
        };

        drawLine();
    };

    dataSets.forEach((dataSet, index) => {
        setTimeout(() => {
            drawLineForDataSet(dataSet.data, dataSet.color, index);
        }, index * (dataSets.length * (lineDrawDuration + pointDrawDelay)));
    });

};

export default useCanvasLineChart;
