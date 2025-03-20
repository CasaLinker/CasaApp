const neighborhoods = [
    { name: 'Lusaka', description: 'The capital city, known for its vibrant culture and business opportunities.' },
    { name: 'Kitwe', description: 'A mining town with a rich history and growing real estate market.' },
    { name: 'Ndola', description: 'A commercial hub with a mix of urban and suburban living.' },
    { name: 'Livingstone', description: 'Home to Victoria Falls, a tourist hotspot with a rich cultural heritage.' },
    { name: 'Mongu', description: 'The capital of Western Province, known for its traditional Kuomboka ceremony.' },
    { name: 'Mansa', description: 'A peaceful town in Luapula Province, surrounded by beautiful lakes.' },
    { name: 'Kasama', description: 'A growing town in Northern Province, famous for its coffee plantations.' },
    { name: 'Choma', description: 'A farming town in Southern Province, known for its agricultural activities.' },
    { name: 'Mazabuka', description: 'Famous for sugar production, offering a mix of rural and urban living.' },
    { name: 'Kabwe', description: 'A historic mining town, now focusing on agriculture and education.' },
    { name: 'Solwezi', description: 'A rapidly developing town in North-Western Province, driven by mining.' },
    { name: 'Maamba', description: 'A small town in Southern Province, known for its coal mining operations.' }
];

export function init() {
    const list = document.getElementById('neighborhoods-list');
    neighborhoods.forEach(neighborhood => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${neighborhood.name}</h5>
                    <p class="card-text">${neighborhood.description}</p>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}