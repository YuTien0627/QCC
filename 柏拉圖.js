/**
 * Pareto Chart Rendering Module (Cute Style)
 * 功能：繪製專業柏拉圖，包含累積曲線、80/20 標示線與可愛風配色。
 */

window.renderPareto = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    // 初始化 Canvas 結構與基本樣式
    container.innerHTML = `
        <div style="width: 100%; height: 100%; background: #FFFFFF; border-radius: 40px; padding: 25px; box-shadow: 0 15px 35px rgba(255, 182, 193, 0.4); border: 6px solid #FFE4E1; box-sizing: border-box;">
            <canvas id="pareto-canvas"></canvas>
        </div>
    `;

    const ctx = document.getElementById('pareto-canvas').getContext('2d');

    // 原始數據
    const rawData = [
        { reason: '表面刮痕', count: 185 },
        { reason: '尺寸誤差', count: 90 },
        { reason: '組裝間隙', count: 65 },
        { reason: '標籤脫落', count: 35 },
        { reason: '顏色不均', count: 20 },
        { reason: '其他項目', count: 15 }
    ];

    // 1. 數據預處理：降序排列
    rawData.sort((a, b) => b.count - a.count);
    const totalCount = rawData.reduce((sum, item) => sum + item.count, 0);
    
    // 2. 設定渲染參數
    const barWidthRatio = 0.8; // 長條圖佔比，保留間隔
    const labels = rawData.map(d => d.reason);
    
    let runningSum = 0;
    const lineData = [{x: 0, y: 0}]; // 強制從 (0,0) 開始
    const barData = [];
    let eightyPercentPoint = null;

    // 3. 計算座標與 80/20 焦點
    rawData.forEach((item, index) => {
        runningSum += item.count;
        // 讓點與長條中心對齊： index + (barWidthRatio / 2)
        const centerPoint = index + (barWidthRatio / 2);
        const percentage = +((runningSum / totalCount) * 100).toFixed(1);
        
        lineData.push({
            x: centerPoint,
            y: percentage
        });
        
        barData.push({
            x: centerPoint,
            y: item.count
        });

        // 尋找超過 80% 的關鍵平衡點
        if (percentage >= 80 && eightyPercentPoint === null) {
            eightyPercentPoint = {
                x: centerPoint,
                y: percentage,
                count: runningSum
            };
        }
    });

    // 4. 建立 Chart.js 圖表
    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                {
                    label: '累積百分比 (%)',
                    data: lineData,
                    type: 'line',
                    borderColor: '#FF7EB9', // 可愛粉紅
                    backgroundColor: '#FF7EB9',
                    borderWidth: 5,
                    pointRadius: 6,
                    pointHoverRadius: 9,
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
                    // 馬卡龍配色組合
                    backgroundColor: ['#A2D2FF', '#BDE0FE', '#FFC8DD', '#FFAFCC', '#FFB7B2', '#FFDAC1'],
                    borderRadius: 15, // 圓角外觀
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
                        callback: function(value) {
                            // 標籤僅顯示在長條正中心下方
                            const labelIndex = Math.floor(value);
                            if (Math.abs(value - (labelIndex + (barWidthRatio / 2))) < 0.01) {
                                return labels[labelIndex] || '';
                            }
                            return '';
                        },
                        font: { size: 13, weight: 'bold' },
                        color: '#666'
                    }
                },
                yCount: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    max: totalCount,
                    title: {
                        display: true,
                        text: '次數',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: { color: '#FFE4E1' }
                },
                yPercentage: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: '累積百分比 (%)',
                        font: { size: 14, weight: 'bold' },
                        color: '#FF7EB9'
                    },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { font: { weight: 'bold' } }
                },
                tooltip: {
                    callbacks: {
                        title: (context) => labels[Math.floor(context[0].parsed.x)] || '',
                        label: (context) => context.datasetIndex === 0 ? ` 累積：${context.parsed.y}%` : ` 次數：${context.parsed.y}`
                    }
                },
                annotation: {
                    annotations: {
                        // 80/20 L型線：水平向左對齊 Y 軸 (次數)
                        hLine: {
                            type: 'line',
                            yMin: eightyPercentPoint.count,
                            yMax: eightyPercentPoint.count,
                            xMin: 0,
                            xMax: eightyPercentPoint.x,
                            borderColor: 'rgba(255, 126, 185, 0.8)',
                            borderWidth: 3,
                            borderDash: [6, 6],
                            yAxisID: 'yCount'
                        },
                        // 80/20 L型線：垂直向下對齊 X 軸 (分類)
                        vLine: {
                            type: 'line',
                            xMin: eightyPercentPoint.x,
                            xMax: eightyPercentPoint.x,
                            yMin: 0,
                            yMax: eightyPercentPoint.count,
                            borderColor: 'rgba(255, 126, 185, 0.8)',
                            borderWidth: 3,
                            borderDash: [6, 6],
                            yAxisID: 'yCount'
                        },
                        // 80% 關鍵標籤
                        pointLabel: {
                            type: 'label',
                            xValue: eightyPercentPoint.x,
                            yValue: eightyPercentPoint.count,
                            backgroundColor: '#FF7EB9',
                            content: ['80% 關鍵點'],
                            font: { size: 12, weight: 'bold' },
                            color: '#fff',
                            borderRadius: 20,
                            padding: 8,
                            yAdjust: -30,
                            yAxisID: 'yCount'
                        }
                    }
                }
            }
        }
    });

    console.log('✅ Pareto Chart (Cute Style) rendered successfully');
};
