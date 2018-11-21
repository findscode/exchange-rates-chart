class ApplicationService {
  constructor() {
    this.id = "chart";
    this.config = {
      maxValues: 10,
      maxLevels: 8,
      axis: {
        leftSpace: 60,
        bottomSpace: 40,
        rightSpace: 25,
        lineWidth: 2,
        color: "#e3e3e3"
      },
      mesh: {
        lineWidth: 1,
        color: "#cfcfcf"
      },
      labels: {
        color: "#e3e3e3",
        font: "11px Consolas",
        bottomOffset: 20,
        leftOffset: 50
      },
      line: {
        negativeColor: "#FFCC49",
        positiveColor: "#6ECB68"
      }
    };

    this.fetchData();    
  }

  initialize(data) {
    this.chartController = new ChartController(this.id, this.config, data);
    this.chartController.render();
  }

  async fetchData() {
    const client = new ExchangeApiClient();
    return client.fetchDailyRates(this.config.maxValues).then((response) => {
        this.initialize(Mappers.mapNbrbResponse(response));
      });
  }
}