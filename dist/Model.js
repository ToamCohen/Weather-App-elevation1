class Model {
	constructor() {
		this.cityData = [];
	}

	getDataFromDB = async () => {
		let cities = await $.get(`/cities`);
		this.cityData = cities;
		return this.cityData;
	};

	getCityData = async (input) => {
		let city = await $.get(`/city/${input}`);
		this.cityData.push(city);
		if (city) {
			return city;
		} else {
			console.log("error");
		}
	};

	saveCity = async (_id, name, temperature, condition, conditionPic) => {
		let city = $.post(`/city`, { _id, name, temperature, condition, conditionPic });
		return console.log(city);
	};

	removeCityFtomDB = async (id) => {
		let city = $.ajax({
			method: "DELETE",
			url: `/city/${id}`,
			success: (data) => {
				return data;
			},
		});
		return city;
	};
}
