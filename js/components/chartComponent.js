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
    this.worldHeight = this.zero.y;
    this.initialize();
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

  drawTop(point) {
    this.context.arc(point.x, point.y, this.config.mesh.lineWidth * 2, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.config.axis.color;
    this.context.fill();
    this.context.closePath();
  }

  drawAxis() {
    this.context.strokeStyle = this.config.axis.color;
    this.context.lineWidth = this.config.axis.lineWidth;
    
    this.drawLine(this.zero, {
      x: this.zero.x,
      y: 0
    });
    this.drawLine(this.zero, {
      x: this.windowWidth,
      y: this.zero.y
    });
  }

  drawVerticalLines() {
    const amount = this.config.mesh.verticalLines;
    const spaceWidth = this.worldWidth / amount;
    for (let i = 0; i < this.config.mesh.verticalLines; i++) {
      const x = this.zero.x + (spaceWidth / 2) + (spaceWidth * i);
      this.drawLine({
        x,
        y: this.zero.y
      }, {
        x,
        y: 0
      });
    }
  }

  drawHorizontalLines() {
    const amount = this.config.mesh.horizontalLines;
    const spaceHeight = this.worldHeight / amount;
    for (let i = 0; i < this.config.mesh.horizontalLines; i++) {
      const y = this.zero.y - (spaceHeight / 2) - (spaceHeight * i);
      this.drawLine({
        x: this.zero.x,
        y
      }, {
        x: this.windowWidth,
        y
      });
    }
  }

  drawMesh() {
    this.context.strokeStyle = this.config.mesh.color;
    this.context.lineWidth = this.config.mesh.lineWidth;

    this.drawVerticalLines();
    this.drawHorizontalLines();
  }

  drawBottomLabels(labels) {
    const amount = this.config.mesh.verticalLines;
    const spaceWidth = this.worldWidth / amount;
    for (let i = 0; i < labels.length; i++) {
      const x = this.zero.x + (spaceWidth * i) + 5;
      this.context.fillText(labels[i], x, this.zero.y + 15);
    }
  }

  drawLeftLabels(labels) {
    const amount = this.config.mesh.horizontalLines;
    const spaceHeight = this.worldHeight / amount;
    for (let i = 0; i < labels.length; i++) {
      const y = this.zero.y - (spaceHeight / 2) - (spaceHeight * i);
      this.context.fillText(labels[i], this.zero.x - 45, y);
    }
  }

  drawLabels(left, bottom) {
    this.context.fillStyle = this.config.labels.color;  
    this.context.font = this.config.labels.font;
    this.drawLeftLabels(left);
    this.drawBottomLabels(bottom);
  }

  initialize() {
    this.resizeChartToDisplaySize();
    this.drawAxis();
    this.drawMesh();
  }
}