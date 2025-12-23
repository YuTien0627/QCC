export function initParetoChart(canvasId) {

    const rawData = [
        { reason: '表面刮痕', count: 185 },
        { reason: '尺寸誤差', count: 90 },
        { reason: '組裝間隙', count: 65 },
        { reason: '標籤脫落', count: 35 },
        { reason: '顏色不均', count: 20 },
        { reason: '其他項目', count: 15 }
    ];

    rawData.sort((a, b) => b.count - a.count);
    const totalCount = rawData.reduce((sum, item) => sum + item.count, 0);

    const barWidthRatio = 0.8;
    const labels = rawData.map(d => d.reason);

    let runningSum = 0;
    const lineData = [{ x: 0, y: 0 }];
    const barData = [];
    let eightyPercentPoint = null;

    rawData.forEach((item, index) => {
        runningSum += item.count;
        const center = index + (barWidthRatio / 2);
        const percentage = ((runningSum / totalCount) * 100).toFixed(1);

        lineData.push({ x: center, y: percentage });
        barData.push({ x: center, y: item.count });

        if (percentage >= 80 && !eightyPercentPoint) {
            eightyPercentPoint = {
                x: center,
                y: percentage,
                count: runningSum
            };
        }
    });

    const ctx = document.getElementById(canvasId).getContext('2d');

    return new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                {
                    label: '累積百分比 (%)',
                    data: lineData,
                    type: 'line',
                    borderColor: '#FF7EB9',
                    borderWidth: 5,
                    pointRadius: 7,
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: '#FF7EB9',
                    pointBorderWidth: 3,
                    yAxisID: 'yPercentage',
                    tension: 0,
                    order: 1
                },
                {
                    label: '發生次數',
                    data: barData,
                    type: 'bar',
                    backgroundColor: ['#A2D2FF', '#BDE0FE', '#FFC8DD', '#FFAFCC', '#FFB7B2', '#FFDAC1'],
                    borderRadius: 15,
                    yAxisID: 'yCount',
                    order: 2,
                    barPercentage: barWidthRatio,
                    categoryPercentage: 1.0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    min: 0,
                    max: rawData.length,
                    grid: { display: false },
                    ticks: {
                        stepSize: 1,
                        callback: v => labels[Math.floor(v)] || ''
                    }
                },
                yCount: {
                    beginAtZero: true,
                    title: { display: true, text: '次數' }
                },
                yPercentage: {
                    position: 'right',
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: '累積百分比 (%)' }
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        hLine: {
                            type: 'line',
                            yMin: eightyPercentPoint.count,
                            yMax: eightyPercentPoint.count,
                            xMin: 0,
                            xMax: eightyPercentPoint.x,
                            borderDash: [6, 6],
                            yAxisID: 'yCount'
                        }
                    }
                }
            }
        }
    });
}
