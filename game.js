// Game State Management
const gameState = {
    user: null,
    currentMode: null,
    currentQuestion: 0,
    score: 0,
    streak: 0,
    combo: 0,
    dailyStreak: 0,
    totalXP: 0,
    level: 1,
    achievements: [],
    completedChallenges: [],
    statesVisited: [],
    lastPlayed: null
};

// User Titles by Level
const userTitles = [
    'Rookie Explorer',
    'State Scout', 
    'Geography Student',
    'Map Navigator',
    'State Scholar',
    'Regional Expert',
    'Geography Master',
    'State Champion',
    'USA Expert',
    'Geography Legend'
];

// States Data
const statesData = {
    'Alabama': { capital: 'Montgomery', nickname: 'The Heart of Dixie', admitted: '1819', area: 52420, population: '5.0M', fact: 'Home to the U.S. Space & Rocket Center' },
    'Alaska': { capital: 'Juneau', nickname: 'The Last Frontier', admitted: '1959', area: 665384, population: '731K', fact: 'Largest state by area, has 3 million lakes' },
    'Arizona': { capital: 'Phoenix', nickname: 'The Grand Canyon State', admitted: '1912', area: 113990, population: '7.3M', fact: 'Home to the Grand Canyon' },
    'Arkansas': { capital: 'Little Rock', nickname: 'The Natural State', admitted: '1836', area: 53179, population: '3.0M', fact: 'Only place where diamonds are mined and public can search' },
    'California': { capital: 'Sacramento', nickname: 'The Golden State', admitted: '1850', area: 163695, population: '39.5M', fact: 'Economy would be 5th largest in the world if independent' },
    'Colorado': { capital: 'Denver', nickname: 'The Centennial State', admitted: '1876', area: 104094, population: '5.8M', fact: 'Has the highest elevation of any state' },
    'Connecticut': { capital: 'Hartford', nickname: 'The Constitution State', admitted: '1788', area: 5543, population: '3.6M', fact: 'Home to the first hamburger and first phone book' },
    'Delaware': { capital: 'Dover', nickname: 'The First State', admitted: '1787', area: 2489, population: '990K', fact: 'First state to ratify the Constitution' },
    'Florida': { capital: 'Tallahassee', nickname: 'The Sunshine State', admitted: '1845', area: 65758, population: '21.5M', fact: 'Only state with two rivers with the same name' },
    'Georgia': { capital: 'Atlanta', nickname: 'The Peach State', admitted: '1788', area: 59425, population: '10.7M', fact: 'Birthplace of Coca-Cola' },
    'Hawaii': { capital: 'Honolulu', nickname: 'The Aloha State', admitted: '1959', area: 10932, population: '1.5M', fact: 'Only U.S. state made up entirely of islands' },
    'Idaho': { capital: 'Boise', nickname: 'The Gem State', admitted: '1890', area: 83569, population: '1.8M', fact: 'Produces more potatoes than any other state' },
    'Illinois': { capital: 'Springfield', nickname: 'The Prairie State', admitted: '1818', area: 57914, population: '12.7M', fact: 'Has more personalized license plates than any state' },
    'Indiana': { capital: 'Indianapolis', nickname: 'The Hoosier State', admitted: '1816', area: 36420, population: '6.8M', fact: 'Home to the Indianapolis 500' },
    'Iowa': { capital: 'Des Moines', nickname: 'The Hawkeye State', admitted: '1846', area: 56273, population: '3.2M', fact: 'Produces the most corn in the U.S.' },
    'Kansas': { capital: 'Topeka', nickname: 'The Sunflower State', admitted: '1861', area: 82278, population: '2.9M', fact: 'Has more tornadoes per area than any other state' },
    'Kentucky': { capital: 'Frankfort', nickname: 'The Bluegrass State', admitted: '1792', area: 40408, population: '4.5M', fact: 'Produces 95% of the world\'s bourbon' },
    'Louisiana': { capital: 'Baton Rouge', nickname: 'The Pelican State', admitted: '1812', area: 52378, population: '4.6M', fact: 'Has parishes instead of counties' },
    'Maine': { capital: 'Augusta', nickname: 'The Pine Tree State', admitted: '1820', area: 35380, population: '1.4M', fact: 'Has more coastline than California' },
    'Maryland': { capital: 'Annapolis', nickname: 'The Old Line State', admitted: '1788', area: 12406, population: '6.2M', fact: 'State sport is jousting' },
    'Massachusetts': { capital: 'Boston', nickname: 'The Bay State', admitted: '1788', area: 10554, population: '7.0M', fact: 'Home to America\'s first public park' },
    'Michigan': { capital: 'Lansing', nickname: 'The Great Lakes State', admitted: '1837', area: 96714, population: '10.1M', fact: 'Touches four of the five Great Lakes' },
    'Minnesota': { capital: 'Saint Paul', nickname: 'Land of 10,000 Lakes', admitted: '1858', area: 86936, population: '5.7M', fact: 'Actually has 11,842 lakes' },
    'Mississippi': { capital: 'Jackson', nickname: 'The Magnolia State', admitted: '1817', area: 48432, population: '3.0M', fact: 'Root beer was invented here' },
    'Missouri': { capital: 'Jefferson City', nickname: 'The Show-Me State', admitted: '1821', area: 69707, population: '6.2M', fact: 'Has more than 6,000 caves' },
    'Montana': { capital: 'Helena', nickname: 'The Treasure State', admitted: '1889', area: 147040, population: '1.1M', fact: 'Three times as many cows as people' },
    'Nebraska': { capital: 'Lincoln', nickname: 'The Cornhusker State', admitted: '1867', area: 77348, population: '2.0M', fact: 'Has the largest hand-planted forest in the U.S.' },
    'Nevada': { capital: 'Carson City', nickname: 'The Silver State', admitted: '1864', area: 110572, population: '3.1M', fact: 'Most mountainous state' },
    'New Hampshire': { capital: 'Concord', nickname: 'The Granite State', admitted: '1788', area: 9349, population: '1.4M', fact: 'Has the highest wind speed ever recorded' },
    'New Jersey': { capital: 'Trenton', nickname: 'The Garden State', admitted: '1787', area: 8723, population: '9.3M', fact: 'Has the most diners in the world' },
    'New Mexico': { capital: 'Santa Fe', nickname: 'Land of Enchantment', admitted: '1912', area: 121590, population: '2.1M', fact: 'Has more PhDs per capita than any other state' },
    'New York': { capital: 'Albany', nickname: 'The Empire State', admitted: '1788', area: 54555, population: '20.2M', fact: 'Home to the oldest state park in the U.S.' },
    'North Carolina': { capital: 'Raleigh', nickname: 'The Tar Heel State', admitted: '1789', area: 53819, population: '10.4M', fact: 'First in flight - Wright Brothers' },
    'North Dakota': { capital: 'Bismarck', nickname: 'The Peace Garden State', admitted: '1889', area: 70698, population: '779K', fact: 'Grows more sunflowers than any other state' },
    'Ohio': { capital: 'Columbus', nickname: 'The Buckeye State', admitted: '1803', area: 44826, population: '11.8M', fact: 'Birthplace of more presidents than any other state' },
    'Oklahoma': { capital: 'Oklahoma City', nickname: 'The Sooner State', admitted: '1907', area: 69899, population: '4.0M', fact: 'Has more man-made lakes than any other state' },
    'Oregon': { capital: 'Salem', nickname: 'The Beaver State', admitted: '1859', area: 98379, population: '4.2M', fact: 'Has the deepest lake in the U.S. (Crater Lake)' },
    'Pennsylvania': { capital: 'Harrisburg', nickname: 'The Keystone State', admitted: '1787', area: 46054, population: '13.0M', fact: 'Liberty Bell and birthplace of America' },
    'Rhode Island': { capital: 'Providence', nickname: 'The Ocean State', admitted: '1790', area: 1545, population: '1.1M', fact: 'Smallest state but has the longest official name' },
    'South Carolina': { capital: 'Columbia', nickname: 'The Palmetto State', admitted: '1788', area: 32020, population: '5.1M', fact: 'First state to secede from the Union' },
    'South Dakota': { capital: 'Pierre', nickname: 'Mount Rushmore State', admitted: '1889', area: 77116, population: '887K', fact: 'Has more miles of shoreline than Florida' },
    'Tennessee': { capital: 'Nashville', nickname: 'The Volunteer State', admitted: '1796', area: 42144, population: '6.9M', fact: 'Birthplace of country music' },
    'Texas': { capital: 'Austin', nickname: 'The Lone Star State', admitted: '1845', area: 268596, population: '29.1M', fact: 'Larger than any country in Europe' },
    'Utah': { capital: 'Salt Lake City', nickname: 'The Beehive State', admitted: '1896', area: 84897, population: '3.3M', fact: 'Has the greatest snow on earth' },
    'Vermont': { capital: 'Montpelier', nickname: 'The Green Mountain State', admitted: '1791', area: 9616, population: '643K', fact: 'Produces the most maple syrup in the U.S.' },
    'Virginia': { capital: 'Richmond', nickname: 'The Old Dominion', admitted: '1788', area: 42775, population: '8.6M', fact: 'Birthplace of 8 U.S. presidents' },
    'Washington': { capital: 'Olympia', nickname: 'The Evergreen State', admitted: '1889', area: 71362, population: '7.7M', fact: 'Produces the most apples in the U.S.' },
    'West Virginia': { capital: 'Charleston', nickname: 'The Mountain State', admitted: '1863', area: 24230, population: '1.8M', fact: 'Has the oldest population of any state' },
    'Wisconsin': { capital: 'Madison', nickname: 'The Badger State', admitted: '1848', area: 65496, population: '5.9M', fact: 'Produces the most cheese in the U.S.' },
    'Wyoming': { capital: 'Cheyenne', nickname: 'The Equality State', admitted: '1890', area: 97813, population: '576K', fact: 'Least populous state but has Yellowstone' }
};

