function gen(count) {
  dataFull = [];
  let k = 0;
  for (let i = 0; i < count; i++) {
    dataFull.push(Math.cos(i) * k);
    k++;
  }
  return dataFull;
}
function zip(dataFull) {
  const data = [];
  const b = document.documentElement.clientWidth - 67;
  const step = Math.ceil(dataFull.length / b) * 6;
  for (let i = 0; i < dataFull.length; i += step) {
    part = dataFull.slice(i, i + step);
    sum = part.reduce((ac, cur) => ac + cur);
    max = Math.max(...part);
    min = Math.min(...part);
    data.push(min, sum / part.length, max);
  }
  return data;
}
anychart.onDocumentReady(function () {
  const dataFull = gen(20000);
  // data
  const dataSetFull = anychart.data.set(dataFull);

  const data = zip(dataFull);

  dataSet = anychart.data.set(data);

  // set chart type
  var chartFull = anychart.line();
  var chart = anychart.line();

  chartFull.title().text("Click on Chart to Add a Point ");
  chart.title().text("Click on Chart to Add a Point ");

  // set data
  chartFull.spline(dataSetFull).markers(null);
  chart.spline(dataSet).markers(null);

  // disable stagger mode. Only one line for x axis labels
  chartFull.xAxis().staggerMode(false);
  chart.xAxis().staggerMode(false);

  // set container and draw chart
  chartFull.container("container").draw();
  chart.container("container1").draw();

  // first index for new point
  indexSetter = dataSetFull.mapAs().getRowsCount() + 1;
  indexSetter = dataSet.mapAs().getRowsCount() + 1;
});
