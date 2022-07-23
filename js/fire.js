class Fire {
    constructor() {
        this.canvas = document.getElementById("fire");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 30;
        this.canvas.height = 30;
        this.pixel = 1;
        this.x = 10;
        this.y = 10;
        this.mask = [
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
            [1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
            [1, 1, 1, 2, 2, 2, 2, 1, 1, 1],
            [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 0, 0, 2, 2, 2, 2, 0, 0, 0]
        ];
    }
    createData() {
        this.data = [];
        for (var x = 0; x <= 9; x++) {
            this.data[x] = [];
            for (var y = 0; y <= 9; y++) {
                if (this.mask[x][y] == 0) {
                    this.data[x][y] = `rgba(0,0,0,0)`;
                } else if (this.mask[x][y] == 1) {
                    let decide = Math.floor(Math.random() * 100);
                    if (decide > 25) {
                        let red = 150 + Math.floor(Math.random() * 105);
                        let green = Math.floor(Math.random() * 90);
                        let blue = 0;
                        this.data[x][y] = `rgb(${red}, ${green}, ${blue})`;
                    } else {
                        this.data[x][y] = `rgba(0,0,0,0)`;
                    }
                } else {
                    let red = 230 + Math.floor(Math.random() * 25);
                    let green = 150 + Math.floor(Math.random() * 80);
                    let blue = Math.random() * 155;
                    this.data[x][y] = `rgb(${red}, ${green}, ${blue})`;
                }
            }
        }
    }
    draw() {
        this.createData();
        var x = 0;
        var y = 0;
        for (let row of this.data) {
            x = 0;
            for (let col of row) {
                this.ctx.beginPath();
                this.ctx.fillStyle = col;
                this.ctx.rect(
                    this.x + this.pixel * x,
                    this.y + this.pixel * y,
                    this.pixel,
                    this.pixel
                );
                this.ctx.fill();
                x++;
            }
            y++;
        }
    }
}
class Smoke {
    constructor(parent) {
        this.parent = parent;
        this.x = parent.x;
        this.y = parent.y;
        this.pixel = parent.pixel / 1.5;
        this.ctx = parent.ctx;
        this.range = parent.mask[0].length * parent.pixel;
    }
    draw() {
        for (let i = 0; i < 50; i++) {
            const shadow = Math.floor(Math.random() * 150);
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(${shadow},${shadow},${shadow},${Math.random()})`;
            this.ctx.rect(
                this.x + Math.floor(Math.random() * this.range),
                this.y - Math.floor(Math.random() * this.range),
                this.pixel,
                this.pixel
            );
            this.ctx.fill();
        }
    }
}
class Grass {
    constructor(parent) {
        this.ctx = parent.ctx;
        const make_pattern = (color1, color2) => {
            const result = document.createElement("canvas");
            result.width = result.height = 20;
            const resctx = result.getContext("2d");
            resctx.beginPath();
            resctx.fillStyle = color1;
            resctx.rect(0, 0, 20, 10);
            resctx.fill();
            resctx.beginPath();
            resctx.fillStyle = color2;
            resctx.rect(0, 10, 20, 10);
            resctx.fill();
           
        };
        this.pattern = make_pattern("#385400", "#123300");
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.pattern;
        this.ctx.rect(-10, 150, 320, 170);
        this.ctx.fill();
        this.ctx.strokeStyle = "#001a09";
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
    }
}
class Light {
    constructor(parent) {
        this.ctx = parent.ctx;
        this.size = 10;
        this.x = parent.x + parent.pixel * parent.mask[0].length / 2;
        this.y = parent.y + parent.pixel * parent.mask[0].length / 2;
    }
    draw() {
        const gra = this.ctx.createRadialGradient(
            this.x,
            this.y,
            this.size * 0.6,
            this.x,
            this.y,
            this.size * 0.9 + Math.random() * (this.size * 0.1)
        );
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        gra.addColorStop(0.0, `rgba(255, 255, 255, ${0.2})`);
        gra.addColorStop(1.0, `rgba(255, 213, 0, ${0.3 + 0.1 * Math.random()})`);
        this.ctx.fillStyle = gra;
        this.ctx.fill();
    }
}

window.onload = function() {
    fire = new Fire();
    smoke = new Smoke(fire);
    light = new Light(fire);
    setInterval(function() {
        fire.ctx.clearRect(0, 0, 300, 300);
        fire.draw();
        smoke.draw();
        light.draw();
    }, 100);
    document.getElementById("loadbutton").addEventListener('click', checkload);
};


function checkload (){
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
};



