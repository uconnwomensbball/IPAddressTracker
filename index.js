const ipAddress = document.getElementById("data-ip-address")
const location = document.getElementById("data-location")
const timezone = document.getElementById("data-timezone")
const isp = document.getElementById("data-isp")
const userInput = document.getElementById("user-input")
const searchBtn = document.getElementById("search-btn")
const mapImage = document.getElementById("map")
const warningText = document.getElementById("warning-text")

//initializes map
let map = L.map('map', {zoomControl: true}).setView([0, 0], 13)
// Move zoom control to bottom right (or left)
map.zoomControl.setPosition('bottomleft')
// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© OpenStreetMap contributors'}).addTo(map);

//search button event listener
searchBtn.addEventListener("click", function(){
  
    if (isValidIP(userInput.value)){
        searchIpAddress()
        userInput.style.border = "none"
        warningText.style.display = "none"
    }
    else {
        userInput.style.border = "2px solid red"
        warningText.style.display = "flex"}
    })

//function - checks whether the IP address is valid 
function isValidIP(input) {
    const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/
    return ipRegex.test(input)
}

//function - obtains location info for IP address input by user
function searchIpAddress(){
    fetch(`https://api.ipgeolocation.io/v2/ipgeo?apiKey=aeeaa58e938c4a71905f6775bcb52080&ip=${userInput.value}`)
    .then(res => res.json())
    .then(data => {
        ipAddress.textContent = data.ip, 
        location.textContent = `${data.location.district}, ${data.location.state_prov}, ${data.location.country_code3}`,
        getMap(data)})
}

//function - gets a new map for every IP address
function getMap(data){
    let latitude = data.location.latitude
    let longitude = data.location.longitude
    // Sets the view to a new location upon search button click
    map.panTo([latitude, longitude])
    // Adds a marker with a popup
    L.marker([latitude, longitude]).addTo(map)
    .bindPopup('General location of IP address')
    .openPopup()
    }
    
searchIpAddress()
