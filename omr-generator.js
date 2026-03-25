/**
 * OMR Generator for Sheikh Academy
 * Features: Dynamic row generation based on question count, Column-wise coloring (Excel-style), 
 * Header info integration, and responsive layout.
 * [পয়েন্ট ১৭ - ডাইনামিক ওএমআর শিট তৈরি]
 */

const OMRGenerator = {
    settings: {
        containerId: 'omr-section',
        columnColors: {
            ka: '#000000', // ক - ডিফল্ট কালো
            kha: '#ff69b4', // খ - ডিফল্ট গোলাপী
            ga: '#000000', // গ - ডিফল্ট কালো
            gha: '#ff69b4'  // ঘ - ডিফল্ট গোলাপী
        }
    },

    /**
     * ওএমআর শিট রেন্ডার করা (পয়েন্ট ১৭)
     * @param {number} questionCount - মোট কতটি প্রশ্নের জন্য ওএমআর হবে
     * @param {Object} headerData - স্কুল, শ্রেণি, বিষয় ইত্যাদি তথ্য
     */
    generate: function(questionCount, headerData = {}) {
        const container = document.getElementById(this.settings.containerId);
        if (!container) return;

        let html = `
            <div class="omr-wrapper" style="margin-top: 50px; border-top: 2px dashed #000; padding-top: 20px;">
                <!-- ওএমআর শিরোনাম (পয়েন্ট ১৭) -->
                <div class="omr-header" style="text-align: center; margin-bottom: 20px;">
                    <h3 style="margin: 0;">${headerData.schoolName || 'প্রতিষ্ঠানের নাম'}</h3>
                    <p style="margin: 5px 0;">ওএমআর উত্তরপত্র (OMR Answer Sheet)</p>
                    <div style="display: flex; justify-content: space-around; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 10px;">
                        <span>শ্রেণি: ${headerData.className || '____'}</span>
                        <span>বিষয়: ${headerData.subject || '____'}</span>
                        <span>রোল: __________</span>
                    </div>
                </div>

                <!-- ওএমআর বডি (গ্রিড সিস্টেম) -->
                <div class="omr-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                    ${this.renderRows(questionCount)}
                </div>
            </div>
        `;

        container.innerHTML = html;
    },

    /**
     * প্রশ্নের সংখ্যা অনুযায়ী রো তৈরি করা
     */
    renderRows: function(count) {
        let rowsHtml = '';
        for (let i = 1; i <= count; i++) {
            rowsHtml += `
                <div class="omr-row" style="display: flex; align-items: center; margin-bottom: 8px;">
                    <span style="width: 25px; font-weight: bold;">${i}.</span>
                    <div class="omr-circles" style="display: flex; gap: 10px;">
                        ${this.renderCircle('ক', this.settings.columnColors.ka)}
                        ${this.renderCircle('খ', this.settings.columnColors.kha)}
                        ${this.renderCircle('গ', this.settings.columnColors.ga)}
                        ${this.renderCircle('ঘ', this.settings.columnColors.gha)}
                    </div>
                </div>
            `;
        }
        return rowsHtml;
    },

    /**
     * একক বৃত্ত রেন্ডার করা (পয়েন্ট ২০ - রঙিন ওএমআর)
     */
    renderCircle: function(label, color) {
        return `
            <div class="omr-item" style="display: flex; flex-direction: column; align-items: center;">
                <div class="omr-circle" style="
                    width: 18px; 
                    height: 18px; 
                    border: 1.5px solid ${color}; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    font-size: 10px;
                    color: ${color};
                    font-weight: bold;
                ">
                    ${label}
                </div>
            </div>
        `;
    },

    /**
     * এক্সেলের মতো কলামের রঙ পরিবর্তন করা
     * @param {string} col - ka, kha, ga, gha
     * @param {string} color - হেক্স কোড
     */
    setColumnColor: function(col, color) {
        if (this.settings.columnColors[col]) {
            this.settings.columnColors[col] = color;
            // পুনরায় রেন্ডার করা যেন পরিবর্তন দেখা যায়
            const currentCount = document.querySelectorAll('.omr-row').length;
            this.generate(currentCount); 
        }
    }
};

// গ্লোবাল এক্সেস
window.OMRGenerator = OMRGenerator;
