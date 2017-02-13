/* global ThreesyLine document d3 */

const titles = ['index 1', 'index 2', 'index 3', 'index 4', 'index 5',
  'index 6', 'index 7', 'index 8', 'index 9', 'index 10'];
const data = [
  { x: 'Oct 2016' },
  { x: 'Nov 2016' },
  { x: 'Dec 2016' },
  { x: 'Jan 2017' },
  { x: 'Feb 2017' },
];
data.forEach((_, i) => {
  data[i].raw = [...Array(titles.length)].map(() => Math.random());
  data[i].y = data[i].raw.reduce((a, b) => a + b); // plot average
});
let selectedDatum = data[data.length - 1];

const active_color = '#FF576C';
const inactive_color = 'darkgray';

const lineChart = new ThreesyLine({
  height: 200,
  width: 500,
  element: '#chart',
  classes: ['threesy-line-chart', 'line-chart'],
  data,
});
const getValue = ThreesyLine.getValue;
lineChart.draw();

const table = d3.select('#datatable');
const tbody = table.select('tbody');
const tr = tbody.selectAll('tr')
    .data(selectedDatum.raw)
  .enter().append('tr');

const selectPoint = (datum) => {
  // Update chart
  d3.selectAll('.threesy-data-point')
      .style('stroke', inactive_color)
      .style('fill', inactive_color)
    .filter(d => d === datum)
      .style('stroke', active_color)
      .style('fill', active_color);
  d3.selectAll('.threesy-grid-line-x')
      .style('stroke', 'lightgray')
      .style('stroke-dasharray', '5, 5')
    .filter(d => d === datum)
      .style('stroke', active_color)
      .style('stroke-dasharray', '5, 0');
  d3.selectAll('.threesy-grid-line-y')
      .style('display', 'none')
    .filter(d => d === datum)
      .style('display', 'unset');

  // Update table
  selectedDatum = datum;
  const td = tr.selectAll('td')
    .data((d, i) => [titles[i], selectedDatum.raw[i].toFixed(2)], d => d);
  td.exit().remove();
  td.enter().append('td')
    .text(d => d);
};
selectPoint(selectedDatum);

// Enable tooltips using Tether tooltip.
lineChart.dataPoints
  .attr('data-tooltip', d => `${getValue(lineChart.accessorX, d)}: ${getValue(lineChart.accessorY, d).toFixed(2)}`)
  .attr('data-tooltip-position', 'top center');
d3.selectAll('.threesy-data-point')
  .on('click', (d) => {
    selectPoint(d);
  });
