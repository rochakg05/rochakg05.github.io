var points = [
  {x: 10, y: 20},
  {x: 30, y: 50},
  {x: 50, y: 20},
  {x: 70, y: 60},
  {x: 110, y: 80},
  {x: 150, y: 100},
];

var border = document.createElement("div");

border.style.height = 400+ "px";
border.style.width = 400+ "px";
border.style.border = "1px solid #000000 ";
border.style.margin = " auto";
border.style.position = "relative";
document.body.appendChild(border);

points.forEach(function(point){
  var plot = document.createElement("div");
  plot.style.backgroundColor='blue';
  plot.style.borderRadius='50%';
  plot.style.width=10 + 'px';
  plot.style.height=10 + 'px';
  plot.style.position='absolute';
  plot.style.left=point.x + 'px';
  plot.style.top=point.y + 'px';

  border.appendChild(plot);

})