export function init() {
    displayProperties(currentProperties);
}

export function displayProperties(properties) {
    const listingsDiv = document.getElementById('listings');
    listingsDiv.innerHTML = properties.map(prop => `
        <div class="col-md-4">
            <div class="property-item">
                <h3>${prop.title}</h3>
                <p>Price: ${prop.price} ZMW</p>
                <p>Bedrooms: ${prop.bedrooms}</p>
                <p>Location: ${prop.location}</p>
            </div>
        </div>
    `).join('');
}