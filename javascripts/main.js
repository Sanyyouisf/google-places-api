$(document).ready(function() {

    const apiKey = "";
    // $("#output").hide();
    // $("#address").hide();



    $("body").on("click", "li", (e) => {
        console.log("e.target.innerHTML",e.target.innerHTML);
        loadPlaces(e.target.innerHTML).then((results) =>{
        	// console.log("data",data);
        	// $("#output").text("");
        	// $("#address").text("");
        	WritePlaceToDom(results);
        }).catch((error) => {
        	console.log(error);
        });
    });

    $("body").on("click",".place",(e) => {
    	console.log("e.target.id",e.target.id);
    	$("#address").text("");
    	let place_id = e.target.id;
    	loadDetails(place_id).then((result) => {
    		console.log(result.formatted_address);
    		writeAddressToDOM(result.formatted_address);
    	});
    });

    const loadDetails = (place_id) => {
    	return new Promise((resolve,reject) => {
    		$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
            .done((data) => resolve(data.result))
            .fail((error) => reject(error));
    	});
    };

    const loadPlaces = (dropdownType) => {
        return new Promise ((resolve, reject) => {
            $.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=5000&type=${dropdownType}&key=${apiKey}`)
            .done((data) => resolve(data.results))
            .fail((error) => reject(error));
        });
    };


    const writeAddressToDOM = (address) => {
    	$("#address").show();
    	let outputString = `<div> ${address}</div>`;
    	$("#address").append(outputString);
    }; 


    const WritePlaceToDom = (results) => {
    	let outputString = "";
    		// $("#output").show();
    	for (i=0 ;i< results.length ;i++){
    		outputString += `<a href="#"><div id='${results[i].place_id}' class="place"> ${results[i].name}</div></a>`;
    	}	
    	$("#input").html(outputString);
    };







});
