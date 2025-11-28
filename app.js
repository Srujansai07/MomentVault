// ===================================
// MomentVault - Application Logic
// ===================================

class MomentVault {
    constructor() {
        this.moments = [];
        this.currentFilter = 'all';
        this.timeTravelMode = false;
        this.currentMoment = null;
        this.pendingUpload = null;
        this.isAuthenticated = false;

        this.init();
    }

    // ===================================
    // Initialization
    // ===================================
    init() {
        // Check if password exists
        const hasPassword = localStorage.getItem('mvPassword');

        // Load moments if authenticated
        this.loadMoments();

        // Add enter key listener for password input
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.authenticate();
                }
            });
        }
    }

    // ===================================
    // Authentication
    // ===================================
    authenticate() {
        const passwordInput = document.getElementById('passwordInput');
        const enteredPassword = passwordInput.value.trim();

        if (!enteredPassword) {
            this.showNotification('Please enter a password', 'error');
            return;
        }

        const storedPassword = localStorage.getItem('mvPassword');

        if (!storedPassword) {
            // First time - set password
            localStorage.setItem('mvPassword', enteredPassword);
            this.showNotification('Vault created successfully! 🎉', 'success');
            this.isAuthenticated = true;
            this.showMainApp();
        } else if (storedPassword === enteredPassword) {
            // Correct password
            this.isAuthenticated = true;
            this.showMainApp();
            this.showNotification('Welcome back! 🏛️', 'success');
        } else {
            // Wrong password
            this.showNotification('Incorrect password! 🔒', 'error');
            passwordInput.value = '';
        }
    }

    logout() {
        this.isAuthenticated = false;
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('authScreen').classList.remove('hidden');
        document.getElementById('passwordInput').value = '';
        this.showNotification('Vault locked 🔒', 'success');
    }

    showMainApp() {
        document.getElementById('authScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        this.renderMoments();
        this.updateStats();
    }

    // ===================================
    // Moment Management
    // ===================================
    loadMoments() {
        const stored = localStorage.getItem('mvMoments');
        if (stored) {
            this.moments = JSON.parse(stored);
        }
    }

    saveMomentsToStorage() {
        localStorage.setItem('mvMoments', JSON.stringify(this.moments));
    }

    createMoment(type, content, caption = '', title = '') {
        const moment = {
            id: Date.now() + Math.random(),
            type: type,
            content: content,
            caption: caption,
            title: title,
            timestamp: Date.now(),
            date: new Date().toISOString()
        };

        this.moments.unshift(moment); // Add to beginning
        this.saveMomentsToStorage();
        this.renderMoments();
        this.updateStats();
        this.showNotification('Moment saved! ✨', 'success');
    }

    deleteMoment() {
        if (!this.currentMoment) return;

        if (confirm('Are you sure you want to delete this moment? This cannot be undone.')) {
            this.moments = this.moments.filter(m => m.id !== this.currentMoment.id);
            this.saveMomentsToStorage();
            this.closeDetailModal();
            this.renderMoments();
            this.updateStats();
            this.showNotification('Moment deleted', 'success');
        }
    }

    // ===================================
    // File Upload Handling
    // ===================================
    handleFileUpload(event, type) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            this.pendingUpload = {
                type: type,
                content: content,
                fileName: file.name
            };

            this.showUploadPreview(type, content);
        };

        reader.readAsDataURL(file);
    }

    showUploadPreview(type, content) {
        const previewDiv = document.getElementById('uploadPreview');
        const previewContent = document.getElementById('previewContent');

        previewDiv.classList.remove('hidden');

        let html = '';
        if (type === 'photo') {
            html = `<img src="${content}" style="width: 100%; border-radius: var(--radius-md);" alt="Preview">`;
        } else if (type === 'video') {
            html = `<video src="${content}" controls style="width: 100%; border-radius: var(--radius-md);"></video>`;
        } else if (type === 'audio') {
            html = `
                <div style="background: var(--glass-bg); padding: 2rem; border-radius: var(--radius-md); text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎤</div>
                    <audio src="${content}" controls style="width: 100%;"></audio>
                </div>
            `;
        }

        previewContent.innerHTML = html;
    }

    saveMoment() {
        if (!this.pendingUpload) return;

        const caption = document.getElementById('uploadCaption').value;
        this.createMoment(
            this.pendingUpload.type,
            this.pendingUpload.content,
            caption
        );

        this.closeUploadModal();
    }

    // ===================================
    // Text Editor
    // ===================================
    showTextEditor() {
        document.getElementById('textEditor').classList.remove('hidden');
    }

    saveTextMoment() {
        const title = document.getElementById('momentTitle').value;
        const text = document.getElementById('momentText').value;

        if (!text.trim()) {
            this.showNotification('Please write something!', 'error');
            return;
        }

        this.createMoment('text', text, '', title);
        this.closeUploadModal();
    }

    // ===================================
    // Rendering
    // ===================================
    renderMoments() {
        const container = document.getElementById('momentStack');

        let momentsToShow = this.moments;

        // Apply filter
        if (this.currentFilter !== 'all') {
            momentsToShow = this.moments.filter(m => m.type === this.currentFilter);
        }

        // Apply time travel filter
        if (this.timeTravelMode) {
            const today = new Date();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();

            momentsToShow = momentsToShow.filter(m => {
                const momentDate = new Date(m.date);
                return momentDate.getMonth() === todayMonth &&
                    momentDate.getDate() === todayDate;
            });
        }

        if (momentsToShow.length === 0) {
            container.innerHTML = `
                <div class="glass-card text-center" style="padding: 3rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">
                        ${this.timeTravelMode ? '🧳' : '📭'}
                    </div>
                    <h3>${this.timeTravelMode ? 'No moments found for this date' : 'No moments yet'}</h3>
                    <p style="margin-top: 0.5rem;">
                        ${this.timeTravelMode ? 'Try a different date or add new moments!' : 'Start capturing your precious memories!'}
                    </p>
                    <button class="btn btn-primary mt-2" onclick="app.showUploadModal()">
                        ➕ Add ${this.timeTravelMode ? 'a' : 'Your First'} Moment
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = momentsToShow.map(moment => this.renderMomentCard(moment)).join('');
    }

    renderMomentCard(moment) {
        const date = new Date(moment.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const typeIcons = {
            photo: '📷',
            video: '🎥',
            audio: '🎤',
            text: '📝'
        };

        const badgeClass = `badge-${moment.type}`;

        let contentHtml = '';

        if (moment.type === 'photo') {
            contentHtml = `
                <div class="moment-media">
                    <img src="${moment.content}" alt="Moment" loading="lazy">
                </div>
            `;
        } else if (moment.type === 'video') {
            contentHtml = `
                <div class="moment-media">
                    <video src="${moment.content}" controls></video>
                </div>
            `;
        } else if (moment.type === 'audio') {
            contentHtml = `
                <div style="background: var(--glass-bg); padding: 1.5rem; border-radius: var(--radius-md); text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎤</div>
                    <audio src="${moment.content}" controls style="width: 100%;"></audio>
                </div>
            `;
        } else if (moment.type === 'text') {
            contentHtml = `
                ${moment.title ? `<h3 style="margin-bottom: 0.5rem;">${this.escapeHtml(moment.title)}</h3>` : ''}
                <div class="moment-text">${this.escapeHtml(moment.content).replace(/\n/g, '<br>')}</div>
            `;
        }

        return `
            <div class="moment-card" onclick="app.showMomentDetail(${moment.id})">
                <div class="moment-header">
                    <div class="moment-date">${formattedDate}</div>
                    <div class="moment-type-badge ${badgeClass}">
                        ${typeIcons[moment.type]} ${moment.type}
                    </div>
                </div>
                <div class="moment-content">
                    ${contentHtml}
                    ${moment.caption ? `<p class="moment-text" style="margin-top: 0.5rem;">${this.escapeHtml(moment.caption)}</p>` : ''}
                </div>
            </div>
        `;
    }

    showMomentDetail(momentId) {
        const moment = this.moments.find(m => m.id === momentId);
        if (!moment) return;

        this.currentMoment = moment;

        const date = new Date(moment.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const typeIcons = {
            photo: '📷',
            video: '🎥',
            audio: '🎤',
            text: '📝'
        };

        let contentHtml = '';

        if (moment.type === 'photo') {
            contentHtml = `<img src="${moment.content}" style="width: 100%; border-radius: var(--radius-md);" alt="Moment">`;
        } else if (moment.type === 'video') {
            contentHtml = `<video src="${moment.content}" controls style="width: 100%; border-radius: var(--radius-md);"></video>`;
        } else if (moment.type === 'audio') {
            contentHtml = `
                <div style="background: var(--glass-bg); padding: 2rem; border-radius: var(--radius-md); text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🎤</div>
                    <audio src="${moment.content}" controls style="width: 100%;"></audio>
                </div>
            `;
        } else if (moment.type === 'text') {
            contentHtml = `
                ${moment.title ? `<h2 style="margin-bottom: 1rem;">${this.escapeHtml(moment.title)}</h2>` : ''}
                <div style="line-height: 1.8; font-size: 1.1rem;">${this.escapeHtml(moment.content).replace(/\n/g, '<br>')}</div>
            `;
        }

        document.getElementById('detailContent').innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">${typeIcons[moment.type]}</div>
                <div style="color: rgba(255,255,255,0.6); font-size: 0.875rem;">${formattedDate}</div>
            </div>
            ${contentHtml}
            ${moment.caption ? `<p style="margin-top: 1.5rem; font-size: 1.1rem; line-height: 1.7;">${this.escapeHtml(moment.caption)}</p>` : ''}
        `;

        document.getElementById('detailModal').classList.add('active');
    }

    closeDetailModal() {
    }

    // ===================================
    // Statistics
    // ===================================
    updateStats() {
        document.getElementById('totalMoments').textContent = this.moments.length;
        document.getElementById('totalPhotos').textContent = this.moments.filter(m => m.type === 'photo').length;
        document.getElementById('totalVideos').textContent = this.moments.filter(m => m.type === 'video').length;
        document.getElementById('totalAudio').textContent = this.moments.filter(m => m.type === 'audio').length;
    }

    // ===================================
    // Modal Controls
    // ===================================
    showUploadModal() {
        document.getElementById('uploadModal').classList.add('active');
        // Reset form
        document.getElementById('textEditor').classList.add('hidden');
        document.getElementById('uploadPreview').classList.add('hidden');
        document.getElementById('momentTitle').value = '';
        document.getElementById('momentText').value = '';
        document.getElementById('uploadCaption').value = '';
        this.pendingUpload = null;
    }

    closeUploadModal() {
        document.getElementById('uploadModal').classList.remove('active');
        // Reset file inputs
        document.getElementById('photoUpload').value = '';
        document.getElementById('videoUpload').value = '';
        document.getElementById('audioUpload').value = '';
    }

    // ===================================
    // Data Backup & Restore
    // ===================================
    exportData() {
        const data = {
            moments: this.moments,
            version: '1.0',
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `MomentVault_Backup_${new Date().toISOString().slice(0, 10)}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        this.showNotification('Backup downloaded successfully! 💾', 'success');
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.moments && Array.isArray(data.moments)) {
                    if (confirm(`Found ${data.moments.length} moments in backup. This will merge with your current moments. Continue?`)) {
                        // Merge logic: avoid duplicates by ID
                        const currentIds = new Set(this.moments.map(m => m.id));
                        let newCount = 0;

                        data.moments.forEach(m => {
                            if (!currentIds.has(m.id)) {
                                this.moments.push(m);
                                newCount++;
                            }
                        });

                        // Sort by date (newest first)
                        this.moments.sort((a, b) => new Date(b.date) - new Date(a.date));

                        this.saveMomentsToStorage();
                        this.renderMoments();
                        this.updateStats();
                        this.showNotification(`Restored ${newCount} new moments! ♻️`, 'success');
                    }
                } else {
                    throw new Error('Invalid backup format');
                }
            } catch (err) {
                console.error(err);
                this.showNotification('Error importing backup file', 'error');
            }
            // Reset input
            event.target.value = '';
        };
        reader.readAsText(file);
    }

    // ===================================
    // Utilities
    // ===================================
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #10b981, #059669)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ===================================
// Initialize App
// ===================================
const app = new MomentVault();

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
