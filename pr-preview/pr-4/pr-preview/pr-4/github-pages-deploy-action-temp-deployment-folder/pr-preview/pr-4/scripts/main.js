const hyperleafletCodeContainer = document.querySelector("#hyperleaflet-code")
const importCodeContainer = document.querySelector("#import-code")


const nextButton = document.querySelector("#next-step")
const prevButton = document.querySelector("#prev-step")

const map = L.map('map').setView([0, 0], 0)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const importCode =
  `<!-- import leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css">
<script src="https://unpkg.com/leaflet/dist/leaflet.js">

<!-- import hyperleaflet -->
<script defer src="https://www.unpkg.com/hyperleaflet"></script>
`



const shikiHighlighter = shiki.getHighlighter({ theme: 'nord', langs: ['html', 'javascript'] })
let currentStep = -1



const hyperleafletCodes = [
  `/*style your map container like: */
<style>
#map {
 width: 100%
 height: 500px
}
</style>

<div id="map">
</div>
`,
  `<div id="map"
 data-zoom="4">
</div>
`,
  `<div id="map"
 data-zoom="4"
 data-center="[26.79, -69.71]">
</div>
`,
  `<div id="map"
 data-zoom="5"
 data-center="[26.79, -69.71]">
  <div
   data-tile="EsriWorldImagery">
  </div>
</div>
`,
  `<div id="map"
 data-zoom="5"
 data-center="[26.79, -69.71]">
  <div
   data-tile="EsriWorldImagery">
  </div>
</div>
<div
data-hyperleaflet-source> 
 <span data-id="1"
  data-geometry-type="Point"
  data-geometry="[25.775, -80.193]"></span>
</div>
`,
  `<div id="map"
 data-zoom="5"
 data-center="[26.79, -69.71]">
  <div
   data-tile="EsriWorldImagery">
  </div>
</div>
<div
data-hyperleaflet-source> 
 <span data-id="1"
  data-geometry-type="Point"
  data-geometry="[25.775, -80.193]"></span>
 <span data-id="2"
  data-geometry-type="Point"
  data-geometry="[18.465, -66.117]"></span>
  <span data-id="3"
  data-geometry-type="Point"
  data-geometry="[32.317, -64.737]"></span>
</div>
`,
  `<div id="map"
 data-zoom="5"
 data-center="[26.79, -69.71]">
  <div
   data-tile="EsriWorldImagery">
  </div>
</div>
<div
data-hyperleaflet-source> 
 <span data-id="1"
  data-geometry-type="Point"
  data-geometry="[25.775, -80.193]"
  data-popup="<h3>Miami</h3>"></span>
 <span data-id="2"
  data-geometry-type="Point"
  data-geometry="[18.465, -66.117]"
  data-popup="<h3>San Juan</h3>"></span>
  <span data-id="3"
  data-geometry-type="Point"
  data-geometry="[32.317, -64.737]"  
  data-popup="<h3>Bermuda</h3>"></span>
</div>
`,
  `<div id="map"
 data-zoom="5"
 data-center="[26.79, -69.71]">
  <div
   data-tile="EsriWorldImagery">
  </div>
</div>
<div
data-hyperleaflet-source> 
 <span data-id="1"
  data-geometry-type="Point"
  data-geometry="[25.775, -80.193]"
  data-popup="<h3>Miami</h3>"></span>
 <span data-id="2"
  data-geometry-type="Point"
  data-geometry="[18.465, -66.117]"
  data-popup="<h3>San Juan</h3>"></span>
 <span data-id="3"
  data-geometry-type="Point"
  data-geometry="[32.317, -64.737]"  
  data-popup="<h3>Bermuda</h3>"></span>
 <span data-id="4"
  data-geometry-type="Polygon"
  data-geometry="[[[25.775, -80.193], [18.465, -66.117],
   [32.317, -64.737], [25.775, -80.193]]]"></span>
</div>
`
]

let prevActions = []
const esriWorldImageryTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
const layerControl = L.control.layers({ "EsriWorldImagery": esriWorldImageryTile })
const point1 = L.marker([25.775, -80.193])
const point2 = L.marker([18.465, -66.117])
const point3 = L.marker([32.317, -64.737])
const polygon = L.polygon([[[25.775, -80.193], [18.465, -66.117], [32.317, -64.737], [25.775, -80.193]]])

function bindPopups() {
  point1.bindPopup("<h3>Miami</h3>")
  point2.bindPopup("<h3>San Juan</h3>")
  point3.bindPopup("<h3>Bermuda</h3>").openPopup()
}

function unbindPopups() {
  map.closePopup();
  point1.unbindPopup()
  point2.unbindPopup()
  point3.unbindPopup()
}

const nextActions = [
  () => { return () => { } },
  () => { map.setZoom(4); return () => map.setZoom(0) },
  () => { map.setView([26.79, -69.71]); return () => map.setView([0, 0]) },
  () => { layerControl.addTo(map); esriWorldImageryTile.addTo(map); return () => { map.removeControl(layerControl); map.removeLayer(esriWorldImageryTile) } },
  () => { point1.addTo(map); return () => { map.removeLayer(point1) } },
  () => { point2.addTo(map); point3.addTo(map); return () => { map.removeLayer(point2); map.removeLayer(point3) } },
  () => { bindPopups(); return () => { unbindPopups() } },
  () => { polygon.addTo(map);unbindPopups();  map.closePopup(); polygon.bindTooltip("😈"); return () => { map.removeLayer(polygon) } },
]


nextButton.addEventListener("click", nextStep)
prevButton.addEventListener('click', prevStep)

function nextStep() {
  if (currentStep >= nextActions.length ) {
    return;
  }
  shikiHighlighter.then(highlighter => {


    currentStep += 1
    const code = highlighter.codeToHtml(hyperleafletCodes[currentStep], { lang: 'html' })
    hyperleafletCodeContainer.innerHTML = code
    const prevAction = nextActions[currentStep]()
    prevActions.unshift(prevAction)

    const shikiContainer = hyperleafletCodeContainer.querySelector(".shiki")
    shikiContainer.scrollTop = shikiContainer.scrollHeight

  })
}

function prevStep() {
  if (currentStep <= 0) {
    return;
  }
  shikiHighlighter.then(highlighter => {
    currentStep -= 1
    const code = highlighter.codeToHtml(hyperleafletCodes[currentStep], { lang: 'html' })
    hyperleafletCodeContainer.innerHTML = code

    prevActions.shift()()

  })
}


document.addEventListener("DOMContentLoaded", function (event) {
  nextStep()

  shikiHighlighter.then(highlighter => {
    const code = highlighter.codeToHtml(importCode, { lang: 'html' })
    importCodeContainer.innerHTML = code
  })
});

