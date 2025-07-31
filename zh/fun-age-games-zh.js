// 趣味年龄游戏 - 互动年龄娱乐工具
class FunAgeGames {
    constructor() {
        // 名人数据库
        this.celebrityDatabase = {
            1940: [
                { name: "李小龙", profession: "武术家", birth: "1940-11-27", image: "🥋" },
                { name: "约翰·列侬", profession: "音乐家", birth: "1940-10-09", image: "🎵" },
                { name: "阿尔·帕西诺", profession: "演员", birth: "1940-04-25", image: "🎭" }
            ],
            1950: [
                { name: "史蒂夫·乔布斯", profession: "企业家", birth: "1955-02-24", image: "💻" },
                { name: "比尔·盖茨", profession: "企业家", birth: "1955-10-28", image: "💼" },
                { name: "成龙", profession: "演员", birth: "1954-04-07", image: "🎬" }
            ],
            1960: [
                { name: "麦当娜", profession: "歌手", birth: "1958-08-16", image: "🎤" },
                { name: "迈克尔·杰克逊", profession: "歌手", birth: "1958-08-29", image: "🕺" },
                { name: "巴拉克·奥巴马", profession: "前总统", birth: "1961-08-04", image: "🏛️" }
            ],
            1970: [
                { name: "莱昂纳多·迪卡普里奥", profession: "演员", birth: "1974-11-11", image: "🎬" },
                { name: "安吉丽娜·朱莉", profession: "演员", birth: "1975-06-04", image: "🎭" },
                { name: "埃隆·马斯克", profession: "企业家", birth: "1971-06-28", image: "🚀" }
            ],
            1980: [
                { name: "马克·扎克伯格", profession: "企业家", birth: "1984-05-14", image: "💻" },
                { name: "Lady Gaga", profession: "歌手", birth: "1986-03-28", image: "🎤" },
                { name: "蕾哈娜", profession: "歌手", birth: "1988-02-20", image: "🎵" }
            ],
            1990: [
                { name: "艾玛·沃森", profession: "演员", birth: "1990-04-15", image: "🎭" },
                { name: "贾斯汀·比伯", profession: "歌手", birth: "1994-03-01", image: "🎤" },
                { name: "泰勒·斯威夫特", profession: "歌手", birth: "1989-12-13", image: "🎵" }
            ],
            2000: [
                { name: "比莉·艾利什", profession: "歌手", birth: "2001-12-18", image: "🎵" },
                { name: "格蕾塔·桑伯格", profession: "活动家", birth: "2003-01-03", image: "🌍" },
                { name: "米莉·博比·布朗", profession: "演员", birth: "2004-02-19", image: "🎭" }
            ]
        };

        // 生日贺卡样式和模板
        this.cardStyles = {
            cute: {
                colors: ['#FFB6C1', '#FFE4E1', '#FFC0CB', '#FFCCCB'],
                emojis: ['🎂', '🎉', '🎈', '🎁', '🌸', '🦄', '🌈'],
                fonts: ['Microsoft YaHei', 'Arial', 'Helvetica']
            },
            elegant: {
                colors: ['#F5F5DC', '#E6E6FA', '#D3D3D3', '#C0C0C0'],
                emojis: ['✨', '🌹', '💎', '🕊️', '🌿', '🏵️'],
                fonts: ['Microsoft YaHei', 'Times New Roman', 'serif']
            },
            funny: {
                colors: ['#FFD700', '#FF6347', '#32CD32', '#FF69B4'],
                emojis: ['😂', '🤣', '🎪', '🤡', '🎭', '🎉', '💃'],
                fonts: ['Microsoft YaHei', 'Arial Black', 'Verdana']
            },
            professional: {
                colors: ['#2C3E50', '#34495E', '#5D6D7E', '#85929E'],
                emojis: ['🎯', '⭐', '🏆', '💼', '📊', '🎖️'],
                fonts: ['Microsoft YaHei', 'Calibri', 'Helvetica']
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.populateCelebrityDatabase();
    }

    bindEvents() {
        // 全局函数供HTML onclick使用
        window.openGame = (gameType) => this.openGame(gameType);
        window.closeGameModal = () => this.closeGameModal();
        window.shareResults = () => this.shareResults();
        window.copyResults = () => this.copyResults();
        window.startNewGame = () => this.startNewGame();
    }

    populateCelebrityDatabase() {
        // 添加更多名人到数据库
        const additionalCelebrities = {
            1940: [
                { name: "邓丽君", profession: "歌手", birth: "1953-01-29", image: "🎵" },
                { name: "成奎安", profession: "演员", birth: "1955-02-01", image: "🎭" }
            ],
            1950: [
                { name: "周润发", profession: "演员", birth: "1955-05-18", image: "🎬" },
                { name: "刘德华", profession: "演员/歌手", birth: "1961-09-27", image: "🎭" }
            ],
            1960: [
                { name: "张国荣", profession: "演员/歌手", birth: "1956-09-12", image: "🎵" },
                { name: "梅艳芳", profession: "歌手", birth: "1963-10-10", image: "🎤" }
            ],
            1970: [
                { name: "周杰伦", profession: "歌手", birth: "1979-01-18", image: "🎵" },
                { name: "林志玲", profession: "模特", birth: "1974-11-29", image: "📸" }
            ],
            1980: [
                { name: "杨幂", profession: "演员", birth: "1986-09-12", image: "🎭" },
                { name: "鹿晗", profession: "歌手/演员", birth: "1990-04-20", image: "🎤" }
            ],
            1990: [
                { name: "易烊千玺", profession: "演员/歌手", birth: "2000-11-28", image: "🎭" },
                { name: "关晓彤", profession: "演员", birth: "1997-09-17", image: "🎬" }
            ]
        };

        // 合并额外的名人与现有数据库
        Object.keys(additionalCelebrities).forEach(decade => {
            if (this.celebrityDatabase[decade]) {
                this.celebrityDatabase[decade] = [...this.celebrityDatabase[decade], ...additionalCelebrities[decade]];
            }
        });
    }

    openGame(gameType) {
        const modal = document.getElementById('gameModal');
        const content = document.getElementById('gameContent');
        
        if (!modal || !content) return;

        let gameHTML = '';
        
        switch(gameType) {
            case 'celebrity':
                gameHTML = this.getCelebrityComparator();
                break;
            case 'challenge':
                gameHTML = this.getAgeChallenge();
                break;
            case 'birthday-card':
                gameHTML = this.getBirthdayCardGenerator();
                break;
        }
        
        content.innerHTML = gameHTML;
        modal.style.display = 'block';
    }

    closeGameModal() {
        const modal = document.getElementById('gameModal');
        if (modal) modal.style.display = 'none';
        
        // 关闭模态框时隐藏结果区域
        const resultsArea = document.getElementById('resultsArea');
        if (resultsArea) resultsArea.style.display = 'none';
    }

    getCelebrityComparator() {
        return `
            <h2>⭐ 名人年龄比较器</h2>
            <p>找出哪些名人与你同年出生或年龄相同！</p>
            
            <form id="celebrityForm" onsubmit="event.preventDefault(); findCelebrityMatches();">
                <div class="input-group">
                    <label for="userBirthDate">你的出生日期：</label>
                    <input type="date" id="userBirthDate" required>
                </div>
                
                <div class="input-group">
                    <label for="matchType">匹配类型：</label>
                    <select id="matchType">
                        <option value="year">同年出生</option>
                        <option value="exact">精确年龄（1年内）</option>
                        <option value="month">同月出生</option>
                    </select>
                </div>
                
                <button type="submit" class="game-btn">找我的名人双胞胎！</button>
            </form>
            
            <div id="celebrityResults" style="display: none; margin-top: 20px;">
                <h3>你的名人匹配</h3>
                <div id="celebrityList"></div>
            </div>
        `;
    }

    getAgeChallenge() {
        return `
            <h2>🏆 年龄挑战工具</h2>
            <p class="game-description">挑战你的朋友！精确比较年龄到秒，看看谁才是真正的年长者。</p>
            
            <form id="challengeForm" onsubmit="event.preventDefault(); startAgeChallenge();">
                <div class="challenge-container">
                    <div class="challenger-card">
                        <div class="challenger-header">
                            <div class="challenger-avatar">👤</div>
                            <h3>第一位挑战者</h3>
                        </div>
                        <div class="challenger-inputs">
                            <div class="input-group enhanced">
                                <label for="person1Name">
                                    <span class="label-icon">👋</span>
                                    <span class="label-text">姓名</span>
                                </label>
                                <input type="text" id="person1Name" placeholder="请输入第一人的姓名" required class="enhanced-input">
                            </div>
                            <div class="input-group enhanced">
                                <label for="person1Birth">
                                    <span class="label-icon">📅</span>
                                    <span class="label-text">出生日期和时间</span>
                                </label>
                                <input type="datetime-local" id="person1Birth" required class="enhanced-input">
                            </div>
                        </div>
                    </div>

                    <div class="vs-separator">
                        <div class="vs-circle">VS</div>
                    </div>
                    
                    <div class="challenger-card">
                        <div class="challenger-header">
                            <div class="challenger-avatar">👤</div>
                            <h3>第二位挑战者</h3>
                        </div>
                        <div class="challenger-inputs">
                            <div class="input-group enhanced">
                                <label for="person2Name">
                                    <span class="label-icon">👋</span>
                                    <span class="label-text">姓名</span>
                                </label>
                                <input type="text" id="person2Name" placeholder="请输入第二人的姓名" required class="enhanced-input">
                            </div>
                            <div class="input-group enhanced">
                                <label for="person2Birth">
                                    <span class="label-icon">📅</span>
                                    <span class="label-text">出生日期和时间</span>
                                </label>
                                <input type="datetime-local" id="person2Birth" required class="enhanced-input">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="challenge-submit">
                    <button type="submit" class="game-btn enhanced-btn">
                        <span class="btn-icon">🚀</span>
                        <span class="btn-text">开始年龄挑战！</span>
                    </button>
                </div>
            </form>
            
            <div id="challengeResults" style="display: none; margin-top: 30px;">
                <h3>🎯 挑战结果</h3>
                <div id="challengeWinner"></div>
                <div id="challengeStats"></div>
            </div>
        `;
    }

    getBirthdayCardGenerator() {
        return `
            <h2>🎨 AI生日贺卡生成器</h2>
            <p>创建个性化AI生成的生日贺卡，包含定制消息！</p>
            
            <form id="cardForm" onsubmit="event.preventDefault(); generateBirthdayCard();">
                <div class="input-group">
                    <label for="recipientName">收件人姓名：</label>
                    <input type="text" id="recipientName" placeholder="输入姓名" required>
                </div>
                
                <div class="input-group">
                    <label for="recipientBirthday">生日：</label>
                    <input type="date" id="recipientBirthday" required>
                </div>
                
                <div class="input-group">
                    <label for="cardStyle">卡片风格：</label>
                    <select id="cardStyle">
                        <option value="cute">可爱缤纷</option>
                        <option value="elegant">优雅典雅</option>
                        <option value="funny">搞笑活泼</option>
                        <option value="professional">专业现代</option>
                    </select>
                </div>
                
                <div class="input-group">
                    <label for="personalKeywords">个性关键词（可选）：</label>
                    <input type="text" id="personalKeywords" placeholder="例如：搞笑、创意、运动爱好者">
                    <small>添加关键词来个性化消息</small>
                </div>
                
                <button type="submit" class="game-btn">生成生日贺卡！</button>
            </form>
            
            <div id="cardResults" style="display: none; margin-top: 20px;">
                <h3>你的AI生成生日贺卡</h3>
                <div id="birthdayCard"></div>
                <div class="card-actions">
                    <button onclick="downloadCard()" class="action-btn">💾 下载贺卡</button>
                    <button onclick="regenerateCard()" class="action-btn">🔄 重新生成</button>
                </div>
            </div>
        `;
    }

    findCelebrityMatches() {
        const birthDate = new Date(document.getElementById('userBirthDate').value);
        const matchType = document.getElementById('matchType').value;
        
        if (!birthDate) {
            alert('请输入你的出生日期');
            return;
        }

        const userYear = birthDate.getFullYear();
        const userMonth = birthDate.getMonth();
        const userAge = this.calculateAge(birthDate);
        
        let matches = [];
        
        // 根据类型查找匹配
        Object.keys(this.celebrityDatabase).forEach(decade => {
            this.celebrityDatabase[decade].forEach(celebrity => {
                const celebBirth = new Date(celebrity.birth);
                const celebYear = celebBirth.getFullYear();
                const celebMonth = celebBirth.getMonth();
                const celebAge = this.calculateAge(celebBirth);
                
                let isMatch = false;
                
                switch(matchType) {
                    case 'year':
                        isMatch = celebYear === userYear;
                        break;
                    case 'exact':
                        isMatch = Math.abs(celebAge - userAge) <= 1;
                        break;
                    case 'month':
                        isMatch = celebMonth === userMonth;
                        break;
                }
                
                if (isMatch) {
                    matches.push({
                        ...celebrity,
                        ageDiff: Math.abs(celebAge - userAge),
                        daysDiff: Math.abs(celebBirth.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
                    });
                }
            });
        });

        // 按年龄差异排序匹配
        matches.sort((a, b) => a.daysDiff - b.daysDiff);

        this.displayCelebrityResults(matches, matchType);
    }

    displayCelebrityResults(matches, matchType) {
        const resultsDiv = document.getElementById('celebrityResults');
        const listDiv = document.getElementById('celebrityList');
        
        if (matches.length === 0) {
            listDiv.innerHTML = '<p>没有找到匹配的名人。尝试不同的匹配类型！</p>';
        } else {
            let html = '<div class="celebrity-matches">';
            
            matches.slice(0, 6).forEach(celebrity => {
                const birthDate = new Date(celebrity.birth);
                const age = this.calculateAge(birthDate);
                
                html += `
                    <div class="celebrity-card">
                        <div class="celebrity-icon">${celebrity.image}</div>
                        <h4>${celebrity.name}</h4>
                        <p class="profession">${celebrity.profession}</p>
                        <p class="birth-info">出生：${birthDate.toLocaleDateString('zh-CN')}</p>
                        <p class="age-info">年龄：${age} 岁</p>
                        ${celebrity.daysDiff < 30 ? '<span class="exact-match">🎯 非常接近的匹配！</span>' : ''}
                    </div>
                `;
            });
            
            html += '</div>';
            
            if (matches.length > 6) {
                html += `<p class="more-matches">+ 还有 ${matches.length - 6} 个匹配！</p>`;
            }
            
            listDiv.innerHTML = html;
        }
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
        
        // 显示结果区域用于分享
        const matchTypeText = matchType === 'year' ? '出生年份' : matchType === 'exact' ? '年龄' : '出生月份';
        this.showResultsArea(`名人匹配：找到了 ${matches.length} 个与你${matchTypeText}相同的名人！`);
    }

    startAgeChallenge() {
        const person1Name = document.getElementById('person1Name').value;
        const person1Birth = new Date(document.getElementById('person1Birth').value);
        const person2Name = document.getElementById('person2Name').value;
        const person2Birth = new Date(document.getElementById('person2Birth').value);
        
        if (!person1Name || !person1Birth || !person2Name || !person2Birth) {
            alert('请填写所有字段');
            return;
        }

        // 计算精确年龄差异
        const timeDiff = Math.abs(person2Birth.getTime() - person1Birth.getTime());
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        const olderPerson = person1Birth < person2Birth ? person1Name : person2Name;
        const youngerPerson = person1Birth < person2Birth ? person2Name : person1Name;
        
        const age1 = this.calculateAge(person1Birth);
        const age2 = this.calculateAge(person2Birth);
        
        this.displayChallengeResults({
            person1: { name: person1Name, birth: person1Birth, age: age1 },
            person2: { name: person2Name, birth: person2Birth, age: age2 },
            older: olderPerson,
            younger: youngerPerson,
            difference: { days: daysDiff, hours: hoursDiff, minutes: minutesDiff, seconds: secondsDiff }
        });
    }

    displayChallengeResults(data) {
        const resultsDiv = document.getElementById('challengeResults');
        const winnerDiv = document.getElementById('challengeWinner');
        const statsDiv = document.getElementById('challengeStats');
        
        winnerDiv.innerHTML = `
            <div class="challenge-winner">
                <h4>🏆 ${data.older} 更年长！</h4>
                <p class="age-difference">
                    年龄差异：${data.difference.days} 天 ${data.difference.hours} 小时 
                    ${data.difference.minutes} 分钟 ${data.difference.seconds} 秒
                </p>
            </div>
        `;
        
        const totalHours = data.difference.days * 24 + data.difference.hours;
        const totalMinutes = totalHours * 60 + data.difference.minutes;
        const approximateHeartbeats = Math.round(totalMinutes * 70); // 平均每分钟70次心跳
        
        statsDiv.innerHTML = `
            <div class="challenge-stats">
                <h4>📊 趣味统计</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">${data.difference.days.toLocaleString()}</span>
                        <span class="stat-label">多活的天数</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${totalHours.toLocaleString()}</span>
                        <span class="stat-label">多活的小时</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${approximateHeartbeats.toLocaleString()}</span>
                        <span class="stat-label">多跳的心跳</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${Math.round(data.difference.days / 365.25 * 100)}%</span>
                        <span class="stat-label">更多人生经历</span>
                    </div>
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
        
        // 显示结果区域用于分享
        this.showResultsArea(`年龄挑战：${data.older} 比 ${data.younger} 大 ${data.difference.days} 天！`);
    }

    generateBirthdayCard() {
        const name = document.getElementById('recipientName').value;
        const birthday = new Date(document.getElementById('recipientBirthday').value);
        const style = document.getElementById('cardStyle').value;
        const keywords = document.getElementById('personalKeywords').value;
        
        if (!name || !birthday) {
            alert('请填写收件人姓名和生日');
            return;
        }

        const age = this.calculateAge(birthday);
        const cardDesign = this.generateCardDesign(name, age, style, keywords);
        
        this.displayBirthdayCard(cardDesign);
    }

    generateCardDesign(name, age, style, keywords) {
        const styleConfig = this.cardStyles[style];
        const randomColor = styleConfig.colors[Math.floor(Math.random() * styleConfig.colors.length)];
        const randomEmoji = styleConfig.emojis[Math.floor(Math.random() * styleConfig.emojis.length)];
        const randomFont = styleConfig.fonts[Math.floor(Math.random() * styleConfig.fonts.length)];
        
        // 生成类似AI的个性化消息
        const messages = this.generatePersonalizedMessage(name, age, keywords, style);
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        return {
            name,
            age,
            style,
            color: randomColor,
            emoji: randomEmoji,
            font: randomFont,
            message: randomMessage,
            decorativeEmojis: this.getDecorativeEmojis(style)
        };
    }

    generatePersonalizedMessage(name, age, keywords, style) {
        const keywordArray = keywords ? keywords.split(',').map(k => k.trim()) : [];
        
        let messages = [];
        
        switch(style) {
            case 'cute':
                messages = [
                    `${name}，生日快乐！🎉 又是绝对精彩的一年！`,
                    `${name}，你不是在变老，你是在变得更棒！🌟`,
                    `祝${name}最甜蜜的${age}岁生日！🎂`,
                    `${age}岁生日快乐，${name}！愿你的日子和你一样特别！💖`
                ];
                break;
            case 'elegant':
                messages = [
                    `亲爱的${name}，祝你${age}岁生日充满喜悦和繁荣。`,
                    `${name}生日快乐。愿新的一年为你带来无尽的幸福和成功。`,
                    `${name}，今天庆祝你和你美好的人格。${age}岁生日快乐。`,
                    `祝${name}的生日如你的精神一样非凡。为${age}年干杯！`
                ];
                break;
            case 'funny':
                messages = [
                    `${name}，你${age}岁？我以为你还25岁呢！😄 生日快乐！`,
                    `${name}生日快乐！别担心${age}岁的事 - 你仍然比你的笑话年轻！🤣`,
                    `${name}，${age}岁时你就像陈年美酒...越陈越香！🍷`,
                    `${age}岁生日快乐，${name}！记住，年龄只是个数字...一个很大的数字！😂`
                ];
                break;
            case 'professional':
                messages = [
                    `${name}生日快乐。祝你在${age}岁这一年继续成功和幸福。`,
                    `亲爱的${name}，恭喜你达到另一个里程碑。${age}岁生日快乐。`,
                    `${name}，愿你的第${age}年充满新的成就和个人成长。`,
                    `${name}生日快乐。为又一年的卓越和成就干杯。`
                ];
                break;
        }
        
        // 添加基于关键词的定制
        if (keywordArray.length > 0) {
            keywordArray.forEach(keyword => {
                if (keyword.toLowerCase().includes('运动')) {
                    messages.push(`${name}，愿你的第${age}年在场上场下都充满胜利！🏆`);
                } else if (keyword.toLowerCase().includes('音乐')) {
                    messages.push(`${name}，愿你的${age}岁生日如你最爱的歌曲一样和谐！🎵`);
                } else if (keyword.toLowerCase().includes('创意')) {
                    messages.push(`${name}，为${age}年的创造力干杯，还有更多杰作即将到来！🎨`);
                }
            });
        }
        
        return messages;
    }

    getDecorativeEmojis(style) {
        const decorations = {
            cute: ['🎈', '🎂', '🎉', '🌸', '🦄', '🌈', '💖'],
            elegant: ['✨', '🌹', '💎', '🕊️', '🌿', '🏵️', '💫'],
            funny: ['😂', '🤣', '🎪', '🤡', '🎭', '💃', '🕺'],
            professional: ['🎯', '⭐', '🏆', '📊', '🎖️', '💼', '🌟']
        };
        
        return decorations[style] || decorations.cute;
    }

    displayBirthdayCard(design) {
        const resultsDiv = document.getElementById('cardResults');
        const cardDiv = document.getElementById('birthdayCard');
        
        const decorativeEmojis = design.decorativeEmojis.slice(0, 4).join(' ');
        
        cardDiv.innerHTML = `
            <div class="birthday-card" style="
                background: linear-gradient(135deg, ${design.color}, ${design.color}88);
                font-family: ${design.font};
                border-radius: 15px;
                padding: 30px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                margin: 20px 0;
            ">
                <div class="card-header" style="font-size: 3em; margin-bottom: 20px;">
                    ${design.emoji}
                </div>
                <h3 style="color: #2c3e50; margin: 15px 0; font-size: 1.8em;">
                    ${design.age}岁生日快乐！
                </h3>
                <h2 style="color: #34495e; margin: 10px 0; font-size: 2.2em;">
                    ${design.name}
                </h2>
                <p style="color: #5d6d7e; font-size: 1.2em; line-height: 1.6; margin: 20px 0;">
                    ${design.message}
                </p>
                <div class="card-decorations" style="font-size: 1.5em; margin-top: 20px;">
                    ${decorativeEmojis}
                </div>
                <div class="card-footer" style="margin-top: 20px; font-size: 0.9em; color: #7f8c8d;">
                    由趣味年龄游戏❤️生成
                </div>
            </div>
        `;
        
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
        
        // 为卡片操作添加全局函数
        window.downloadCard = () => this.downloadCard(design);
        window.regenerateCard = () => this.generateBirthdayCard();
        
        // 显示结果区域用于分享
        this.showResultsArea(`为${design.name}的${design.age}岁生日创建了AI生日贺卡！`);
    }

    downloadCard(design) {
        // 创建canvas元素生成图片
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 设置canvas大小
        canvas.width = 600;
        canvas.height = 400;
        
        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, design.color);
        gradient.addColorStop(1, design.color + '88');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 添加文字
        ctx.fillStyle = '#2c3e50';
        ctx.font = `bold 48px ${design.font}`;
        ctx.textAlign = 'center';
        ctx.fillText(`${design.age}岁生日快乐！`, canvas.width/2, 100);
        
        ctx.font = `bold 36px ${design.font}`;
        ctx.fillText(design.name, canvas.width/2, 160);
        
        ctx.font = `24px ${design.font}`;
        ctx.fillStyle = '#5d6d7e';
        
        // 消息换行
        const words = design.message.split(' ');
        let line = '';
        let y = 220;
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > canvas.width - 60 && i > 0) {
                ctx.fillText(line, canvas.width/2, y);
                line = words[i] + ' ';
                y += 30;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, canvas.width/2, y);
        
        // 下载图片
        const link = document.createElement('a');
        link.download = `生日贺卡-${design.name}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        this.showSuccess('生日贺卡下载成功！');
    }

    calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    showResultsArea(summaryText) {
        const resultsArea = document.getElementById('resultsArea');
        const resultsContent = document.getElementById('resultsContent');
        
        if (resultsArea && resultsContent) {
            resultsContent.innerHTML = `
                <div class="results-summary">
                    <p>${summaryText}</p>
                    <p class="share-prompt">与朋友分享你的结果！</p>
                </div>
            `;
            resultsArea.style.display = 'block';
        }
    }

    shareResults() {
        const resultsContent = document.getElementById('resultsContent');
        if (!resultsContent) return;
        
        const text = resultsContent.textContent || '查看我的趣味年龄游戏结果！';
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: '趣味年龄游戏结果',
                text: text,
                url: url
            }).catch(err => {
                console.log('分享失败:', err);
                this.copyToClipboard(`${text} ${url}`);
            });
        } else {
            this.copyToClipboard(`${text} ${url}`);
        }
    }

