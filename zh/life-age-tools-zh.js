// 生活年龄工具 - 法定年龄计算器
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
        // 全局函数，供HTML onclick调用
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
        
        // 设置默认日期
        this.setDefaultDate();
    }

    closeModal() {
        const modal = document.getElementById('toolModal');
        if (modal) modal.style.display = 'none';
    }

    getRetirementCalculator() {
        return `
            <h2>🎓 退休年龄计算器</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">出生日期：</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">国家：</label>
                    <select id="country" required>
                        <option value="">选择国家</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="gender">性别：</label>
                    <select id="gender">
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">计算退休年龄</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>退休信息</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getDrinkingAgeChecker() {
        return `
            <h2>🍷 法定饮酒年龄检查器</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">出生日期：</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">国家：</label>
                    <select id="country" required>
                        <option value="">选择国家</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">检查饮酒年龄</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>饮酒年龄状态</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getDrivingAgeChecker() {
        return `
            <h2>🚗 驾驶年龄检查器</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">出生日期：</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">国家：</label>
                    <select id="country" required>
                        <option value="">选择国家</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">检查驾驶年龄</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>驾驶年龄状态</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getVotingAgeChecker() {
        return `
            <h2>🗳️ 投票年龄检查器</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">出生日期：</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">国家：</label>
                    <select id="country" required>
                        <option value="">选择国家</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">检查投票年龄</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>投票年龄状态</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getWorkingAgeChecker() {
        return `
            <h2>💼 工作年龄检查器</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">出生日期：</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">国家：</label>
                    <select id="country" required>
                        <option value="">选择国家</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">检查工作年龄</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>工作年龄状态</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getMarriageAgeChecker() {
        return `
            <h2>💍 结婚年龄检查器</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">出生日期：</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">国家：</label>
                    <select id="country" required>
                        <option value="">选择国家</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">检查结婚年龄</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>结婚年龄状态</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    setDefaultDate() {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        const birthDateInput = document.getElementById('birthDate');
        if (birthDateInput) {
            birthDateInput.value = formattedDate;
        }
    }

    calculateAge() {
        const birthDate = new Date(document.getElementById('birthDate').value);
        const country = document.getElementById('country').value;
        const gender = document.getElementById('gender')?.value || 'male';
        
        if (!birthDate || !country) {
            alert('请填写所有必填字段。');
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
                        <strong>${country}的官方退休年龄：</strong> ${retirementAge} 岁
                    </div>
                    <div class="result-item retirement-info">
                        <strong>您将在以下日期退休：</strong> ${retirementDate.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div class="result-item retirement-info">
                        <strong>距离退休还有：</strong> ${yearsToRetirement > 0 ? `${yearsToRetirement} 年` : '您已经符合退休条件！'}
                    </div>
                    ${yearsToRetirement > 0 ? `<div class="result-item retirement-info"><strong>距离退休还有：</strong> ${Math.ceil((retirementDate - today) / (1000 * 60 * 60 * 24)).toLocaleString()} 天</div>` : ''}
                `;
                break;
                
            case 'drinking':
                const drinkingAge = countryInfo.drinking;
                const isDrinkingEligible = age >= drinkingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>${country}的法定饮酒年龄：</strong> ${drinkingAge} 岁
                    </div>
                    <div class="result-item ${isDrinkingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>状态：</strong> ${isDrinkingEligible ? '您已达到法定饮酒年龄' : `您还需要等待 ${drinkingAge - age} 年`}
                    </div>
                `;
                break;
                
            case 'driving':
                const drivingAge = countryInfo.driving;
                const isDrivingEligible = age >= drivingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>${country}的法定驾驶年龄：</strong> ${drivingAge} 岁
                    </div>
                    <div class="result-item ${isDrivingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>状态：</strong> ${isDrivingEligible ? '您有资格申请驾驶执照' : `您还需要等待 ${drivingAge - age} 年`}
                    </div>
                `;
                break;
                
            case 'voting':
                const votingAge = countryInfo.voting;
                const isVotingEligible = age >= votingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>${country}的法定投票年龄：</strong> ${votingAge} 岁
                    </div>
                    <div class="result-item ${isVotingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>状态：</strong> ${isVotingEligible ? '您有资格投票' : `您还需要等待 ${votingAge - age} 年`}
                    </div>
                `;
                break;
                
            case 'working':
                const workingAge = countryInfo.working;
                const isWorkingEligible = age >= workingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>${country}的最低工作年龄：</strong> ${workingAge} 岁
                    </div>
                    <div class="result-item ${isWorkingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>状态：</strong> ${isWorkingEligible ? '您有资格工作' : `您还需要等待 ${workingAge - age} 年`}
                    </div>
                `;
                break;
                
            case 'marriage':
                const marriageAge = countryInfo.marriage;
                const isMarriageEligible = age >= marriageAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>${country}的法定结婚年龄：</strong> ${marriageAge} 岁
                    </div>
                    <div class="result-item ${isMarriageEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>状态：</strong> ${isMarriageEligible ? '您有资格结婚' : `您还需要等待 ${marriageAge - age} 年`}
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
        if (title.includes('退休')) return 'retirement';
        if (title.includes('饮酒')) return 'drinking';
        if (title.includes('驾驶')) return 'driving';
        if (title.includes('投票')) return 'voting';
        if (title.includes('工作')) return 'working';
        if (title.includes('结婚')) return 'marriage';
        
        return '';
    }
}

// 当DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', () => {
    new LifeAgeTools();
});

// 点击模态框外部时关闭
window.addEventListener('click', (event) => {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}); 