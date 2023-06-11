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

const actions = [
  {
    text: `/*style your map container like: */
<style>
#map {
  width: 100%
  height: 500px
}
</style>

<div id="map">
</div>
    `,
    extraHiglights: [8, 9],
    next: () => { return },
    previous: () => { }
  },
  {
    text: `<div id="map"
 data-zoom="4">
</div>
   `,
    extraHiglights: [1],
    next: () => map.setZoom(4),
    previous: () => map.setZoom(0)
  },
  {
    text: `<div id="map"
 data-zoom="4"
 data-center="[26.79, -69.71]">
</div>
   `,
    extraHiglights: [2],
    next: () => map.setView([26.79, -69.71]),
    previous: () => map.setView([0, 0]),
  },
  {
    text: `<div id="map"
 data-zoom="5"
 data-center="[26.79, -69.71]">
  <div
   data-tile="EsriWorldImagery">
  </div>
</div>
   `,
    extraHiglights: [3, 4, 5],
    next: () => { layerControl.addTo(map); esriWorldImageryTile.addTo(map) },
    previous: () => { map.removeControl(layerControl); map.removeLayer(esriWorldImageryTile) }
  },
  {
    text: `<div id="map"
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
    extraHiglights: [7, 8, 9, 10, 11, 12],
    next: () => point1.addTo(map),
    previous: () => map.removeLayer(point1)
  },
  {
    text: `<div id="map"
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
    extraHiglights: [12, 13, 14, 15, 16, 17],
    next: () => { point2.addTo(map); point3.addTo(map) },
    previous: () => { map.removeLayer(point2); map.removeLayer(point3) }
  },
  {
    text: `<div id="map"
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
    extraHiglights: [12, 16, 20],
    next: () => bindPopups(),
    previous: () => unbindPopups()
  },
  {
    text: `<div id="map"
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
   [32.317, -64.737], [25.775, -80.193]]]"
   data-tooltip="😈
   ></span>
</div>
`,
    extraHiglights: [21, 22, 23, 24, 25],
    next: () => { polygon.addTo(map); unbindPopups(); map.closePopup(); polygon.bindTooltip("😈") },
    previous: () => map.removeLayer(polygon)
  },
]


nextButton.addEventListener("click", () => step("next"))
prevButton.addEventListener('click', () => step("previous"))

function extraHiglight(lines, highlightList) {
  for (number of highlightList) {
    lines[number].classList.add("shiki__extra-higlight")
  }
}

function higlightExtraLines(container) {
  const lines = container.querySelectorAll(".line")
  extraHiglight(lines, actions[currentStep].extraHiglights)
}

function changeStepButtonsState() {
  console.log(currentStep)
  if (currentStep === 0) {
    prevButton.disabled = true
  }
  else if (currentStep === actions.length - 1) {
    nextButton.disabled = true
  }
  else {
    prevButton.disabled = false
    nextButton.disabled = false
  }
}


function step(to) {
  const stepDirection = to === "next" ? 1 : -1

  shikiHighlighter.then(highlighter => {
    currentStep += stepDirection
    const code = highlighter.codeToHtml(actions[currentStep].text, { lang: 'html' })
    hyperleafletCodeContainer.innerHTML = code

    actions[currentStep]["next"]()
    const shikiContainer = hyperleafletCodeContainer.querySelector(".shiki")
    higlightExtraLines(shikiContainer)
    shikiContainer.scrollTop = shikiContainer.scrollHeight
    changeStepButtonsState()
  })
}



document.addEventListener("DOMContentLoaded", function (event) {
  step("next")

  shikiHighlighter.then(highlighter => {
    const code = highlighter.codeToHtml(importCode, { lang: 'html' })
    importCodeContainer.innerHTML = code
  })
});

