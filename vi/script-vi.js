// 年龄计算器主要功能
class AgeCalculator {
    constructor() {
        this.form = document.getElementById('ageForm');
        this.resultSection = document.getElementById('result');
        this.init();
    }

    init() {
        // 设置默认日期
        this.setDefaultDates();
        
        // 绑定表单提交事件
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateAge();
        });

        // 实时计算功能（可选）
        const inputs = this.form.querySelectorAll('input[type="datetime-local"]');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                if (this.form.birthDate.value && this.form.targetDate.value) {
                    this.calculateAge();
                }
            });
        });
    }

    setDefaultDates() {
        const today = new Date();
        const birthDate = new Date();
        birthDate.setFullYear(today.getFullYear() - 25); // 默认25年前
        
        // 设置默认值（包含时间）
        document.getElementById('birthDate').value = this.formatDateTimeForInput(birthDate);
        document.getElementById('targetDate').value = this.formatDateTimeForInput(today);
    }

    formatDateTimeForInput(date) {
        // 返回YYYY-MM-DDTHH:MM格式
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    calculateAge() {
        const birthDateValue = document.getElementById('birthDate').value;
        const targetDateValue = document.getElementById('targetDate').value;

        if (!birthDateValue || !targetDateValue) {
            this.showError('请选择有效的日期');
            return;
        }

        const birthDate = new Date(birthDateValue);
        const targetDate = new Date(targetDateValue);

        // 验证日期逻辑
        if (birthDate > targetDate) {
            this.showError('出生日期不能晚于目标日期');
            return;
        }

        // 计算年龄差
        const ageData = this.getAgeDifference(birthDate, targetDate);
        
        // 显示结果
        this.displayResults(ageData);
    }

    getAgeDifference(birthDate, targetDate) {
        // 计算总的时间差（毫秒）
        const totalMs = targetDate.getTime() - birthDate.getTime();
        
        // 计算各种时间单位
        const msPerSecond = 1000;
        const msPerMinute = msPerSecond * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;

        // 计算年月日
        let years = targetDate.getFullYear() - birthDate.getFullYear();
        let months = targetDate.getMonth() - birthDate.getMonth();
        let days = targetDate.getDate() - birthDate.getDate();

        // 调整月份和年份
        if (days < 0) {
            months--;
            const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // 计算总的各种时间单位
        const totalDays = Math.floor(totalMs / msPerDay);
        const totalWeeks = Math.floor(totalMs / msPerWeek);
        const totalHours = Math.floor(totalMs / msPerHour);
        const totalMinutes = Math.floor(totalMs / msPerMinute);
        const totalSeconds = Math.floor(totalMs / msPerSecond);
        
        // 计算总月数（更精确的计算）
        const totalMonths = years * 12 + months;
        
        // 计算剩余的小时、分钟、秒（当天的剩余时间）
        const remainingMs = totalMs % msPerDay;
        const hours = Math.floor(remainingMs / msPerHour);
        const minutes = Math.floor((remainingMs % msPerHour) / msPerMinute);
        const seconds = Math.floor((remainingMs % msPerMinute) / msPerSecond);

        return {
            years,
            months,
            days,
            hours,
            minutes,
            seconds,
            totalDays,
            totalWeeks,
            totalMonths,
            totalHours,
            totalMinutes,
            totalSeconds,
            totalMs
        };
    }

    displayResults(ageData) {
        // 更新结果数值
        document.getElementById('years').textContent = ageData.years;
        document.getElementById('months').textContent = ageData.months;
        document.getElementById('days').textContent = ageData.days;
        document.getElementById('hours').textContent = ageData.hours;
        document.getElementById('minutes').textContent = ageData.minutes;
        document.getElementById('seconds').textContent = ageData.seconds;

        // 更新摘要文本
        const summaryText = this.generateSummaryText(ageData);
        document.getElementById('summaryText').textContent = summaryText;
        
        // 更新详细统计信息
        const detailsText = this.generateDetailedStats(ageData);
        document.getElementById('detailedStats').innerHTML = detailsText;

        // 显示结果区域
        this.resultSection.style.display = 'block';
        
        // 绑定操作按钮事件
        this.bindActionButtons(ageData);
        
        // 滚动到结果区域
        this.resultSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    }

    generateSummaryText(ageData) {
        const { years, months, days } = ageData;
        
        let summary = '';
        
        if (years > 0) {
            summary += `${years}年`;
        }
        
        if (months > 0) {
            if (summary) summary += ' ';
            summary += `${months}个月`;
        }
        
        if (days > 0) {
            if (summary) summary += ' ';
            summary += `${days}天`;
        }

        return summary ? `您已经生活了 ${summary}` : '计算完成';
    }

    generateDetailedStats(ageData) {
        const stats = [
            {
                label: '或者',
                value: `${ageData.totalMonths.toLocaleString()} 个月 ${ageData.days} 天`,
                icon: '📅'
            },
            {
                label: '或者',
                value: `${ageData.totalWeeks.toLocaleString()} 周 ${ageData.totalDays % 7} 天`,
                icon: '📊'
            },
            {
                label: '或者',
                value: `${ageData.totalDays.toLocaleString()} 天`,
                icon: '🌅'
            },
            {
                label: '或者',
                value: `${ageData.totalHours.toLocaleString()} 小时`,
                icon: '⏰'
            },
            {
                label: '或者',
                value: `${ageData.totalMinutes.toLocaleString()} 分钟`,
                icon: '⏱️'
            },
            {
                label: '或者',
                value: `${ageData.totalSeconds.toLocaleString()} 秒`,
                icon: '⚡'
            }
        ];

        return stats.map(stat => 
            `<div class="detail-item">
                <span class="detail-icon">${stat.icon}</span>
                <span class="detail-label">${stat.label}</span>
                <span class="detail-value">${stat.value}</span>
            </div>`
        ).join('');
    }

    bindActionButtons(ageData) {
        const shareBtn = document.getElementById('shareBtn');
        const saveBtn = document.getElementById('saveBtn');
        
        if (shareBtn) {
            shareBtn.onclick = () => this.shareResult(ageData);
        }
        
        if (saveBtn) {
            saveBtn.onclick = () => this.saveResult(ageData);
        }
    }

    shareResult(ageData) {
        const { years, months, days } = ageData;
        const text = `🎂 年龄计算结果：${years}年${months}个月${days}天
        
📊 详细统计：
• ${ageData.totalMonths.toLocaleString()} 个月 ${days} 天
• ${ageData.totalWeeks.toLocaleString()} 周 ${ageData.totalDays % 7} 天  
• ${ageData.totalDays.toLocaleString()} 天
• ${ageData.totalHours.toLocaleString()} 小时
• ${ageData.totalMinutes.toLocaleString()} 分钟
• ${ageData.totalSeconds.toLocaleString()} 秒

来源：精确年龄计算器`;
        
        if (navigator.share) {
            navigator.share({
                title: '年龄计算结果',
                text: text,
                url: window.location.href
            }).catch(err => {
                console.log('分享失败:', err);
                this.copyToClipboard(text);
            });
        } else {
            this.copyToClipboard(text);
        }
    }

    saveResult(ageData) {
        const { years, months, days } = ageData;
        const birthDate = document.getElementById('birthDate').value;
        const targetDate = document.getElementById('targetDate').value;
        
        // Tạo canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Thiết lập kích thước canvas
        canvas.width = 800;
        canvas.height = 600;
        
        // Thiết lập gradient nền
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Thiết lập kiểu chữ
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        
        // Tiêu đề
        ctx.font = 'bold 36px Arial, sans-serif';
        ctx.fillText('🎂 Kết Quả Tính Tuổi', canvas.width / 2, 80);
        
        // Kết quả chính
        ctx.font = 'bold 48px Arial, sans-serif';
        const yearText = years === 1 ? 'Năm' : 'Năm';
        const monthText = months === 1 ? 'Tháng' : 'Tháng';
        const dayText = days === 1 ? 'Ngày' : 'Ngày';
        ctx.fillText(`${years} ${yearText} ${months} ${monthText} ${days} ${dayText}`, canvas.width / 2, 160);
        
        // Tiêu đề thống kê chi tiết
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.fillText('📊 Thống Kê Chi Tiết', canvas.width / 2, 220);
        
        // Nội dung thống kê chi tiết
        ctx.font = '20px Arial, sans-serif';
        const stats = [
            `📅 ${ageData.totalMonths.toLocaleString()} tháng ${days} ngày`,
            `📊 ${ageData.totalWeeks.toLocaleString()} tuần ${ageData.totalDays % 7} ngày`,
            `🌅 ${ageData.totalDays.toLocaleString()} ngày`,
            `⏰ ${ageData.totalHours.toLocaleString()} giờ`,
            `⏱️ ${ageData.totalMinutes.toLocaleString()} phút`,
            `⚡ ${ageData.totalSeconds.toLocaleString()} giây`
        ];
        
        stats.forEach((stat, index) => {
            ctx.fillText(stat, canvas.width / 2, 260 + (index * 35));
        });
        
        // Thông tin cuối trang
        ctx.font = '16px Arial, sans-serif';
        ctx.fillStyle = '#e0e0e0';
        ctx.fillText(`Tính toán vào: ${new Date().toLocaleString('vi-VN')}`, canvas.width / 2, 520);
        ctx.fillText('Nguồn: Máy Tính Tuổi Chính Xác - agecomputation.com', canvas.width / 2, 550);
        
        // Chuyển đổi thành PNG và tải xuống
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `ket_qua_tinh_tuoi_${new Date().toISOString().split('T')[0]}.png`;
            link.click();
            
            URL.revokeObjectURL(url);
            
            // Hiển thị thông báo thành công
            this.showSuccess('Hình ảnh kết quả tính tuổi đã được lưu!');
        }, 'image/png');
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showSuccess('结果已复制到剪贴板！');
            }).catch(() => {
                this.fallbackCopyTextToClipboard(text);
            });
        } else {
            this.fallbackCopyTextToClipboard(text);
        }
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-999px";
        textArea.style.left = "-999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showSuccess('结果已复制到剪贴板！');
        } catch (err) {
            this.showError('复制失败，请手动复制结果');
        }
        
        document.body.removeChild(textArea);
    }

    showSuccess(message) {
        // 创建成功提示
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    showError(message) {
        // 简单的错误提示
        alert(message);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new AgeCalculator();
});

