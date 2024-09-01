import  { useEffect, useRef } from 'react';

const LineChart = (props) => {


    const { precipitations } = props


  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const data = precipitations?.length ? precipitations : []; 
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const chartWidth = 400;
    const chartHeight = 400;
    const padding = 40;
    const lineColor = '#FF6B6B';
    const pointColor = '#FFD93D';

    ctx.fillStyle = '#2c2c2e';
    ctx.fillRect(0, 0, chartWidth, chartHeight);

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (index / (labels.length - 1)) * (chartWidth - 2 * padding);
      const y = chartHeight - padding - (value / Math.max(...data)) * (chartHeight - 2 * padding);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    data.forEach((value, index) => {
      const x = padding + (index / (labels.length - 1)) * (chartWidth - 2 * padding);
      const y = chartHeight - padding - (value / Math.max(...data)) * (chartHeight - 2 * padding);

      ctx.fillStyle = pointColor;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
      const x = padding + (index / (labels.length - 1)) * (chartWidth - 2 * padding);
      const y = chartHeight - padding / 2;
      ctx.fillText(label, x, y);
    });

  }, []);

  return (
    <div className='chart-container'>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default LineChart;
