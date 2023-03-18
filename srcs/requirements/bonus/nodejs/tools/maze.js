const cont = document.getElementById("container");
const maze = document.getElementById("maze");
const player = document.getElementById("player");
const home = document.getElementById("home");
const emo = document.getElementById("emo");

const step = 20;
const barrierWidth = 2;
const mazeHeight = 200;
const mazeWidth = 300;
let barrierX0 = [];
let barrierX1 = [];
let barrierY0 = [];
let barrierY1 = [];

function genSides() {
	let playerPos = Math.floor(Math.random() * mazeHeight / step) * step;
	let homePos = mazeHeight - step - playerPos;

	let leftTopBarrier = document.createElement("div");
	leftTopBarrier.style.top = step + "px";
	leftTopBarrier.style.left = step + "px";
	leftTopBarrier.style.height = playerPos + "px";

	let leftBottomBarrier = document.createElement("div");
	leftBottomBarrier.style.top = playerPos + step * 2 + "px";
	leftBottomBarrier.style.left = step + "px";
	leftBottomBarrier.style.height = homePos + "px";

	let rightTopBarrier = document.createElement("div");
	rightTopBarrier.style.top = step + "px";
	rightTopBarrier.style.left = mazeWidth + step + "px";
	rightTopBarrier.style.height = homePos + "px";

	let RightBottomBarrier = document.createElement("div");
	RightBottomBarrier.style.top = homePos + step * 2 + "px";
	RightBottomBarrier.style.left = mazeWidth + step + "px";
	RightBottomBarrier.style.height = playerPos + "px";

	barrierX0.push(0, mazeWidth + 2 * step, 0, 0, mazeWidth + step, mazeWidth + step);
	barrierX1.push(barrierWidth, mazeWidth + 2 * step + barrierWidth, step, step, mazeWidth + 2 * step, mazeWidth + 2 * step);
	barrierY0.push(playerPos + step, homePos + step, playerPos + step, playerPos + 2 * step, homePos + step, homePos + 2 * step);
	barrierY1.push(playerPos + 2 * step, homePos + 2 * step, playerPos + step + barrierWidth, playerPos + 2 * step + barrierWidth, homePos + step + barrierWidth, homePos + 2 * step + barrierWidth);
	player.style.top = playerPos + step + "px";
	player.style.left = 0 + "px";
	home.style.top = homePos + step + "px";
	home.style.left = mazeWidth + step + "px";

	let barriers = [leftTopBarrier, leftBottomBarrier, rightTopBarrier, RightBottomBarrier];
	for (let i = 0; i < barriers.length; i++) {
		barriers[i].setAttribute("class", "barrier");
		barriers[i].style.width = barrierWidth + "px";
		maze.appendChild(barriers[i]);
	}
}

genSides();

let verticalSteps = mazeHeight / step;
let horizontalSteps = mazeWidth / step;

let grid = [];
for (let i = 0; i < verticalSteps; i++) {
	let sg = [];
	for (let a = 0; a < horizontalSteps; a++) {
		sg.push({ u: 0, d: 0, l: 0, r: 0, v: 0 });
	}
	grid.push(sg);
}

let dirs = ["u", "d", "l", "r"];
let modDir = {
	u: { y: -1, x: 0, o: "d" },
	d: { y: 1, x: 0, o: "u" },
	l: { y: 0, x: -1, o: "r" },
	r: { y: 0, x: 1, o: "l" }
};

function genMaze(currentX, currentY, s) {
	let d = FisherYatesShuffle(dirs, s);

	for (let i = 0; i < d.length; i++) {
		let nextX = currentX + modDir[d[i]].x;
		let nextY = currentY + modDir[d[i]].y;
		grid[currentY][currentX].v = 1;
		
		if (nextX >= 0 && nextX < horizontalSteps && nextY >= 0 && nextY < verticalSteps && grid[nextY][nextX].v === 0) {
			grid[currentY][currentX][d[i]] = 1;
			grid[nextY][nextX][modDir[d[i]].o] = 1;
			genMaze(nextX, nextY, i);
		}
	}
}
function FisherYatesShuffle(array, s) {
	let part1 = array.slice(0, s);
	let part2 = array.slice(s, array.length);

	for (let i = part2.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[part2[i], part2[j]] = [part2[j], part2[i]];
	}
	let comb = part1.concat(part2);
	return comb;
}

