class ChartController {
  constructor(id, config, data) {
    this.chart = new ChartComponent(id, config);
    this.config = config;
    this.data = data;
    this.maxRate = this.maxRate();
    this.minRate = this.minRate();
    this.drawChart();
  }

  calculateRateLevels() {
    return Array.from({
      length: this.config.maxLevels
    }, (value, index) => (this.minRate + index * (this.maxRate - this.minRate) / this.config.maxLevels).toFixed(4));
  }

  shownDays() {
    return this.data.map(datum => new Date(Date.parse(datum.date)).toLocaleDateString());
  }

  maxRate() {
    return Math.max(...this.data.map(datum => datum.rate));
  }

  minRate() {
    return Math.min(...this.data.map(datum => datum.rate));
  }

  drawChart() {
    this.chart.drawLabels(this.calculateRateLevels(), this.shownDays());
    console.log(this.shownDays());
    this.data.forEach(datum => {
      
    });
  }
}