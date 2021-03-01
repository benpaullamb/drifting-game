import Input from './Input';

const shapes = [];

const painter = {
	update() {
		if (Input.getMouseDown(0)) {
			this.paintCircle(Input.mousePosition.x, Input.mousePosition.y, 10, 'red');
		}

		this.render();
	},

	paintCircle(x, y, diameter = 50, colour = 'black') {
		const radius = diameter / 2;
		const image = c.createImageData(diameter, diameter);

		// Magic

		shapes.push({
			shape: 'circle',
			x,
			y,
			diameter,
			image,
		});
	},

	render() {
		c.save();
		shapes.forEach((shape) => {
			if (shape.shape === 'circle') {
				const radius = shape.diameter / 2;
				c.putImageData(shape.image, shape.x - radius, shape.y - radius);
			}
		});
		c.restore();
	},
};

export default painter;
