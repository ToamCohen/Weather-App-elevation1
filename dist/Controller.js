const clickForCity = $("#find-city");
const searchForCity = $("#city-name");

const model = new Model();
const render = new Renderer();

const loadPage = async function () {
	let dataFromDB = await model.getDataFromDB();
	render.renderData({ data: dataFromDB }, "cities", "cities");
};
loadPage();

const handleSearch = async function () {
	const inputVal = searchForCity.val();
	let city = await model.getCityData(inputVal);
	render.renderData(city, "city", "cities");
};

const saveCityOnClick = async function () {
	const id = $(this).closest(".container").attr("id");
	const name = $(this).closest(".container").find(".name").text();
	const temp = $(this).closest(".container").find(".temp").text();
	const condition = $(this).closest(".container").find(".condition").text();
	const icon = $(this).closest(".container").find(".icon").attr("src");
	let data = await model.saveCity(id, name, temp, condition, icon);
	console.log(data);
};

const removeCity = async function () {
	const id = $(this).closest(".container").attr("id");
	let data = await model.removeCityFtomDB(id);
	let index = model.cityData.findIndex((c) => c._id === id);
	model.cityData.splice(index, 1);
	render.renderData({ data: model.cityData }, "cities", "cities");
	return data;
};

clickForCity.on("click", handleSearch);
$("#cities-container").on("click", ".save-city", saveCityOnClick);
$("#cities-container").on("click", ".delete-city", removeCity);
$("#home-page-button").on("click",loadPage)