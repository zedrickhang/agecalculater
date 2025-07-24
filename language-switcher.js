// Language configuration
const LANGUAGE_CONFIG = {
    zh: {
        file: 'zh/index.html',
        url: '/zh/',
        name: '中文',
        dateDifferenceUrl: '/zh/date-difference.html'
    },
    en: {
        file: 'index.html',
        url: '/',
        name: 'English',
        dateDifferenceUrl: '/date-difference.html'
    },
    it: {
        file: 'it/index.html',
        url: '/it/',
        name: 'Italiano',
        dateDifferenceUrl: '/it/date-difference.html'
    },
    vi: {
        file: 'vi/index.html',
        url: '/vi/',
        name: 'Tiếng Việt',
        dateDifferenceUrl: '/vi/date-difference.html'
    }
};

// Language switcher class
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.detectCurrentLanguage();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadUserPreference();
    }

    // Detect current page language
    detectCurrentLanguage() {
        // First check if the page has explicitly set the current language
        if (window.currentPageLanguage) {
            console.log('Using page-defined language:', window.currentPageLanguage);
            return window.currentPageLanguage;
        }
        
        const path = window.location.pathname;
        const href = window.location.href;
        
        console.log('Language detection debug:', {
            pathname: path,
            href: href,
            hostname: window.location.hostname
        });
        
        // For local file system, check the URL more thoroughly
        if (href.includes('/zh/') || path.includes('/zh/')) return 'zh';
        if (href.includes('/it/') || path.includes('/it/')) return 'it';
        if (href.includes('/vi/') || path.includes('/vi/')) return 'vi';
        
        // Check if we're in a language subdirectory by checking the current directory
        const pathParts = path.split('/');
        const currentDir = pathParts[pathParts.length - 2]; // Get the directory name
        console.log('Current directory:', currentDir);
        
        if (currentDir === 'zh') return 'zh';
        if (currentDir === 'it') return 'it';
        if (currentDir === 'vi') return 'vi';
        
        // Default to English for root path
        return 'en';
    }

    // Bind events
    bindEvents() {
        const languageSelect = document.getElementById('languageSelect');
        console.log('Language select element:', languageSelect);
        console.log('Current detected language:', this.currentLang);
        
        if (languageSelect) {
            // Set current language in dropdown
            languageSelect.value = this.currentLang;
            console.log('Set dropdown value to:', this.currentLang);
            
            languageSelect.addEventListener('change', (e) => {
                const selectedLang = e.target.value;
                console.log('Language changed to:', selectedLang);
                this.switchLanguage(selectedLang);
            });
        }
    }

    // Switch language
    switchLanguage(langCode) {
        if (langCode === this.currentLang) return;
        
        const config = LANGUAGE_CONFIG[langCode];
        if (config) {
            // Save user preference
            this.saveUserPreference(langCode);
            
            // Check if we're in production environment (has domain)
            const isProduction = window.location.hostname !== 'localhost' && 
                               window.location.hostname !== '127.0.0.1' &&
                               window.location.hostname !== '';
            
            // Check if we're on the date difference page
            const isDateDifferencePage = window.location.pathname.includes('date-difference') || 
                                       window.location.href.includes('date-difference');
            
            if (isProduction) {
                // Production environment uses SEO-friendly URLs
                const baseUrl = `${window.location.protocol}//${window.location.hostname}`;
                let newUrl;
                
                if (isDateDifferencePage) {
                    newUrl = baseUrl + config.dateDifferenceUrl;
                } else {
                    newUrl = baseUrl + config.url;
                }
                
                window.location.href = newUrl;
            } else {
                // Development environment uses file paths
                const urlParams = new URLSearchParams(window.location.search);
                let newUrl;
                
                if (isDateDifferencePage) {
                    newUrl = config.dateDifferenceUrl.replace('/', '') + (urlParams.toString() ? '?' + urlParams.toString() : '');
                } else {
                    newUrl = config.file + (urlParams.toString() ? '?' + urlParams.toString() : '');
                }
                
                window.location.href = newUrl;
            }
        }
    }

    // Save user language preference
    saveUserPreference(langCode) {
        try {
            localStorage.setItem('preferredLanguage', langCode);
        } catch (e) {
            console.warn('Could not save language preference:', e);
        }
    }

    // Load user language preference
    loadUserPreference() {
        try {
            const savedLang = localStorage.getItem('preferredLanguage');
            if (savedLang && LANGUAGE_CONFIG[savedLang]) {
                // Only auto-switch if user is on the default language page
                if (this.currentLang === 'en' && savedLang !== 'en') {
                    this.switchLanguage(savedLang);
                }
            }
        } catch (e) {
            console.warn('Could not load language preference:', e);
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
    