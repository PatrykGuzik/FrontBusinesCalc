// Obliczenia Manager -----------------------------------------------------------------
// ------------------------------------------------------------------------------------
function calcManagerCarbonFootprint(data) {
	const answers = Form.questions.map(a => a.answers);

	// ---Odpowiedzi---

	// 0 Jaką powierzchnię w budynku zajmuje miejsce pracy?
	const officeSpace = getAloneAnswerFromInputText(answers, 0);
	// 1 Ile pracowników pracuje w tym miejscu?
	const nrOfemployees = getAloneAnswerFromInputText(answers, 1);
	// 2 Roczne zużycie energii elektrycznej w kWh
	const annualElectConsum = getAloneAnswerFromInputText(answers, 2);
	// 3 Jakie są roczne koszty zapłaty za energie elektryczna?
	const annualCostElect = getAloneAnswerFromInputText(answers, 3);
	// 4 Czy energia elektryczna generowana jest z OZE?
	const isOZE = getAnswerFromRadio(answers, 4);
	// 5 W ilu % energia z OZE pokrywa zapotrzebowanie?
	const percentOZE = getAloneAnswerFromRange(answers, 5);
	// 6 Zużycie energii cieplnej w kWh?
	const warmEnergyConsum = getAloneAnswerFromInputText(answers, 6);
	// 7 Podaj ilość m3 gazu zużytego w ciągu roku
	const m3GasConsum = getAloneAnswerFromInputText(answers, 7);
	// 8 Czy stosujecie w biurze segregację odpadów na plastik, papier, szkło i frakcję BIO ?
	const isSegregation = getAnswerFromRadio(answers, 8);
	// 9 Ile wynoszą rachunki miesięczne za wywóz śmieci?
	const trashCost = getAloneAnswerFromInputText(answers, 9);
	// 10 Ile litrów paliwa ze wskazanych rozdzajów zostało wykorzystane przez flotę biura w ciągu roku?
	const fuelConsum = getMultiAnswerFromInputText(answers, 10);
	// 11 Ile wynosi całkowite zużycie wody w biurze?
	const waterConsum = getAloneAnswerFromInputText(answers, 11);
	// 12 Ile m3 ścieków wyprodukowanych jest w biurze?
	const sewageProd = getAloneAnswerFromInputText(answers, 12);

	//  ---OBLICZENIA---

	// Energia elektryczna
	let ElectrycityEnergy_CO2 = 0;
	let V_is_oze = 0;

	if (annualElectConsum == 0) {
		if (isOZE === 2) V_is_oze = getValueByName("M_is_not_oze", data);
		else V_is_oze = 0;
		ElectrycityEnergy_CO2 =
			getValueByName("M_elec_energy", data) * annualCostElect * V_is_oze;
	} else {
		if (isOZE === 1)
			V_is_oze =
				annualElectConsum *
				(percentOZE * 0.01) *
				getValueByName("M_is_not_oze", data);
		else V_is_oze = 0;
		ElectrycityEnergy_CO2 =
			annualElectConsum * getValueByName("M_is_not_oze", data) - V_is_oze;
	}

	// Energia cieplna
	let WarmEnergy_CO2 = 0;
	WarmEnergy_CO2 = getValueByName("M_warm_energy", data) * warmEnergyConsum;

	// Gaz
	let GasConsum_CO2 = 0;
	GasConsum_CO2 = m3GasConsum * getValueByName("M_gas", data);

	// Śmieci
	let Waste_CO2 = 0;
	if (isSegregation == 1)
		Waste_CO2 =
			(trashCost / getValueByName("M_waste_box", data)) *
			1000 *
			getValueByName("M_waste_box_mix", data) *
			getValueByName("M_waste_average", data) *
			12;
	else
		Waste_CO2 =
			(trashCost / getValueByName("M_waste_box", data) / 2) *
			1000 *
			getValueByName("M_waste_box_mix", data) *
			getValueByName("M_waste_average_burn", data) *
			12;

	// Transport benzyna
	let FuelGas_CO2 = 0;
	FuelGas_CO2 = fuelConsum[0] * getValueByName("M_fuel_gas", data);

	// Transport diesel
	let FuelDiesel_CO2 = 0;
	FuelDiesel_CO2 = fuelConsum[1] * getValueByName("M_fuel_diesel", data);

	// Transport LPG
	let FuelLPG_CO2 = 0;
	FuelLPG_CO2 = fuelConsum[2] * getValueByName("M_fuel_lpg", data);

	// Transport Elekt
	let FuelElec_CO2 = 0;
	FuelElec_CO2 = fuelConsum[3] * getValueByName("M_fuel_elec", data);

	const SumTransport_CO2 =
		FuelGas_CO2 + FuelDiesel_CO2 + FuelLPG_CO2 + FuelElec_CO2;

	// Zużycie Wody
	let WaterConsum_CO2 = 0;
	WaterConsum_CO2 = waterConsum * getValueByName("M_water", data);

	// Ścieki
	let SewageProd_CO2 = 0;
	SewageProd_CO2 = sewageProd * getValueByName("M_sewage", data);

	const SUM_MENEGER_CO2 =
		ElectrycityEnergy_CO2 +
		WarmEnergy_CO2 +
		GasConsum_CO2 +
		Waste_CO2 +
		SumTransport_CO2 +
		WaterConsum_CO2 +
		SewageProd_CO2;

	console.log("electr: ", ElectrycityEnergy_CO2.toFixed(4));
	console.log("warm: ", WarmEnergy_CO2.toFixed(4));
	console.log("gas: ", GasConsum_CO2.toFixed(4));
	console.log("waste: ", Waste_CO2.toFixed(4));
	console.log("transport: ", SumTransport_CO2.toFixed(4));
	console.log("water: ", WaterConsum_CO2.toFixed(4));
	console.log("sewage: ", SewageProd_CO2.toFixed(4));

	console.log("SUMA: ", SUM_MENEGER_CO2);

	const a = 2.495836475;
	const b = 3.65656565;
	console.log("Test:", parseFloat(a.toFixed(4)) + parseFloat(b.toFixed(4)));
	const calcAnswers = [
		{
			name: "elektryczność",
			co2: ElectrycityEnergy_CO2,
			category: "ogólne",
		},
		{
			name: "ogrzewanie",
			co2: WarmEnergy_CO2,
			category: "ogólne",
		},
		{
			name: "gaz",
			co2: GasConsum_CO2,
			category: "ogólne",
		},
		{
			name: "odpady",
			co2: Waste_CO2,
			category: "ogólne",
		},
		{
			name: "transport",
			co2: SumTransport_CO2,
			category: "ogólne",
		},
		{
			name: "woda",
			co2: WaterConsum_CO2,
			category: "ogólne",
		},
		{
			name: "ścieki",
			co2: SewageProd_CO2,
			category: "ogólne",
		},
		{
			name: "suma",
			co2: SUM_MENEGER_CO2,
			category: "ogólne",
		},
	];

	goToFinish(`${SUM_MENEGER_CO2}`, calcAnswers);
}

