/* global ThreesyLine document d3 */

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

const selectPoint = (selectedDatum) => {
  d3.selectAll('.threesy-data-point')
      .style('stroke', 'darkgray')
      .style('fill', 'darkgray')
    .filter(d => d === selectedDatum)
      .style('stroke', 'darkred')
      .style('fill', 'darkred');
  d3.selectAll('.threesy-grid-line-x')
      .style('stroke', 'lightgray')
      .style('stroke-dasharray', '5, 5')
    .filter(d => d === selectedDatum)
      .style('stroke', 'darkred')
      .style('stroke-dasharray', '5, 0');
};

lineChart.draw();
selectPoint(data.length - 1);

// Enable tooltips using Tether tooltip.
lineChart.dataPoints
  .attr('data-tooltip', d => `${getValue(lineChart.accessorX, d)}: ${getValue(lineChart.accessorY, d).toFixed(3)}`)
  .attr('data-tooltip-position', 'top center');
d3.selectAll('.threesy-data-point')
  .on('click', (d) => {
    selectPoint(d);
  });