// Achievements System
const achievements = {
    firstSteps: { id: 'firstSteps', name: 'First Steps', icon: '👣', description: 'Complete your first quiz', xp: 25, unlocked: false },
    quizMaster: { id: 'quizMaster', name: 'Quiz Master', icon: '🎯', description: 'Score 100 points in a single quiz', xp: 50, unlocked: false },
    explorer: { id: 'explorer', name: 'Explorer', icon: '🗺️', description: 'Learn about 25 different states', xp: 75, unlocked: false },
    streakHero: { id: 'streakHero', name: 'Streak Hero', icon: '🔥', description: 'Achieve a 10-answer streak', xp: 100, unlocked: false },
    speedDemon: { id: 'speedDemon', name: 'Speed Demon', icon: '⚡', description: 'Complete speed round under 30 seconds', xp: 60, unlocked: false },
    perfectScore: { id: 'perfectScore', name: 'Perfect Score', icon: '💯', description: 'Get 100% accuracy in a quiz', xp: 150, unlocked: false },
    stateExpert: { id: 'stateExpert', name: 'State Expert', icon: '🌟', description: 'Learn about all 50 states', xp: 200, unlocked: false },
    dailyWarrior: { id: 'dailyWarrior', name: 'Daily Warrior', icon: '📅', description: 'Complete all daily challenges', xp: 100, unlocked: false },
    legend: { id: 'legend', name: 'Legend', icon: '👑', description: 'Reach level 10', xp: 500, unlocked: false }
};

