// Strumenti per l'Età della Vita - Calcolatori dell'Età Legale
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
        // Funzioni globali per HTML onclick
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
        
        // Imposta la data predefinita
        this.setDefaultDate();
    }

    closeModal() {
        const modal = document.getElementById('toolModal');
        if (modal) modal.style.display = 'none';
    }

    getRetirementCalculator() {
        return `
            <h2>🎓 Calcolatore dell'Età Pensionabile</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Data di Nascita:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Paese:</label>
                    <select id="country" required>
                        <option value="">Seleziona Paese</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="gender">Genere:</label>
                    <select id="gender">
                        <option value="male">Maschio</option>
                        <option value="female">Femmina</option>
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Calcola Età Pensionabile</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Informazioni sulla Pensione</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getDrinkingAgeChecker() {
        return `
            <h2>🍷 Controllo Età per Bere Legale</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Data di Nascita:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Paese:</label>
                    <select id="country" required>
                        <option value="">Seleziona Paese</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Controlla Età per Bere</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Stato Età per Bere</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getDrivingAgeChecker() {
        return `
            <h2>🚗 Controllo Età per Guidare</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Data di Nascita:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Paese:</label>
                    <select id="country" required>
                        <option value="">Seleziona Paese</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Controlla Età per Guidare</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Stato Età per Guidare</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getVotingAgeChecker() {
        return `
            <h2>🗳️ Controllo Età per Votare</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Data di Nascita:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Paese:</label>
                    <select id="country" required>
                        <option value="">Seleziona Paese</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Controlla Età per Votare</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Stato Età per Votare</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getWorkingAgeChecker() {
        return `
            <h2>💼 Controllo Età per Lavorare</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Data di Nascita:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Paese:</label>
                    <select id="country" required>
                        <option value="">Seleziona Paese</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Controlla Età per Lavorare</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Stato Età per Lavorare</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getMarriageAgeChecker() {
        return `
            <h2>💍 Controllo Età per Sposarsi</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Data di Nascita:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Paese:</label>
                    <select id="country" required>
                        <option value="">Seleziona Paese</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Controlla Età per Sposarsi</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Stato Età per Sposarsi</h3>
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
            alert('Si prega di compilare tutti i campi obbligatori.');
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
                        <strong>Età pensionabile ufficiale in ${country}:</strong> ${retirementAge} anni
                    </div>
                    <div class="result-item retirement-info">
                        <strong>Andrai in pensione il:</strong> ${retirementDate.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div class="result-item retirement-info">
                        <strong>Anni rimanenti fino alla pensione:</strong> ${yearsToRetirement > 0 ? `${yearsToRetirement} anni` : 'Sei già idoneo!'}
                    </div>
                    ${yearsToRetirement > 0 ? `<div class="result-item retirement-info"><strong>Giorni fino alla pensione:</strong> ${Math.ceil((retirementDate - today) / (1000 * 60 * 60 * 24)).toLocaleString()} giorni</div>` : ''}
                `;
                break;
                
            case 'drinking':
                const drinkingAge = countryInfo.drinking;
                const isDrinkingEligible = age >= drinkingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Età legale per bere in ${country}:</strong> ${drinkingAge} anni
                    </div>
                    <div class="result-item ${isDrinkingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Stato:</strong> ${isDrinkingEligible ? 'Sei idoneo a bere alcolici' : `Devi aspettare ${drinkingAge - age} anni in più`}
                    </div>
                `;
                break;
                
            case 'driving':
                const drivingAge = countryInfo.driving;
                const isDrivingEligible = age >= drivingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Età legale per guidare in ${country}:</strong> ${drivingAge} anni
                    </div>
                    <div class="result-item ${isDrivingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Stato:</strong> ${isDrivingEligible ? 'Sei idoneo a richiedere la patente di guida' : `Devi aspettare ${drivingAge - age} anni in più`}
                    </div>
                `;
                break;
                
            case 'voting':
                const votingAge = countryInfo.voting;
                const isVotingEligible = age >= votingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Età legale per votare in ${country}:</strong> ${votingAge} anni
                    </div>
                    <div class="result-item ${isVotingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Stato:</strong> ${isVotingEligible ? 'Sei idoneo a votare' : `Devi aspettare ${votingAge - age} anni in più`}
                    </div>
                `;
                break;
                
            case 'working':
                const workingAge = countryInfo.working;
                const isWorkingEligible = age >= workingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Età minima per lavorare in ${country}:</strong> ${workingAge} anni
                    </div>
                    <div class="result-item ${isWorkingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Stato:</strong> ${isWorkingEligible ? 'Sei idoneo a lavorare' : `Devi aspettare ${workingAge - age} anni in più`}
                    </div>
                `;
                break;
                
            case 'marriage':
                const marriageAge = countryInfo.marriage;
                const isMarriageEligible = age >= marriageAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Età legale per sposarsi in ${country}:</strong> ${marriageAge} anni
                    </div>
                    <div class="result-item ${isMarriageEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Stato:</strong> ${isMarriageEligible ? 'Sei idoneo a sposarti' : `Devi aspettare ${marriageAge - age} anni in più`}
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
        if (title.includes('Pensionabile')) return 'retirement';
        if (title.includes('Bere')) return 'drinking';
        if (title.includes('Guidare')) return 'driving';
        if (title.includes('Votare')) return 'voting';
        if (title.includes('Lavorare')) return 'working';
        if (title.includes('Sposarsi')) return 'marriage';
        
        return '';
    }
}

// Inizializza quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    new LifeAgeTools();
});

// Chiudi modal quando si clicca fuori
window.addEventListener('click', (event) => {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});