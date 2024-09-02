const useCanvasBarChart = (canvasRef, config, dataSets = []) => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const { labels, chartHeight, chartWidth, padding } = config

    const barMaxWidth = chartWidth - 2 * padding;
    const barGap = 10; 
    const animationDuration = 1000;

    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, chartWidth, chartHeight);

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';

    labels.forEach((label, index) => {
      const x = padding + (index / (labels.length - 1)) * (chartWidth - 2 * padding);
      const y = chartHeight - padding / 2;
      ctx.fillText(label, x, y);
    });

    const drawBar = (data, color, index) => {
      data.forEach((value, i) => {
        const barWidth = Math.min(barMaxWidth, (chartWidth - 2 * padding - (data.length - 1) * barGap) / data.length);
        const x = padding + i * (barWidth + barGap);
        const y = chartHeight - padding;
        const barHeight = (value / Math.max(...data)) * (chartHeight - 2 * padding);

        let startTime = Date.now();

        const animateBar = () => {
          const elapsedTime = Date.now() - startTime;
          const progress = Math.min(elapsedTime / animationDuration, 1);
          const currentHeight = barHeight * progress;

          ctx.fillStyle = color;
          ctx.fillRect(x, y - currentHeight, barWidth, currentHeight);

          if (progress < 1) {
            requestAnimationFrame(animateBar);
          }
        };

        animateBar();
      });
    };

    dataSets.forEach((dataSet, index) => {
      setTimeout(() => {
        drawBar(dataSet.data, dataSet.color, index);
      }, index * (animationDuration + 200));
    });

};

export default useCanvasBarChart;
