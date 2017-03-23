function ParticleSystem(spec, graphics) {
	'use strict';
	var that = {},
		nextName = 1,	// unique identifier for the next particle
		particles = {},	// Set of all active particles
		imageSrc = spec.image;


	spec.image = new Image();
	spec.image.onload = function() {

		that.render = function() {
			var value,
				particle;

			for (value in particles) {
				if (particles.hasOwnProperty(value)) {
					particle = particles[value];
					graphics.drawParticles(particle);
				}
			}
		};
	};
	spec.image.src = imageSrc;

	//------------------------------------------------------------------
	//
	// This creates one new particle
	//
	//------------------------------------------------------------------
	that.create = function() {
		console.log('creating particle')
		for(let i = 0; i < 15; ++i){
			var p = {
				image: spec.image,
				size: Random.nextGaussian(10, 4),
				center: {x: spec.center.x, y: spec.center.y},
				direction: Random.nextCircleVector(),
				speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
				rotation: 0,
				lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),	// How long the particle should live, in seconds
				alive: 0	// How long the particle has been alive, in seconds
			};
			p.size = Math.max(1, p.size);
			//
			// Same thing with lifetime
			p.lifetime = Math.max(0.01, p.lifetime);
			//
			// Assign a unique name to each particle
			particles[nextName++] = p;
			
		}
	};

	that.getDimensions = function(){
			return {center, size}
	}

	that.update = function(elapsedTime) {
		var removeMe = [],
			value,
			particle;

		//
		// We work with time in seconds, elapsedTime comes in as milliseconds
		elapsedTime = elapsedTime / 1000;

		for (value in particles) {
			if (particles.hasOwnProperty(value)) {
				particle = particles[value];
				//
				// Update how long it has been alive
				particle.alive += elapsedTime;

				//
				// Update its position
				particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
				particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

				//
				// Rotate proportional to its speed
				particle.rotation += particle.speed / 500;

				//
				// If the lifetime has expired, identify it for removal
				if (particle.alive > particle.lifetime) {
					removeMe.push(value);
				}
			}
		}

		//
		// Remove all of the expired particles
		for (particle = 0; particle < removeMe.length; particle++) {
			delete particles[removeMe[particle]];
		}
		removeMe.length = 0;
	};

	that.render = function() {
	};

	that.returnParticles = function(){
		for(var prop in particles){
			if(particles.hasOwnProperty(prop)){
				return true;
			}
		}
		return false;
	}

	return that;
}
