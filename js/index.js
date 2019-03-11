let API_KEY = "AIzaSyBEi7JQ2vgW8DTJza1BDwJKGsShU89fGHg";


function watchForm() {
	$('#videoForm').on('submit', event => {
		event.preventDefault();
		console.log('You clicked the submit button');

		let videoName = $('#videoSearchBox').val();

		handleFetch(videoName, displayResults);
	});

	$('#prev').on('click', event => {
		
	});

	$('#next').on('click', event => {

	});
}

function handleFetch(videoName, callback){
	let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" + ${videoName} + "&key=${API_KEY}`;
	console.log(url);

	fetch(url)
		.then(response =>{
			//console.log(response);
			if(response.ok) {
				return response.json();
			}
			else {
				throw new Error("Something went wrong. Try again later.");
			}
		})
		.then(responseJson=> {
			callback(responseJson);
		})
		.catch(err =>{
			$('#results').html(err.message);
		})
}

function displayResults(data){
	$('#results').html('');
	console.log(data);

	for (var i = 0; i < 10; i++) {
		var div_video = `<div id="video${i}"><a target="_blank" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}">`
		div_video += `<h2>${data.items[i].snippet.title}<h2>`;
		div_video += `<img src="${data.items[i].snippet.thumbnails.default.url}"/>`;
		div_video += `</a></div>`;

		$('#results').append(div_video);
	}

}

$(watchForm);