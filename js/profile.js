export function init() {
    // Load existing profile data if needed
}

export function saveProfile() {
    const userId = firebase.auth().currentUser.uid;
    const name = document.getElementById('profile-name').value;
    const age = document.getElementById('profile-age').value;
    const preferences = document.getElementById('profile-preferences').value;
    const bio = document.getElementById('profile-bio').value;
    const contact = document.getElementById('profile-contact').value;

    const file = document.getElementById('profile-picture').files[0];
    if (file) {
        const storageRef = firebase.storage().ref(`profile_pictures/${userId}`);
        storageRef.put(file).then(() => {
            storageRef.getDownloadURL().then(url => {
                db.collection('users').doc(userId).set({
                    name, age, preferences, bio, contact, profilePicture: url
                }, { merge: true }).then(() => alert('Profile saved!'));
            });
        });
    } else {
        db.collection('users').doc(userId).set({
            name, age, preferences, bio, contact
        }, { merge: true }).then(() => alert('Profile saved!'));
    }
}