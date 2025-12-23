window.renderPareto = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <canvas id="pareto-canvas" style="width:100%; height:100%;"></canvas>
    `;

    const ctx = document.getElementById('pareto-canvas').getContext('2d');

    const rawData = [
        { reason: '表面刮痕', count: 185 },
        { reason: '尺寸誤差', count: 90 },
        { reason: '組裝間隙', count: 65 },
        { reason: '標籤脫落', count: 35 },
        { reason: '顏色不均', count: 20 },
        { reason: '其他項目', count: 15 }
    ];

    rawData.sort((a, b) => b.count - a.count);

    const labels = rawData.map(d => d.reason);
    const counts = rawData.map(d => d.count);

    let running = 0;
    const total = counts.reduce((a, b) => a + b, 0);
    const cumulative = counts.map(c => {
        running += c;
        return +(running / total * 100).toFixed(1);
    });

    new Chart(ctx, {
        data: {
            labels,
            datasets: [
                {
                    type: 'bar',
                    label: '次數',
                    data: counts,
                    backgroundColor: '#FBBF24',
                    borderRadius: 10,
                    yAxisID: 'y'
                },
                {
                    type: 'line',
                    label: '累積百分比 (%)',
                    data: cumulative,
                    borderColor: '#FB7185',
                    backgroundColor: '#FB7185',
                    tension: 0,
                    pointRadius: 5,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: { weight: 'bold' }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '次數'
                    }
                },
                y1: {
                    beginAtZero: true,
                    max: 100,
                    position: 'right',
                    title: {
                        display: true,
                        text: '累積百分比 (%)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });

    console.log('✅ renderPareto 已成功掛載並執行');
};
