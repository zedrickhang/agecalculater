// Date Difference Calculator
class DateDifferenceCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setDefaultDates();
    }

    bindEvents() {
        // Form submission
        const form = document.getElementById('dateDifferenceForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateDifference();
            });
        }

        // Time toggle
        const timeToggle = document.getElementById('includeTime');
        if (timeToggle) {
            timeToggle.addEventListener('change', (e) => {
                this.toggleTimeInputs(e.target.checked);
            });
        }

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetForm();
            });
        }

        // Copy button
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyResult();
            });
        }

        // Share button
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareResult();
            });
        }

        // Real-time validation
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
                endDate.setCustomValidity('End date should be after start date');
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
            alert('Please select both start and end dates.');
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
            alert('End date should be after start date.');
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

        // Calculate years, months, days
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

        // Calculate weeks
        const weeks = Math.floor(diffDays / 7);

        // Calculate remaining hours, minutes, seconds
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
        // Update main result summary
        const summary = document.getElementById('resultSummary');
        if (summary) {
            let summaryText = '';
            if (difference.years > 0) summaryText += `${difference.years} year${difference.years !== 1 ? 's' : ''} `;
            if (difference.months > 0) summaryText += `${difference.months} month${difference.months !== 1 ? 's' : ''} `;
            if (difference.remainingDays > 0) summaryText += `${difference.remainingDays} day${difference.remainingDays !== 1 ? 's' : ''} `;
            
            if (summaryText === '') {
                summaryText = `${difference.days} day${difference.days !== 1 ? 's' : ''}`;
            }
            
            summary.innerHTML = `<h3>${summaryText}</h3>`;
        }

        // Update result grid
        document.getElementById('years').textContent = difference.years;
        document.getElementById('months').textContent = difference.months;
        document.getElementById('weeks').textContent = difference.weeks;
        document.getElementById('days').textContent = difference.remainingDays;
        document.getElementById('hours').textContent = difference.remainingHours;
        document.getElementById('minutes').textContent = difference.remainingMinutes;
        document.getElementById('seconds').textContent = difference.remainingSeconds;

        // Update detailed stats
        document.getElementById('totalDays').textContent = difference.totalDays;
        
        // Calculate weekdays and weekends
        const weekdays = this.calculateWeekdays(startDate, endDate);
        const weekends = difference.totalDays - weekdays;
        
        document.getElementById('weekdays').textContent = weekdays;
        document.getElementById('weekends').textContent = weekends;

        // Update day names
        document.getElementById('startDay').textContent = startDate.toLocaleDateString('en-US', { weekday: 'long' });
        document.getElementById('endDay').textContent = endDate.toLocaleDateString('en-US', { weekday: 'long' });

        // Generate fun facts
        this.generateFunFacts(difference, startDate, endDate);

        // Show result section
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
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
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
        
        // Add facts based on the time period
        if (difference.years >= 1) {
            facts.push(`This period spans ${difference.years} year${difference.years !== 1 ? 's' : ''}!`);
        }
        
        if (difference.totalDays >= 365) {
            facts.push(`That's more than a year of time!`);
        }
        
        if (difference.totalDays >= 1000) {
            facts.push(`Over 1000 days - that's quite a journey!`);
        }
        
        if (difference.weeks >= 52) {
            facts.push(`More than a year in weeks: ${difference.weeks} weeks!`);
        }
        
        // Add seasonal facts
        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();
        if (startMonth !== endMonth) {
            facts.push(`This period crosses multiple months.`);
        }
        
        // Add weekday facts
        const weekdays = this.calculateWeekdays(startDate, endDate);
        const weekends = difference.totalDays - weekdays;
        facts.push(`Includes ${weekdays} weekdays and ${weekends} weekend days.`);

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
            // Show success message
            const copyBtn = document.getElementById('copyBtn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✅</span><span>Copied!</span>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            }
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy result. Please try again.');
        });
    }

    generateResultText() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const years = document.getElementById('years').textContent;
        const months = document.getElementById('months').textContent;
        const days = document.getElementById('days').textContent;
        
        return `Date Difference Calculator Result:
From: ${startDate} to ${endDate}
Duration: ${years} years, ${months} months, ${days} days
Calculated at: ${new Date().toLocaleString()}`;
    }

    shareResult() {
        const resultText = this.generateResultText();
        const shareData = {
            title: 'Date Difference Calculator Result',
            text: resultText,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(err => {
                console.error('Error sharing:', err);
                this.copyResult(); // Fallback to copy
            });
        } else {
            this.copyResult(); // Fallback to copy
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DateDifferenceCalculator();
}); 