const ipAddress = document.getElementById("data-ip-address")
const location = document.getElementById("data-location")
const timezone = document.getElementById("data-timezone")
const isp = document.getElementById("data-isp")
const userInput = document.getElementById("user-input")
const searchBtn = document.getElementById("search-btn")
const mapImage = document.getElementById("map")
const warningP = document.getElementById("warning-p")

//initializes map
let map = L.map('map', {zoomControl: true}).setView([0, 0], 13)
// Move zoom control to bottom right (or left)
map.zoomControl.setPosition('bottomleft')
// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© OpenStreetMap contributors'}).addTo(map);

//search button event listener
searchBtn.addEventListener("click", function(){
    isValidIPv4(userInput.value)
    if (userInput.value === "" || isValidIPv4(userInput.value) === false){
       userInput.style.border = "2px solid red"
       warningP.style.display = "flex"}
    else{
         userInput.style.border = "none"
         warningP.style.display = "none"
         searchIpAddress()}
})

//function - checks whether the IP address is valid 
function isValidIPv4(ip) {
  const regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return regex.test(ip)
}

//function - obtains location info for IP address input by user
function searchIpAddress(){
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_fn7I1HEkeX1p9aJaCQx83yMs1RG1Q&ipAddress=${userInput.value}`)
    .then(res => res.json())
    .then(data => {
        ipAddress.textContent = data.ip, 
        location.textContent = `${data.location.region}, ${data.location.country}`,
        timezone.textContent = `UTC${data.location.timezone}`, 
        isp.textContent = data.isp,
        getMap(data)})
}

//function - gets a new map for every IP address
function getMap(data){
    let latitude = data.location.lat
    let longitude = data.location.lng
    // Sets the view to a new location upon search button click
    map.panTo([latitude, longitude])
    // Adds a marker with a popup
    L.marker([latitude, longitude]).addTo(map)
    .bindPopup('General location of IP address')
    .openPopup()
    }
    
searchIpAddress()