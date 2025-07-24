// 日期差计算器 - 中文版本
class DateDifferenceCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setDefaultDates();
    }

    bindEvents() {
        // 表单提交
        const form = document.getElementById('dateDifferenceForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateDifference();
            });
        }

        // 时间切换
        const timeToggle = document.getElementById('includeTime');
        if (timeToggle) {
            timeToggle.addEventListener('change', (e) => {
                this.toggleTimeInputs(e.target.checked);
            });
        }

        // 重置按钮
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetForm();
            });
        }

        // 复制按钮
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyResult();
            });
        }

        // 分享按钮
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareResult();
            });
        }

        // 实时验证
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
                endDate.setCustomValidity('结束日期应该在开始日期之后');
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
            alert('请选择开始和结束日期。');
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
            alert('结束日期应该在开始日期之后。');
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

        // 计算年、月、天
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

        // 计算周
        const weeks = Math.floor(diffDays / 7);

        // 计算剩余的小时、分钟、秒
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
        // 更新主要结果摘要
        const summary = document.getElementById('resultSummary');
        if (summary) {
            let summaryText = '';
            if (difference.years > 0) summaryText += `${difference.years}年 `;
            if (difference.months > 0) summaryText += `${difference.months}个月 `;
            if (difference.remainingDays > 0) summaryText += `${difference.remainingDays}天 `;
            
            if (summaryText === '') {
                summaryText = `${difference.days}天`;
            }
            
            summary.innerHTML = `<h3>${summaryText}</h3>`;
        }

        // 更新结果网格
        document.getElementById('years').textContent = difference.years;
        document.getElementById('months').textContent = difference.months;
        document.getElementById('weeks').textContent = difference.weeks;
        document.getElementById('days').textContent = difference.remainingDays;
        document.getElementById('hours').textContent = difference.remainingHours;
        document.getElementById('minutes').textContent = difference.remainingMinutes;
        document.getElementById('seconds').textContent = difference.remainingSeconds;

        // 更新详细统计
        document.getElementById('totalDays').textContent = difference.totalDays;
        
        // 计算工作日和周末
        const weekdays = this.calculateWeekdays(startDate, endDate);
        const weekends = difference.totalDays - weekdays;
        
        document.getElementById('weekdays').textContent = weekdays;
        document.getElementById('weekends').textContent = weekends;

        // 更新星期几
        const weekdays_zh = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        document.getElementById('startDay').textContent = weekdays_zh[startDate.getDay()];
        document.getElementById('endDay').textContent = weekdays_zh[endDate.getDay()];

        // 生成有趣事实
        this.generateFunFacts(difference, startDate, endDate);

        // 显示结果区域
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
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 不是星期日(0)或星期六(6)
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
        
        // 根据时间段添加事实
        if (difference.years >= 1) {
            facts.push(`这个时间段跨越了${difference.years}年！`);
        }
        
        if (difference.totalDays >= 365) {
            facts.push(`超过一年的时间！`);
        }
        
        if (difference.totalDays >= 1000) {
            facts.push(`超过1000天 - 这是一段很长的旅程！`);
        }
        
        if (difference.weeks >= 52) {
            facts.push(`按周计算超过一年：${difference.weeks}周！`);
        }
        
        // 添加季节性事实
        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();
        if (startMonth !== endMonth) {
            facts.push(`这个时间段跨越了多个月份。`);
        }
        
        // 添加工作日事实
        const weekdays = this.calculateWeekdays(startDate, endDate);
        const weekends = difference.totalDays - weekdays;
        facts.push(`包括${weekdays}个工作日和${weekends}个周末。`);

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
            // 显示成功消息
            const copyBtn = document.getElementById('copyBtn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✅</span><span>已复制！</span>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            }
        }).catch(err => {
            console.error('复制失败: ', err);
            alert('复制失败，请重试。');
        });
    }

    generateResultText() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const years = document.getElementById('years').textContent;
        const months = document.getElementById('months').textContent;
        const days = document.getElementById('days').textContent;
        
        return `日期差计算结果:
从: ${startDate} 到 ${endDate}
持续时间: ${years}年, ${months}个月, ${days}天
计算时间: ${new Date().toLocaleString('zh-CN')}`;
    }

    shareResult() {
        const resultText = this.generateResultText();
        const shareData = {
            title: '日期差计算结果',
            text: resultText,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(err => {
                console.error('分享错误:', err);
                this.copyResult(); // 回退到复制
            });
        } else {
            this.copyResult(); // 回退到复制
        }
    }
}

// 当DOM加载完成时初始化计算器
document.addEventListener('DOMContentLoaded', () => {
    new DateDifferenceCalculator();
}); 