genMaze(0, 0, 0);

function drawMaze() {
	for (let x = 0; x < horizontalSteps; x++) {
		for (let y = 0; y < verticalSteps; y++) {
			if (grid[y][x].l === 0 && x > 0) {
				let el = document.createElement("div");
				el.style.left = (x + 1) * step + "px";
				el.style.height = step + "px";
				el.style.top = (y + 1) * step + "px";
				el.setAttribute("class", "barrier");
				el.style.width = barrierWidth + "px";
				maze.appendChild(el);
			}
			if (grid[y][x].d === 0 && y < verticalSteps - 1) {
				let el = document.createElement("div");
				el.style.left = (x + 1) * step + "px";
				el.style.height = barrierWidth + "px";
				el.style.top = (y + 1) * step + step + "px";
				el.setAttribute("class", "barrier");
				el.style.width = step + barrierWidth + "px";
				maze.appendChild(el);
			}
		}
	}
}

drawMaze();

const barriers = document.getElementsByClassName("barrier");
for (let b = 0; b < barriers.length; b++) {
	barrierX0.push(barriers[b].offsetLeft);
	barrierX1.push(barriers[b].offsetLeft + barriers[b].clientWidth);
	barrierY0.push(barriers[b].offsetTop);
	barrierY1.push(barriers[b].offsetTop + barriers[b].clientHeight);
}

document.addEventListener("keydown", keys);

function keys(e) {
	let code = e.code;
	if (home.innerHTML === "")
		return;
	switch (code) {
		case "ArrowUp":
			up();
			break;
		case "ArrowDown":
			down();
			break;
		case "ArrowLeft":
			left();
			break;
		case "ArrowRight":
			right();
			break;
	}
}

function up() {
	if (checkYboundry("u")) {
		player.style.top = player.offsetTop - step + "px";
	}
}

function down() {
	if (checkYboundry("d")) {
		player.style.top = player.offsetTop + step + "px";
	}
}

function left() {
	if (checkXboundry("l")) {
		player.style.left = player.offsetLeft - step + "px";
	}
}

function right() {
	if (checkXboundry("r")) {
		player.style.left = player.offsetLeft + step + "px";
	}
	if (player.offsetLeft > mazeWidth) {
		home.innerHTML = "";
		emo.innerHTML = "🥳";
	}
}

function checkXboundry(dir) {
	let x = player.offsetLeft;
	let y = player.offsetTop;
	let ok = [];
	let len = barrierX0.length;

	let check = 0;
	for (let i = 0; i < len; i++) {
		check = 0;
		if ((y < barrierY0[i] || y + step > barrierY1[i])
		|| (dir === "r" && (x + step < barrierX0[i] || x + step > barrierX1[i]))
		|| (dir === "l" && (x < barrierX0[i] || x > barrierX1[i]))) {
			check = 1;
		}
		ok.push(check);
	}
	let res = ok.every(function (e) {
		return e == 1;
	});
	return res;
}

function checkYboundry(dir) {
	let x = player.offsetLeft;
	let y = player.offsetTop;
	let ok = [];
	let len = barrierY0.length;

	let check = 0;
	for (let i = 0; i < len; i++) {
		check = 0;
		if ((x < barrierX0[i] || x + step > barrierX1[i])
		|| (dir === "d" && (y + step < barrierY0[i] || y + step > barrierY1[i]))
		|| (dir === "u" && (y < barrierY0[i] || y > barrierY1[i])) ) {
			check = 1;
		}
		ok.push(check);
	}

	let res = ok.every(function (e) {
		return e == 1;
	});
	return res;
}