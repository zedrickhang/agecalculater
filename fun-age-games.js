// Fun Age Games - Interactive Age Entertainment Tools
class FunAgeGames {
    constructor() {
        // Celebrity database with famous personalities
        this.celebrityDatabase = {
            1940: [
                { name: "John Lennon", profession: "Musician", birth: "1940-10-09", image: "🎵" },
                { name: "Al Pacino", profession: "Actor", birth: "1940-04-25", image: "🎭" },
                { name: "Pelé", profession: "Footballer", birth: "1940-10-23", image: "⚽" }
            ],
            1950: [
                { name: "Steve Jobs", profession: "Entrepreneur", birth: "1955-02-24", image: "💻" },
                { name: "Bill Gates", profession: "Entrepreneur", birth: "1955-10-28", image: "💼" },
                { name: "Robin Williams", profession: "Actor/Comedian", birth: "1951-07-11", image: "🎭" }
            ],
            1960: [
                { name: "Madonna", profession: "Singer", birth: "1958-08-16", image: "🎤" },
                { name: "Michael Jackson", profession: "Singer", birth: "1958-08-29", image: "🕺" },
                { name: "Barack Obama", profession: "Former President", birth: "1961-08-04", image: "🏛️" }
            ],
            1970: [
                { name: "Leonardo DiCaprio", profession: "Actor", birth: "1974-11-11", image: "🎬" },
                { name: "Angelina Jolie", profession: "Actress", birth: "1975-06-04", image: "🎭" },
                { name: "Elon Musk", profession: "Entrepreneur", birth: "1971-06-28", image: "🚀" }
            ],
            1980: [
                { name: "Mark Zuckerberg", profession: "Entrepreneur", birth: "1984-05-14", image: "💻" },
                { name: "Lady Gaga", profession: "Singer", birth: "1986-03-28", image: "🎤" },
                { name: "Rihanna", profession: "Singer", birth: "1988-02-20", image: "🎵" }
            ],
            1990: [
                { name: "Emma Watson", profession: "Actress", birth: "1990-04-15", image: "🎭" },
                { name: "Justin Bieber", profession: "Singer", birth: "1994-03-01", image: "🎤" },
                { name: "Taylor Swift", profession: "Singer", birth: "1989-12-13", image: "🎵" }
            ],
            2000: [
                { name: "Billie Eilish", profession: "Singer", birth: "2001-12-18", image: "🎵" },
                { name: "Greta Thunberg", profession: "Activist", birth: "2003-01-03", image: "🌍" },
                { name: "Millie Bobby Brown", profession: "Actress", birth: "2004-02-19", image: "🎭" }
            ]
        };

        // Birthday card styles and templates
        this.cardStyles = {
            cute: {
                colors: ['#FFB6C1', '#FFE4E1', '#FFC0CB', '#FFCCCB'],
                emojis: ['🎂', '🎉', '🎈', '🎁', '🌸', '🦄', '🌈'],
                fonts: ['Comic Sans MS', 'Arial', 'Helvetica']
            },
            elegant: {
                colors: ['#F5F5DC', '#E6E6FA', '#D3D3D3', '#C0C0C0'],
                emojis: ['✨', '🌹', '💎', '🕊️', '🌿', '🏵️'],
                fonts: ['Georgia', 'Times New Roman', 'serif']
            },
            funny: {
                colors: ['#FFD700', '#FF6347', '#32CD32', '#FF69B4'],
                emojis: ['😂', '🤣', '🎪', '🤡', '🎭', '🎉', '💃'],
                fonts: ['Impact', 'Arial Black', 'Verdana']
            },
            professional: {
                colors: ['#2C3E50', '#34495E', '#5D6D7E', '#85929E'],
                emojis: ['🎯', '⭐', '🏆', '💼', '📊', '🎖️'],
                fonts: ['Arial', 'Calibri', 'Helvetica']
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.populateCelebrityDatabase();
    }

    bindEvents() {
        // Global functions for HTML onclick
        window.openGame = (gameType) => this.openGame(gameType);
        window.closeGameModal = () => this.closeGameModal();
        window.shareResults = () => this.shareResults();
        window.copyResults = () => this.copyResults();
        window.startNewGame = () => this.startNewGame();
    }

    populateCelebrityDatabase() {
        // Add more celebrities to the database
        const additionalCelebrities = {
            1940: [
                { name: "Bruce Lee", profession: "Martial Artist", birth: "1940-11-27", image: "🥋" },
                { name: "Cliff Richard", profession: "Singer", birth: "1940-10-14", image: "🎵" }
            ],
            1950: [
                { name: "Oprah Winfrey", profession: "Media Mogul", birth: "1954-01-29", image: "📺" },
                { name: "Jackie Chan", profession: "Actor", birth: "1954-04-07", image: "🎬" }
            ],
            1960: [
                { name: "Tom Hanks", profession: "Actor", birth: "1956-07-09", image: "🎭" },
                { name: "Prince", profession: "Musician", birth: "1958-06-07", image: "🎵" }
            ],
            1970: [
                { name: "Will Smith", profession: "Actor", birth: "1968-09-25", image: "🎬" },
                { name: "Jennifer Lopez", profession: "Singer/Actress", birth: "1969-07-24", image: "💃" }
            ],
            1980: [
                { name: "Beyoncé", profession: "Singer", birth: "1981-09-04", image: "👑" },
                { name: "Kim Kardashian", profession: "Reality Star", birth: "1980-10-21", image: "📸" }
            ],
            1990: [
                { name: "Selena Gomez", profession: "Singer/Actress", birth: "1992-07-22", image: "🎤" },
                { name: "Ariana Grande", profession: "Singer", birth: "1993-06-26", image: "🎵" }
            ]
        };

        // Merge additional celebrities with existing database
        Object.keys(additionalCelebrities).forEach(decade => {
            if (this.celebrityDatabase[decade]) {
                this.celebrityDatabase[decade] = [...this.celebrityDatabase[decade], ...additionalCelebrities[decade]];
            }
        });
    }

    openGame(gameType) {
        const modal = document.getElementById('gameModal');
        const content = document.getElementById('gameContent');
        
        if (!modal || !content) return;

        let gameHTML = '';
        
        switch(gameType) {
            case 'celebrity':
                gameHTML = this.getCelebrityComparator();
                break;
            case 'challenge':
                gameHTML = this.getAgeChallenge();
                break;
            case 'birthday-card':
                gameHTML = this.getBirthdayCardGenerator();
                break;
        }
        
        content.innerHTML = gameHTML;
        modal.style.display = 'block';
    }

    closeGameModal() {
        const modal = document.getElementById('gameModal');
        if (modal) modal.style.display = 'none';
        
        // Hide results area when closing modal
        const resultsArea = document.getElementById('resultsArea');
        if (resultsArea) resultsArea.style.display = 'none';
    }

    getCelebrityComparator() {
        return `
            <h2>⭐ Celebrity Age Comparator</h2>
            <p>Find out which celebrities share your birth year or exact age!</p>
            
            <form id="celebrityForm" onsubmit="event.preventDefault(); findCelebrityMatches();">
                <div class="input-group">
                    <label for="userBirthDate">Your Birth Date:</label>
                    <input type="date" id="userBirthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="matchType">Match Type:</label>
                    <select id="matchType">
                        <option value="year">Same Birth Year</option>
                        <option value="exact">Exact Age (within 1 year)</option>
                        <option value="month">Same Birth Month</option>
                    </select>
                </div>
                
                <button type="submit" class="game-btn">Find My Celebrity Twins!</button>
            </form>
            
            <div id="celebrityResults" style="display: none; margin-top: 20px;">
                <h3>Your Celebrity Matches</h3>
                <div id="celebrityList"></div>
            </div>
        `;
    }

    getAgeChallenge() {
        return `
            <h2>🏆 Age Challenge Tool</h2>
            <p class="game-description">Challenge your friends! Compare exact ages down to the second and discover who's truly older.</p>
            
            <form id="challengeForm" onsubmit="event.preventDefault(); startAgeChallenge();">
                <div class="challenge-container">
                    <div class="challenger-card">
                        <div class="challenger-header">
                            <div class="challenger-avatar">👤</div>
                            <h3>First Challenger</h3>
                        </div>
                        <div class="challenger-inputs">
                            <div class="input-group enhanced">
                                <label for="person1Name">
                                    <span class="label-icon">👋</span>
                                    <span class="label-text">Name</span>
                                </label>
                                <input type="text" id="person1Name" placeholder="Enter first person's name" required class="enhanced-input">
                            </div>
                            <div class="input-group enhanced">
                                <label for="person1Birth">
                                    <span class="label-icon">📅</span>
                                    <span class="label-text">Birth Date & Time</span>
                                </label>
                                <input type="datetime-local" id="person1Birth" required class="enhanced-input">
                            </div>
                        </div>
                    </div>

                    <div class="vs-separator">
                        <div class="vs-circle">VS</div>
                    </div>
                    
                    <div class="challenger-card">
                        <div class="challenger-header">
                            <div class="challenger-avatar">👤</div>
                            <h3>Second Challenger</h3>
                        </div>
                        <div class="challenger-inputs">
                            <div class="input-group enhanced">
                                <label for="person2Name">
                                    <span class="label-icon">👋</span>
                                    <span class="label-text">Name</span>
                                </label>
                                <input type="text" id="person2Name" placeholder="Enter second person's name" required class="enhanced-input">
                            </div>
                            <div class="input-group enhanced">
                                <label for="person2Birth">
                                    <span class="label-icon">📅</span>
                                    <span class="label-text">Birth Date & Time</span>
                                </label>
                                <input type="datetime-local" id="person2Birth" required class="enhanced-input">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="challenge-submit">
                    <button type="submit" class="game-btn enhanced-btn">
                        <span class="btn-icon">🚀</span>
                        <span class="btn-text">Start Age Challenge!</span>
                    </button>
                </div>
            </form>
            
            <div id="challengeResults" style="display: none; margin-top: 30px;">
                <h3>🎯 Challenge Results</h3>
                <div id="challengeWinner"></div>
                <div id="challengeStats"></div>
            </div>
            `;
    }

    getBirthdayCardGenerator() {
        return `
            <h2>🎨 AI Birthday Card Generator</h2>
            <p>Create personalized AI-generated birthday cards with custom messages!</p>
            
            <form id="cardForm" onsubmit="event.preventDefault(); generateBirthdayCard();">
                <div class="input-group">
                    <label for="recipientName">Recipient's Name:</label>
                    <input type="text" id="recipientName" placeholder="Enter name" required>
                </div>
                
                <div class="input-group">
                    <label for="recipientBirthday">Birthday:</label>
                    <input type="date" id="recipientBirthday" required>
                </div>
                
                <div class="input-group">
                    <label for="cardStyle">Card Style:</label>
                    <select id="cardStyle">
                        <option value="cute">Cute & Colorful</option>
                        <option value="elegant">Elegant & Classy</option>
                        <option value="funny">Funny & Playful</option>
                        <option value="professional">Professional & Modern</option>
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="personalKeywords">Personal Keywords (optional):</label>
                    <input type="text" id="personalKeywords" placeholder="e.g., funny, creative, sports lover">
                    <small>Add keywords to personalize the message</small>
                </div>
                
                <button type="submit" class="game-btn">Generate Birthday Card!</button>
            </form>
            
            <div id="cardResults" style="display: none; margin-top: 20px;">
                <h3>Your AI-Generated Birthday Card</h3>
                <div id="birthdayCard"></div>
                <div class="card-actions">
                    <button onclick="downloadCard()" class="action-btn">💾 Download Card</button>
                    <button onclick="regenerateCard()" class="action-btn">🔄 Generate New</button>
                </div>
            </div>
        `;
    }

    findCelebrityMatches() {
        const birthDate = new Date(document.getElementById('userBirthDate').value);
        const matchType = document.getElementById('matchType').value;
        
        if (!birthDate) {
            alert('Please enter your birth date');
            return;
        }

        const userYear = birthDate.getFullYear();
        const userMonth = birthDate.getMonth();
        const userAge = this.calculateAge(birthDate);
        
        let matches = [];
        
        // Find matches based on type
        Object.keys(this.celebrityDatabase).forEach(decade => {
            this.celebrityDatabase[decade].forEach(celebrity => {
                const celebBirth = new Date(celebrity.birth);
                const celebYear = celebBirth.getFullYear();
                const celebMonth = celebBirth.getMonth();
                const celebAge = this.calculateAge(celebBirth);
                
                let isMatch = false;
                
                switch(matchType) {
                    case 'year':
                        isMatch = celebYear === userYear;
                        break;
                    case 'exact':
                        isMatch = Math.abs(celebAge - userAge) <= 1;
                        break;
                    case 'month':
                        isMatch = celebMonth === userMonth;
                        break;
                }
                
                if (isMatch) {
                    matches.push({
                        ...celebrity,
                        ageDiff: Math.abs(celebAge - userAge),
                        daysDiff: Math.abs(celebBirth.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
                    });
                }
            });
        });

        // Sort matches by age difference
        matches.sort((a, b) => a.daysDiff - b.daysDiff);

        this.displayCelebrityResults(matches, matchType);
    }

    displayCelebrityResults(matches, matchType) {
        const resultsDiv = document.getElementById('celebrityResults');
        const listDiv = document.getElementById('celebrityList');
        
        if (matches.length === 0) {
            listDiv.innerHTML = '<p>No celebrity matches found. Try a different match type!</p>';
        } else {
            let html = '<div class="celebrity-matches">';
            
            matches.slice(0, 6).forEach(celebrity => {
                const birthDate = new Date(celebrity.birth);
                const age = this.calculateAge(birthDate);
                
                html += `
                    <div class="celebrity-card">
                        <div class="celebrity-icon">${celebrity.image}</div>
                        <h4>${celebrity.name}</h4>
                        <p class="profession">${celebrity.profession}</p>
                        <p class="birth-info">Born: ${birthDate.toLocaleDateString()}</p>
                        <p class="age-info">Age: ${age} years</p>
                        ${celebrity.daysDiff < 30 ? '<span class="exact-match">🎯 Very Close Match!</span>' : ''}
                    </div>
                `;
            });
            
            html += '</div>';
            
            if (matches.length > 6) {
                html += `<p class="more-matches">+ ${matches.length - 6} more matches found!</p>`;
            }
            
            listDiv.innerHTML = html;
        }
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Show results area for sharing
        this.showResultsArea(`Celebrity Matches: Found ${matches.length} celebrities who share your ${matchType === 'year' ? 'birth year' : matchType === 'exact' ? 'age' : 'birth month'}!`);
    }

    startAgeChallenge() {
        const person1Name = document.getElementById('person1Name').value;
        const person1Birth = new Date(document.getElementById('person1Birth').value);
        const person2Name = document.getElementById('person2Name').value;
        const person2Birth = new Date(document.getElementById('person2Birth').value);
        
        if (!person1Name || !person1Birth || !person2Name || !person2Birth) {
            alert('Please fill in all fields');
            return;
        }

        // Calculate precise age difference
        const timeDiff = Math.abs(person2Birth.getTime() - person1Birth.getTime());
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        const olderPerson = person1Birth < person2Birth ? person1Name : person2Name;
        const youngerPerson = person1Birth < person2Birth ? person2Name : person1Name;
        
        const age1 = this.calculateAge(person1Birth);
        const age2 = this.calculateAge(person2Birth);
        
        this.displayChallengeResults({
            person1: { name: person1Name, birth: person1Birth, age: age1 },
            person2: { name: person2Name, birth: person2Birth, age: age2 },
            older: olderPerson,
            younger: youngerPerson,
            difference: { days: daysDiff, hours: hoursDiff, minutes: minutesDiff, seconds: secondsDiff }
        });
    }

    displayChallengeResults(data) {
        const resultsDiv = document.getElementById('challengeResults');
        const winnerDiv = document.getElementById('challengeWinner');
        const statsDiv = document.getElementById('challengeStats');
        
        winnerDiv.innerHTML = `
            <div class="challenge-winner">
                <h4>🏆 ${data.older} is older!</h4>
                <p class="age-difference">
                    Age difference: ${data.difference.days} days, ${data.difference.hours} hours, 
                    ${data.difference.minutes} minutes, and ${data.difference.seconds} seconds
                </p>
            </div>
        `;
        
        const totalHours = data.difference.days * 24 + data.difference.hours;
        const totalMinutes = totalHours * 60 + data.difference.minutes;
        const approximateHeartbeats = Math.round(totalMinutes * 70); // Average 70 beats per minute
        
        statsDiv.innerHTML = `
            <div class="challenge-stats">
                <h4>📊 Fun Statistics</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">${data.difference.days.toLocaleString()}</span>
                        <span class="stat-label">Extra Days Lived</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${totalHours.toLocaleString()}</span>
                        <span class="stat-label">Extra Hours</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${approximateHeartbeats.toLocaleString()}</span>
                        <span class="stat-label">Extra Heartbeats</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${Math.round(data.difference.days / 365.25 * 100)}%</span>
                        <span class="stat-label">More Life Experience</span>
                    </div>
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Show results area for sharing
        this.showResultsArea(`Age Challenge: ${data.older} is ${data.difference.days} days older than ${data.younger}!`);
    }

    generateBirthdayCard() {
        const name = document.getElementById('recipientName').value;
        const birthday = new Date(document.getElementById('recipientBirthday').value);
        const style = document.getElementById('cardStyle').value;
        const keywords = document.getElementById('personalKeywords').value;
        
        if (!name || !birthday) {
            alert('Please fill in the recipient\'s name and birthday');
            return;
        }

        const age = this.calculateAge(birthday);
        const cardDesign = this.generateCardDesign(name, age, style, keywords);
        
        this.displayBirthdayCard(cardDesign);
    }

    generateCardDesign(name, age, style, keywords) {
        const styleConfig = this.cardStyles[style];
        const randomColor = styleConfig.colors[Math.floor(Math.random() * styleConfig.colors.length)];
        const randomEmoji = styleConfig.emojis[Math.floor(Math.random() * styleConfig.emojis.length)];
        const randomFont = styleConfig.fonts[Math.floor(Math.random() * styleConfig.fonts.length)];
        
        // Generate AI-like personalized message
        const messages = this.generatePersonalizedMessage(name, age, keywords, style);
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        return {
            name,
            age,
            style,
            color: randomColor,
            emoji: randomEmoji,
            font: randomFont,
            message: randomMessage,
            decorativeEmojis: this.getDecorativeEmojis(style)
        };
    }

    generatePersonalizedMessage(name, age, keywords, style) {
        const keywordArray = keywords ? keywords.split(',').map(k => k.trim()) : [];
        const ageGroup = age < 18 ? 'young' : age < 30 ? 'twenties' : age < 50 ? 'mature' : 'wise';
        
        let messages = [];
        
        switch(style) {
            case 'cute':
                messages = [
                    `Happy Birthday, ${name}! 🎉 Another year of being absolutely amazing!`,
                    `${name}, you're not getting older, you're getting more awesome! 🌟`,
                    `Wishing ${name} the sweetest ${age}th birthday ever! 🎂`,
                    `Happy ${age}th Birthday, ${name}! May your day be as special as you are! 💖`
                ];
                break;
            case 'elegant':
                messages = [
                    `Dear ${name}, wishing you a magnificent ${age}th birthday filled with joy and prosperity.`,
                    `Happy Birthday, ${name}. May this new year bring you endless happiness and success.`,
                    `${name}, celebrating you today and the wonderful person you are. Happy ${age}th Birthday.`,
                    `Wishing ${name} a birthday as extraordinary as your spirit. Cheers to ${age} years!`
                ];
                break;
            case 'funny':
                messages = [
                    `${name}, you're ${age}? I thought you were still 25! 😄 Happy Birthday!`,
                    `Happy Birthday, ${name}! Don't worry about being ${age} - you're still younger than your jokes! 🤣`,
                    `${name}, at ${age} you're like fine wine... you get better with age! 🍷`,
                    `Happy ${age}th Birthday, ${name}! Remember, age is just a number... a really big number! 😂`
                ];
                break;
            case 'professional':
                messages = [
                    `Happy Birthday, ${name}. Wishing you continued success and happiness in your ${age}th year.`,
                    `Dear ${name}, congratulations on reaching another milestone. Happy ${age}th Birthday.`,
                    `${name}, may your ${age}th year be filled with new achievements and personal growth.`,
                    `Happy Birthday, ${name}. Here's to another year of excellence and accomplishment.`
                ];
                break;
        }
        
        // Add keyword-based customization
        if (keywordArray.length > 0) {
            keywordArray.forEach(keyword => {
                if (keyword.toLowerCase().includes('sport')) {
                    messages.push(`${name}, may your ${age}th year be filled with victories on and off the field! 🏆`);
                } else if (keyword.toLowerCase().includes('music')) {
                    messages.push(`${name}, may your ${age}th birthday be as harmonious as your favorite song! 🎵`);
                } else if (keyword.toLowerCase().includes('creative')) {
                    messages.push(`${name}, here's to ${age} years of creativity and many more masterpieces to come! 🎨`);
                }
            });
        }
        
        return messages;
    }

    getDecorativeEmojis(style) {
        const decorations = {
            cute: ['🎈', '🎂', '🎉', '🌸', '🦄', '🌈', '💖'],
            elegant: ['✨', '🌹', '💎', '🕊️', '🌿', '🏵️', '💫'],
            funny: ['😂', '🤣', '🎪', '🤡', '🎭', '💃', '🕺'],
            professional: ['🎯', '⭐', '🏆', '📊', '🎖️', '💼', '🌟']
        };
        
        return decorations[style] || decorations.cute;
    }

    displayBirthdayCard(design) {
        const resultsDiv = document.getElementById('cardResults');
        const cardDiv = document.getElementById('birthdayCard');
        
        const decorativeEmojis = design.decorativeEmojis.slice(0, 4).join(' ');
        
        cardDiv.innerHTML = `
            <div class="birthday-card" style="
                background: linear-gradient(135deg, ${design.color}, ${design.color}88);
                font-family: ${design.font};
                border-radius: 15px;
                padding: 30px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                margin: 20px 0;
            ">
                <div class="card-header" style="font-size: 3em; margin-bottom: 20px;">
                    ${design.emoji}
                </div>
                <h3 style="color: #2c3e50; margin: 15px 0; font-size: 1.8em;">
                    Happy ${design.age}th Birthday!
                </h3>
                <h2 style="color: #34495e; margin: 10px 0; font-size: 2.2em;">
                    ${design.name}
                </h2>
                <p style="color: #5d6d7e; font-size: 1.2em; line-height: 1.6; margin: 20px 0;">
                    ${design.message}
                </p>
                <div class="card-decorations" style="font-size: 1.5em; margin-top: 20px;">
                    ${decorativeEmojis}
                </div>
                <div class="card-footer" style="margin-top: 20px; font-size: 0.9em; color: #7f8c8d;">
                    Generated with ❤️ by Fun Age Games
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Add global functions for card actions
        window.downloadCard = () => this.downloadCard(design);
        window.regenerateCard = () => this.generateBirthdayCard();
        
        // Show results area for sharing
        this.showResultsArea(`AI Birthday Card created for ${design.name}'s ${design.age}th birthday!`);
    }

    downloadCard(design) {
        // Create a canvas element to generate image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 600;
        canvas.height = 400;
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, design.color);
        gradient.addColorStop(1, design.color + '88');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.fillStyle = '#2c3e50';
        ctx.font = `bold 48px ${design.font}`;
        ctx.textAlign = 'center';
        ctx.fillText(`Happy ${design.age}th Birthday!`, canvas.width/2, 100);
        
        ctx.font = `bold 36px ${design.font}`;
        ctx.fillText(design.name, canvas.width/2, 160);
        
        ctx.font = `24px ${design.font}`;
        ctx.fillStyle = '#5d6d7e';
        
        // Word wrap for message
        const words = design.message.split(' ');
        let line = '';
        let y = 220;
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > canvas.width - 60 && i > 0) {
                ctx.fillText(line, canvas.width/2, y);
                line = words[i] + ' ';
                y += 30;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, canvas.width/2, y);
        
