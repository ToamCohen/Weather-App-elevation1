const express = require("express");
const router = express.Router();
const urllib = require("urllib");
const City = require("../models/City");
const key = "63cf019fdd18b367fc503847866aa78c";
const URL = (cityName) => {
	return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
};
router.get("/city/:cityName", function (req, res) {
	const { cityName } = req.params;
	urllib.request(URL(cityName), function (err, data) {
		try {
			data = JSON.parse(data);

			data = {
				name: data.name,
				temperature: data.main.temp,
				condition: data.weather[0].description,
				conditionPic: data.weather[0].icon,
			};

			res.status(200).json(data);
		} catch (err) {
			res.status(404).json({ messege: err.message });
		}
	});
});

router.get("/cities", async function (req, res) {
	try {
		let cities = await City.find({});
		res.status(200).json(cities);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

router.post("/city", function (req, res) {
	try {
		const c1 = new City({
			name: req.body.name,
			temperature: req.body.temperature,
			condition: req.body.condition,
			conditionPic: req.body.conditionPic,
		})
		c1.save();
		res.status(200).json(c1);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

router.delete("/city/:cityId", async function (req, res) {
	const { cityId } = req.params;
	try {
		const city = await City.findByIdAndRemove(cityId, {});
		res.status(200).json(city);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

module.exports = router;
