require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let div = document.getElementById("missionTarget");
    div.innerHTML=`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;

};

function validateInput(testInput) {
    if (testInput == "") {
        return "Empty"
    } else {
        let convertedInput = Number(testInput)
        if (!isNaN(convertedInput)){
        return "Is a Number"
        } else if (isNaN(convertedInput)){
            return "Not a Number"
        } else if (testInput == "") {
            return "Empty"
        }
    }
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    
    if (validateInput(pilot) == "Empty" || validateInput(copilot) == "Empty" || validateInput(fuelLevel) == "Empty" || validateInput(cargoLevel) == "Empty") {
        window.alert("Please complete all fields.");
    } else if (validateInput(pilot) == "Is a Number" || validateInput(copilot) == "Is a Number" || validateInput(fuelLevel) == "Not a Number" || validateInput(cargoLevel) == "Not a Number") {
        window.alert("Invalid input type");
    } else {
        list.style.visibility = 'visible';
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        if (fuelLevel < 10000 && cargoLevel > 10000){
            fuelStatus.innerHTML = 'Not enough fuel for launch.';
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
            launchStatus.innerHTML = 'Shuttle not ready for launch.';
            launchStatus.style.color = 'rgb(199, 37, 78)';
        } else if (fuelLevel > 10000 && cargoLevel > 10000){
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
            launchStatus.innerHTML = 'Shuttle not ready for launch.';
            launchStatus.style.color = 'rgb(199, 37, 78)';
        } else if (fuelLevel < 10000 && cargoLevel < 10000){
            fuelStatus.innerHTML = 'Not enough fuel for launch.';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            launchStatus.innerHTML = 'Shuttle not ready for launch.';
            launchStatus.style.color = 'rgb(199, 37, 78)';
        } else {
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            launchStatus.innerHTML = 'Shuttle is Ready for Launch';
            launchStatus.style.color = 'rgb(65, 159, 106)';
        }
    }
};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            return response.json();
        });

    return planetsReturned;
};

function pickPlanet(planets) {
    let randomIndex = Math.floor(Math.random()*6);
    return planets[randomIndex];
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