        // Download the image
        const link = document.createElement('a');
        link.download = `birthday-card-${design.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        this.showSuccess('Birthday card downloaded successfully!');
    }

    calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    showResultsArea(summaryText) {
        const resultsArea = document.getElementById('resultsArea');
        const resultsContent = document.getElementById('resultsContent');
        
        if (resultsArea && resultsContent) {
            resultsContent.innerHTML = `
                <div class="results-summary">
                    <p>${summaryText}</p>
                    <p class="share-prompt">Share your results with friends!</p>
                </div>
            `;
            resultsArea.style.display = 'block';
        }
    }

    shareResults() {
        const resultsContent = document.getElementById('resultsContent');
        if (!resultsContent) return;
        
        const text = resultsContent.textContent || 'Check out my Fun Age Games results!';
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: 'Fun Age Games Results',
                text: text,
                url: url
            }).catch(err => {
                console.log('Share failed:', err);
                this.copyToClipboard(`${text} ${url}`);
            });
        } else {
            this.copyToClipboard(`${text} ${url}`);
        }
    }

    copyResults() {
        const resultsContent = document.getElementById('resultsContent');
        if (!resultsContent) return;
        
        const text = resultsContent.textContent || 'Check out my Fun Age Games results!';
        this.copyToClipboard(text);
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showSuccess('Results copied to clipboard!');
            }).catch(err => {
                this.fallbackCopyTextToClipboard(text);
            });
        } else {
            this.fallbackCopyTextToClipboard(text);
        }
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showSuccess('Results copied to clipboard!');
        } catch (err) {
            this.showError('Failed to copy results');
        }
        
        document.body.removeChild(textArea);
    }

    startNewGame() {
        this.closeGameModal();
        const resultsArea = document.getElementById('resultsArea');
        if (resultsArea) resultsArea.style.display = 'none';
    }

    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto hide
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto hide
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FunAgeGames();
});

// Click outside modal to close
window.addEventListener('click', (event) => {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Global game instance
let gameInstance = null;

// Global functions for form submissions
window.findCelebrityMatches = () => {
    if (!gameInstance) gameInstance = new FunAgeGames();
    gameInstance.findCelebrityMatches();
};

window.startAgeChallenge = () => {
    if (!gameInstance) gameInstance = new FunAgeGames();
    gameInstance.startAgeChallenge();
};

window.generateBirthdayCard = () => {
    if (!gameInstance) gameInstance = new FunAgeGames();
    gameInstance.generateBirthdayCard();
};

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameInstance = new FunAgeGames();
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
