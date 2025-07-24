// Máy tính chênh lệch ngày tháng
class DateDifferenceCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setDefaultDates();
    }

    bindEvents() {
        // Gửi biểu mẫu
        const form = document.getElementById('dateDifferenceForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateDifference();
            });
        }

        // Chuyển đổi thời gian
        const timeToggle = document.getElementById('includeTime');
        if (timeToggle) {
            timeToggle.addEventListener('change', (e) => {
                this.toggleTimeInputs(e.target.checked);
            });
        }

        // Nút đặt lại
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetForm();
            });
        }

        // Nút sao chép
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyResult();
            });
        }

        // Nút chia sẻ
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareResult();
            });
        }

        // Xác thực thời gian thực
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
                endDate.setCustomValidity('Ngày kết thúc phải sau ngày bắt đầu');
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
            alert('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.');
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
            alert('Ngày kết thúc phải sau ngày bắt đầu.');
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

        // Tính năm, tháng, ngày
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

        // Tính tuần
        const weeks = Math.floor(diffDays / 7);

        // Tính giờ, phút, giây còn lại
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
        // Cập nhật tóm tắt kết quả chính
        const summary = document.getElementById('resultSummary');
        if (summary) {
            let summaryText = '';
            if (difference.years > 0) summaryText += `${difference.years} năm `;
            if (difference.months > 0) summaryText += `${difference.months} tháng `;
            if (difference.remainingDays > 0) summaryText += `${difference.remainingDays} ngày `;
            
            if (summaryText === '') {
                summaryText = `${difference.days} ngày`;
            }
            
            summary.innerHTML = `<h3>${summaryText}</h3>`;
        }

        // Cập nhật lưới kết quả
        document.getElementById('years').textContent = difference.years;
        document.getElementById('months').textContent = difference.months;
        document.getElementById('weeks').textContent = difference.weeks;
        document.getElementById('days').textContent = difference.remainingDays;
        document.getElementById('hours').textContent = difference.remainingHours;
        document.getElementById('minutes').textContent = difference.remainingMinutes;
        document.getElementById('seconds').textContent = difference.remainingSeconds;

        // Cập nhật thống kê chi tiết
        document.getElementById('totalDays').textContent = difference.totalDays;
        
        // Tính ngày trong tuần và cuối tuần
        const weekdays = this.calculateWeekdays(startDate, endDate);
        const weekends = difference.totalDays - weekdays;
        
        document.getElementById('weekdays').textContent = weekdays;
        document.getElementById('weekends').textContent = weekends;

        // Cập nhật tên ngày
        document.getElementById('startDay').textContent = startDate.toLocaleDateString('vi-VN', { weekday: 'long' });
        document.getElementById('endDay').textContent = endDate.toLocaleDateString('vi-VN', { weekday: 'long' });

        // Tạo sự thật thú vị
        this.generateFunFacts(difference, startDate, endDate);

        // Hiển thị phần kết quả
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
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Không phải Chủ nhật (0) hoặc Thứ bảy (6)
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
        
        // Thêm sự thật dựa trên khoảng thời gian
        if (difference.years >= 1) {
            facts.push(`Khoảng thời gian này kéo dài ${difference.years} năm!`);
        }
        
        if (difference.totalDays >= 365) {
            facts.push(`Đó là hơn một năm thời gian!`);
        }
        
        if (difference.totalDays >= 1000) {
            facts.push(`Hơn 1000 ngày - đó là một hành trình khá dài!`);
        }
        
        if (difference.weeks >= 52) {
            facts.push(`Hơn một năm tính bằng tuần: ${difference.weeks} tuần!`);
        }
        
        // Thêm sự thật theo mùa
        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();
        if (startMonth !== endMonth) {
            facts.push(`Khoảng thời gian này trải qua nhiều tháng.`);
        }
        
        // Thêm sự thật về ngày trong tuần
        const weekdays = this.calculateWeekdays(startDate, endDate);
        const weekends = difference.totalDays - weekdays;
        facts.push(`Bao gồm ${weekdays} ngày trong tuần và ${weekends} ngày cuối tuần.`);

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
            // Hiển thị thông báo thành công
            const copyBtn = document.getElementById('copyBtn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✅</span><span>Đã sao chép!</span>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            }
        }).catch(err => {
            console.error('Sao chép thất bại: ', err);
            alert('Sao chép kết quả thất bại. Vui lòng thử lại.');
        });
    }

    generateResultText() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const years = document.getElementById('years').textContent;
        const months = document.getElementById('months').textContent;
        const days = document.getElementById('days').textContent;
        
        return `Kết quả máy tính chênh lệch ngày tháng:
Từ: ${startDate} đến ${endDate}
Thời gian: ${years} năm, ${months} tháng, ${days} ngày
Tính toán lúc: ${new Date().toLocaleString('vi-VN')}`;
    }

    shareResult() {
        const resultText = this.generateResultText();
        const shareData = {
            title: 'Kết quả máy tính chênh lệch ngày tháng',
            text: resultText,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(err => {
                console.error('Lỗi chia sẻ:', err);
                this.copyResult(); // Dự phòng sao chép
            });
        } else {
            this.copyResult(); // Dự phòng sao chép
        }
    }
}

// Khởi tạo máy tính khi DOM được tải
document.addEventListener('DOMContentLoaded', () => {
    new DateDifferenceCalculator();
}); 