// Initialize Avatar Selection
document.addEventListener('DOMContentLoaded', () => {
    // Avatar selection
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Load existing users for family selection
    loadExistingUsers();
    
    // Load saved user data
    loadUserData();
    
    // Generate mock leaderboard
    generateLeaderboard('daily');
    
    // Quick login for testing - check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('quickstart') === 'true') {
        // Auto-login with test user
        gameState.user = {
            username: 'TestUser',
            avatar: '🎮',
            level: 1,
            totalXP: 0,
            achievements: [],
            joinDate: new Date().toISOString()
        };
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainGame').style.display = 'block';
        updateUserDisplay();
    }
});

// Start Game
function startGame() {
    const username = document.getElementById('usernameInput').value.trim();
    if (!username) {
        alert('Please enter a username!');
        return;
    }

    const selectedAvatar = document.querySelector('.avatar-option.selected').dataset.avatar;
    
    // Create or load user
    gameState.user = {
        username: username,
        avatar: selectedAvatar,
        level: gameState.level || 1,
        totalXP: gameState.totalXP || 0,
        achievements: gameState.achievements || [],
        joinDate: new Date().toISOString()
    };

    // Save user data
    saveUserData();

    // Update UI
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainGame').style.display = 'block';
    updateUserDisplay();
    checkDailyStreak();
}

// Update User Display
function updateUserDisplay() {
    document.getElementById('userAvatar').textContent = gameState.user.avatar;
    document.getElementById('displayUsername').textContent = gameState.user.username;
    document.getElementById('userLevel').textContent = gameState.level;
    document.getElementById('userTitle').textContent = userTitles[Math.min(gameState.level - 1, userTitles.length - 1)];
    document.getElementById('totalXP').textContent = gameState.totalXP + ' XP';
    document.getElementById('streakValue').textContent = gameState.dailyStreak;
    document.getElementById('achievementCount').textContent = gameState.achievements.length;
    
    // Update XP bar
    const xpForNextLevel = gameState.level * 100;
    const currentLevelXP = gameState.totalXP % xpForNextLevel;
    const xpPercentage = (currentLevelXP / xpForNextLevel) * 100;
    document.getElementById('xpFill').style.width = xpPercentage + '%';
}

