import axios from "axios";
import ol from "openlayers";
const form = document.querySelector("form");
const addressInput = <HTMLInputElement>document.querySelector("#address");

const GOOGLE_API_KEY = "dummy";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS" | "ABOVE_DAILY_LIMIT";
};
async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  try {
    const response = await axios.get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`,
    );

    if (response.data.status !== "OK") throw new Error("response not ok");

    const coordinates = response.data.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById("map")!, {
      center: coordinates,
      zoom: 8,
    });

    new google.maps.Marker({ position: coordinates, map: map });
  } catch (err) {
    document.getElementById("map")!.innerHTML = ""; // clear <p> from <div id="map">
    // This fallback take from course
    new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([34, 54]),
        zoom: 10,
      }),
    });
  }
}

form?.addEventListener("submit", searchAddressHandler);

