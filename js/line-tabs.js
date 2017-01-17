/* global ThreesyLine document */

const data = [
  { x: 'Oct 2016', y: Math.random() },
  { x: 'Nov 2016', y: Math.random() },
  { x: 'Dec 2016', y: Math.random() },
  { x: 'Jan 2017', y: Math.random() },
  { x: 'Feb 2017', y: Math.random() },
];

const lineChart = new ThreesyLine({
  height: 300,
  width: 500,
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
