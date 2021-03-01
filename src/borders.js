import { Bodies, World } from 'matter-js';

export default () => {
	const depth = 100;

	const top = Bodies.rectangle(
		canvas.width / 2,
		-depth / 2,
		canvas.width,
		depth,
		{
			isStatic: true,
		}
	);
	const right = Bodies.rectangle(
		canvas.width + depth / 2,
		canvas.height / 2,
		depth,
		canvas.height,
		{
			isStatic: true,
		}
	);
	const bottom = Bodies.rectangle(
		canvas.width / 2,
		canvas.height + depth / 2,
		canvas.width,
		depth,
		{
			isStatic: true,
		}
	);
	const left = Bodies.rectangle(
		-depth / 2,
		canvas.height / 2,
		depth,
		canvas.height,
		{
			isStatic: true,
		}
	);

	World.add(engine.world, [top, right, bottom, left]);
};
