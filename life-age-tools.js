// Life Age Tools - Legal Age Calculators
class LifeAgeTools {
    constructor() {
        this.countryData = {
            'USA': {
                retirement: { male: 67, female: 67 },
                drinking: 21,
                driving: 16,
                voting: 18,
                working: 14,
                marriage: 18
            },
            'UK': {
                retirement: { male: 66, female: 66 },
                drinking: 18,
                driving: 17,
                voting: 18,
                working: 13,
                marriage: 18
            },
            'Canada': {
                retirement: { male: 65, female: 65 },
                drinking: 18,
                driving: 16,
                voting: 18,
                working: 14,
                marriage: 18
            },
            'Australia': {
                retirement: { male: 67, female: 67 },
                drinking: 18,
                driving: 16,
                voting: 18,
                working: 13,
                marriage: 18
            },
            'Germany': {
                retirement: { male: 65, female: 65 },
                drinking: 16,
                driving: 18,
                voting: 18,
                working: 15,
                marriage: 18
            },
            'France': {
                retirement: { male: 62, female: 62 },
                drinking: 18,
                driving: 18,
                voting: 18,
                working: 14,
                marriage: 18
            },
            'Japan': {
                retirement: { male: 65, female: 65 },
                drinking: 20,
                driving: 18,
                voting: 18,
                working: 15,
                marriage: 18
            },
            'China': {
                retirement: { male: 60, female: 55 },
                drinking: 18,
                driving: 18,
                voting: 18,
                working: 16,
                marriage: 22
            }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Global functions for HTML onclick
        window.openTool = (toolType) => this.openTool(toolType);
        window.closeModal = () => this.closeModal();
        window.calculateAge = () => this.calculateAge();
    }

    openTool(toolType) {
        const modal = document.getElementById('toolModal');
        const content = document.getElementById('toolContent');
        
        if (!modal || !content) return;

        let toolHTML = '';
        
        switch(toolType) {
            case 'retirement':
                toolHTML = this.getRetirementCalculator();
                break;
            case 'drinking':
                toolHTML = this.getDrinkingAgeChecker();
                break;
            case 'driving':
                toolHTML = this.getDrivingAgeChecker();
                break;
            case 'voting':
                toolHTML = this.getVotingAgeChecker();
                break;
            case 'working':
                toolHTML = this.getWorkingAgeChecker();
                break;
            case 'marriage':
                toolHTML = this.getMarriageAgeChecker();
                break;
        }
        
        content.innerHTML = toolHTML;
        modal.style.display = 'block';
        
        // Set default date
        this.setDefaultDate();
    }

    closeModal() {
        const modal = document.getElementById('toolModal');
        if (modal) modal.style.display = 'none';
    }

    getRetirementCalculator() {
        return `
            <h2>🎓 Retirement Age Calculator</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Country:</label>
                    <select id="country" required>
                        <option value="">Select Country</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="gender">Gender:</label>
                    <select id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Calculate Retirement Age</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Retirement Information</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getDrinkingAgeChecker() {
        return `
            <h2>🍷 Legal Drinking Age Checker</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Country:</label>
                    <select id="country" required>
                        <option value="">Select Country</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Check Drinking Age</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Drinking Age Status</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getDrivingAgeChecker() {
        return `
            <h2>🚗 Driving Age Checker</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Country:</label>
                    <select id="country" required>
                        <option value="">Select Country</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Check Driving Age</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Driving Age Status</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getVotingAgeChecker() {
        return `
            <h2>🗳️ Voting Age Checker</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Country:</label>
                    <select id="country" required>
                        <option value="">Select Country</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Check Voting Age</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Voting Age Status</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getWorkingAgeChecker() {
        return `
            <h2>💼 Working Age Checker</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Country:</label>
                    <select id="country" required>
                        <option value="">Select Country</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Check Working Age</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Working Age Status</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getMarriageAgeChecker() {
        return `
            <h2>💍 Marriage Age Checker</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Birth Date:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Country:</label>
                    <select id="country" required>
                        <option value="">Select Country</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Check Marriage Age</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Marriage Age Status</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    setDefaultDate() {
        const birthDateInput = document.getElementById('birthDate');
        if (birthDateInput) {
            const today = new Date();
            const defaultDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            birthDateInput.value = defaultDate.toISOString().split('T')[0];
        }
    }

    calculateAge() {
        const birthDate = new Date(document.getElementById('birthDate').value);
        const country = document.getElementById('country').value;
        const gender = document.getElementById('gender')?.value || 'male';
        
        if (!birthDate || !country) {
            alert('Please fill in all required fields.');
            return;
        }

        const today = new Date();
        const age = this.calculateAgeInYears(birthDate, today);
        const countryInfo = this.countryData[country];
        
        let resultHTML = '';
        const toolType = this.getCurrentToolType();
        
        switch(toolType) {
            case 'retirement':
                const retirementAge = countryInfo.retirement[gender];
                const retirementDate = this.calculateFutureDate(birthDate, retirementAge);
                const yearsToRetirement = retirementAge - age;
                
                resultHTML = `
                    <div class="result-item retirement-info">
                        <strong>Official retirement age in ${country}:</strong> ${retirementAge} years
                    </div>
                    <div class="result-item retirement-info">
                        <strong>You will retire on:</strong> ${retirementDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div class="result-item retirement-info">
                        <strong>Years left until retirement:</strong> ${yearsToRetirement > 0 ? `${yearsToRetirement} years` : 'You are already eligible!'}
                    </div>
                    ${yearsToRetirement > 0 ? `<div class="result-item retirement-info"><strong>Days until retirement:</strong> ${Math.ceil((retirementDate - today) / (1000 * 60 * 60 * 24)).toLocaleString()} days</div>` : ''}
                `;
                break;
                
            case 'drinking':
                const drinkingAge = countryInfo.drinking;
                const isDrinkingEligible = age >= drinkingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Legal drinking age in ${country}:</strong> ${drinkingAge} years
                    </div>
                    <div class="result-item ${isDrinkingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Status:</strong> ${isDrinkingEligible ? 'You are eligible to drink alcohol' : `You need to wait ${drinkingAge - age} more year${drinkingAge - age !== 1 ? 's' : ''}`}
                    </div>
                `;
                break;
                
            case 'driving':
                const drivingAge = countryInfo.driving;
                const isDrivingEligible = age >= drivingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Legal driving age in ${country}:</strong> ${drivingAge} years
                    </div>
                    <div class="result-item ${isDrivingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Status:</strong> ${isDrivingEligible ? 'You are eligible to apply for a driver\'s license' : `You need to wait ${drivingAge - age} more year${drivingAge - age !== 1 ? 's' : ''}`}
                    </div>
                `;
                break;
                
            case 'voting':
                const votingAge = countryInfo.voting;
                const isVotingEligible = age >= votingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Legal voting age in ${country}:</strong> ${votingAge} years
                    </div>
                    <div class="result-item ${isVotingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Status:</strong> ${isVotingEligible ? 'You are eligible to vote' : `You need to wait ${votingAge - age} more year${votingAge - age !== 1 ? 's' : ''}`}
                    </div>
                `;
                break;
                
            case 'working':
                const workingAge = countryInfo.working;
                const isWorkingEligible = age >= workingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Minimum working age in ${country}:</strong> ${workingAge} years
                    </div>
                    <div class="result-item ${isWorkingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Status:</strong> ${isWorkingEligible ? 'You are eligible to work' : `You need to wait ${workingAge - age} more year${workingAge - age !== 1 ? 's' : ''}`}
                    </div>
                `;
                break;
                
            case 'marriage':
                const marriageAge = countryInfo.marriage;
                const isMarriageEligible = age >= marriageAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Legal marriage age in ${country}:</strong> ${marriageAge} years
                    </div>
                    <div class="result-item ${isMarriageEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Status:</strong> ${isMarriageEligible ? 'You are eligible to get married' : `You need to wait ${marriageAge - age} more year${marriageAge - age !== 1 ? 's' : ''}`}
                    </div>
                `;
                break;
        }

        const resultDiv = document.getElementById('result');
        const resultContent = document.getElementById('resultContent');
        
        if (resultDiv && resultContent) {
            resultContent.innerHTML = resultHTML;
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    calculateAgeInYears(birthDate, currentDate) {
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    calculateFutureDate(birthDate, targetAge) {
        const futureDate = new Date(birthDate);
        futureDate.setFullYear(birthDate.getFullYear() + targetAge);
        return futureDate;
    }

    getCurrentToolType() {
        const modalContent = document.getElementById('toolContent');
        if (!modalContent) return '';
        
        const title = modalContent.querySelector('h2')?.textContent || '';
        if (title.includes('Retirement')) return 'retirement';
        if (title.includes('Drinking')) return 'drinking';
        if (title.includes('Driving')) return 'driving';
        if (title.includes('Voting')) return 'voting';
        if (title.includes('Working')) return 'working';
        if (title.includes('Marriage')) return 'marriage';
        
        return '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LifeAgeTools();
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});