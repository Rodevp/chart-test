const usePaintGrid = (ctxRef, gridX, gridY) => {

    const canvas = ctxRef?.current;
    const ctx = canvas.getContext('2d');

    const padding = 40;
    const chartWidth = 400;
    const chartHeight = 400;

    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;

    for (let i = 0; i <= gridX; i++) {
        const x = padding + i * ((chartWidth - 2 * padding) / gridX);
        ctx?.beginPath();
        ctx?.moveTo(x, padding);
        ctx?.lineTo(x, chartHeight - padding);
        ctx?.stroke();
    }

    for (let i = 0; i <= gridY; i++) {
        const y = padding + i * ((chartHeight - 2 * padding) / gridY);
        ctx.beginPath();
        ctx?.moveTo(padding, y);
        ctx?.lineTo(chartWidth - padding, y);
        ctx?.stroke();
    }

}

export default usePaintGrid