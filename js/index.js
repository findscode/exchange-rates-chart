(function() {
  const id = "chart";
  const config = {
    maxValues: 10,
    maxLevels: 8,
    axis: {
      leftSpace: 60,
      bottomSpace: 40,
      lineWidth: 2,
      color: "#e3e3e3"
    },
    mesh: {
      verticalLines: 10,
      horizontalLines: 8,
      lineWidth: 1,
      color: "#cfcfcf"
    },
    labels: {
      color: "#e3e3e3",
      font: "11px Consolas"
    }
  };

  const data = [
    {"currencyId":145,"date":"2018-11-10T00:00:00","rate":2.1336},
    {"currencyId":145,"date":"2018-11-11T00:00:00","rate":2.1336},
    {"currencyId":145,"date":"2018-11-12T00:00:00","rate":2.1336},
    {"currencyId":145,"date":"2018-11-13T00:00:00","rate":2.1431},
    {"currencyId":145,"date":"2018-11-14T00:00:00","rate":2.1449},
    {"currencyId":145,"date":"2018-11-15T00:00:00","rate":2.1472},
    {"currencyId":145,"date":"2018-11-16T00:00:00","rate":2.1222},
    {"currencyId":145,"date":"2018-11-17T00:00:00","rate":2.1102},
    {"currencyId":145,"date":"2018-11-18T00:00:00","rate":2.1102},
    {"currencyId":145,"date":"2018-11-19T00:00:00","rate":2.1102},
  ];

  const chartController = new ChartController(id, config, data);
})()