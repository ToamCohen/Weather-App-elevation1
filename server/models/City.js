const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
	name: { type: String, trim: true },
	temperature: { type: Number, trim: true },
	condition: { type: String, trim: true },
	conditionPic: { type: String, trim: true },
});

const City = mongoose.model("cityModles1", citySchema);

module.exports = City;
