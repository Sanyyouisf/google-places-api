$(document).ready(function() {

    const apiKey = "";





    $("body").on("click", "li", (e) => {
        console.log(e.target.innerHTML);
        loadPlaces(e.target.innerHTML).then((data) =>{
        	console.log(data);
        }).catch((error) => {
        	console.log(error);
        });
    });

    const loadPlaces = (dropdownType) => {
        return new Promise ((resolve, reject) => {
            $.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=5000&type=${dropdownType}&key=${apiKey}`)
            .done((data) => resolve(data))
            .fail((error) => reject(error));
        });
    };







});
