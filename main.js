var lit;
var check_sel;
var min_x, min_y, max_x, max_y, x, y;
var drawColors;

        function check(select) {
            check_sel =  select.querySelector(`option[value="${select.value}"]`).value;
            console.log(check_sel);
            
        }

        function rescaleX(x) {
            return parseInt(x / 10);
        }
        function rescaleY(y) {
            return parseInt(y / 10);
        }

	
        function drawWalls() {

            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, x, y);
            
            console.log(check_sel);

            var data = lit.layers.Walls.layerRaws.filter(function (item, i, arr) {
                if (item.geometry.floor == check_sel)
                    return item;
            })

            var dataThin = lit.layers.WallsThin.layerRaws.filter(function (item, i, arr) {
                if (item.geometry.floor == check_sel)
                    return item;
            })

            console.log(data[0].geometry.coordinates[0][0]);
            min_x = data[0].geometry.coordinates[0][0];
            max_x = min_x;
            min_y = data[0].geometry.coordinates[0][1];
            max_y = min_y;
            
            for (var i = 0; i < data.length; i++) {
                
                for (var j = 0; j < data[i].geometry.coordinates.length; j++) {
                   
                    if (min_x > data[i].geometry.coordinates[j][0])
                        min_x = data[i].geometry.coordinates[j][0];
                    if (max_x < data[i].geometry.coordinates[j][0])
                        max_x = data[i].geometry.coordinates[j][0];
                    if (min_y > data[i].geometry.coordinates[j][1])
                        min_y = data[i].geometry.coordinates[j][1];
                    if (max_y < data[i].geometry.coordinates[j][1])
                        max_y = data[i].geometry.coordinates[j][1];
                }
            }

            console.log("min_x " + min_x + "; max_x " + max_x);
            console.log("min_y " + min_y + "; max_y " + max_y);

            var x = max_x - min_x;
            var y = max_y - min_y;
            ctx.canvas.width = 1900;
            ctx.canvas.height = 1000;
            
            ctx.fillStyle = "#D0F5D9";
            ctx.fillRect(0, 0, x, y);

            ctx.lineWidth = 2;
            for (var i = 0; i < data.length; i++) {

                ctx.beginPath();
                newX = rescaleX(data[i].geometry.coordinates[0][0] - min_x);
                newY = rescaleY(data[i].geometry.coordinates[0][1] - min_y);
                ctx.moveTo(newX, newY);
                for (var j = 0; j < data[i].geometry.coordinates.length; j++) {
                    newX = rescaleX(data[i].geometry.coordinates[j][0] - min_x);
                    newY = rescaleY(data[i].geometry.coordinates[j][1] - min_y);
                    ctx.lineTo(newX, newY);

                }
                ctx.closePath();

                ctx.strokeStyle = drawColors.wall;
                ctx.stroke();
            
            
            }

            ctx.lineWidth = 2;
            for (var i = 0; i < dataThin.length; i++) {
                newX = rescaleX(dataThin[i].geometry.coordinates[0][0] - min_x);
                newY = rescaleY(dataThin[i].geometry.coordinates[0][1] - min_y);
                ctx.moveTo(newX, newY);
                for (var j = 0; j < dataThin[i].geometry.coordinates.length; j++) {
                    newX = rescaleX(dataThin[i].geometry.coordinates[j][0] - min_x);
                    newY = rescaleY(dataThin[i].geometry.coordinates[j][1] - min_y);
                    ctx.lineTo(newX, newY);

                }
                
                ctx.strokeStyle = drawColors.wallThin;
                ctx.stroke();
            }


        }