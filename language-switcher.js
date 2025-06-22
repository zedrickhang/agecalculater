// 语言配置
const LANGUAGE_CONFIG = {
    zh: {
       
        url: '/zh/',
        name: '中文'
    },
    en: {
       
        url: '/',
        name: 'English'
    },
    it: {
       
        url: '/it/',
        name: 'Italiano'
    },
    vi: {
      
        url: '/vi/',
        name: 'Tiếng Việt'
    }
};

// 语言切换器类
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.detectCurrentLanguage();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadUserPreference();
    }

    // 检测当前页面语言
    detectCurrentLanguage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        for (const [code, config] of Object.entries(LANGUAGE_CONFIG)) {
            if (filename === config.file) {
                return code;
            }
        }
        
        return 'en'; // 默认中文
    }

    // 绑定事件
    bindEvents() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                const selectedLang = e.target.value;
                this.switchLanguage(selectedLang);
            });
        }
    }

    // 切换语言
    switchLanguage(langCode) {
        if (langCode === this.currentLang) return;
        
        const config = LANGUAGE_CONFIG[langCode];
        if (config) {
            // 保存用户偏好
            this.saveUserPreference(langCode);
            
            // 检查是否在生产环境（有域名）
            const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
            
            if (isProduction) {
                // 生产环境使用SEO友好的URL
                const baseUrl = `${window.location.protocol}//${window.location.hostname}`;
                const newUrl = baseUrl + config.url;
                window.location.href = newUrl;
            } else {
                // 开发环境使用文件名
                const urlParams = new URLSearchParams(window.location.search);
                const newUrl = config.file + (urlParams.toString() ? '?' + urlParams.toString() : '');
                window.location.href = newUrl;
            }
        }
    }

    // 保存用户语言偏好
    saveUserPreference(langCode) {
        try {
            localStorage.setItem('preferredLanguage', langCode);
        } catch (e) {
            // 如果localStorage不可用，使用cookie
            document.cookie = `preferredLanguage=${langCode}; path=/; max-age=31536000`; // 1年
        }
    }

    // 加载用户语言偏好
    loadUserPreference() {
        try {
            const savedLang = localStorage.getItem('preferredLanguage');
            if (savedLang && savedLang !== this.currentLang && LANGUAGE_CONFIG[savedLang]) {
                // 如果保存的语言与当前语言不同，提示用户是否切换
                this.showLanguageSuggestion(savedLang);
            }
        } catch (e) {
            // 从cookie读取
            const cookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('preferredLanguage='));
            
            if (cookie) {
                const savedLang = cookie.split('=')[1];
                if (savedLang && savedLang !== this.currentLang && LANGUAGE_CONFIG[savedLang]) {
                    this.showLanguageSuggestion(savedLang);
                }
            }
        }
    }

    // 显示语言建议
    showLanguageSuggestion(suggestedLang) {
        const config = LANGUAGE_CONFIG[suggestedLang];
        if (!config) return;

        const message = this.getLocalizedMessage('languageSuggestion', config.name);
        
        if (confirm(message)) {
            this.switchLanguage(suggestedLang);
        }
    }

    // 获取本地化消息
    getLocalizedMessage(messageKey, ...args) {
        const messages = {
            zh: {
                languageSuggestion: `检测到您之前使用${args[0]}，是否切换到该语言？`
            },
            en: {
                languageSuggestion: `We detected you previously used ${args[0]}. Switch to that language?`
            },
            it: {
                languageSuggestion: `Abbiamo rilevato che hai precedentemente usato ${args[0]}. Vuoi passare a quella lingua?`
            },
            vi: {
                languageSuggestion: `Chúng tôi phát hiện bạn đã sử dụng ${args[0]} trước đây. Chuyển sang ngôn ngữ đó?`
            }
        };

        return messages[this.currentLang]?.[messageKey] || messages.en[messageKey];
    }

    // 检测浏览器语言
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0]; // 例如 'en-US' -> 'en'
        
        return LANGUAGE_CONFIG[langCode] ? langCode : 'en';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});

// 自动检测语言功能（首次访问时）
function autoDetectLanguage() {
    try {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            const switcher = new LanguageSwitcher();
            const browserLang = switcher.detectBrowserLanguage();
            const currentLang = switcher.currentLang;
            
            if (browserLang !== currentLang) {
                const config = LANGUAGE_CONFIG[browserLang];
                const message = switcher.getLocalizedMessage('browserLanguageSuggestion', config.name);
                
                if (confirm(message)) {
                    switcher.switchLanguage(browserLang);
                }
            }
            
            localStorage.setItem('hasVisited', 'true');
        }
    } catch (e) {
        console.log('Auto language detection skipped');
    }
} 