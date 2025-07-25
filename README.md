# 精确年龄计算器 / Precise Age Calculator

一个现代化、响应式、多语言的在线年龄计算器，可以精确计算两个日期之间的时间差。

A modern, responsive, multilingual online age calculator that can precisely calculate the time difference between two dates.

## 🌍 多语言支持 / Multi-language Support

本项目支持以下语言：
This project supports the following languages:

- 🇨🇳 **中文** (Chinese) - `index.html`
- 🇺🇸 **English** - `index-en.html`
- 🇮🇹 **Italiano** (Italian) - `index-it.html`
- 🇻🇳 **Tiếng Việt** (Vietnamese) - `index-vi.html`

## 功能特点 / Features

### 🎯 核心功能 / Core Features
- **精确计算**: 计算年、月、天、小时、分钟、秒的精确时间差
- **Precise Calculation**: Calculate exact time differences in years, months, days, hours, minutes, seconds
- **实时更新**: 输入日期后自动计算，无需点击按钮
- **Real-time Updates**: Automatic calculation after inputting dates, no button click required
- **智能验证**: 自动验证日期合理性，防止输入错误
- **Smart Validation**: Automatic date validation to prevent input errors
- **友好提示**: 清晰的错误提示和使用说明
- **User-friendly Prompts**: Clear error messages and usage instructions

### 📱 用户体验 / User Experience
- **响应式设计**: 完美适配桌面、平板和手机设备
- **Responsive Design**: Perfect adaptation for desktop, tablet, and mobile devices
- **现代化UI**: 采用渐变背景和卡片式设计
- **Modern UI**: Gradient backgrounds and card-based design
- **流畅动画**: 平滑的过渡效果和交互反馈
- **Smooth Animations**: Smooth transition effects and interactive feedback
- **可访问性**: 支持键盘导航和屏幕阅读器
- **Accessibility**: Keyboard navigation and screen reader support

### 🔍 SEO优化 / SEO Optimization
- **语义化HTML**: 使用正确的HTML5语义标签
- **Semantic HTML**: Proper HTML5 semantic tags
- **Meta标签完整**: 包含description、keywords等SEO标签
- **Complete Meta Tags**: Including description, keywords, and other SEO tags
- **结构化数据**: 添加JSON-LD结构化数据
- **Structured Data**: JSON-LD structured data implementation
- **Open Graph**: 支持社交媒体分享优化
- **Open Graph**: Social media sharing optimization

### 🌐 语言功能 / Language Features
- **智能语言检测**: 自动检测浏览器语言
- **Smart Language Detection**: Automatic browser language detection
- **语言偏好记忆**: 记住用户的语言选择
- **Language Preference Memory**: Remember user's language choice
- **一键切换**: 顶部语言选择器，一键切换语言
- **One-click Switch**: Top language selector for easy switching
- **本地化内容**: 每种语言的完整本地化
- **Localized Content**: Complete localization for each language

## 技术实现 / Technical Implementation

### 前端技术栈 / Frontend Stack
- **HTML5**: 语义化标记和现代web标准
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Flexbox/Grid布局，CSS变量，媒体查询
- **CSS3**: Flexbox/Grid layout, CSS variables, media queries
- **JavaScript ES6+**: 模块化编程，类和箭头函数
- **JavaScript ES6+**: Modular programming, classes and arrow functions
- **Web字体**: Google Fonts (Inter字体家族)
- **Web Fonts**: Google Fonts (Inter font family)

### 核心算法 / Core Algorithm
- 精确的日期计算算法，处理闰年、月末等特殊情况
- Precise date calculation algorithm handling leap years, month-end special cases
- 毫秒级精度的时间差计算
- Millisecond-precision time difference calculation
- 智能的年月日调整逻辑
- Smart year-month-day adjustment logic

## 浏览器兼容性 / Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器 / Mobile Browsers

## 文件结构 / File Structure

```
agecalcalater/
├── index.html              # 中文主页面 / Chinese main page
├── index-en.html           # 英语页面 / English page
├── index-it.html           # 意大利语页面 / Italian page
├── index-vi.html           # 越南语页面 / Vietnamese page
├── styles.css              # 通用样式文件 / Common styles
├── script.js               # 中文JavaScript / Chinese JavaScript
├── script-en.js            # 英语JavaScript / English JavaScript
├── script-it.js            # 意大利语JavaScript / Italian JavaScript
├── script-vi.js            # 越南语JavaScript / Vietnamese JavaScript
├── language-switcher.js    # 语言切换功能 / Language switching
└── README.md               # 项目说明 / Project documentation
```

## 使用方法 / Usage

1. 选择任意语言版本的HTML文件
   Choose any language version of the HTML file
2. 选择出生日期时间和目标日期时间
   Select birth date & time and target date & time
3. 自动显示精确的年龄计算结果
   Automatically display precise age calculation results

## 开发说明 / Development Notes

### 本地开发 / Local Development
直接在浏览器中打开任意HTML文件即可运行，无需安装任何依赖。
Simply open any HTML file in a browser to run, no dependencies required.

### 自定义样式 / Custom Styling
主要样式变量定义在CSS文件顶部，可以轻松修改主题色彩：
Main style variables are defined at the top of the CSS file for easy theme customization:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### 添加新语言 / Adding New Languages
1. 复制现有HTML文件，翻译内容
   Copy existing HTML file and translate content
2. 复制现有JavaScript文件，翻译消息文本
   Copy existing JavaScript file and translate message text
3. 在language-switcher.js中添加语言配置
   Add language configuration in language-switcher.js
4. 在所有页面的语言选择器中添加新选项
   Add new option to language selector in all pages

## 性能优化 / Performance Optimization

- CSS使用了GPU加速的transform属性
- CSS uses GPU-accelerated transform properties
- 图片和字体进行了预加载优化
- Images and fonts are preload optimized
- 响应式图片适配不同设备
- Responsive images for different devices
- 减少重绘和回流的DOM操作
- Reduced repainting and reflow DOM operations

## 安全考虑 / Security Considerations

- 所有用户输入都经过验证
- All user inputs are validated
- 没有服务器端交互，保护用户隐私
- No server-side interaction, protecting user privacy
- 使用现代Web API，确保安全性
- Modern Web APIs for security

## 许可证 / License

MIT License - 可自由使用和修改 / Free to use and modify.

---

## 致谢 / Acknowledgments

基于 [Calculator.net Age Calculator](https://agecomputation.com/) 的功能需求，重新设计和实现。

Based on the functional requirements of [Calculator.net Age Calculator](https://agecomputation.com/), redesigned and implemented. #   a g e c a l c u l a t e r 
 
 
