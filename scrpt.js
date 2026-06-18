body {
    margin: 0;
    font-family: Arial;
    transition: 0.5s;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    background: linear-gradient(120deg, #74ebd5, #acb6e5);
}

.dark {
    background: #0f172a;
    color: white;
}

.top-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.container {
    margin-top: 50px;
    padding: 30px;
    width: 320px;
    border-radius: 20px;

    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(15px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);

    text-align: center;
    animation: fadeIn 0.8s ease-in;
}

input {
    width: 80%;
    padding: 12px;
    border-radius: 10px;
    border: none;
    outline: none;
}

button {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background: #00c6ff;
    color: white;
    transition: 0.3s;
}

button:hover {
    transform: scale(1.05);
}

#result {
    margin-top: 20px;
    font-size: 18px;
}

@keyframes fadeIn {
    from {opacity: 0; transform: translateY(20px);}
    to {opacity: 1; transform: translateY(0);}
}
// Import the Firebase functions you need from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. YOUR FIREBASE CONFIGURATION (Paste your real keys from Step 1 here)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase and Firestore Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; 

// 2. Fetch Weather Logic
async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        updateUI(data);
        
        // Save this search to our Cloud Database automatically!
        saveCityToDatabase(city);
    } catch (error) {
        alert(error.message);
    }
}

// 3. Database Write operation: Save a city
async function saveCityToDatabase(cityName) {
    try {
        // This creates a collection named "searched_cities" and stores the city name
        await addDoc(collection(db, "searched_cities"), {
            name: cityName,
            timestamp: new Date()
        });
        // Refresh the UI list after saving
        loadSavedCities();
    } catch (e) {
        console.error("Error adding document to database: ", e);
    }
}

// 4. Database Read operation: Fetch and display cities
async function loadSavedCities() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = ''; // Clear old items

    try {
        const querySnapshot = await getDocs(collection(db, "searched_cities"));
        querySnapshot.forEach((doc) => {
            const cityData = doc.data();
            
            // Create a clickable button/chip for each saved city
            const cityChip = document.createElement('button');
            cityChip.className = 'city-chip';
            cityChip.innerText = cityData.name;
            cityChip.onclick = () => getWeatherData(cityData.name);
            
            favoritesList.appendChild(cityChip);
        });
    } catch (e) {
        console.error("Error reading database records: ", e);
    }
}

// Event Listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) getWeatherData(city);
});

// Load the saved database items instantly when the page opens
window.addEventListener('DOMContentLoaded', loadSavedCities);
