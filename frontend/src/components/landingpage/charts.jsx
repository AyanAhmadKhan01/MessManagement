'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


export default function ViewsLineChart({dataset, time}) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const gradient = ctx.createLinearGradient(0,0, 0, 310);
    gradient.addColorStop(0, 'rgb(20,126,255)');
    gradient.addColorStop(1, 'rgb(0,0,0)'); 


    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '03:20 PM', '03:25 PM', '03:30 PM',
          '03:35 PM', '03:40 PM', '03:45 PM',
          '03:50 PM', '03:55 PM'
        ],
        datasets: [
          {
            data: [112, 114, 113, 116, 115, 118, 117, 119],
            borderColor: '#ff2056',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 4,
            pointBackgroundColor: '#ff1f1f',
          }
        ],
      },
      options: {
        
        scales: {
          x: {
            ticks: { display: false },
            grid: { display: false } 
          },
          y: {
            ticks: { display: false },
            grid: { display: false } 
          }
        },
        devicePixelRatio: window.devicePixelRatio, 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgb(10, 10, 10)',
            borderWidth: 2, 
            titleFont: { family: 'Roboto', size: '21', weight: 'bolder' },
            bodyFont: { family: 'Roboto', size: '22', weight: 'normal'},
            bodyColor: '#ff2056',
            padding: 10,
            borderColor: 'rgba(255,255,255,0.05)',
            caretSize: 0,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `${context.parsed.y} Users `;
              }
            }
          },
          
          legend: {
            display: false,
          },  
          hover: {
          mode: 'index',
          intersect: false,
        },
        },
      } , 
    });

    return () => {
      chartInstance.destroy();
    };
  }, [dataset, time]);

  return <canvas ref={chartRef}
   />

}