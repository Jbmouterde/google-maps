const mapDiv = document.querySelector(".my-map");

const map =
  new google.maps.Map(mapDiv, {
    zoom: 13,
    center: {
      lat: 18.4655,
      lng: -66.1057
    }
  });

new google.maps.Marker({
  position: {
    lat: 18.4655,
    lng: -66.1057
  },
  map: map,
  title: "San Juan, Puerto Rico",
  animation: google.maps.Animation.DROP
});

new google.maps.Marker({
  position: {
    lat: 18.4481,
    lng: -66.0642
  },
  map: map,
  title: "Santurce, Puerto Rico",
  animation: google.maps.Animation.DROP
});

navigator.geolocation.getCurrentPosition((result) => {
  const { latitude, longitude } = result.coords;

  map.setCenter({ lat: latitude, lng: longitude });
  new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: "Your Location",
    animation: google.maps.Animation.DROP
  });
});

// retrieve restaurant data from our backend
axios.get("/resto/data")
  .then((response) => {
    const restoList = response.data;

    restoList.forEach((oneResto) => {
      const [ lat, lng ] = oneResto.location.coordinates;
      new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: oneResto.name,
        animation: google.maps.Animation.DROP
      });
    });
  })
  .catch((err) => {
    alert("Something went wrong! 💩");
  });


const locationInput = document.querySelector(".location-input");
const latInput = document.querySelector(".lat-input");
const lngInput = document.querySelector(".lng-input");

const autocomplete = new google.maps.places.Autocomplete(locationInput);

autocomplete.addListener("place_changed", () => {
  const place = autocomplete.getPlace();
  const loc = place.geometry.location;

  latInput.value = loc.lat();
  lngInput.value = loc.lng();
});
