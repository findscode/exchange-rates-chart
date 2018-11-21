(function() {
  const id = "chart";
  const config = {
    axis: {
      leftSpace: 60,
      bottomSpace: 40,
      lineWidth: 2,
      color: "#cfcfcf"
    },
    mesh: {
      horizontalLines: 8,
      verticalLines: 10,
      lineWidth: 1,
      color: "#e3e3e3"
    }
  }
  const chart = new ChartComponent(id, config);

  chart.drawAxis();
})()