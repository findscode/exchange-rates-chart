(function() {
  const id = "chart";
  const config = {
    mainColor: "#eeeeee",
    axis: {
      leftSpace: 60,
      bottomSpace: 40,
      lineWidth: 2
    },
    mesh: {
      horizontalLines: 8,
      verticalLines: 10,
      lineWidth: 1
    }
  }
  const chart = new ChartComponent(id, config);

  chart.drawAxis();
})()