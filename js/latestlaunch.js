/* Latest launch API */
const launchContainer = document.querySelector(".detailsLaunchContainer");
const launchVideo = document.querySelector(".launchVideo")

async function getLatestLaunch() {
	try {
		const response = await fetch("https://api.spacexdata.com/v4/launches/latest");
		const results = await response.json();
        const latestLaunch = results;
        
        launchContainer.innerHTML = "";
		createHTMLLaunch(latestLaunch);

	} catch (error) {
		console.log(error);
		launchContainer.innerHTML = `<div class="message-error"><b>Error:</b> I'm sorry, but an error occurred, so we can't display details about the latest launch for you.</div>`;
	}
}
getLatestLaunch();

function createHTMLLaunch(latestLaunch) {
	let localDate = latestLaunch.date_local; 
	
	// convert local time format to readable format
	for(var i = 0; i < localDate.length; i++) {
		var year = (localDate[0] + localDate[1] + localDate[2] + localDate[3]);
		var month = (localDate[5] + localDate[6]);
		var date = (localDate[8] + localDate[9]);
	}

	launchContainer.innerHTML +=   `<div class="latestLaunchContainer1">
									<h1>Latest launch #${latestLaunch.flight_number}</h1>
									<h2>${latestLaunch.name}</h2>
									<p><span class="bold">Launch date:</span> ${date}/${month}/${year}</p>
									</div>`;
	
	launchContainer.innerHTML +=   `<div class="latestLaunchDescription2">
                                    <p>${latestLaunch.details}</p>
                                    <p>Interested in more information about this launch? Check out <a href="https://www.spacex.com/launches/" target="_blank" class="link">SpaceX's official website</a> <i>(window opens in a new tab).</i></p>
                                    <br/><button class="video-button button-white"><img src="icons/play.png" alt="Play video icon" class="launch-icon">Watch video</button>
                                    <a href="launches.html"><button class="button-white"><img src="icons/spaceship.png" alt="Spaceship icon" class="launch-icon">Go to all launches</button></a></div>`;

    launchVideo.innerHTML +=   `<div class="latestLaunchvideo">
                                <iframe src="https://www.youtube-nocookie.com/embed/fe6HBw1y6bA?start=118" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="starlink-video"></iframe>
                                </div>
                                <div class="video-caption"><span class="bold">Caption:</span> A video presenting the SpaceX Starlink mission which launched on February the 4th in 2021.</div>`;
                                    
    const videoButton = document.querySelector(".video-button");
    videoButton.onclick = function () {
        launchVideo.style.display = "block";
        window.scroll(0, 1110);
    }
}