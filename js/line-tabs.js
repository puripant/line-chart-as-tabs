/* global ThreesyLine document */

const data = [
  { x: 'Sunday', y: Math.random() },
  { x: 'Monday', y: Math.random() },
  { x: 'Tuesday', y: Math.random() },
  { x: 'Wednesday', y: Math.random() },
  { x: 'Thursday', y: Math.random() },
  { x: 'Friday', y: Math.random() },
  { x: 'Saturday', y: Math.random() },
];

const lineChart = new ThreesyLine({
  height: 300,
  width: 600,
  element: '#chart',
  classes: ['threesy-line-chart', 'line-chart'],
  data,
});

const getValue = ThreesyLine.getValue;

lineChart.draw();

// Enable tooltips using Tether tooltip.
lineChart.dataPoints
  .attr('data-tooltip', d => `${getValue(lineChart.accessorX, d)}: ${getValue(lineChart.accessorY, d).toFixed(3)}`)
  .attr('data-tooltip-position', 'top center');

const updateBtn = document.getElementById('update-btn');
const togglePointsBtn = document.getElementById('toggle-data-points');
const toggleGridLines = document.getElementById('toggle-grid-lines');

updateBtn.onclick = () => {
  data.forEach(d => (d.y = Math.random()));
  lineChart.update(data, true);
};

togglePointsBtn.onclick = () => {
  lineChart.toggleDataPoints();
};

toggleGridLines.onclick = () => {
  lineChart.toggleGridLines();
};
