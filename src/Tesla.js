import { World, Bodies, Body, Vector } from 'matter-js';
import teslaImageUrl from '../tesla-model-y.png';
import Input from './Input';

export default class Tesla {
	get width() {
		return (this.teslaImage.width / this.teslaImage.height) * this.height;
	}

	get forward() {
		return Vector.rotate(Vector.create(0, -1), this.body.angle);
	}

	get right() {
		return Vector.perp(this.forward);
	}

	get percentMaxRotationSpeed() {
		return (
			Math.min(this.body.speed, this.speedForMaxRotation) /
			this.speedForMaxRotation
		);
	}

	constructor() {
		this.height = 100;
		this.acceleration = 200;
		this.maxRotationSpeed = 0.04;
		this.speedForMaxRotation = 2;

		this.teslaImage = new Image();
		this.teslaImage.src = teslaImageUrl;

		this.body = Bodies.rectangle(500, 500, this.width, this.height, {
			density: 135,
		});
		World.add(engine.world, this.body);
	}

	update() {
		if (Input.getKey('w')) {
			this.accelerate();
		}
		if (Input.getKey('s')) {
			this.decelerate();
		}

		if (Input.getKey('a')) {
			this.turnLeft();
		}
		if (Input.getKey('d')) {
			this.turnRight();
		}

		this.render();
	}

	accelerate() {
		this.addForce(Vector.mult(this.forward, this.acceleration));
	}

	decelerate() {
		this.addForce(Vector.mult(Vector.neg(this.forward), this.acceleration));
	}

	turnRight() {
		this.rotate(this.maxRotationSpeed * this.percentMaxRotationSpeed);
	}

	turnLeft() {
		this.rotate(-this.maxRotationSpeed * this.percentMaxRotationSpeed);
	}

	addForce(force) {
		Body.applyForce(this.body, this.body.position, force);
	}

	rotate(angle) {
		Body.rotate(this.body, angle);
		Body.setAngularVelocity(this.body, 0);
	}

	render() {
		const vertices = this.body.vertices;
		c.save();
		c.translate(vertices[0].x, vertices[0].y);
		c.rotate(this.body.angle);
		c.drawImage(this.teslaImage, 0, 0, this.width, this.height);
		c.restore();
	}

	renderCollider() {
		c.save();
		c.beginPath();
		const vertices = this.body.vertices;
		vertices.forEach((vert, i) => {
			if (i === 0) {
				c.moveTo(vertices[0].x, vertices[0].y);
			} else {
				c.lineTo(vert.x, vert.y);
			}
		});
		c.lineTo(vertices[0].x, vertices[0].y);
		c.lineWidth = 1;
		c.strokeStyle = 'red';
		c.stroke();
		c.restore();
	}
}
