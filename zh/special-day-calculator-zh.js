// 特殊日子计算器 JavaScript - 中文版本
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('specialDayForm');
    const resultsSection = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');
    const copyBtn = document.getElementById('copyResult');
    const shareBtn = document.getElementById('shareResult');

    // 设置默认日期为今天
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;

    // 星座数据
    const zodiacSigns = [
        { name: '摩羯座', start: '12-22', end: '01-19', emoji: '♑' },
        { name: '水瓶座', start: '01-20', end: '02-18', emoji: '♒' },
        { name: '双鱼座', start: '02-19', end: '03-20', emoji: '♓' },
        { name: '白羊座', start: '03-21', end: '04-19', emoji: '♈' },
        { name: '金牛座', start: '04-20', end: '05-20', emoji: '♉' },
        { name: '双子座', start: '05-21', end: '06-20', emoji: '♊' },
        { name: '巨蟹座', start: '06-21', end: '07-22', emoji: '♋' },
        { name: '狮子座', start: '07-23', end: '08-22', emoji: '♌' },
        { name: '处女座', start: '08-23', end: '09-22', emoji: '♍' },
        { name: '天秤座', start: '09-23', end: '10-22', emoji: '♎' },
        { name: '天蝎座', start: '10-23', end: '11-21', emoji: '♏' },
        { name: '射手座', start: '11-22', end: '12-21', emoji: '♐' }
    ];

    // 中国生肖
    const chineseZodiac = [
        '鼠', '牛', '虎', '兔', '龙', '蛇',
        '马', '羊', '猴', '鸡', '狗', '猪'
    ];

    // 星期几
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    // 表单提交处理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateSpecialDays();
    });

    // 重置按钮处理
    form.addEventListener('reset', function() {
        setTimeout(() => {
            resultsSection.style.display = 'none';
            document.getElementById('startDate').value = today;
        }, 100);
    });

    // 复制结果处理
    copyBtn.addEventListener('click', copyResults);

    // 分享结果处理
    shareBtn.addEventListener('click', shareResults);

    // 计算特殊日子
    function calculateSpecialDays() {
        const startDate = new Date(document.getElementById('startDate').value);
        const selectedMilestones = Array.from(document.querySelectorAll('input[name="milestone"]:checked'))
            .map(cb => parseInt(cb.value));
        const customDays = parseInt(document.getElementById('customDays').value) || 0;

        if (isNaN(startDate.getTime())) {
            alert('请输入有效的起始日期。');
            return;
        }

        const results = [];

        // 计算里程碑日期
        selectedMilestones.forEach(days => {
            const milestoneDate = new Date(startDate);
            milestoneDate.setDate(startDate.getDate() + days);
            results.push({
                type: 'milestone',
                days: days,
                date: milestoneDate,
                label: `${days}天`
            });
        });

        // 计算自定义天数
        if (customDays > 0) {
            const customDate = new Date(startDate);
            customDate.setDate(startDate.getDate() + customDays);
            results.push({
                type: 'custom',
                days: customDays,
                date: customDate,
                label: `${customDays}天`
            });
        }

        displayResults(results, startDate);
    }

    // 显示结果
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
                        <h3>${result.label} ${result.type === 'milestone' ? '里程碑' : '后'}</h3>
                        <div class="result-date">
                            <span class="date-main">${formatDate(date)}</span>
                            <span class="day-of-week">(${dayOfWeek})</span>
                        </div>
                    </div>
                    
                    <div class="result-details">
                        <div class="detail-item">
                            <span class="detail-icon">⭐</span>
                            <span class="detail-label">星座：</span>
                            <span class="detail-value">${zodiac.emoji} ${zodiac.name}</span>
                        </div>
                        
                        <div class="detail-item">
                            <span class="detail-icon">🐉</span>
                            <span class="detail-label">生肖：</span>
                            <span class="detail-value">${chineseZodiacAnimal}</span>
                        </div>
                        
                        ${ageOnDate ? `
                        <div class="detail-item">
                            <span class="detail-icon">🎂</span>
                            <span class="detail-label">那天年龄：</span>
                            <span class="detail-value">${ageOnDate}</span>
                        </div>
                        ` : ''}
                        
                        <div class="detail-item">
                            <span class="detail-icon">⏰</span>
                            <span class="detail-label">倒计时：</span>
                            <span class="detail-value">${countdown}</span>
                        </div>
                    </div>
                    
                    <div class="historical-events">
                        <h4>📚 ${formatDate(date)}的历史事件</h4>
                        <div class="events-content" id="events-${date.getTime()}">
                            <div class="loading">正在加载历史事件...</div>
                        </div>
                    </div>
                </div>
            `;
        });

        resultsContent.innerHTML = html;
        resultsSection.style.display = 'block';

        // 为每个日期加载历史事件
        results.forEach(result => {
            loadHistoricalEvents(result.date);
        });

        // 平滑滚动到结果区域
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 获取星座
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
        
        return zodiacSigns[0]; // 默认回退
    }

    // 获取中国生肖
    function getChineseZodiac(date) {
        const year = date.getFullYear();
        return chineseZodiac[(year - 4) % 12];
    }

    // 获取倒计时
    function getCountdown(targetDate) {
        const now = new Date();
        const diffTime = targetDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return `${Math.abs(diffDays)}天前`;
        } else if (diffDays === 0) {
            return '今天！';
        } else if (diffDays === 1) {
            return '明天！';
        } else {
            const years = Math.floor(diffDays / 365);
            const months = Math.floor((diffDays % 365) / 30);
            const days = diffDays % 30;
            
            let countdown = '';
            if (years > 0) countdown += `${years}年 `;
            if (months > 0) countdown += `${months}个月 `;
            if (days > 0) countdown += `${days}天`;
            
            return countdown.trim() || `${diffDays}天`;
        }
    }

    // 获取特定日期的年龄
    function getAgeOnDate(birthDate, targetDate) {
        if (targetDate < birthDate) return null;
        
        const diffTime = targetDate.getTime() - birthDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = diffDays % 30;
        
        return `${years}岁${months}个月${days}天`;
    }

    // 格式化日期显示
    function formatDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    }

    // 从维基百科API加载历史事件
    async function loadHistoricalEvents(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const eventsContainer = document.getElementById(`events-${date.getTime()}`);
        
        try {
            // 使用维基百科API获取"历史上的今天"事件
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`);
            const data = await response.json();
            
            if (data.events && data.events.length > 0) {
                const events = data.events.slice(0, 3); // 显示前3个事件
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
                eventsContainer.innerHTML = '<p class="no-events">未找到该日期的重大历史事件。</p>';
            }
        } catch (error) {
            console.log('加载历史事件时出错:', error);
            eventsContainer.innerHTML = `
                <p class="no-events">
                    <span class="event-year">${date.getFullYear()}</span>
                    <span class="event-text">这将是历史上的一个特殊日子！</span>
                </p>
            `;
        }
    }

    // 复制结果到剪贴板
    function copyResults() {
        const resultsText = generateResultsText();
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(resultsText).then(() => {
                showNotification('结果已复制到剪贴板！', 'success');
            }).catch(() => {
                fallbackCopyTextToClipboard(resultsText);
            });
        } else {
            fallbackCopyTextToClipboard(resultsText);
        }
    }

    // 备用复制方法
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
            showNotification('结果已复制到剪贴板！', 'success');
        } catch (err) {
            showNotification('复制结果失败', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    // 生成分享文本
    function generateResultsText() {
        const startDate = document.getElementById('startDate').value;
        let text = `🎉 特殊日子计算器结果\n\n`;
        text += `起始日期：${new Date(startDate).toLocaleDateString('zh-CN')}\n\n`;
        
        const resultCards = document.querySelectorAll('.result-card');
        resultCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            const date = card.querySelector('.date-main').textContent;
            const dayOfWeek = card.querySelector('.day-of-week').textContent;
            
            text += `${title}：${date} ${dayOfWeek}\n`;
        });
        
        text += `\n由特殊日子计算器计算`;
        return text;
    }

    // 分享结果
    function shareResults() {
        const resultsText = generateResultsText();
        
        if (navigator.share) {
            navigator.share({
                title: '我的特殊日子',
                text: resultsText,
                url: window.location.href
            }).catch(() => {
                copyResults();
            });
        } else {
            copyResults();
        }
    }

    // 显示通知
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

    // 表单变化时自动计算
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