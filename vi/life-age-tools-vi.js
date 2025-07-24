// Công cụ tuổi đời - Máy tính tuổi hợp pháp
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
        // Hàm toàn cục cho HTML onclick
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
        
        // Đặt ngày mặc định
        this.setDefaultDate();
    }

    closeModal() {
        const modal = document.getElementById('toolModal');
        if (modal) modal.style.display = 'none';
    }

    getRetirementCalculator() {
        return `
            <h2>🎓 Máy tính tuổi nghỉ hưu</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Ngày sinh:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Quốc gia:</label>
                    <select id="country" required>
                        <option value="">Chọn quốc gia</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="gender">Giới tính:</label>
                    <select id="gender">
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Tính tuổi nghỉ hưu</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Thông tin nghỉ hưu</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getDrinkingAgeChecker() {
        return `
            <h2>🍷 Kiểm tra tuổi uống rượu hợp pháp</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Ngày sinh:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Quốc gia:</label>
                    <select id="country" required>
                        <option value="">Chọn quốc gia</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Kiểm tra tuổi uống rượu</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Trạng thái tuổi uống rượu</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getDrivingAgeChecker() {
        return `
            <h2>🚗 Kiểm tra tuổi lái xe</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Ngày sinh:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Quốc gia:</label>
                    <select id="country" required>
                        <option value="">Chọn quốc gia</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Kiểm tra tuổi lái xe</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Trạng thái tuổi lái xe</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getVotingAgeChecker() {
        return `
            <h2>🗳️ Kiểm tra tuổi bầu cử</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Ngày sinh:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Quốc gia:</label>
                    <select id="country" required>
                        <option value="">Chọn quốc gia</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Kiểm tra tuổi bầu cử</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Trạng thái tuổi bầu cử</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getWorkingAgeChecker() {
        return `
            <h2>💼 Kiểm tra tuổi làm việc</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Ngày sinh:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Quốc gia:</label>
                    <select id="country" required>
                        <option value="">Chọn quốc gia</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Kiểm tra tuổi làm việc</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Trạng thái tuổi làm việc</h3>
                <div id="resultContent"></div>
            </div>
        `;
    }

    getMarriageAgeChecker() {
        return `
            <h2>💍 Kiểm tra tuổi kết hôn</h2>
            <form id="ageToolForm" onsubmit="event.preventDefault(); calculateAge();">
                <div class="input-group">
                    <label for="birthDate">Ngày sinh:</label>
                    <input type="date" id="birthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="country">Quốc gia:</label>
                    <select id="country" required>
                        <option value="">Chọn quốc gia</option>
                        ${Object.keys(this.countryData).map(country => 
                            `<option value="${country}">${country}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="calculate-btn">Kiểm tra tuổi kết hôn</button>
            </form>
            
            <div id="result" style="display: none; margin-top: 20px;">
                <h3>Trạng thái tuổi kết hôn</h3>
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
            alert('Vui lòng điền đầy đủ các trường bắt buộc.');
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
                        <strong>Tuổi nghỉ hưu chính thức tại ${country}:</strong> ${retirementAge} tuổi
                    </div>
                    <div class="result-item retirement-info">
                        <strong>Bạn sẽ nghỉ hưu vào:</strong> ${retirementDate.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div class="result-item retirement-info">
                        <strong>Số năm còn lại đến khi nghỉ hưu:</strong> ${yearsToRetirement > 0 ? `${yearsToRetirement} năm` : 'Bạn đã đủ điều kiện nghỉ hưu!'}
                    </div>
                    ${yearsToRetirement > 0 ? `<div class="result-item retirement-info"><strong>Số ngày còn lại đến khi nghỉ hưu:</strong> ${Math.ceil((retirementDate - today) / (1000 * 60 * 60 * 24)).toLocaleString()} ngày</div>` : ''}
                `;
                break;
                
            case 'drinking':
                const drinkingAge = countryInfo.drinking;
                const isDrinkingEligible = age >= drinkingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Tuổi uống rượu hợp pháp tại ${country}:</strong> ${drinkingAge} tuổi
                    </div>
                    <div class="result-item ${isDrinkingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Trạng thái:</strong> ${isDrinkingEligible ? 'Bạn đủ tuổi uống rượu' : `Bạn cần chờ thêm ${drinkingAge - age} năm`}
                    </div>
                `;
                break;
                
            case 'driving':
                const drivingAge = countryInfo.driving;
                const isDrivingEligible = age >= drivingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Tuổi lái xe hợp pháp tại ${country}:</strong> ${drivingAge} tuổi
                    </div>
                    <div class="result-item ${isDrivingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Trạng thái:</strong> ${isDrivingEligible ? 'Bạn đủ tuổi để xin giấy phép lái xe' : `Bạn cần chờ thêm ${drivingAge - age} năm`}
                    </div>
                `;
                break;
                
            case 'voting':
                const votingAge = countryInfo.voting;
                const isVotingEligible = age >= votingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Tuổi bầu cử hợp pháp tại ${country}:</strong> ${votingAge} tuổi
                    </div>
                    <div class="result-item ${isVotingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Trạng thái:</strong> ${isVotingEligible ? 'Bạn đủ tuổi để bầu cử' : `Bạn cần chờ thêm ${votingAge - age} năm`}
                    </div>
                `;
                break;
                
            case 'working':
                const workingAge = countryInfo.working;
                const isWorkingEligible = age >= workingAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Tuổi làm việc tối thiểu tại ${country}:</strong> ${workingAge} tuổi
                    </div>
                    <div class="result-item ${isWorkingEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Trạng thái:</strong> ${isWorkingEligible ? 'Bạn đủ tuổi để làm việc' : `Bạn cần chờ thêm ${workingAge - age} năm`}
                    </div>
                `;
                break;
                
            case 'marriage':
                const marriageAge = countryInfo.marriage;
                const isMarriageEligible = age >= marriageAge;
                
                resultHTML = `
                    <div class="result-item">
                        <strong>Tuổi kết hôn hợp pháp tại ${country}:</strong> ${marriageAge} tuổi
                    </div>
                    <div class="result-item ${isMarriageEligible ? 'eligible' : 'not-eligible'}">
                        <div class="corner-ribbon"></div>
                        <strong>Trạng thái:</strong> ${isMarriageEligible ? 'Bạn đủ tuổi để kết hôn' : `Bạn cần chờ thêm ${marriageAge - age} năm`}
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
        if (title.includes('nghỉ hưu')) return 'retirement';
        if (title.includes('uống rượu')) return 'drinking';
        if (title.includes('lái xe')) return 'driving';
        if (title.includes('bầu cử')) return 'voting';
        if (title.includes('làm việc')) return 'working';
        if (title.includes('kết hôn')) return 'marriage';
        
        return '';
    }
}

// Khởi tạo khi DOM được tải
document.addEventListener('DOMContentLoaded', () => {
    new LifeAgeTools();
});

// Đóng modal khi click bên ngoài
window.addEventListener('click', (event) => {
    const modal = document.getElementById('toolModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});