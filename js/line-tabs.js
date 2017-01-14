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

const chart = new ThreesyLine({
  height: 300,
  width: 600,
  element: '#chart',
  classes: ['threesy-line-chart', 'line-chart'],
  data,
});

const getValue = ThreesyLine.getValue;

chart.draw();

// Enable tooltips using Tether tooltip.
chart.dataPoints
  .attr('data-tooltip', (d) => { `${getValue(chart.accessorX, d)}: ${getValue(chart.accessorY, d).toFixed(3)}` })
  .attr('data-tooltip-position', 'top center');

const updateBtn = document.getElementById('update-btn');
const togglePointsBtn = document.getElementById('toggle-data-points');
const toggleGridLines = document.getElementById('toggle-grid-lines');

updateBtn.onclick = () => {
  data.forEach((d) => { d.y = Math.random(); });
  chart.update(data, true);
};

togglePointsBtn.onclick = () => {
  chart.toggleDataPoints();
};

toggleGridLines.onclick = () => {
  chart.toggleGridLines();
};
