/**
 * UI Controls and Settings Sidebar for Sheikh Academy
 * Features: Responsive settings panel, Desktop-side/Mobile-top view, Control buttons.
 * [পয়েন্ট ২, ১৭, ১৯, ২০ - সেটিংস প্যানেল ও এডিট মোড]
 */

const SidebarControls = {
    settings: {
        isMobile: window.innerWidth < 768,
        isOpen: true
    },

    /**
     * সাইডবার বা টপবার রেন্ডার করা (পয়েন্ট ২)
     */
    init: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // রেসপন্সিভ ক্লাস চেক করা
        const layoutClass = this.settings.isMobile ? 'sa-top-bar' : 'sa-sidebar';
        
        container.innerHTML = `
            <div class="${layoutClass}" id="main-controls">
                <div class="control-header">
                    <h4>সেটিংস ও এডিট প্যানেল</h4>
                    <button onclick="SidebarControls.togglePanel()">☰</button>
                </div>
                
                <div class="control-body" id="control-fields">
                    <!-- ১. প্রশ্নপত্র সেট সেটিংস (পয়েন্ট ১৬) -->
                    <div class="control-group">
                        <label>প্রশ্ন সেট সংখ্যা (ক-ঘ):</label>
                        <select onchange="window.updateSetCount(this.value)">
                            <option value="1">১টি (ক)</option>
                            <option value="2">২টি (ক, খ)</option>
                            <option value="3">৩টি (ক, খ, গ)</option>
                            <option value="4">৪টি (ক, খ, গ, ঘ)</option>
                        </select>
                    </div>

                    <!-- ২. ওএমআর সেটিংস (পয়েন্ট ১৭) -->
                    <div class="control-group">
                        <label class="switch">
                            <input type="checkbox" onchange="window.toggleOMR(this.checked)">
                            <span class="slider"></span> ওএমআর (OMR) যুক্ত করুন
                        </label>
                    </div>

                    <!-- ৩. লেআউট ও কলাম সেটিংস (পয়েন্ট ২২) -->
                    <div class="control-group">
                        <label>কলাম সংখ্যা:</label>
                        <div class="radio-group">
                            <input type="radio" name="cols" value="1" onclick="Editor.updateLayout(1, true)"> ১
                            <input type="radio" name="cols" value="2" checked onclick="Editor.updateLayout(2, true)"> ২
                            <input type="radio" name="cols" value="3" onclick="Editor.updateLayout(3, true)"> ৩
                        </div>
                    </div>

                    <!-- ৪. কাস্টমাইজেশন (পয়েন্ট ১৯, ২০) -->
                    <div class="control-group">
                        <label>জলছাপ (Watermark):</label>
                        <input type="text" placeholder="স্কুলের নাম লিখুন" oninput="window.updateWatermark(this.value)">
                    </div>

                    <div class="control-group">
                        <label>কালার মোড:</label>
                        <input type="color" value="#000000" onchange="window.updateColorMode(this.value)"> রঙিন প্রশ্ন
                    </div>

                    <!-- ৫. এক্সপোর্ট বাটন (পয়েন্ট ৪) -->
                    <div class="action-buttons">
                        <button class="btn-pdf" onclick="Exporter.downloadPDF('board-paper')">PDF ডাউনলোড</button>
                        <button class="btn-word" onclick="Exporter.downloadWord('board-paper')">Word ডাউনলোড</button>
                    </div>
                </div>
            </div>
        `;

        this.applyStyles();
    },

    /**
     * প্যানেল হাইড/শো করা (মোবাইল ভিউর জন্য)
     */
    togglePanel: function() {
        const body = document.getElementById('control-fields');
        this.settings.isOpen = !this.settings.isOpen;
        body.style.display = this.settings.isOpen ? 'block' : 'none';
    },

    /**
     * ডাইনামিক সিএসএস অ্যাপ্লাই করা (ডেক্সটপ বনাম মোবাইল)
     */
    applyStyles: function() {
        const style = document.createElement('style');
        style.innerHTML = `
            .sa-sidebar { width: 300px; position: fixed; right: 0; top: 0; height: 100vh; background: #f8f9fa; border-left: 1px solid #ddd; padding: 15px; z-index: 1000; overflow-y: auto; }
            .sa-top-bar { width: 100%; position: sticky; top: 0; background: #f8f9fa; border-bottom: 1px solid #ddd; padding: 10px; z-index: 1000; }
            .control-group { margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
            .control-group label { display: block; font-weight: bold; margin-bottom: 5px; font-size: 14px; }
            .action-buttons button { width: 100%; margin-top: 10px; padding: 10px; border: none; border-radius: 5px; cursor: pointer; color: white; }
            .btn-pdf { background: #e74c3c; }
            .btn-word { background: #3498db; }
            @media (max-width: 767px) {
                .sa-sidebar { display: none; }
            }
        `;
        document.head.appendChild(style);
    }
};

window.SidebarControls = SidebarControls;
