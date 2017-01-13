import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index';


const API_KEY = "AIzaSyDYeKhSxCq8gMuLKfPYPRMxMkGf4k3CKpM";

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
	  getLocation: function (input) {
	  	console.log("INPUT >> ", input);
	  	try {
            return HTTP.call("GET", "https://maps.googleapis.com/maps/api/place/autocomplete/json",
		  		{params: {input:input, components:"country:us", types:"establishment", key:API_KEY}});
            // //https://maps.googleapis.com/maps/api/place/textsearch/json
		  	// console.log("RESULT>> ", result);
		  	// // EXAMPLE PHOTO REQUEST >>
            // var result2 = HTTP.call("GET", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRYAAAAJQ8yIaeWKbuTIDik0XXZpBkhtYH3AJLtY8R8L3YO_raVwIVyCsuiZxQrbqmDt76LPPKNUYH0MkGiciOWH_lfy4aG8D3mdK-ms75AkVdcAUIB0ypQwNIHUPnUGp3PsTTAEhDdneYUAjk0gFHMFUrBjyIHGhRAAx2GWfp75mgAY6nvbP3Fj6S-8Q&key=AIzaSyDYeKhSxCq8gMuLKfPYPRMxMkGf4k3CKpM");
            // console.log("result2>>", result2);
		  	// // https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="CmRYAAAAJQ8yIaeWKbuTIDik0XXZpBkhtYH3AJLtY8R8L3YO_raVwIVyCsuiZxQrbqmDt76LPPKNUYH0MkGiciOWH_lfy4aG8D3mdK-ms75AkVdcAUIB0ypQwNIHUPnUGp3PsTTAEhDdneYUAjk0gFHMFUrBjyIHGhRAAx2GWfp75mgAY6nvbP3Fj6S-8Q"&key=AIzaSyDYeKhSxCq8gMuLKfPYPRMxMkGf4k3CKpM
	  	}
	  	catch (e) {
	  		console.log('server error > ', e);
	  		return false;
	  	}
	  },
      findPhotoOfLocation(id) {
          try {
          	console.log("location id > ", id);
              let result =  HTTP.call(
              		"GET", "https://maps.googleapis.com/maps/api/place/details/json",
					{params: { placeid: id, key:API_KEY}})

			  if (!!result)  {
              	let photoRefs = _.map(result.data.result.photos, obj => {
              		return obj.photo_reference;
				})
              	return photoRefs;

					let photoresult = HTTP.get("https://maps.googleapis.com/maps/api/place/photo",
						{params: {maxwidth:"400", photoreference: photoRefs[0], key: API_KEY}})

						return photoresult;
						//?maxwidth=400&photoreference=CmRYAAAAJQ8yIaeWKbuTIDik0XXZpBkhtYH3AJLtY8R8L3YO_raVwIVyCsuiZxQrbqmDt76LPPKNUYH0MkGiciOWH_lfy4aG8D3mdK-ms75AkVdcAUIB0ypQwNIHUPnUGp3PsTTAEhDdneYUAjk0gFHMFUrBjyIHGhRAAx2GWfp75mgAY6nvbP3Fj6S-8Q&key=AIzaSyDYeKhSxCq8gMuLKfPYPRMxMkGf4k3CKpM");

              }
              // // //https://maps.googleapis.com/maps/api/place/textsearch/json
              // // console.log("RESULT>> ", result);
              // // // EXAMPLE PHOTO REQUEST >>
              // // var result2 = HTTP.call("GET", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRYAAAAJQ8yIaeWKbuTIDik0XXZpBkhtYH3AJLtY8R8L3YO_raVwIVyCsuiZxQrbqmDt76LPPKNUYH0MkGiciOWH_lfy4aG8D3mdK-ms75AkVdcAUIB0ypQwNIHUPnUGp3PsTTAEhDdneYUAjk0gFHMFUrBjyIHGhRAAx2GWfp75mgAY6nvbP3Fj6S-8Q&key=AIzaSyDYeKhSxCq8gMuLKfPYPRMxMkGf4k3CKpM");
              // // console.log("result2>>", result2);
              // // // https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="CmRYAAAAJQ8yIaeWKbuTIDik0XXZpBkhtYH3AJLtY8R8L3YO_raVwIVyCsuiZxQrbqmDt76LPPKNUYH0MkGiciOWH_lfy4aG8D3mdK-ms75AkVdcAUIB0ypQwNIHUPnUGp3PsTTAEhDdneYUAjk0gFHMFUrBjyIHGhRAAx2GWfp75mgAY6nvbP3Fj6S-8Q"&key=AIzaSyDYeKhSxCq8gMuLKfPYPRMxMkGf4k3CKpM
          }
          catch (e) {
              console.log('server error > ', e);
              return false;
          }
	  }
	})
});
