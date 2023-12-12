import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface PieChartProps {
  data: { [key: string]: number };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    //@ts-ignore
    const ctx = chartRef.current?.getContext('2d');

    // Limpiar el gráfico anterior al desmontar el componente
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    // Crear o actualizar el gráfico
    if (ctx) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      //@ts-ignore
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                // Agrega más colores según sea necesario
              ],
            },
          ],
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
