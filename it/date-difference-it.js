// Calcolatore della Differenza tra Date
class DateDifferenceCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setDefaultDates();
    }

    bindEvents() {
        // Invio del modulo
        const form = document.getElementById('dateDifferenceForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateDifference();
            });
        }

        // Toggle del tempo
        const timeToggle = document.getElementById('includeTime');
        if (timeToggle) {
            timeToggle.addEventListener('change', (e) => {
                this.toggleTimeInputs(e.target.checked);
            });
        }

        // Pulsante reset
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetForm();
            });
        }

        // Pulsante copia
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyResult();
            });
        }

        // Pulsante condividi
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareResult();
            });
        }

        // Validazione in tempo reale
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        
        if (startDate && endDate) {
            startDate.addEventListener('change', () => this.validateDates());
            endDate.addEventListener('change', () => this.validateDates());
        }
    }

    setDefaultDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');

        if (startDate) {
            startDate.value = this.formatDateForInput(today);
        }
        if (endDate) {
            endDate.value = this.formatDateForInput(tomorrow);
        }
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    toggleTimeInputs(show) {
        const timeInputs = document.getElementById('timeInputs');
        if (timeInputs) {
            timeInputs.style.display = show ? 'block' : 'none';
        }
    }

    validateDates() {
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        
        if (startDate && endDate && startDate.value && endDate.value) {
            const start = new Date(startDate.value);
            const end = new Date(endDate.value);
            
            if (end < start) {
                endDate.setCustomValidity('La data di fine deve essere successiva alla data di inizio');
                endDate.reportValidity();
            } else {
                endDate.setCustomValidity('');
            }
        }
    }

    calculateDifference() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const includeTime = document.getElementById('includeTime').checked;
        
        if (!startDate || !endDate) {
            alert('Si prega di selezionare sia la data di inizio che quella di fine.');
            return;
        }

        let startDateTime, endDateTime;

        if (includeTime) {
            const startTime = document.getElementById('startTime').value || '00:00:00';
            const endTime = document.getElementById('endTime').value || '00:00:00';
            
            startDateTime = new Date(`${startDate}T${startTime}`);
            endDateTime = new Date(`${endDate}T${endTime}`);
        } else {
            startDateTime = new Date(startDate + 'T00:00:00');
            endDateTime = new Date(endDate + 'T00:00:00');
        }

        if (endDateTime < startDateTime) {
            alert('La data di fine deve essere successiva alla data di inizio.');
            return;
        }

        const difference = this.calculateTimeDifference(startDateTime, endDateTime);
        this.displayResult(difference, startDateTime, endDateTime);
    }

    calculateTimeDifference(start, end) {
        const diffMs = end - start;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        // Calcola anni, mesi, giorni
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Calcola settimane
        const weeks = Math.floor(diffDays / 7);

        // Calcola ore, minuti, secondi rimanenti
        const remainingHours = diffHours % 24;
        const remainingMinutes = diffMinutes % 60;
        const remainingSeconds = diffSeconds % 60;

        return {
            years,
            months,
            weeks,
            days: diffDays,
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds,
            remainingDays: days,
            remainingHours,
            remainingMinutes,
            remainingSeconds,
            totalDays: diffDays
        };
    }

    displayResult(difference, startDate, endDate) {
        // Aggiorna il riassunto principale del risultato
        const summary = document.getElementById('resultSummary');
        if (summary) {
            let summaryText = '';
            if (difference.years > 0) summaryText += `${difference.years} anno${difference.years !== 1 ? 'i' : ''} `;
            if (difference.months > 0) summaryText += `${difference.months} mes${difference.months !== 1 ? 'i' : 'e'} `;
            if (difference.remainingDays > 0) summaryText += `${difference.remainingDays} giorn${difference.remainingDays !== 1 ? 'i' : 'o'} `;
            
            if (summaryText === '') {
                summaryText = `${difference.days} giorn${difference.days !== 1 ? 'i' : 'o'}`;
            }
            
            summary.innerHTML = `<h3>${summaryText}</h3>`;
        }

        // Aggiorna la griglia dei risultati
        document.getElementById('years').textContent = difference.years;
        document.getElementById('months').textContent = difference.months;
        document.getElementById('weeks').textContent = difference.weeks;
        document.getElementById('days').textContent = difference.remainingDays;
        document.getElementById('hours').textContent = difference.remainingHours;
        document.getElementById('minutes').textContent = difference.remainingMinutes;
        document.getElementById('seconds').textContent = difference.remainingSeconds;

        // Aggiorna le statistiche dettagliate
        document.getElementById('totalDays').textContent = difference.totalDays;
        
        // Calcola giorni feriali e weekend
        const weekdays = this.calculateWeekdays(startDate, endDate);
        const weekends = difference.totalDays - weekdays;
        
        document.getElementById('weekdays').textContent = weekdays;
        document.getElementById('weekends').textContent = weekends;

        // Aggiorna i nomi dei giorni
        document.getElementById('startDay').textContent = startDate.toLocaleDateString('it-IT', { weekday: 'long' });
        document.getElementById('endDay').textContent = endDate.toLocaleDateString('it-IT', { weekday: 'long' });

        // Genera fatti interessanti
        this.generateFunFacts(difference, startDate, endDate);

        // Mostra la sezione dei risultati
        const resultSection = document.getElementById('result');
        if (resultSection) {
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    calculateWeekdays(startDate, endDate) {
        let weekdays = 0;
        const current = new Date(startDate);
        
        while (current <= endDate) {
            const dayOfWeek = current.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Non domenica (0) o sabato (6)
                weekdays++;
            }
            current.setDate(current.getDate() + 1);
        }
        
        return weekdays;
    }

    generateFunFacts(difference, startDate, endDate) {
        const funFacts = document.getElementById('funFacts');
        if (!funFacts) return;

        const facts = [];
        
        // Aggiungi fatti basati sul periodo di tempo
        if (difference.years >= 1) {
            facts.push(`Questo periodo copre ${difference.years} anno${difference.years !== 1 ? 'i' : ''}!`);
        }
        
        if (difference.totalDays >= 365) {
            facts.push(`Sono più di un anno di tempo!`);
        }
        
        if (difference.totalDays >= 1000) {
            facts.push(`Oltre 1000 giorni - è un viaggio abbastanza lungo!`);
        }
        
        if (difference.weeks >= 52) {
            facts.push(`Più di un anno in settimane: ${difference.weeks} settimane!`);
        }
        
        // Aggiungi fatti stagionali
        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();
        if (startMonth !== endMonth) {
            facts.push(`Questo periodo attraversa più mesi.`);
        }
        
        // Aggiungi fatti sui giorni feriali
        const weekdays = this.calculateWeekdays(startDate, endDate);
        const weekends = difference.totalDays - weekdays;
        facts.push(`Include ${weekdays} giorni feriali e ${weekends} giorni di weekend.`);

        const factContent = funFacts.querySelector('.fact-content');
        if (factContent) {
            factContent.innerHTML = facts.map(fact => `<p>💡 ${fact}</p>`).join('');
        }
    }

    resetForm() {
        const form = document.getElementById('dateDifferenceForm');
        if (form) {
            form.reset();
            this.setDefaultDates();
            this.toggleTimeInputs(false);
            
            const resultSection = document.getElementById('result');
            if (resultSection) {
                resultSection.style.display = 'none';
            }
        }
    }

    copyResult() {
        const resultText = this.generateResultText();
        
        navigator.clipboard.writeText(resultText).then(() => {
            // Mostra messaggio di successo
            const copyBtn = document.getElementById('copyBtn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✅</span><span>Copiato!</span>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            }
        }).catch(err => {
            console.error('Impossibile copiare: ', err);
            alert('Impossibile copiare il risultato. Si prega di riprovare.');
        });
    }

    generateResultText() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const years = document.getElementById('years').textContent;
        const months = document.getElementById('months').textContent;
        const days = document.getElementById('days').textContent;
        
        return `Risultato Calcolatore Differenza Date:
Da: ${startDate} a ${endDate}
Durata: ${years} anni, ${months} mesi, ${days} giorni
Calcolato il: ${new Date().toLocaleString('it-IT')}`;
    }

    shareResult() {
        const resultText = this.generateResultText();
        const shareData = {
            title: 'Risultato Calcolatore Differenza Date',
            text: resultText,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(err => {
                console.error('Errore nella condivisione:', err);
                this.copyResult(); // Fallback alla copia
            });
        } else {
            this.copyResult(); // Fallback alla copia
        }
    }
}

// Inizializza il calcolatore quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    new DateDifferenceCalculator();
}); 