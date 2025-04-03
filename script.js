// Dades de països i capitals de la UE

const euCountries = {
    'Àustria': 'Viena',
    'Bèlgica': 'Brussel·les',
    'Bulgària': 'Sofia',
    'Croàcia': 'Zagreb',
    'Xipre': 'Nicòsia',
    'República Txeca': 'Praga',
    'Dinamarca': 'Copenhaguen',
    'Estònia': 'Tallinn',
    'Finlàndia': 'Hèlsinki',
    'França': 'París',
    'Alemanya': 'Berlín',
    'Grècia': 'Atenes',
    'Hongria': 'Budapest',
    'Irlanda': 'Dublín',
    'Itàlia': 'Roma',
    'Letònia': 'Riga',
    'Lituània': 'Vílnius',
    'Luxemburg': 'Ciutat de Luxemburg',
    'Malta': 'La Valletta',
    'Països Baixos': 'Amsterdam',
    'Polònia': 'Varsòvia',
    'Portugal': 'Lisboa',
    'Romania': 'Bucarest',
    'Eslovàquia': 'Bratislava',
    'Eslovènia': 'Ljubljana',
    'Espanya': 'Madrid',
    'Suècia': 'Estocolm'
};

// Variables del joc
let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let totalQuestions = Object.keys(euCountries).length * 2; // Cada país té 2 preguntes (país i capital)

// Elements DOM
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-btn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const progressBar = document.getElementById('progress-bar');
const questionCounterElement = document.getElementById('question-counter');
const finalScoreElement = document.getElementById('final-score');
const finalTotalElement = document.getElementById('final-total');
const finalPercentageElement = document.getElementById('final-percentage');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

// Funció per generar una pregunta sobre un país
function generateCountryQuestion(country) {
    const questions = [
        `Quin país de la UE comença amb la lletra '${country[0]}'?`,
        `Quin estat membre de la UE té com a capital ${euCountries[country]}?`,
        `Pots anomenar el país de la UE on es troba ${euCountries[country]}?`,
        `Quin país de la Unió Europea té ${euCountries[country]} com la seva capital?`
    ];
    return questions[Math.floor(Math.random() * questions.length)];
}

// Funció per barrejar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Funció per generar totes les preguntes i barrejar-les
function generateAllQuestions() {
    const allQuestions = [];
    const countries = Object.keys(euCountries);
    
    // Crear preguntes per a cada país
    countries.forEach(country => {
        // Pregunta sobre el país
        allQuestions.push({
            type: 'country',
            country: country,
            text: generateCountryQuestion(country),
            correctAnswer: country.toLowerCase()
        });
        
        // Pregunta sobre la capital
        allQuestions.push({
            type: 'capital',
            country: country,
            text: `Quina és la capital de ${country}?`,
            correctAnswer: euCountries[country].toLowerCase()
        });
    });
    
    return shuffleArray(allQuestions);
}

// Funció per iniciar el joc
function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    questions = generateAllQuestions();
    
    // Actualitzar la interfície
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = totalQuestions;
    progressBar.style.width = '0%';
    questionCounterElement.textContent = `Pregunta 1 de ${totalQuestions}`;
    
    // Mostrar la pantalla de joc
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    gameOverScreen.style.display = 'none';
    
    // Mostrar la primera pregunta
    showQuestion();
}

// Funció per mostrar una pregunta
function showQuestion() {
    // Verificar si el joc ha finalitzat
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // Netejar el camp de resposta i el feedback
    answerInput.value = '';
    feedbackElement.style.display = 'none';
    
    // Habilitar el camp de resposta i el botó
    answerInput.disabled = false;
    submitButton.disabled = false;
    answerInput.focus();
    
    // Actualitzar el comptador de preguntes
    questionCounterElement.textContent = `Pregunta ${currentQuestionIndex + 1} de ${totalQuestions}`;
    
    // Mostrar la pregunta amb bandera si showFlag és true
    if (currentQuestion.showFlag) {
        // Crear l'element HTML per a la bandera
        const countryCode = countryFlags[currentQuestion.country];
        const flagUrl = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
        questionElement.innerHTML = `<div class="question-with-flag">
            <img src="${flagUrl}" alt="Bandera de ${currentQuestion.country}" class="country-flag">
            <span>${currentQuestion.text}</span>
        </div>`;
    } else {
        // Si no cal mostrar bandera, mostrar només el text
        questionElement.textContent = currentQuestion.text;
    }
}

// Funció per normalitzar text (eliminar accents)
function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Funció per verificar la resposta
function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = normalizeText(answerInput.value.trim().toLowerCase());
    const correctAnswer = normalizeText(currentQuestion.correctAnswer);
    
    // Verificar si la resposta és correcta
    if (userAnswer === correctAnswer) {
        // Resposta correcta
        feedbackElement.textContent = 'Correcte!';
        feedbackElement.className = 'feedback correct';
        score++;
    } else {
        // Resposta incorrecta
        if (currentQuestion.type === 'country') {
            feedbackElement.textContent = `Incorrecte. La resposta correcta és ${currentQuestion.country}.`;
        } else {
            feedbackElement.textContent = `Incorrecte. La capital de ${currentQuestion.country} és ${euCountries[currentQuestion.country]}.`;
        }
        feedbackElement.className = 'feedback incorrect';
    }
    
    // Mostrar el feedback
    feedbackElement.style.display = 'block';
    
    // Actualitzar la puntuació
    scoreElement.textContent = score;
    
    // Deshabilitar el camp de resposta i el botó
    answerInput.disabled = true;
    submitButton.disabled = true;
    
    // Programar la següent pregunta o finalitzar el joc
    setTimeout(() => {
        // Passar a la següent pregunta
        currentQuestionIndex++;
        
        // Actualitzar la barra de progrés
        const progress = (currentQuestionIndex / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Actualitzar el comptador de preguntes
        questionCounterElement.textContent = `Pregunta ${currentQuestionIndex + 1} de ${totalQuestions}`;
        
        // Mostrar la següent pregunta
        showQuestion();
    }, 2000); // Esperar 2 segons abans de mostrar la següent pregunta
}

// Funció per finalitzar el joc
function endGame() {
    // Calcular el percentatge final
    const finalPercentage = (score / totalQuestions) * 100;
    
    // Actualitzar la pantalla de fi de joc
    finalScoreElement.textContent = score;
    finalTotalElement.textContent = totalQuestions;
    finalPercentageElement.textContent = finalPercentage.toFixed(1);
    
    // Mostrar la pantalla de fi de joc
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'block';
}

// Event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

submitButton.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Inicialitzar els elements DOM després que la pàgina s'hagi carregat
document.addEventListener('DOMContentLoaded', () => {
    // Reinicialitzar les referències als elements DOM
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-btn');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const progressBar = document.getElementById('progress-bar');
    const questionCounterElement = document.getElementById('question-counter');
    const finalScoreElement = document.getElementById('final-score');
    const finalTotalElement = document.getElementById('final-total');
    const finalPercentageElement = document.getElementById('final-percentage');
    const startButton = document.getElementById('start-btn');
    const restartButton = document.getElementById('restart-btn');
});