    copyResults() {
        const resultsContent = document.getElementById('resultsContent');
        if (!resultsContent) return;
        
        const text = resultsContent.textContent || '查看我的趣味年龄游戏结果！';
        this.copyToClipboard(text);
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showSuccess('结果已复制到剪贴板！');
            }).catch(err => {
                this.fallbackCopyTextToClipboard(text);
            });
        } else {
            this.fallbackCopyTextToClipboard(text);
        }
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showSuccess('结果已复制到剪贴板！');
        } catch (err) {
            this.showError('复制结果失败');
        }
        
        document.body.removeChild(textArea);
    }

    startNewGame() {
        this.closeGameModal();
        const resultsArea = document.getElementById('resultsArea');
        if (resultsArea) resultsArea.style.display = 'none';
    }

    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 动画进入
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
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 动画进入
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
}

// DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', () => {
    new FunAgeGames();
});

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 表单提交的全局函数
window.findCelebrityMatches = () => {
    const gameInstance = new FunAgeGames();
    gameInstance.findCelebrityMatches();
};

window.startAgeChallenge = () => {
    const gameInstance = new FunAgeGames();
    gameInstance.startAgeChallenge();
};

window.generateBirthdayCard = () => {
    const gameInstance = new FunAgeGames();
    gameInstance.generateBirthdayCard();
};
