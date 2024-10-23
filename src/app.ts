import axios from "axios";

const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "YOUR_API_KEY";
// https://developers.google.com/maps/documentation/geocoding/requests-geocoding

const formElement = document.querySelector("form")! as HTMLFormElement;

type GoogleGeocodingResponse = {
  status: "OK" | "REQUEST DENIED";
  results: {
    geometry: { location: { lat: number; lng: number } };
    formatted_address: string;
  }[];
};

async function initMapWithMarker(
  coordinates: google.maps.LatLngLiteral
): Promise<void> {
  const mapElement = new google.maps.Map(document.getElementById("map")!, {
    // center: { lat: -34.397, lng: 150.644 },
    center: coordinates,
    zoom: 14,
  });
  new google.maps.Marker({ position: coordinates, map: mapElement });
}

const formattedAddressElement = document.getElementById(
  "formatted-address"
)! as HTMLHeadingElement;

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;
  const parameters = `address=${encodeURIComponent(
    enteredAddress
  )}&key=${GOOGLE_API_KEY}`;

  const geoCodingBaseURL = `https://maps.googleapis.com/maps/api/geocode/json?${parameters}`;

  axios
    .get<GoogleGeocodingResponse>(geoCodingBaseURL)
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      } else {
        const coordinates = response.data.results[0].geometry.location;
        const formattedAddress = response.data.results[0].formatted_address;
        formattedAddressElement.innerHTML = formattedAddress;
        initMapWithMarker(coordinates);
      }
    })
    .catch((err: Error) => {
      alert(err.message);
    });
}

formElement.addEventListener("submit", searchAddressHandler);

/**
 * GOOGLE RESPONSE DATA

{
  data: {
    results: [
      {
        address_components: [
          {
            long_name: "Oberkrämer",
            short_name: "Oberkrämer",
            types: ["locality", "political"],
          },
          {
            long_name: "Oberhavel",
            short_name: "Oberhavel",
            types: ["administrative_area_level_3", "political"],
          },
          {
            long_name: "Brandenburg",
            short_name: "BB",
            types: ["administrative_area_level_1", "political"],
          },
          {
            long_name: "Germany",
            short_name: "DE",
            types: ["country", "political"],
          },
          {
            long_name: "16",
            short_name: "16",
            types: ["postal_code", "postal_code_prefix"],
          },
        ],
        formatted_address: "16 Oberkrämer, Germany",
        geometry: {
          bounds: {
            northeast: { lat: 52.7626931, lng: 13.1937262 },
            southwest: { lat: 52.6066071, lng: 12.9817667 },
          },
          location: { lat: 52.6967066, lng: 13.105511 },
          location_type: "APPROXIMATE",
          viewport: {
            northeast: { lat: 52.7626931, lng: 13.1937262 },
            southwest: { lat: 52.6066071, lng: 12.9817667 },
          },
        },
        partial_match: true,
        place_id: "ChIJXQLncBMCqUcREEVeW0YgIQQ",
        types: ["locality", "political"],
      },
    ],
    status: "OK",
  },
  status: 200,
  statusText: "",
  headers: {
    "cache-control": "no-cache, must-revalidate",
    "content-length": "525",
    "content-type": "application/json; charset=UTF-8",
    expires: "Fri, 01 Jan 1990 00:00:00 GMT",
    pragma: "no-cache",
  },
  config: {
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=Oberkraemer%2016&key=AIzaSyCxXgqkZtZs3vIjEUngCMLlDBGFdjjuGm8",
    method: "get",
    headers: { Accept: "application/json, text/plain, \*\/*" },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
  },
  request: {},
};

*/
