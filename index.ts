import mapboxgl, { LngLatLike } from "mapbox-gl";
// @ts-ignore
import * as Threebox from "threebox-plugin";

const initializeMapWithSphere = (token: string) => {
  if (!token) {
    console.error("Mapbox API token is required.");
    return;
  }
  mapboxgl.accessToken = token;

  var origin: LngLatLike = [-122.434, 37.7353];

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v9",
    center: origin,
    zoom: 17,
    pitch: 60,
    antialias: true,
  });

  map.on("style.load", function () {
    // instantiate threebox
    const tb = new Threebox.default(map, map.getCanvas().getContext("webgl"), {
      defaultLights: true,
      enableSelectingObjects: true,
    });

    //instantiate a red sphere and position it at the origin lnglat
    var sphere = tb
      .sphere({ color: "red", material: "MeshToonMaterial" })
      .setCoords(origin);
    sphere.addEventListener("ObjectMouseOver", onObjectMouseOver, false);
    sphere.addEventListener("ObjectMouseOut", onObjectMouseOut, false);
    // add sphere to the scene
    tb.add(sphere);
  });

  //actions to execute onObjectMouseOver
  // @ts-ignore
  function onObjectMouseOver(e) {
    console.log("ObjectMouseOver: " + e.detail.name);
  }

  //actions to execute onObjectMouseOut
  // @ts-ignore
  function onObjectMouseOut(e) {
    console.log("ObjectMouseOut: " + e.detail.name);
  }
};

if (typeof exports !== "undefined") {
  exports.initializeMapWithSphere = initializeMapWithSphere;
}
