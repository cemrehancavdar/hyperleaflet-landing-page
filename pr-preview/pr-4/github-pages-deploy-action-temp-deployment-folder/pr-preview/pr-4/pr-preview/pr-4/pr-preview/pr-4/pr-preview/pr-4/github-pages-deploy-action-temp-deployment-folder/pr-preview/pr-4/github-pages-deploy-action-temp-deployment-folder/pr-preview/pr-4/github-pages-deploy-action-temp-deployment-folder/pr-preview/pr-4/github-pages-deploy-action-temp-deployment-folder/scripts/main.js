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
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"
<script src="https://unpkg.com/leaflet/dist/leaflet.js">

<!-- import hyperleaflet -->
<script defer src="https://www.unpkg.com/hyperleaflet@0.2.3"></script>
`



const shikiHighlighter = shiki.getHighlighter({ theme: 'nord', langs: ['html', 'javascript'] })
let currentStep = -1



const hyperleafletCodes = [
`<div id="map"></div>`,
`<div id="map"
data-zoom="5">
</div>
`,
`<div id="map"
data-zoom="5"
data-center="39.73, 39.99">
</div>
`,
`
<div id="map"
 data-zoom="5"
 data-center="39.73, 39.99">
  <div
    data-tile="EsriWorldImagery"
  ></div>
</div>
`
]

let prevActions = []
const esriWorldImageryTile =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


const nextActions = [
	() => { return () => { } },
	() => { map.setZoom(5); return () => map.setZoom(0) },
	() => { map.setView([39.73, 39.99]); return () => map.setView([0, 0]) },
	() => {esriWorldImageryTile.addTo(map); return () => map.removeLayer(esriWorldImageryTile)  }
]


nextButton.addEventListener("click", nextStep)
prevButton.addEventListener('click', prevStep)

function nextStep() {
	shikiHighlighter.then(highlighter => {
		currentStep += 1
		const code = highlighter.codeToHtml(hyperleafletCodes[currentStep], { lang: 'html' })
		hyperleafletCodeContainer.innerHTML = code
		const prevAction = nextActions[currentStep]()
		prevActions.unshift(prevAction)
	})
}

function prevStep() {
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

