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
  }

  drawAxis() {
    this.context.strokeStyle = this.config.mainColor;
    this.context.lineWidth = this.config.lineWidth;
    
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
      const x = this.zero.x + spaceWidth * i;
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
      const y = this.zero.y - spaceHeight * i;
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
    this.drawVerticalLines();
    this.drawHorizontalLines();
  }

  initialize() {
    this.resizeChartToDisplaySize();
    this.drawAxis();
    this.drawMesh();
  }
}