// Play Game Mode
function playMode(mode) {
    gameState.currentMode = mode;
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.streak = 0;
    gameState.combo = 0;

    const gameArea = document.getElementById('gameArea');
    gameArea.classList.add('active');
    gameArea.style.display = 'block';

    switch(mode) {
        case 'quiz':
            startCapitalQuiz();
            break;
        case 'speed':
            startSpeedRound();
            break;
        case 'size':
            startSizeChallenge();
            break;
        case 'facts':
            startFactExplorer();
            break;
    }
}

// Capital Quiz Mode
let quizQuestions = [];
let currentQuizQuestion = 0;

function startCapitalQuiz() {
    quizQuestions = generateQuizQuestions(10);
    currentQuizQuestion = 0;
    showQuizQuestion();
}

function generateQuizQuestions(count) {
    const states = Object.keys(statesData);
    const questions = [];
    const usedStates = [];
    
    for (let i = 0; i < count; i++) {
        let state;
        do {
            state = states[Math.floor(Math.random() * states.length)];
        } while (usedStates.includes(state));
        
        usedStates.push(state);
        
        const correctAnswer = statesData[state].capital;
        const options = [correctAnswer];
        
        while (options.length < 4) {
            const randomState = states[Math.floor(Math.random() * states.length)];
            const randomCapital = statesData[randomState].capital;
            if (!options.includes(randomCapital)) {
                options.push(randomCapital);
            }
        }
        
        questions.push({
            state: state,
            correct: correctAnswer,
            options: options.sort(() => Math.random() - 0.5)
        });
    }
    
    return questions;
}

