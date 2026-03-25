/**
 * Theme Manager for Sheikh Academy
 * Features: Watermark control, Color modes, OMR styling, and default Print-friendly theme.
 * [পয়েন্ট ৫, ৬, ২০ - রঙিন প্রশ্নপত্র, ওএমআর এবং জলছাপ নিয়ন্ত্রণ]
 */

const ThemeManager = {
    settings: {
        paperId: 'board-paper',
        watermarkId: 'sa-watermark',
        defaultColor: '#000000',
        defaultPaper: '#ffffff'
    },

    /**
     * জলছাপ (Watermark) নিয়ন্ত্রণ (পয়েন্ট ২০)
     * @param {string} text - জলছাপে যে লেখাটি থাকবে (যেমন: স্কুলের নাম)
     */
    setWatermark: function(text) {
        let wm = document.getElementById(this.settings.watermarkId);
        if (!wm) {
            wm = document.createElement('div');
            wm.id = this.settings.watermarkId;
            document.getElementById(this.settings.paperId).appendChild(wm);
        }

        if (!text) {
            wm.style.display = 'none';
            return;
        }

        wm.style.display = 'flex';
        wm.innerText = text;
        this.applyWatermarkStyles(wm);
    },

    /**
     * জলছাপের সিএসএস স্টাইল (পয়েন্ট ২০)
     */
    applyWatermarkStyles: function(el) {
        Object.assign(el.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            fontSize: '80px',
            color: 'rgba(0, 0, 0, 0.05)', // খুব হালকা রঙ যেন লেখায় সমস্যা না হয়
            pointerEvents: 'none',
            zIndex: '0',
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            userSelect: 'none'
        });
    },

    /**
     * রঙিন প্রশ্নপত্র এবং টেক্সট কালার নিয়ন্ত্রণ (পয়েন্ট ২০)
     * @param {string} color - হেক্স কোড (যেমন: #ff0000)
     */
    setTextColor: function(color) {
        const paper = document.getElementById(this.settings.paperId);
        if (paper) {
            paper.style.color = color || this.settings.defaultColor;
        }
    },

    /**
     * ওএমআর রঙিন করা (পয়েন্ট ২০)
     * @param {string} color - ওএমআর বৃত্তের বর্ডার বা ফিল কালার
     */
    setOMRTheme: function(color) {
        const circles = document.querySelectorAll('.omr-circle');
        circles.forEach(circle => {
            circle.style.borderColor = color;
        });
    },

    /**
     * এডিট করে নির্দিষ্ট জায়গায় রঙ দেওয়া (পয়েন্ট ২ ও ২০)
     * এটি ইউজারের সিলেক্ট করা টেক্সটে রঙ প্রয়োগ করবে
     */
    applyHighlightColor: function(color) {
        document.execCommand('foreColor', false, color);
    },

    /**
     * প্রিন্ট ফ্রেন্ডলি মোড (ডিফল্ট সাদা-কালো)
     * [পয়েন্ট ৫ ও ৬ - আনুপাতিক লজিক ও বোর্ড স্ট্যান্ডার্ড]
     */
    resetToDefault: function() {
        this.setTextColor(this.settings.defaultColor);
        this.setWatermark('');
        const paper = document.getElementById(this.settings.paperId);
        if (paper) paper.style.backgroundColor = this.settings.defaultPaper;
    }
};

// গ্লোবাল এক্সেস
window.ThemeManager = ThemeManager;
