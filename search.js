export function init() {
    currentProperties = [
        { title: "Apartment 1", price: 5000, bedrooms: 2, location: "Lusaka", type: "apartment", amenities: ["pool"], lat: -15.3875, lng: 28.3228 },
        { title: "House 1", price: 8000, bedrooms: 3, location: "Lusaka", type: "house", amenities: ["gym", "parking"], lat: -15.4, lng: 28.3 }
    ];
    recommendProperties(firebase.auth().currentUser?.uid);
    // Initialize address search form listener
    initAddressSearch();
}

export function filterProperties() {
    const maxPrice = document.getElementById('price').value;
    const minBedrooms = document.getElementById('bedrooms').value;
    const location = document.getElementById('location').value;
    const propertyType = document.getElementById('property-type').value;
    const amenities = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    const maxDistance = document.getElementById('distance').value;

    const filtered = currentProperties.filter(property => {
        return (!maxPrice || property.price <= maxPrice) &&
               (!minBedrooms || property.bedrooms >= minBedrooms) &&
               (!location || property.location.toLowerCase().includes(location.toLowerCase())) &&
               (!propertyType || property.type === propertyType) &&
               (amenities.length === 0 || amenities.every(a => property.amenities.includes(a))) &&
               (!maxDistance || calculateDistance(property.lat, property.lng, -15.4167, 28.2833) <= maxDistance);
    });

    displayProperties(filtered);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function displayProperties(properties) {
    import('./listings.js').then(module => module.displayProperties(properties));
}

function recommendProperties(userId) {
    if (!userId) return;
    db.collection('users').doc(userId).get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            const favorites = userData.favorites || [];
            const recommended = currentProperties.filter(property => {
                return favorites.some(fav => fav.price === property.price || fav.location === property.location);
            });
            displayRecommended(recommended);
        }
    });
}

function displayRecommended(properties) {
    const recommendedDiv = document.getElementById('recommended-listings');
    recommendedDiv.innerHTML = properties.map(prop => `
        <div class="property-item">
            <h3>${prop.title}</h3>
            <p>Price: ${prop.price} ZMW</p>
            <p>Bedrooms: ${prop.bedrooms}</p>
            <p>Location: ${prop.location}</p>
        </div>
    `).join('');
}

// New: Initialize address search form listener
function initAddressSearch() {
    const addressForm = document.getElementById('address-search-form');
    if (addressForm) {
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const addressInput = document.getElementById('address-input');
            const address = addressInput.value;
            if (address) {
                geocodeAddress(address);
            }
        });
    }
}

// New: Geocode address and center map
function geocodeAddress(address) {
    fetch(`/.netlify/functions/getMapData?address=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK' && data.results[0]) {
                const { lat, lng } = data.results[0].geometry.location;
                // Assuming map is globally accessible via window.map
                if (window.map) {
                    window.map.setCenter({ lat, lng });
                } else {
                    console.error('Map not initialized');
                }
            } else {
                console.error('Geocoding failed:', data.status);
            }
        })
        .catch(error => console.error('Error fetching geocoding data:', error));
}