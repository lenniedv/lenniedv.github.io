function Mountain(config, hasSnow) {
	this.config = config;
	this.hasSnow = hasSnow;

	this.draw = function () {
		fill(128, 128, 128);

		triangle(
			config.x_pos + 50, config.top_y_pos,
			config.x_pos, config.y_pos,
			config.x_pos + config.width, config.y_pos
		);

		// snow
		if (this.hasSnow == true) {
			fill(169, 169, 169);
			triangle(
				config.x_pos + 50, config.top_y_pos,
				config.x_pos + 30, config.y_pos - 200,
				config.x_pos + 100, config.y_pos - 200
			);
		}

		noStroke();
	}
}