// 添加一些实用的辅助功能
class AgeCalculatorUtils {
    static formatNumber(num) {
        return num.toLocaleString();
    }

    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    static getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    static getAgeInWords(years) {
        const ageRanges = [
            { min: 0, max: 2, label: '婴幼儿' },
            { min: 3, max: 12, label: '儿童' },
            { min: 13, max: 17, label: '青少年' },
            { min: 18, max: 35, label: '青年' },
            { min: 36, max: 59, label: '中年' },
            { min: 60, max: 100, label: '老年' }
        ];

        for (const range of ageRanges) {
            if (years >= range.min && years <= range.max) {
                return range.label;
            }
        }

        return '超级长寿';
    }
}

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const form = document.getElementById('ageForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// 添加数据验证
function validateDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    
    // 检查是否是有效日期
    if (isNaN(date.getTime())) {
        return { valid: false, message: '无效的日期格式' };
    }
    
    // 检查是否是未来日期（对于出生日期）
    if (date > now) {
        return { valid: false, message: '出生日期不能是未来日期' };
    }
    
    // 检查是否过于久远（比如超过150年前）
    const maxAge = 150;
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - maxAge);
    
    if (date < minDate) {
        return { valid: false, message: '日期不能超过150年前' };
    }
    
    return { valid: true, message: '' };
}

 