//All launches API
const allLaunchesBlock = document.querySelector(".allLaunchesBlock");

async function getAllLaunches() {
	try {
		const response = await fetch("https://api.spacexdata.com/v4/launches/");
		const results = await response.json();

        const allLaunches = results;
        
        allLaunchesBlock.innerHTML = "";
		createHTMLAllLaunches(allLaunches);

        document.querySelector(".sort-latest").addEventListener("click", function() {
            allLaunches.sort(
                function(a,b){
                    if(a.flight_number < b.flight_number){
                        return 1;
                    }
                    else if(a.flight_number > b.flight_number){
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            );
            allLaunchesBlock.innerHTML = "";
            createHTMLAllLaunches(allLaunches)
        })
        
        document.querySelector(".sort-first").addEventListener("click", function() {
            allLaunches.sort(
                function(a,b){
                    if(a.flight_number > b.flight_number){
                        return 1;
                    }
                    else if(a.flight_number < b.flight_number){
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            );
            allLaunchesBlock.innerHTML = "";
            createHTMLAllLaunches(allLaunches)
        })

	} catch (error) {
		console.log(error);
		allLaunchesBlock.innerHTML = `<div class="message-error"><b>Error:</b> I'm sorry, but an error occurred, so we can't display all launches for you.</div>`;
	}
}
getAllLaunches();

function createHTMLAllLaunches(allLaunches) {
	
	allLaunchesBlock.innerHTML = "";
	for (let x = 0; x < allLaunches.length; x++) {

		let success = allLaunches[x].success;
		if (success === true) {
			success = "Successful";
		} else if (success === false) {
			success = "Unsuccessful";
        } else if (success === null) {
            success = "Upcoming";
        } else {
			success = "Launch cancelled";
		}

		if (allLaunches[x].details === null) {
			allLaunches[x].details = "No description available."; 
		}

		// convert local time format to readable format
		let localDate = allLaunches[x].date_local; 
		
		for(var i = 0; i < localDate.length; i++) {
			var year = (localDate[0] + localDate[1] + localDate[2] + localDate[3]);
			var month = (localDate[5] + localDate[6]);
			var date = (localDate[8] + localDate[9]);
		}

        if (year < 2020) {
			continue;
        }
        
		let flightnumber = allLaunches[x].flight_number;

        allLaunchesBlock.innerHTML += 	`<div class="launch-timeline-frame">                                
                                            <div class="launch-timeline">
                                                <ul>
                                                    <li>
                                                        <div class="launch-content">
                                                            <p class="right"><img src="icons/date.png" alt="Date/time icon" class="launch-icon hide-icon"><span class="launch-date">${date}/${month}/${year}</span></p>
                                                            <h2>${allLaunches[x].name} #${flightnumber}</h2>
                                                            <p><img src="icons/spaceship.png" alt="Spaceship icon" class="launch-icon"><span class="launch-success ${allLaunches[x].success}">${success}</span></p>
                                                            <p><span class="launch-description">${allLaunches[x].details}</span></p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>`;
    }
    
}

