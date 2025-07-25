// Special Day Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('specialDayForm');
    const resultsSection = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');
    const copyBtn = document.getElementById('copyResult');
    const shareBtn = document.getElementById('shareResult');

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;

    // Zodiac signs data
    const zodiacSigns = [
        { name: 'Capricorn', start: '12-22', end: '01-19', emoji: '♑' },
        { name: 'Aquarius', start: '01-20', end: '02-18', emoji: '♒' },
        { name: 'Pisces', start: '02-19', end: '03-20', emoji: '♓' },
        { name: 'Aries', start: '03-21', end: '04-19', emoji: '♈' },
        { name: 'Taurus', start: '04-20', end: '05-20', emoji: '♉' },
        { name: 'Gemini', start: '05-21', end: '06-20', emoji: '♊' },
        { name: 'Cancer', start: '06-21', end: '07-22', emoji: '♋' },
        { name: 'Leo', start: '07-23', end: '08-22', emoji: '♌' },
        { name: 'Virgo', start: '08-23', end: '09-22', emoji: '♍' },
        { name: 'Libra', start: '09-23', end: '10-22', emoji: '♎' },
        { name: 'Scorpio', start: '10-23', end: '11-21', emoji: '♏' },
        { name: 'Sagittarius', start: '11-22', end: '12-21', emoji: '♐' }
    ];

    // Chinese zodiac animals
    const chineseZodiac = [
        'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
    ];

    // Days of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateSpecialDays();
    });

    // Reset button handler
    form.addEventListener('reset', function() {
        setTimeout(() => {
            resultsSection.style.display = 'none';
            document.getElementById('startDate').value = today;
        }, 100);
    });

    // Copy results handler
    copyBtn.addEventListener('click', copyResults);

    // Share results handler
    shareBtn.addEventListener('click', shareResults);

    // Calculate special days
    function calculateSpecialDays() {
        const startDate = new Date(document.getElementById('startDate').value);
        const selectedMilestones = Array.from(document.querySelectorAll('input[name="milestone"]:checked'))
            .map(cb => parseInt(cb.value));
        const customDays = parseInt(document.getElementById('customDays').value) || 0;

        if (isNaN(startDate.getTime())) {
            alert('Please enter a valid start date.');
            return;
        }

        const results = [];

        // Calculate milestone dates
        selectedMilestones.forEach(days => {
            const milestoneDate = new Date(startDate);
            milestoneDate.setDate(startDate.getDate() + days);
            results.push({
                type: 'milestone',
                days: days,
                date: milestoneDate,
                label: `${days} Days`
            });
        });

        // Calculate custom days
        if (customDays > 0) {
            const customDate = new Date(startDate);
            customDate.setDate(startDate.getDate() + customDays);
            results.push({
                type: 'custom',
                days: customDays,
                date: customDate,
                label: `${customDays} Days`
            });
        }

        displayResults(results, startDate);
    }

    // Display results
    function displayResults(results, startDate) {
        let html = '';

        results.forEach(result => {
            const date = result.date;
            const dayOfWeek = daysOfWeek[date.getDay()];
            const zodiac = getZodiacSign(date);
            const chineseZodiacAnimal = getChineseZodiac(date);
            const countdown = getCountdown(date);
            const ageOnDate = getAgeOnDate(startDate, date);

            html += `
                <div class="result-card ${result.type}-result">
                    <div class="result-header">
                        <h3>${result.label} ${result.type === 'milestone' ? 'Milestone' : 'Later'}</h3>
                        <div class="result-date">
                            <span class="date-main">${formatDate(date)}</span>
                            <span class="day-of-week">(${dayOfWeek})</span>
                        </div>
                    </div>
                    
                    <div class="result-details">
                        <div class="detail-item">
                            <span class="detail-icon">⭐</span>
                            <span class="detail-label">Zodiac:</span>
                            <span class="detail-value">${zodiac.emoji} ${zodiac.name}</span>
                        </div>
                        
                        <div class="detail-item">
                            <span class="detail-icon">🐉</span>
                            <span class="detail-label">Chinese Zodiac:</span>
                            <span class="detail-value">${chineseZodiacAnimal}</span>
                        </div>
                        
                        ${ageOnDate ? `
                        <div class="detail-item">
                            <span class="detail-icon">🎂</span>
                            <span class="detail-label">Age on that day:</span>
                            <span class="detail-value">${ageOnDate}</span>
                        </div>
                        ` : ''}
                        
                        <div class="detail-item">
                            <span class="detail-icon">⏰</span>
                            <span class="detail-label">Countdown:</span>
                            <span class="detail-value">${countdown}</span>
                        </div>
                    </div>
                    
                    <div class="historical-events">
                        <h4>📚 Historical Events on ${formatDate(date)}</h4>
                        <div class="events-content" id="events-${date.getTime()}">
                            <div class="loading">Loading historical events...</div>
                        </div>
                    </div>
                </div>
            `;
        });

        resultsContent.innerHTML = html;
        resultsSection.style.display = 'block';

        // Load historical events for each date
        results.forEach(result => {
            loadHistoricalEvents(result.date);
        });

        // Smooth scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Get zodiac sign for a date
    function getZodiacSign(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        for (let i = 0; i < zodiacSigns.length; i++) {
            const sign = zodiacSigns[i];
            const startParts = sign.start.split('-');
            const endParts = sign.end.split('-');
            
            const startMonth = parseInt(startParts[0]);
            const startDay = parseInt(startParts[1]);
            const endMonth = parseInt(endParts[0]);
            const endDay = parseInt(endParts[1]);
            
            if ((month === startMonth && day >= startDay) || 
                (month === endMonth && day <= endDay) ||
                (startMonth > endMonth && (month > startMonth || (month === startMonth && day >= startDay) || 
                 month < endMonth || (month === endMonth && day <= endDay)))) {
                return sign;
            }
        }
        
        return zodiacSigns[0]; // Default fallback
    }

    // Get Chinese zodiac for a date
    function getChineseZodiac(date) {
        const year = date.getFullYear();
        return chineseZodiac[(year - 4) % 12];
    }

    // Get countdown to a date
    function getCountdown(targetDate) {
        const now = new Date();
        const diffTime = targetDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return `${Math.abs(diffDays)} days ago`;
        } else if (diffDays === 0) {
            return 'Today!';
        } else if (diffDays === 1) {
            return 'Tomorrow!';
        } else {
            const years = Math.floor(diffDays / 365);
            const months = Math.floor((diffDays % 365) / 30);
            const days = diffDays % 30;
            
            let countdown = '';
            if (years > 0) countdown += `${years} year${years > 1 ? 's' : ''} `;
            if (months > 0) countdown += `${months} month${months > 1 ? 's' : ''} `;
            if (days > 0) countdown += `${days} day${days > 1 ? 's' : ''}`;
            
            return countdown.trim() || `${diffDays} days`;
        }
    }

    // Get age on a specific date
    function getAgeOnDate(birthDate, targetDate) {
        if (targetDate < birthDate) return null;
        
        const diffTime = targetDate.getTime() - birthDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = diffDays % 30;
        
        return `${years} years, ${months} months, ${days} days`;
    }

    // Format date for display
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Load historical events from Wikipedia API
    async function loadHistoricalEvents(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const eventsContainer = document.getElementById(`events-${date.getTime()}`);
        
        try {
            // Use Wikipedia API to get "On This Day" events
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`);
            const data = await response.json();
            
            if (data.events && data.events.length > 0) {
                const events = data.events.slice(0, 3); // Show first 3 events
                let eventsHtml = '<ul class="events-list">';
                
                events.forEach(event => {
                    eventsHtml += `
                        <li>
                            <span class="event-year">${event.year}</span>
                            <span class="event-text">${event.text}</span>
                        </li>
                    `;
                });
                
                eventsHtml += '</ul>';
                eventsContainer.innerHTML = eventsHtml;
            } else {
                eventsContainer.innerHTML = '<p class="no-events">No significant historical events found for this date.</p>';
            }
        } catch (error) {
            console.log('Error loading historical events:', error);
            eventsContainer.innerHTML = `
                <p class="no-events">
                    <span class="event-year">${date.getFullYear()}</span>
                    <span class="event-text">This will be a special day in history!</span>
                </p>
            `;
        }
    }

    // Copy results to clipboard
    function copyResults() {
        const resultsText = generateResultsText();
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(resultsText).then(() => {
                showNotification('Results copied to clipboard!', 'success');
            }).catch(() => {
                fallbackCopyTextToClipboard(resultsText);
            });
        } else {
            fallbackCopyTextToClipboard(resultsText);
        }
    }

    // Fallback copy method
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Results copied to clipboard!', 'success');
        } catch (err) {
            showNotification('Failed to copy results', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    // Generate text for sharing
    function generateResultsText() {
        const startDate = document.getElementById('startDate').value;
        let text = `🎉 Special Day Calculator Results\n\n`;
        text += `Start Date: ${new Date(startDate).toLocaleDateString()}\n\n`;
        
        const resultCards = document.querySelectorAll('.result-card');
        resultCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            const date = card.querySelector('.date-main').textContent;
            const dayOfWeek = card.querySelector('.day-of-week').textContent;
            
            text += `${title}: ${date} ${dayOfWeek}\n`;
        });
        
        text += `\nCalculated with Special Day Calculator`;
        return text;
    }

    // Share results
    function shareResults() {
        const resultsText = generateResultsText();
        
        if (navigator.share) {
            navigator.share({
                title: 'My Special Days',
                text: resultsText,
                url: window.location.href
            }).catch(() => {
                copyResults();
            });
        } else {
            copyResults();
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Auto-calculate on form changes
    document.getElementById('startDate').addEventListener('change', function() {
        if (document.querySelectorAll('input[name="milestone"]:checked').length > 0) {
            calculateSpecialDays();
        }
    });

    document.querySelectorAll('input[name="milestone"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (document.getElementById('startDate').value) {
                calculateSpecialDays();
            }
        });
    });

    document.getElementById('customDays').addEventListener('input', function() {
        if (this.value && document.getElementById('startDate').value) {
            calculateSpecialDays();
        }
    });
}); 