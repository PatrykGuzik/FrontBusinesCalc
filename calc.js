// Obliczenia Manager -----------------------------------------------------------------
// ------------------------------------------------------------------------------------
function calcManagerCarbonFootprint(){
    const answers = Form.questions.map(a=>a.answers)
    console.log(answers);

    // 0 Jaką powierzchnię w budynku zajmuje miejsce pracy?
    const officeSpace = getAloneAnswerFromInputText(answers,0) 
    console.log("officeSpace", officeSpace);

    // 1 Ile pracowników pracuje w tym miejscu?
    const nrOfemployees = getAloneAnswerFromInputText(answers,1)
    console.log("nrOfemployees", nrOfemployees);

    // 2 Roczne zużycie energii elektrycznej w kWh
    const annualElectConsum = getAloneAnswerFromInputText(answers,2)
    console.log("annualElectConsum", annualElectConsum);
    
    // 3 Jakie są roczne koszty zapłaty za energie elektryczna? 
    const annualCostElect = getAloneAnswerFromInputText(answers,3)
    console.log("annualCostElect", annualCostElect);

    // 4 Czy energia elektryczna generowana jest z OZE?
    const isOZE = getAnswerFromRadio(answers,4)
    console.log("isOZE", isOZE);

    // 5 W ilu % energia z OZE pokrywa zapotrzebowanie?
    const percentOZE = getAloneAnswerFromRange(answers,5)
    console.log("percentOZE:", percentOZE);

    // 6 Zużycie energii cieplnej w kWh?
    const warmEnergyConsum = getAloneAnswerFromInputText(answers,6)
    console.log("warmEnergyConsum:", warmEnergyConsum);

    // 7 Podaj ilość m3 gazu zużytego w ciągu roku
    const m3GasConsum = getAloneAnswerFromInputText(answers,7)
    console.log("m3GasConsum", m3GasConsum);

    // 8 Czy stosujecie w biurze segregację odpadów na plastik, papier, szkło i frakcję BIO ?
    const isSegregation = getAnswerFromRadio(answers,8)
    console.log("isSegregation", isSegregation);

    // 9 Ile kg danych śmieci wyrzucanych jest w biurze miesięcznie
    const monthThrownTrash = getMultiAnswersFromRange(answers,9)
    const trashPlastic = monthThrownTrash[0]
    const trashGlass = monthThrownTrash[1]
    const trashBio = monthThrownTrash[2]
    const trashPaper = monthThrownTrash[3]
    console.log("monthThrownTrash", monthThrownTrash, "-","Plastic-", trashPlastic,"Glass-",trashGlass,"Bio-",trashBio,"Paper-",trashPaper);


    // 10 Ile wynoszą rachunki miesięczne za wywóz śmieci?
    const trashCost = getAloneAnswerFromInputText(answers,10)
    console.log("trashCost", trashCost);

    // 11 Ile litrów paliwa ze wskazanych rozdzajów zostało wykorzystane przez flotę biura w ciągu roku?
    const fuelConsum = getMultiAnswerFromInputText(answers,11)
    console.log("fuelConsum", fuelConsum);


    // 12 Ile wynosi całkowite zużycie wody w biurze?
    const waterConsum = getAloneAnswerFromInputText(answers,12)
    console.log("waterConsum", waterConsum);

    // 13 Ile m3 ścieków wyprodukowanych jest w biurze? 
    const sewageProd = getAloneAnswerFromInputText(answers,13)
    console.log("sewageProd", sewageProd);
}


