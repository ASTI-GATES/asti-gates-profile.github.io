

document.addEventListener('DOMContentLoaded', function () {

    initializeCharts();
    animateProgressBars();


    initializeTabSwitching();
});

function initializeCharts() {
    const teamsCtx = document.getElementById('teamsChart').getContext('2d');
    const teamsChart = new Chart(teamsCtx, {
        type: 'doughnut',
        data: {
            labels: ['AI Team', 'Lakehouse Team', 'Platform Team', 'Management'],
            datasets: [{
                data: [52.1, 22.8, 13.9, 11.2],
                backgroundColor: [
                    '#3B82F6',
                    '#F59E0B',
                    '#10B981',
                    '#8B5CF6'
                ],
                borderWidth: 0,
                cutout: '60%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });


    const usersCtx = document.getElementById('usersChart').getContext('2d');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const userData = [12, 15, 18, 22, 28, 25, 30, 35, 32, 38, 42, 45];

    const usersChart = new Chart(usersCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Total Progress',
                data: userData,
                borderColor: '#3B82F6',
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#3B82F6',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9CA3AF',
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    display: true,
                    grid: {
                        color: 'rgba(156, 163, 175, 0.1)',
                        borderDash: [2, 2]
                    },
                    ticks: {
                        color: '#9CA3AF',
                        font: {
                            size: 11
                        },
                        callback: function (value) {
                            return value + '';
                        }
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            return 'Progress: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

function initializeTabSwitching() {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {

            tabs.forEach(t => t.classList.remove('active'));


            this.classList.add('active');


            updateChartBasedOnTab(this.textContent);
        });
    });
}

function updateChartBasedOnTab(tabName) {
    console.log('Selected tab:', tabName);

    const chart = Chart.getChart('usersChart');

    if (chart) {
        let newData;

        switch (tabName) {
            case 'This year':
                newData = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                break;
            case 'Last year':
                newData = [0, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 100];
                break;
            case 'Total Projects':
                newData = [5, 10, 15, 20, 25, 30, 35, 40,];
                break;
            case 'Operating Status':
                newData = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 80];
                break;
            default:
                newData = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        }

        chart.data.datasets[0].data = newData;
        chart.update('active');
    }
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

window.dashboardUtils = {
    initializeCharts,
    animateProgressBars,
    initializeTabSwitching,
    updateChartBasedOnTab,
    formatNumber
};

const teamsChart = new Chart(teamsCtx, {
    type: 'doughnut',
    data: { /* your data */ },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { /* ... */ }
    }
});
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: { /* your data */ },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { /* your plugins */ },
        scales: { y: { min: 400, max: 500 } }
    }
});
