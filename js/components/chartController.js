import ChartComponent from './chartComponent.js';

export default class ChartController {
  constructor(id, config, data) {
    this.chart = new ChartComponent(id, config);
    this.config = config;
    this.data = data;
    this.maxRate = this.maxRate();
    this.minRate = this.minRate();
    this.range = this.maxRate - this.minRate;
    this.tops = [];
    this.chart.registerMouseMoveEvent(this.onMouseMove.bind(this));
  }

  generateTooltip(datum) {
    const date = new Date(Date.parse(datum.date)).toLocaleDateString();
    return `rate: ${datum.rate} date: ${date}`;
  }

  onMouseMove(event) {
    const point = {
      x: event.offsetX,
      y: event.offsetY
    }
    const topNumber = this.checkIfOnTop(point)
    if (topNumber) {
      this.drawTooltip(this.generateTooltip(this.data[topNumber]));
    } else {
      this.drawTooltip('');
    }
  }

  checkIfOnTop(point) {
    let topNumber = null;
    this.tops.forEach((top, index) => {
      const dx = top.x - point.x;
      const dy = top.y - point.y;
      const radius = this.config.tops.radius + 2;
      if (dx * dx + dy * dy < radius * radius) {
        topNumber = index;
      }
    });
    return topNumber;
  }

  calculateRateLevels() {
    return Array.from({
      length: this.config.maxLevels
    }, (value, index) => (this.minRate + index * this.range / (this.config.maxLevels - 1)).toFixed(4));
  }

  shownDays() {
    return this.data.map(datum => new Date(Date.parse(datum.date)).toLocaleDateString().slice(0, 5));
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
    return this.toWindowY(((rate - this.minRate) * (this.chart.worldHeight - this.chart.spaceHeight)) / this.range);
  }

  calculatePointX(i) {
    return this.chart.zero.x + (this.chart.spaceWidth * i);
  }

  drawTops() {
    let currentPoint = {
      x: this.calculatePointX(0),
      y: this.calculatePointY(this.data[0].rate)
    };
    this.tops.push(currentPoint);
    for (let i = 1; i < this.data.length; i++) {
      const endPoint = {
        x: this.calculatePointX(i),
        y: this.calculatePointY(this.data[i].rate)
      };
      this.tops.push(endPoint);
      const currentColor = endPoint.y < currentPoint.y ? this.config.line.positiveColor : this.config.line.negativeColor;
      this.chart.drawTop(endPoint, currentColor);
      currentPoint = endPoint;
    }
  }

  drawChartLine() {
    let currentPoint = {
      x: this.calculatePointX(0),
      y: this.calculatePointY(this.data[0].rate)
    };
    for (let i = 1; i < this.data.length; i++) {
      const endPoint = {
        x: this.calculatePointX(i),
        y: this.calculatePointY(this.data[i].rate)
      };
      const currentColor = endPoint.y < currentPoint.y ? this.config.line.positiveColor : this.config.line.negativeColor;
      this.chart.changeStrokeColor(currentColor);
      this.chart.drawLine(currentPoint, endPoint);
      currentPoint = endPoint;
    }
  }

  drawTooltip(tooltip) {
    this.chart.drawText({
      x: this.chart.windowWidth - this.config.tooltip.width,
      y: this.config.tooltip.offset
    }, tooltip);
  }

  render() {
    this.chart.drawLabels(this.calculateRateLevels(), this.shownDays());
    this.drawChartLine();
    this.drawTops();
  }
}