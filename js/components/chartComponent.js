class ChartComponent {
  constructor(id, config) {
    this.chart = document.getElementById(id);
    this.context = chart.getContext('2d');
    this.config = config;
    this.windowWidth = this.context.canvas.clientWidth;
    this.windowHeight = this.context.canvas.clientHeight;
    this.zero = {
      x: this.config.axis.leftSpace,
      y: this.windowHeight - this.config.axis.bottomSpace
    }
    this.worldWidth = this.windowWidth - this.zero.x;
    this.worldHeight = this.zero.y - this.config.axis.topSpace;
    this.initialize();
  }

  registerMouseMoveEvent(onMouseMove) {
    this.chart.addEventListener('mousemove', onMouseMove);
  }

  resizeChartToDisplaySize() {
    const width = this.chart.clientWidth;
    const height = this.chart.clientHeight;
    if (this.chart.width !== width || this.chart.height !== height) {
      this.chart.width = width;
      this.chart.height = height;
    }
  }

  drawLine(start, end) {
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.stroke();
    this.context.closePath();
  }

  drawTop(point, color) {
    this.context.beginPath();
    this.context.arc(point.x, point.y, this.config.tops.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();
  }

  drawAxis() {
    this.changeStrokeColor(this.config.axis.color);
    this.changeLineWidth(this.config.axis.lineWidth);
    this.drawLine(this.zero, {
      x: this.zero.x,
      y: this.config.axis.topSpace
    });
    this.drawLine(this.zero, {
      x: this.windowWidth - this.config.axis.rightSpace,
      y: this.zero.y
    });
  }

  drawVerticalLines() {
    const amount = this.config.maxValues;
    this.spaceWidth = this.worldWidth / amount;
    for (let i = 0; i < this.config.maxValues; i++) {
      const x = this.zero.x + (this.spaceWidth * i);
      this.drawLine({
        x,
        y: this.zero.y
      }, {
        x,
        y: this.config.axis.topSpace
      });
    }
  }

  drawHorizontalLines() {
    const amount = this.config.maxLevels;
    this.spaceHeight = this.worldHeight / amount;
    for (let i = 0; i < this.config.maxLevels; i++) {
      const y = this.zero.y - (this.spaceHeight / 2) - (this.spaceHeight * i);
      this.drawLine({
        x: this.zero.x,
        y
      }, {
        x: this.windowWidth - this.config.axis.rightSpace,
        y
      });
    }
  }

  drawMesh() {
    this.changeStrokeColor(this.config.mesh.color);
    this.changeLineWidth(this.config.mesh.lineWidth);
    this.drawVerticalLines();
    this.drawHorizontalLines();
  }

  drawBottomLabels(labels) {
    const amount = this.config.maxValues;
    const spaceWidth = this.worldWidth / amount;
    for (let i = 0; i < labels.length; i++) {
      const x = this.zero.x + (spaceWidth * i) - 15;
      this.context.fillText(labels[i], x, this.zero.y + this.config.labels.bottomOffset);
    }
  }

  drawLeftLabels(labels) {
    const amount = this.config.maxLevels;
    const spaceHeight = this.worldHeight / amount;
    for (let i = 0; i < labels.length; i++) {
      const y = this.zero.y - (spaceHeight / 2) - (spaceHeight * i);
      this.context.fillText(labels[i], this.zero.x - this.config.labels.leftOffset, y);
    }
  }

  drawLabels(left, bottom) {
    this.context.fillStyle = this.config.labels.color;  
    this.context.font = this.config.labels.font;
    this.drawLeftLabels(left);
    this.drawBottomLabels(bottom);
  }

  changeStrokeColor(color) {
    this.context.strokeStyle = color;
  }

  changeLineWidth(width) {
    this.context.lineWidth = width;
  }

  clearText(point) {
    this.context.clearRect(
      point.x, 
      point.y - this.config.tooltip.fontSize, 
      this.config.tooltip.width, 
      this.config.tooltip.fontSize
      );
  }

  drawText(point, text) {
    this.clearText(point);
    this.context.fillStyle = this.config.tooltip.color;  
    this.context.font = `${this.config.tooltip.fontSize}px ${this.config.tooltip.fontFamily}`;
    this.context.fillText(text, point.x, point.y);
  }

  initialize() {
    this.resizeChartToDisplaySize();
    this.drawAxis();
    this.drawMesh();
  }
}