// Obliczenia Pracownik ---------------------------------------------------------------
// ------------------------------------------------------------------------------------
function calcEmployeeCarbonFootprint(){
    const answers = Form.questions.map(a=>a.answers)
    console.log(answers);

    // OGÓLNE-------------------------------------------------------------------------

    // 0 W jaki sposób pracujesz?  1-zdalnie;  2-hybrydowo; 3-wbiurze
    const workStyle = getAnswerFromRadio(answers,0)
    console.log('workStyle', workStyle);

    // 1 Podaj ilość dni w biurze
    const nrDaysInOffice = getAloneAnswerFromInputText(answers,1)
    console.log('nrDaysInOffice', nrDaysInOffice);

    // 2 Czy w pracy odbierasz służbową korespondencję? 1-tak; 2-nie
    const isMail = getAnswerFromRadio(answers,2)
    console.log('isMail', isMail);

    // 3 Ile średnio wysyłasz maili dziennie?
    const mailForDay = getAloneAnswerFromInputText(answers,3)
    console.log('mailForDay', mailForDay);

    // 4 Czy w pracy odbierasz służbowe telefony? 1-tak; 2-nie
    const ifPhone = getAnswerFromRadio(answers,4)
    console.log('ifPhone', ifPhone);

    // 5 Ile godzin dziennie korzystasz z telefonu służbowego?
    const phoneForDay = getAloneAnswerFromInputText(answers,5)
    console.log('phoneForDay', phoneForDay);

    // PRACA ZDALNA-------------------------------------------------------------

    // 6 Ile godzin dziennie pracujesz na:
    const useDevices = getMultiAnswerFromInputText(answers,6)
    const useLaptop = useDevices[0]
    const useComp = useDevices[1]
    const useTablet = useDevices[2]
    console.log('useDevices', useDevices, "-","Laptop-", useLaptop,"Komputer-", useComp,"Tablet-", useTablet);

    // 7 Ile godzin dziennie spędzasz na spotkaniach?
    const timeOnMeetings = getAloneAnswerFromInputText(answers,7)
    console.log('timeOnMeetings', timeOnMeetings);

    // 8 Na ilu ekranach pracujesz?
    const nbMonitors = getAloneAnswerFromInputText(answers,8)
    console.log('nbMonitors', nbMonitors);


    // WODA I JEDZENIE-----------------------------------------------------------

    // 8 Czy zamawiasz jedzenie do pracy?
    const isFoodDelivery = getAnswerFromRadio(answers,9)
    console.log('isFoodDelivery', isFoodDelivery);

    // 9 Ile obiadów zamawiasz z dowozem do firmy średnio w ciągu tygodnia?
    const nrOfFoodDeliver = getAloneAnswerFromInputText(answers,10)
    console.log('nrOfFoodDeliver', nrOfFoodDeliver);

    // 10 Czy obiady dowożone są zwykle samochodem czy rowerem?
    const foodDeliveryStyle = getAnswerFromRadio(answers,11)
    console.log('foodDeliveryStyle', foodDeliveryStyle);

    // 11 Jakiego rodzaju potrawy zamawiasz?
    const foodStyle = getAnswerFromRadio(answers,12)
    console.log('foodStyle', foodStyle);

    // TRANSPORT-------------------------------------------------------------------

    // 12 W jaki sposób dostajesz się do pracy?
    const transportToWork = getAnswersFromCheckbox(answers,13)
    const transCar = transportToWork[0]
    const transBus = transportToWork[1]
    const transTram = transportToWork[2]
    const transBike = transportToWork[3]
    const transFood = transportToWork[4]
    const transTrain = transportToWork[5]
    const transCarpooling = transportToWork[6]
    const transMetro = transportToWork[7]

    console.log('transportToWork', transportToWork);

    // 13 Ile kilometrów przejeżdzasz do oraz z pracy?
    const carKm = getAloneAnswerFromInputText(answers,14)
    console.log('carKm', carKm);

    // 14 Jakim typem paliwa zasilany jest Twój samochód?   1-Diesel;  2-Benzyna;  3-EnergiaElektryczna; 4-NapędHybrydowy;  5-LPG 
    const carFuel = getAnswerFromRadio(answers,15)
    console.log('carFuel', carFuel);

    // 15 Ile litrów na 100 km statystycznie spala twój samochód?
    const carFuelConsum = getAloneAnswerFromInputText(answers,16)
    console.log('carFuelConsum', carFuelConsum);

    // 16 Z iloma osobami zwykle podróżujesz?
    const nrPassengers = getAloneAnswerFromInputText(answers,17)
    console.log('nrPassengers', nrPassengers);

    // 17 Ile godzin lotów służbowych wykonałeś w ciągu roku?
    const flyHours = getAloneAnswerFromInputText(answers,18)
    console.log('flyHours', flyHours);
}


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


function getAloneAnswerFromInputText(answers,index){
    return parseInt(answers[index].value)
}

function getMultiAnswerFromInputText(answers,index) {
    const answer = []
    answers[index].forEach((a) => {
        answer.push(parseInt(a.value))
    })
    return answer
}

function getAnswerFromRadio(answers,index){
     let answer = 0;
    answers[index].forEach((a, index) => {
        if (a.isChecked) {
            answer = index+1
        }
    });
    return answer
}

function getAloneAnswerFromRange(answers,index) {
    return parseInt(answers[index].value)
}

function getMultiAnswersFromRange(answers,index){
    const answer = []
    answers[index].forEach((a) => {
        answer.push(parseInt(a.value))
    })

    return answer
}

function getAnswersFromCheckbox(answers,index) {
    const answer = []
    answers[index].forEach((a) => {
        answer.push(parseInt(a.value))
    })

    return answer
}