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
