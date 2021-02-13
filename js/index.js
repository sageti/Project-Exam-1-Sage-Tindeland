/*Open API - People in Space*/
const spaceContainer = document.querySelector(".spaceContainer");
const CORS_URL = "https://noroffcors.herokuapp.com/";

async function getPeopleInSpace() {
	try {
		const response = await fetch(CORS_URL + "http://api.open-notify.org/astros.json");
		const results = await response.json();
        const people = results;
        
        spaceContainer.innerHTML = "";
		createHTMLPeople(people);

		const peopleButton = document.querySelector(".people-button");
		peopleButton.onclick = function () {

			//Display table with name and location of people in space
			const humans = results.people;
			for (let i = 0; i < humans.length; i++) {
				const humansName = humans[i].name;
				let spaceStation = humans[i].craft;

				if(spaceStation === "ISS") {
					spaceStation = "International Space Station";
				}

				//Function for location and names
				async function getLocation() {
					try {
						const response = await fetch(CORS_URL + "http://api.open-notify.org/iss-now.json");
						const results = await response.json();

						const location = results;
						let latitude = location.iss_position.latitude;
						let longitude = location.iss_position.longitude;

						spaceContainer.innerHTML += `<div class="spaceNamesContainer">
												<table class="huamnsTable">
													<tr>
														<th><img src="icons/astronaut.png" alt="Astronaut icon" class="launch-icon" /></th>
														<td class="bold">${humansName}</td>
													</tr>
													<tr>
														<th><img src="icons/location.png" alt="Spaceship icon" class="launch-icon"></th>
														<td>${spaceStation}</td>
													</tr>
													<tr>
														<th><img src="icons/spaceship.png" alt="Spaceship icon" class="launch-icon"></th>
														<td>${latitude}&ring; N, ${longitude}&ring; E</td>
													</tr>
												</table>
											</div>`;
					}
					catch (error) {
						console.log(error);
						spaceContainer.innerHTML = `<div class="message-error"><b>Error:</b> I'm sorry, but an error occurred, so we can't display how many people are in space right now.</div>`;
					}
				}
				
				getLocation();
			}
			
		}

	} catch (error) {
		console.log(error);
		spaceContainer.innerHTML = `<div class="message-error"><b>Error:</b> I'm sorry, but an error occurred, so we can't display how many people are in space right now.</div>`;
	}
}
getPeopleInSpace();

function createHTMLPeople(people) {
	spaceContainer.innerHTML += 	`<div class="peopleContainer">
									<h1>Humans in space</h1>
									<p>There are currently ${people.number} astronauts in space. Learn more about who they are and where they are located.</p>
									<button class="people-button">Learn more</button>
									</div>`;
}

/* Latest launch API */
const launchContainer = document.querySelector(".launchContainer");

async function getLatestLaunch() {
	try {
		const response = await fetch("https://api.spacexdata.com/v4/launches/latest");
		const results = await response.json();
        const latestLaunch = results;
        
        launchContainer.innerHTML = "";
		createHTMLLaunch(latestLaunch);

	} catch (error) {
		console.log(error);
		launchContainer.innerHTML = `<div class="message-error"><b>Error:</b> I'm sorry, but an error occurred, so we can't display the latest launch for you.</div>`;
	}
}
getLatestLaunch();

function createHTMLLaunch(latestLaunch) {

	launchContainer.innerHTML +=   `<div class="latestLaunchContainer">
									<h1 class="small-heading">Latest launch #${latestLaunch.flight_number}</h1>
									<h2 class="large-heading">${latestLaunch.name}</h2>
									<br/><a href="latestlaunch.html" class="button-wb">Learn more</a>
									</div>`;
}