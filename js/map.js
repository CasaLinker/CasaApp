let map;

export function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -15.3875, lng: 28.3228 }, // Lusaka coordinates
        zoom: 12
    });
    window.map = map; // Make the map instance globally accessible
    addMarkers(currentProperties);
    enableDrawing();
}

function addMarkers(properties) {
    const markerCluster = new MarkerClusterer(map, [], {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    properties.forEach(property => {
        const marker = new google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map: map,
            title: property.title
        });
        markerCluster.addMarker(marker);
    });
}

function enableDrawing() {
    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        polygonOptions: {
            fillColor: '#ffff00',
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1
        }
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        const path = polygon.getPath();
        const bounds = new google.maps.LatLngBounds();
        path.forEach(point => bounds.extend(point));

        const filtered = currentProperties.filter(property => {
            const position = new google.maps.LatLng(property.lat, property.lng);
            return google.maps.geometry.poly.containsLocation(position, polygon);
        });

        import('./listings.js').then(module => module.displayProperties(filtered));
    });
}
