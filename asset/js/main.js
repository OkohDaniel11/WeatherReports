// ========== LIVE LOCATION & DATE/TIME ==========
const cityNameEl = document.getElementById('cityName');
const dateTimeEl = document.getElementById('dateTime');

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    dateTimeEl.textContent = now.toLocaleDateString('en-US', options);
}

// Update date/time immediately and every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Function to fetch city name from coordinates using OpenStreetMap
async function getCityFromCoordinates(latitude, longitude) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village || 'Unknown Location';
        return city;
    } catch (error) {
        console.error('Error fetching city:', error);
        return 'Location Unavailable';
    }
}

// Get user's live location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const city = await getCityFromCoordinates(latitude, longitude);
                cityNameEl.textContent = city;
            },
            (error) => {
                console.error('Geolocation error:', error);
                cityNameEl.textContent = 'Location Permission Denied';
            }
        );
    } else {
        cityNameEl.textContent = 'Geolocation Not Supported';
    }
}

// Get location on page load
getLocation();

// ========== SEARCH BAR ANIMATION ==========
const searchBtn = document.getElementById('searchBtn');
const searchContainer = document.querySelector('.search-container');
const cityInput = document.getElementById('cityInput');

// Toggle search bar expansion on search button click
searchBtn.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        cityInput.focus();
    }
});

// Close search bar when clicking outside - only if input is empty
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
        // Only close if the input field is empty
        if (cityInput.value.trim() === '') {
            searchContainer.classList.remove('active');
        }
    }
});

// Optional: Search on Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = cityInput.value;
        console.log('Searching for:', cityName);
        // Add your search logic here
    }
});
