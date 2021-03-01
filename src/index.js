import { Engine } from 'matter-js';
import settings from './game-controls';
import Input from './Input';
import painter from './painter';
import createBorders from './borders';
import Tesla from './Tesla';

window.canvas = document.querySelector('#canvas');
window.c = canvas.getContext('2d');
window.engine = Engine.create();
engine.world.gravity.scale = 0;

const tesla = new Tesla();

const clear = () => {
	c.save();
	c.fillStyle = vue.$data.selectedLevel.bgColour;
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.restore();
};

createBorders();

(function render() {
	clear();

	painter.update();
	tesla.update();
	Input.update();

	Engine.update(engine, 1000 / 60);
	window.requestAnimationFrame(render);
})();
