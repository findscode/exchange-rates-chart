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
    }, (value, index) => (this.minRate + index * (this.maxRate - this.minRate) / (this.config.maxLevels - 1)).toFixed(4));
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

  toWindowY(windowY) {
    return this.chart.windowHeight - (windowY + this.chart.spaceHeight / 2 + this.config.axis.bottomSpace);
  }

  calculatePointY(rate) {
    return this.toWindowY(((rate - this.minRate) * (this.chart.worldHeight - this.chart.spaceHeight)) / (this.maxRate - this.minRate));
  }

  calculatePointX(i) {
    return this.chart.zero.x + (this.chart.spaceWidth * i);
  }

  drawChart() {
    this.chart.drawLabels(this.calculateRateLevels(), this.shownDays());

    let currentPoint = {
      x: this.calculatePointX(0),
      y: this.calculatePointY(this.data[0].rate)
    };
    for (let i = 1; i < this.data.length; i++) {
      const endPoint = {
        x: this.calculatePointX(i),
        y: this.calculatePointY(this.data[i].rate)
      };
      this.chart.drawLine(currentPoint, endPoint);
      this.chart.drawTop(endPoint);
      currentPoint = endPoint;
    }
  }
}