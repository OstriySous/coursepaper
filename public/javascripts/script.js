let chartInstance = null;

function calculate() {
    const str1 = document.getElementById('string1').value;
    const str2 = document.getElementById('string2').value;
    const result = wagnerFischer(str1, str2);
    document.getElementById('result').innerText = `Редакционное расстояние: ${result}`;
}

function wagnerFischer(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    displayMatrix(dp, s1, s2);
    visualizeMatrix(dp, s1, s2);
    return dp[m][n];
}

function displayMatrix(matrix, s1, s2) {
    const table = document.getElementById('matrix');
    if (!table) {
        console.error('Element with id "matrix" not found');
        return;
    }
    table.innerHTML = ''; // Очистка таблицы перед обновлением

    // Создание заголовков таблицы
    let headerRow = '<tr><th></th><th></th>';
    for (let j = 0; j < s2.length; j++) {
        headerRow += `<th>${s2[j]}</th>`;
    }
    headerRow += '</tr>';
    table.innerHTML += headerRow;

    // Заполнение таблицы значениями матрицы
    for (let i = 0; i < matrix.length; i++) {
        let row = '<tr>';
        if (i > 0) {
            row += `<th>${s1[i - 1]}</th>`;
        } else {
            row += '<th></th>';
        }
        for (let j = 0; j < matrix[i].length; j++) {
            row += `<td>${matrix[i][j]}</td>`;
        }
        row += '</tr>';
        table.innerHTML += row;
    }
}

function visualizeMatrix(matrix, s1, s2) {
    const ctx = document.getElementById('matrixChart').getContext('2d');

    // Удаление предыдущего графика, если он существует
    if (chartInstance) {
        chartInstance.destroy();
    }

    const labels = ['', ...s2.split('')];
    const colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    const datasets = matrix.map((row, i) => ({
        label: i === 0 ? '' : s1[i - 1],
        data: row,
        fill: false,
        borderColor: colors[i % colors.length],
        tension: 0.1,
        pointBackgroundColor: colors[i % colors.length],
        pointBorderColor: colors[i % colors.length],
        pointRadius: 5
    }));

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
