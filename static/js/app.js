let chart;
let allData = [];

async function loadWeightData() {
    try {
        const response = await fetch('/api/weight-data');
        const result = await response.json();
        
        if (result.success) {
            allData = result.data;
            initChart();
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function initChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Weight (kg)',
                data: allData.map(d => ({
                    x: d.date,
                    y: d.value
                })),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        tooltipFormat: 'MMM dd, yyyy',
                        displayFormats: {
                            hour: 'MMM dd',
                            day: 'MMM dd',
                            week: 'MMM dd',
                            month: 'MMM yyyy',
                            year: 'yyyy'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Weight (kg)'
                    }
                }
            },
            plugins: {
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const date = new Date(context.parsed.x);
                            const dateStr = date.toLocaleDateString();
                            return `${dateStr}: ${context.parsed.y.toFixed(1)} kg`;
                        }
                    }
                }
            }
        }
    });
}

function setTimeRange(range) {
    if (!chart || !allData.length) return;
    
    const now = new Date();
    let startDate;
    
    switch(range) {
        case 'day':
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            break;
        case 'week':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
        case 'year':
            startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            break;
        case 'all':
            startDate = new Date(allData[0].date);
            break;
    }
    
    chart.options.scales.x.min = startDate;
    chart.options.scales.x.max = now;
    chart.update('none');
}

function resetZoom() {
    if (chart) {
        chart.resetZoom();
    }
}

document.addEventListener('DOMContentLoaded', loadWeightData);