// Obliczenia Pracownik ---------------------------------------------------------------
// ------------------------------------------------------------------------------------
function calcEmployeeCarbonFootprint(data) {
	const answers = Form.questions.map(a => a.answers);
	const worksDays = 222;

	// OGÓLNE-------------------------------------------------------------------------

	// 0 W jaki sposób pracujesz?  1-zdalnie;  2-hybrydowo; 3-wbiurze
	const workStyle = getAnswerFromRadio(answers, 0);
	// 1 Podaj ilość dni w biurze
	const nrDaysInOffice = getAloneAnswerFromInputText(answers, 1);
	// 2 Czy w pracy odbierasz służbową korespondencję? 1-tak; 2-nie
	const isMail = getAnswerFromRadio(answers, 2);
	// 3 Ile średnio wysyłasz maili dziennie?
	const mailForDay = getAloneAnswerFromInputText(answers, 3);
	// 4 Czy w pracy odbierasz służbowe telefony? 1-tak; 2-nie
	const ifPhone = getAnswerFromRadio(answers, 4);
	// 5 Ile godzin dziennie korzystasz z telefonu służbowego?
	const phoneForDay = getAloneAnswerFromInputText(answers, 5);

	// e-mail
	let Email_CO2 = 0;
	if (isMail == 1)
		Email_CO2 = mailForDay * getValueByName("E_O_email", data) * worksDays;

	// telefon
	let Phone_CO2 = 0;
	if (ifPhone == 1)
		Phone_CO2 =
			(phoneForDay * getValueByName("E_O_phone", data) * worksDays) / 5;

	let GENERAL_CO2 = Email_CO2 + Phone_CO2;

	// PRACA ZDALNA-------------------------------------------------------------
	// 6 Ile godzin dziennie pracujesz na:
	const useDevices = getMultiAnswerFromInputText(answers, 6);
	const useLaptop = useDevices[0];
	const useComp = useDevices[1];
	const useTablet = useDevices[2];
	// 7 Ile godzin dziennie spędzasz na spotkaniach?
	const timeOnMeetings = getAloneAnswerFromInputText(answers, 7);
	// 8 Na ilu ekranach pracujesz?
	const nbMonitors = getAloneAnswerFromInputText(answers, 8);

	// praca zdalna
	let remoteValue = 0;
	if (workStyle == 2) remoteValue = (nrDaysInOffice / 5) * 222;
	if (workStyle == 3) remoteValue = 222;

	let Laptop_CO2 =
		(useLaptop * getValueByName("E_PZ_laptop", data) * remoteValue) / 5;
	let Comp_CO2 =
		(useComp * getValueByName("E_PZ_comp", data) * remoteValue) / 5;
	let Tablet_CO2 =
		(useTablet * getValueByName("E_PZ_tablet", data) * remoteValue) / 5;
	let Meetings_CO2 = timeOnMeetings * getValueByName("E_PZ_meet", data);
	let Monitors_CO2 = nbMonitors * Laptop_CO2;

	// console.log("laptop ",Laptop_CO2);
	// console.log("comp ",Comp_CO2);
	// console.log("tablet ", Tablet_CO2);
	// console.log("meet ", Meetings_CO2);
	// console.log("monitors ", Monitors_CO2);

	let REMOTE_CO2 =
		Laptop_CO2 + Comp_CO2 + Tablet_CO2 + Meetings_CO2 + Monitors_CO2;

	// console.log("praca zdalna:", REMOTE_CO2);

	// WODA I JEDZENIE-----------------------------------------------------------

	// 9 Czy zamawiasz jedzenie do pracy? tak-1; nie-2
	const isFoodDelivery = getAnswerFromRadio(answers, 9);
	// 10 Ile obiadów zamawiasz z dowozem do firmy średnio w ciągu tygodnia?
	const nrOfFoodDeliver = getAloneAnswerFromInputText(answers, 10);
	// 11 Czy obiady dowożone są zwykle samochodem czy rowerem? car-1; bike-2; dont know-3
	const foodDeliveryStyle = getAnswerFromRadio(answers, 11);
	// 12 Jakiego rodzaju potrawy zamawiasz? meet-1; vege-2;
	const foodStyle = getAnswerFromRadio(answers, 12);

	let FOOD_CO2 = 0;

	let typeFood = 0;
	let typeDeliv = 0;
	if (isFoodDelivery == 1) {
		if (foodStyle == 2) typeFood = getValueByName("E_F_del_veg", data);
		else typeFood = getValueByName("E_F_del_meet", data);

		if (foodDeliveryStyle == 1) typeDeliv = getValueByName("E_F_car", data);
		else if (foodDeliveryStyle == 2)
			typeDeliv = getValueByName("E_F_bike", data);
		else typeDeliv = getValueByName("E_F_dontknow", data);

		FOOD_CO2 = nrOfFoodDeliver * (typeFood + typeDeliv) * 52;
	}

	// TRANSPORT-------------------------------------------------------------------

	// 13 W jaki sposób dostajesz się do pracy?
	const transportToWork = getAnswersFromCheckbox(answers, 13);
	const transCar = transportToWork[0] * 0.01;
	const transBus = transportToWork[1] * 0.01;
	const transTram = transportToWork[2] * 0.01;
	const transBike = transportToWork[3] * 0.01;
	const transFoot = transportToWork[4] * 0.01;
	const transTrain = transportToWork[5] * 0.01;
	const transCarpooling = transportToWork[6] * 0.01;
	const transMetro = transportToWork[7] * 0.01;
	// 14 Ile kilometrów przejeżdzasz do oraz z pracy?
	let carKm = getAloneAnswerFromInputText(answers, 14);
	// 15 Jakim typem paliwa zasilany jest Twój samochód?   1-Diesel;  2-Benzyna;  3-EnergiaElektryczna; 4-NapędHybrydowy;  5-LPG
	const carFuel = getAnswerFromRadio(answers, 15);
	// 16 Ile litrów na 100 km statystycznie spala twój samochód?
	let carFuelConsum = getAloneAnswerFromInputText(answers, 16);
	// 17 Z iloma osobami zwykle podróżujesz?
	let nrPassengers = getAloneAnswerFromInputText(answers, 17) + 1; // +1 to kierowca
	// 18 Ile godzin lotów służbowych wykonałeś w ciągu roku?
	const flyHours = getAloneAnswerFromInputText(answers, 18);

	//DEV--------------
	// carKm = 25
	// remoteValue = 222
	// carFuelConsum = 7
	// nrPassengers = 2

	//-----------------

	let typeFuel = 0;

	let car_co2 = 0;
	let bus_co2 =
		((carKm * remoteValue * getValueByName("E_T_fuel_diesel", data) * 30) /
			100 /
			35) *
		transBus;
	let tram_co2 =
		transTram * getValueByName("E_T_tram", data) * carKm * remoteValue * 0.698;
	let bike_co2 = 0;
	let foot_co2 = 0;
	let train_co2 =
		transTrain *
		getValueByName("E_T_train", data) *
		carKm *
		remoteValue *
		0.698;
	let carpooling_co2 = 0;
	let metro_co2 =
		transMetro * getValueByName("E_T_metro", data) * carKm * remoteValue;

	if (transCar > 0 || transCarpooling > 0) {
		if (carFuel == 1) typeFuel = getValueByName("E_T_fuel_diesel", data);
		if (carFuel == 2) typeFuel = getValueByName("E_T_fuel_gas", data);
		if (carFuel == 3) typeFuel = getValueByName("E_T_fuel_elect", data);
		if (carFuel == 4) typeFuel = getValueByName("E_T_fuel_hyb", data);
		if (carFuel == 5) typeFuel = getValueByName("E_T_fuel_lpg", data);

		car_co2 = (carKm * remoteValue * transCar * typeFuel * carFuelConsum) / 100;
		carpooling_co2 =
			(((carKm * remoteValue * transCarpooling * carFuelConsum) / 100) *
				typeFuel) /
			nrPassengers;
	}

	const TRANSPORT_TO_WORK_CO2 =
		car_co2 +
		bus_co2 +
		tram_co2 +
		bike_co2 +
		foot_co2 +
		train_co2 +
		carpooling_co2 +
		metro_co2;

	// console.log(car_co2);
	// console.log(bus_co2);
	// console.log(tram_co2);
	// console.log(bike_co2);
	// console.log(foot_co2);
	// console.log(train_co2);
	// console.log(carpooling_co2);
	// console.log(metro_co2);
	// console.log(TRANSPORT_TO_WORK_CO2);

	const FLY_CO2 = flyHours * 850 * getValueByName("E_T_fly", data);

	console.log(FLY_CO2);

	const TRANSPORT_CO2 = TRANSPORT_TO_WORK_CO2 + FLY_CO2;

	//SUMA
	const SUM_EMPLOYEE_CO2 = GENERAL_CO2 + REMOTE_CO2 + FOOD_CO2 + TRANSPORT_CO2;

	console.log("ogólne: ", GENERAL_CO2);
	console.log("praca zdalna: ", REMOTE_CO2);
	console.log("jedzenie: ", FOOD_CO2);
	console.log("transport: ", TRANSPORT_CO2);
	console.log("suma: ", SUM_EMPLOYEE_CO2);

	const calcAnswers = [
		{
			name: "telefon",
			co2: Phone_CO2,
			category: "ogólne",
		},
		{
			name: "email",
			co2: Email_CO2,
			category: "ogólne",
		},
		{
			name: "laptop",
			co2: Laptop_CO2,
			category: "praca zdalna",
		},
		{
			name: "komputer",
			co2: Comp_CO2,
			category: "praca zdalna",
		},
		{
			name: "tablet",
			co2: Tablet_CO2,
			category: "praca zdalna",
		},
		{
			name: "spotkania",
			co2: Meetings_CO2,
			category: "praca zdalna",
		},
		{
			name: "monitory",
			co2: Monitors_CO2,
			category: "praca zdalna",
		},
		{
			name: "jedzenie",
			co2: FOOD_CO2,
			category: "jedzenie",
		},
		{
			name: "samochód",
			co2: car_co2,
			category: "transport",
		},
		{
			name: "autobus",
			co2: bus_co2,
			category: "transport",
		},
		{
			name: "tramwaj",
			co2: tram_co2,
			category: "transport",
		},
		{
			name: "rower",
			co2: bike_co2,
			category: "transport",
		},
		{
			name: "pieszo",
			co2: foot_co2,
			category: "transport",
		},
		{
			name: "pociąg",
			co2: train_co2,
			category: "transport",
		},
		{
			name: "carpooling",
			co2: carpooling_co2,
			category: "transport",
		},
		{
			name: "metro",
			co2: metro_co2,
			category: "transport",
		},
		{
			name: "loty",
			co2: FLY_CO2,
			category: "transport",
		},
		{
			name: "ogólne",
			co2: GENERAL_CO2,
			category: "ogólne",
		},
		{
			name: "praca zdalna",
			co2: REMOTE_CO2,
			category: "praca zdalna",
		},
		{
			name: "jedzenie",
			co2: FOOD_CO2,
			category: "jedzenie",
		},
		{
			name: "transport",
			co2: TRANSPORT_CO2,
			category: "transport",
		},
		{
			name: "suma",
			co2: SUM_EMPLOYEE_CO2,
			category: "suma",
		},
	];
	// let GENERAL_CO2 = Email_CO2 + Phone_CO2
	// let REMOTE_CO2 = Laptop_CO2 + Comp_CO2 + Tablet_CO2 + Meetings_CO2 + Monitors_CO2
	// FOOD_CO2
	// const TRANSPORT_TO_WORK_CO2 = car_co2 + bus_co2 + tram_co2 + bike_co2 + foot_co2 + train_co2 + carpooling_co2 + metro_co2

	goToFinish(`${SUM_EMPLOYEE_CO2}`, calcAnswers);
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

function getAloneAnswerFromInputText(answers, index) {
	return parseInt(answers[index].value);
}

function getMultiAnswerFromInputText(answers, index) {
	const answer = [];
	answers[index].forEach(a => {
		answer.push(parseInt(a.value));
	});
	return answer;
}

function getAnswerFromRadio(answers, index) {
	let answer = 0;
	answers[index].forEach((a, index) => {
		if (a.isChecked) {
			answer = index + 1;
		}
	});
	return answer;
}

function getAloneAnswerFromRange(answers, index) {
	return parseInt(answers[index].value);
}

function getMultiAnswersFromRange(answers, index) {
	const answer = [];
	answers[index].forEach(a => {
		answer.push(parseInt(a.value));
	});

	return answer;
}

function getAnswersFromCheckbox(answers, index) {
	const answer = [];
	answers[index].forEach(a => {
		answer.push(parseInt(a.value));
	});
	return answer;
}

function getValueByName(name, data) {
	return data.find(element => element.name == name).value;
}

function goToFinish(sum, calcAnswers) {
	const stopTime = new Date().getTime()
	const fullTime = parseInt((stopTime - startTime)/1000) 

	showLoadind()
	sessionStorage.setItem("sum", sum);
	sendToBase(calcAnswers, fullTime);

	setTimeout(() => {
		location.href = "finish.html";
	}, 1000);
	
	
}

function sendToBase(calcAnswers, fullTime) {
	const toSendRawAnswers = JSON.stringify(
		Form.questions.map(a => {
			return {
				category: a.category,
				name: a.name,
				answers: a.answers,
                type: a.type
			};
		})
	);
	const toSendCalcAnswers = JSON.stringify(calcAnswers);

	let _data = {
		customer: sessionStorage.getItem("code"),
		role: sessionStorage.getItem("role"),
		raw_answers: toSendRawAnswers,
		calc_answers: toSendCalcAnswers,
		time: fullTime,
	};


	fetch(`${serv}/api/answers/?format=json`, {
		method: "POST",
		body: JSON.stringify(_data),
		headers: { "Content-type": "application/json; charset=UTF-8" ,
		'Authorization': apiKey
	},
	}).then(response => response.json())
	
}
