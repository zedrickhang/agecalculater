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

    