function showQuizQuestion() {
    if (currentQuizQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }

    const question = quizQuestions[currentQuizQuestion];
    const gameArea = document.getElementById('gameArea');
    
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 1.2em; color: #667eea; margin-bottom: 10px;">
                Question ${currentQuizQuestion + 1} of ${quizQuestions.length}
            </div>
            <div style="font-size: 1.8em; margin-bottom: 30px;">
                What is the capital of <span style="color: #667eea; font-weight: bold;">${question.state}</span>?
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; max-width: 600px; margin: 0 auto;">
                ${question.options.map((option, index) => `
                    <button id="quizBtn${index}" class="quiz-option-btn"
                            style="padding: 25px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                   color: white; border: none; border-radius: 10px; font-size: 1.2em; 
                                   cursor: pointer; transition: all 0.3s ease; min-height: 80px;
                                   display: flex; align-items: center; justify-content: center;">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div style="margin-top: 30px; display: flex; justify-content: space-around; max-width: 400px; margin: 30px auto;">
                <div style="text-align: center;">
                    <div style="font-size: 2em; color: #667eea; font-weight: bold;">${gameState.score}</div>
                    <div style="color: #666;">Score</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2em; color: #f093fb; font-weight: bold;">${gameState.streak}</div>
                    <div style="color: #666;">Streak</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2em; color: #38ef7d; font-weight: bold;">${gameState.combo}x</div>
                    <div style="color: #666;">Combo</div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners after HTML is rendered
    setTimeout(() => {
        question.options.forEach((option, index) => {
            const btn = document.getElementById(`quizBtn${index}`);
            if (btn) {
                btn.onclick = () => checkQuizAnswer(option, question.correct);
            }
        });
    }, 10);
}

function checkQuizAnswer(selected, correct) {
    // Disable all buttons immediately
    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.7';
        btn.style.cursor = 'not-allowed';
    });
    
    const isCorrect = selected === correct;
    
    // Show correct/incorrect feedback
    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
        if (btn.textContent.trim() === correct) {
            btn.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
        } else if (btn.textContent.trim() === selected && !isCorrect) {
            btn.style.background = 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)';
        }
    });
    
    if (isCorrect) {
        gameState.streak++;
        gameState.combo = Math.min(gameState.combo + 1, 5);
        const points = 10 * gameState.combo;
        gameState.score += points;
        addXP(points);
        
        if (gameState.combo >= 3) {
            showCombo(gameState.combo);
        }
        
        // Check achievements
        if (gameState.streak === 10) {
            unlockAchievement('streakHero');
        }
    } else {
        gameState.streak = 0;
        gameState.combo = 0;
    }
    
    currentQuizQuestion++;
    
    setTimeout(() => {
        showQuizQuestion();
    }, 1500);
}

function endQuiz() {
    const accuracy = Math.round((gameState.score / (quizQuestions.length * 10)) * 100);
    
    if (accuracy === 100) {
        unlockAchievement('perfectScore');
    }
    
    if (gameState.score >= 100) {
        unlockAchievement('quizMaster');
    }
    
    if (!gameState.achievements.includes('firstSteps')) {
        unlockAchievement('firstSteps');
    }
    
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2 style="color: #667eea; margin-bottom: 20px;">Quiz Complete!</h2>
            <div style="font-size: 3em; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 20px 0;">
                ${gameState.score} Points
            </div>
            <div style="font-size: 1.2em; color: #666; margin: 10px 0;">Accuracy: ${accuracy}%</div>
            <button onclick="playMode('quiz')" 
                    style="padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           color: white; border: none; border-radius: 30px; font-size: 1.1em; 
                           cursor: pointer; margin-top: 20px;">
                Play Again
            </button>
        </div>
    `;
}

// Speed Round Mode
let speedTimer;
let speedTimeLeft;

function startSpeedRound() {
    speedTimeLeft = 60;
    gameState.score = 0;
    showSpeedQuestion();
    startSpeedTimer();
}

function startSpeedTimer() {
    speedTimer = setInterval(() => {
        speedTimeLeft--;
        updateSpeedTimer();
        
        if (speedTimeLeft <= 0) {
            clearInterval(speedTimer);
            endSpeedRound();
        }
    }, 1000);
}

function updateSpeedTimer() {
    const timerDisplay = document.getElementById('speedTimer');
    if (timerDisplay) {
        timerDisplay.textContent = speedTimeLeft;
        if (speedTimeLeft <= 10) {
            timerDisplay.style.color = '#f45c43';
        }
    }
}

function showSpeedQuestion() {
    const states = Object.keys(statesData);
    const state = states[Math.floor(Math.random() * states.length)];
    const correct = statesData[state].capital;
    
    const options = [correct];
    while (options.length < 2) {
        const randomState = states[Math.floor(Math.random() * states.length)];
        const randomCapital = statesData[randomState].capital;
        if (!options.includes(randomCapital)) {
            options.push(randomCapital);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 2em; color: #667eea; margin-bottom: 20px;">
                ⏱️ <span id="speedTimer">${speedTimeLeft}</span>s
            </div>
            <div style="font-size: 1.5em; margin-bottom: 20px;">
                Capital of <span style="color: #764ba2; font-weight: bold;">${state}</span>?
            </div>
            <div style="display: flex; gap: 20px; justify-content: center;">
                ${options.map(option => `
                    <button onclick="checkSpeedAnswer('${option}', '${correct}')" 
                            style="padding: 15px 30px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); 
                                   color: white; border: none; border-radius: 10px; font-size: 1.2em; 
                                   cursor: pointer;">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div style="margin-top: 20px; font-size: 2em; color: #667eea;">
                Score: <span style="font-weight: bold;">${gameState.score}</span>
            </div>
        </div>
    `;
}

function checkSpeedAnswer(selected, correct) {
    if (selected === correct) {
        gameState.score += 15;
        addXP(15);
    }
    showSpeedQuestion();
}

function endSpeedRound() {
    if (speedTimeLeft > 30 && gameState.score > 0) {
        unlockAchievement('speedDemon');
    }
    
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h2 style="color: #667eea;">Time's Up!</h2>
            <div style="font-size: 3em; font-weight: bold; color: #38ef7d; margin: 20px 0;">
                ${gameState.score} Points
            </div>
            <button onclick="playMode('speed')" 
                    style="padding: 15px 40px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); 
                           color: white; border: none; border-radius: 30px; font-size: 1.1em; 
                           cursor: pointer;">
                Try Again
            </button>
        </div>
    `;
}

// Size Challenge Mode
function startSizeChallenge() {
    showSizeQuestion();
}

function showSizeQuestion() {
    const states = Object.keys(statesData);
    const state1 = states[Math.floor(Math.random() * states.length)];
    let state2 = states[Math.floor(Math.random() * states.length)];
    while (state2 === state1) {
        state2 = states[Math.floor(Math.random() * states.length)];
    }
    
    const area1 = statesData[state1].area;
    const area2 = statesData[state2].area;
    const correct = area1 > area2 ? state1 : state2;
    
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 1.8em; margin-bottom: 30px;">Which state is larger?</div>
            <div style="display: flex; gap: 20px; justify-content: center;">
                <button onclick="checkSizeAnswer('${state1}', '${correct}', ${area1}, ${area2})" 
                        style="padding: 30px; background: white; border: 3px solid #667eea; 
                               border-radius: 15px; cursor: pointer; transition: all 0.3s ease;">
                    <div style="font-size: 1.5em; font-weight: bold; color: #667eea;">${state1}</div>
                    <div style="color: #666; margin-top: 5px;">${statesData[state1].nickname}</div>
                </button>
                <button onclick="checkSizeAnswer('${state2}', '${correct}', ${area1}, ${area2})" 
                        style="padding: 30px; background: white; border: 3px solid #764ba2; 
                               border-radius: 15px; cursor: pointer; transition: all 0.3s ease;">
                    <div style="font-size: 1.5em; font-weight: bold; color: #764ba2;">${state2}</div>
                    <div style="color: #666; margin-top: 5px;">${statesData[state2].nickname}</div>
                </button>
            </div>
        </div>
    `;
}

function checkSizeAnswer(selected, correct, area1, area2) {
    const isCorrect = selected === correct;
    
    if (isCorrect) {
        gameState.score += 12;
        addXP(12);
        showNotification('Correct!', `+12 XP earned!`);
    } else {
        showNotification('Incorrect', 'Try again!');
    }
    
    setTimeout(() => {
        showSizeQuestion();
    }, 2000);
}

// Fact Explorer Mode
function startFactExplorer() {
    const states = Object.keys(statesData);
    const randomState = states[Math.floor(Math.random() * states.length)];
    
    if (!gameState.statesVisited.includes(randomState)) {
        gameState.statesVisited.push(randomState);
        addXP(5);
        
        if (gameState.statesVisited.length === 25) {
            unlockAchievement('explorer');
        }
        
        if (gameState.statesVisited.length === 50) {
            unlockAchievement('stateExpert');
        }
    }
    
    const data = statesData[randomState];
    const gameArea = document.getElementById('gameArea');
    
    gameArea.innerHTML = `
        <div style="padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 2.5em; font-weight: bold; 
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                            -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    ${randomState}
                </div>
                <div style="color: #666; font-size: 1.2em;">${data.nickname}</div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; max-width: 600px; margin: 0 auto;">
                <div style="background: #f7f8fc; padding: 15px; border-radius: 10px;">
                    <div style="color: #667eea; font-weight: bold; margin-bottom: 5px;">Capital</div>
                    <div style="font-size: 1.1em;">${data.capital}</div>
                </div>
                <div style="background: #f7f8fc; padding: 15px; border-radius: 10px;">
                    <div style="color: #667eea; font-weight: bold; margin-bottom: 5px;">Population</div>
                    <div style="font-size: 1.1em;">${data.population}</div>
                </div>
                <div style="background: #f7f8fc; padding: 15px; border-radius: 10px;">
                    <div style="color: #667eea; font-weight: bold; margin-bottom: 5px;">Area</div>
                    <div style="font-size: 1.1em;">${data.area.toLocaleString()} sq mi</div>
                </div>
                <div style="background: #f7f8fc; padding: 15px; border-radius: 10px;">
                    <div style="color: #667eea; font-weight: bold; margin-bottom: 5px;">Admitted</div>
                    <div style="font-size: 1.1em;">${data.admitted}</div>
                </div>
            </div>
            <div style="background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%); 
                        padding: 20px; border-radius: 10px; margin: 20px auto; max-width: 600px;">
                <div style="color: #667eea; font-weight: bold; margin-bottom: 10px;">Fun Fact</div>
                <div style="font-size: 1.1em; color: #333;">${data.fact}</div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <div style="color: #666; margin-bottom: 10px;">
                    States Explored: ${gameState.statesVisited.length}/50
                </div>
                <button onclick="startFactExplorer()" 
                        style="padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                               color: white; border: none; border-radius: 30px; font-size: 1.1em; 
                               cursor: pointer;">
                    Next State →
                </button>
            </div>
        </div>
    `;
}

// Daily Challenges
function startChallenge(type) {
    // Implement challenge logic
    playMode('quiz');
}

// XP and Level System
function addXP(amount) {
    gameState.totalXP += amount;
    
    // Check for level up
    const newLevel = Math.floor(gameState.totalXP / 100) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        showNotification('Level Up!', `You reached level ${gameState.level}!`);
        
        if (gameState.level === 10) {
            unlockAchievement('legend');
        }
    }
    
    updateUserDisplay();
    saveUserData();
}

// Achievement System
function unlockAchievement(achievementId) {
    if (!gameState.achievements.includes(achievementId)) {
        gameState.achievements.push(achievementId);
        const achievement = achievements[achievementId];
        
        showNotification('Achievement Unlocked!', `${achievement.name} - ${achievement.description}`);
        addXP(achievement.xp);
        
        // Update achievement display
        const achievementBadges = document.querySelectorAll('.achievement-badge');
        const index = Object.keys(achievements).indexOf(achievementId);
        if (achievementBadges[index]) {
            achievementBadges[index].classList.add('unlocked');
        }
        
        document.getElementById('achievementCount').textContent = gameState.achievements.length;
    }
}

// Combo Display
function showCombo(combo) {
    const comboIndicator = document.getElementById('comboIndicator');
    comboIndicator.textContent = `COMBO x${combo}!`;
    comboIndicator.style.display = 'block';
    
    setTimeout(() => {
        comboIndicator.style.display = 'none';
    }, 1000);
}

// Notification System
function showNotification(title, message) {
    const notification = document.getElementById('notification');
    document.getElementById('notificationTitle').textContent = title;
    document.getElementById('notificationMessage').textContent = message;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Leaderboard System
function generateLeaderboard(type) {
    const mockPlayers = [
        { name: 'StatesMaster', score: 5420 },
        { name: 'GeoWhiz', score: 4890 },
        { name: 'MapExplorer', score: 4235 },
        { name: 'USAChamp', score: 3876 },
        { name: 'QuizKing', score: 3421 },
        { name: 'CapitalAce', score: 2987 },
        { name: 'Explorer50', score: 2543 },
        { name: 'StatePro', score: 2156 }
    ];
    
    // Add current player
    if (gameState.user) {
        mockPlayers.push({ name: gameState.user.username, score: gameState.totalXP });
    }
    
    mockPlayers.sort((a, b) => b.score - a.score);
    
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = mockPlayers.slice(0, 10).map((player, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        const isCurrentPlayer = gameState.user && player.name === gameState.user.username;
        
        return `
            <div class="leaderboard-item" style="${isCurrentPlayer ? 'background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);' : ''}">
                <div class="leaderboard-rank ${rankClass}">${index + 1}</div>
                <div class="leaderboard-name">${player.name} ${isCurrentPlayer ? '(You)' : ''}</div>
                <div class="leaderboard-score">${player.score.toLocaleString()} XP</div>
            </div>
        `;
    }).join('');
}

function showLeaderboard(type) {
    document.querySelectorAll('.leaderboard-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    generateLeaderboard(type);
}

// Daily Streak System
function checkDailyStreak() {
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem('lastPlayed');
    
    if (lastPlayed) {
        const lastDate = new Date(lastPlayed);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.toDateString() === yesterday.toDateString()) {
            gameState.dailyStreak++;
            showNotification('Daily Streak!', `${gameState.dailyStreak} days in a row!`);
        } else if (lastDate.toDateString() !== today) {
            gameState.dailyStreak = 1;
        }
    } else {
        gameState.dailyStreak = 1;
    }
    
    localStorage.setItem('lastPlayed', today);
    saveUserData();
}

// Data Persistence Functions
function saveUserData() {
    if (gameState.user) {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }
}

function loadUserData() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        try {
            const loadedState = JSON.parse(saved);
            Object.assign(gameState, loadedState);
            
            // If user exists, skip login
            if (gameState.user) {
                document.getElementById('loginScreen').style.display = 'none';
                document.getElementById('mainGame').style.display = 'block';
                updateUserDisplay();
                checkDailyStreak();
            }
        } catch (e) {
            console.error('Failed to load saved data:', e);
        }
    }
}

// Data Persistence
function saveUserData() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadUserData() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        const data = JSON.parse(saved);
        Object.assign(gameState, data);
        
        if (gameState.user) {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('mainGame').style.display = 'block';
            updateUserDisplay();
            checkDailyStreak();
        }
    }
}

// Logout function with options
function logout() {
    const choice = confirm('Click OK to switch users (keeps all data)\nClick Cancel to go back');
    
    if (choice) {
        // Just reload to show login screen again
        gameState.user = null;
        localStorage.removeItem('currentUser');
        location.reload();
    }
}

// User Menu Functions
function showUserMenu() {
    const modal = document.getElementById('userMenuModal');
    modal.style.display = 'flex';
}

function closeUserMenu() {
    const modal = document.getElementById('userMenuModal');
    modal.style.display = 'none';
}

function switchUser() {
    closeUserMenu();
    // Clear the entire game state to force login screen
    localStorage.removeItem('gameState');
    localStorage.removeItem('lastPlayed');
    location.reload();
}

function exportProgress() {
    const data = {
        username: gameState.user.username,
        level: gameState.level,
        totalXP: gameState.totalXP,
        achievements: gameState.achievements,
        statesVisited: gameState.statesVisited,
        dailyStreak: gameState.dailyStreak,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${gameState.user.username}_progress_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Export Complete', 'Your progress has been downloaded!');
    closeUserMenu();
}

function resetProgress() {
    if (confirm('WARNING: This will delete ALL your progress and achievements. Are you sure?')) {
        if (confirm('This cannot be undone. Really delete everything?')) {
            localStorage.clear();
            location.reload();
        }
    }
    closeUserMenu();
}

// Mobile Tab Navigation
function showMobileTab(tab) {
    // Remove active class from all tabs
    document.querySelectorAll('.mobile-tabs button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hide all sections
    document.querySelector('.main-content').classList.remove('mobile-active');
    document.querySelector('.sidebar').classList.remove('mobile-active');
    document.querySelector('.leaderboard').classList.remove('mobile-active');
    
    // Show selected section and activate tab
    switch(tab) {
        case 'games':
            document.querySelector('.main-content').classList.add('mobile-active');
            document.querySelectorAll('.mobile-tabs button')[0].classList.add('active');
            break;
        case 'challenges':
            document.querySelector('.sidebar').classList.add('mobile-active');
            document.querySelectorAll('.mobile-tabs button')[1].classList.add('active');
            break;
        case 'leaderboard':
            document.querySelector('.leaderboard').classList.add('mobile-active');
            document.querySelectorAll('.mobile-tabs button')[2].classList.add('active');
            break;
    }
}

// Load and display existing users for family selection
function loadExistingUsers() {
    const allUsers = getAllUsers();
    
    if (allUsers.length > 0) {
        const existingUsersSection = document.getElementById('existingUsersSection');
        const existingUsersList = document.getElementById('existingUsersList');
        
        existingUsersSection.style.display = 'block';
        existingUsersList.innerHTML = '';
        
        allUsers.forEach(user => {
            const userBtn = document.createElement('button');
            userBtn.className = 'existing-user-btn';
            userBtn.innerHTML = `
                <div class="existing-user-avatar">${user.avatar || '🦅'}</div>
                <div class="existing-user-info">
                    <div class="existing-user-name">${user.username}</div>
                    <div class="existing-user-stats">Level ${user.level || 1} • ${user.totalXP || 0} XP</div>
                </div>
            `;
            userBtn.onclick = () => selectExistingUser(user);
            existingUsersList.appendChild(userBtn);
        });
    }
}

// Get all users from localStorage
function getAllUsers() {
    const users = [];
    
    // Check for current user
    const currentState = localStorage.getItem('gameState');
    if (currentState) {
        const parsed = JSON.parse(currentState);
        if (parsed.user) {
            users.push(parsed.user);
        }
    }
    
    // Check for saved users list
    const savedUsers = localStorage.getItem('allUsers');
    if (savedUsers) {
        const usersList = JSON.parse(savedUsers);
        // Add users not already in the list
        usersList.forEach(user => {
            if (!users.find(u => u.username === user.username)) {
                users.push(user);
            }
        });
    }
    
    return users;
}

// Select an existing user
function selectExistingUser(user) {
    // Load user data
    gameState.user = user;
    gameState.totalXP = user.totalXP || 0;
    gameState.level = user.level || 1;
    gameState.achievements = user.achievements || [];
    gameState.statesVisited = user.statesVisited || [];
    gameState.dailyStreak = user.dailyStreak || 0;
    
    // Save and start game
    saveGameState();
    showMainGame();
}

// Update saveGameState to also save to allUsers
const originalSaveGameState = saveGameState;
saveGameState = function() {
    originalSaveGameState();
    
    // Also save to all users list
    if (gameState.user) {
        let allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const existingIndex = allUsers.findIndex(u => u.username === gameState.user.username);
        
        const userData = {
            ...gameState.user,
            totalXP: gameState.totalXP,
            level: gameState.level,
            achievements: gameState.achievements,
            statesVisited: gameState.statesVisited,
            dailyStreak: gameState.dailyStreak
        };
        
        if (existingIndex >= 0) {
            allUsers[existingIndex] = userData;
        } else {
            allUsers.push(userData);
        }
        
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }
}