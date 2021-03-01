import { Vector } from 'matter-js';

const EventStates = {
	DOWN: 'down',
	HELD: 'held',
	UP: 'up',
};

let events = [];

const Input = {
	mousePosition: Vector.create(),
	mousePresent: false,
	mouseScrollDelta: 0,

	getKey(key) {
		return events.some((event) => event.key === key);
	},
	getKeyDown(key) {
		return events.some(
			(event) => event.key === key && event.state === EventStates.DOWN
		);
	},
	getKeyUp(key) {
		return events.some(
			(event) => event.key === key && event.state === EventStates.UP
		);
	},

	getMouse(button) {
		return events.some((event) => event.button === button);
	},
	getMouseDown(button) {
		return events.some(
			(event) => event.button === button && event.state === EventStates.DOWN
		);
	},
	getMouseUp(button) {
		return events.some(
			(event) => event.button === button && event.state === EventStates.UP
		);
	},

	update() {
		events = events.filter(({ state }) => state !== EventStates.UP);

		events.forEach((event) => {
			if (event.state === EventStates.DOWN) {
				event.state = EventStates.HELD;
			}
		});

		Input.mouseScrollDelta = 0;
	},

	log() {
		console.log(events.map(({ key }) => key).join(', '));
	},
};

export default Input;

addEventListener('keydown', ({ key }) => {
	const event = events.find(({ key: eventKey }) => eventKey === key);
	if (event) {
		return;
	}
	events.push({
		key,
		state: EventStates.DOWN,
	});
});

addEventListener('keyup', ({ key }) => {
	const event = events.find(({ key: eventKey }) => eventKey === key);
	if (event) {
		event.state = EventStates.UP;
	}
});

addEventListener('mousedown', ({ button }) => {
	const event = events.find(
		({ button: eventButton }) => eventButton === button
	);
	if (event) {
		return;
	}
	events.push({
		button,
		state: EventStates.DOWN,
	});
});

addEventListener('mouseup', ({ button }) => {
	const event = events.find(
		({ button: eventButton }) => eventButton === button
	);
	if (event) {
		event.state = EventStates.UP;
	}
});

addEventListener('mousemove', ({ offsetX, offsetY, target }) => {
	Input.mousePresent = target === canvas;
	if (Input.mousePresent) {
		Input.mousePosition = Vector.create(offsetX, offsetY);
	}
});

addEventListener('wheel', ({ wheelDelta }) => {
	Input.mouseScrollDelta = wheelDelta > 0 ? -1 : 1;
});
