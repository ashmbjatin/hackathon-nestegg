// State
let state = {
    balance: 12500,
    nestScore: 1450,
    streak: 12,
    milestone: 15000,
    name: 'Felix Nest',
    email: 'felix@nestegg.app',
    phone: '9876543210',
    avatarSeed: 'Felix'
};

// DOM Elements
const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');
const saveBtns = document.querySelectorAll('.save-btn');
const balanceEl = document.querySelector('.savings-amount');
const scoreEl = document.getElementById('nest-score');
const streakEl = document.getElementById('streak-count');
const progressBarFill = document.querySelector('.progress-bar-fill');
const progressText = document.querySelector('.progress-text');
const toastContainer = document.getElementById('toast-container');
const mascot = document.querySelector('.egg-mascot');
const tabBtns = document.querySelectorAll('.tab-btn');

// Profile specific elements
const profileScreen = document.getElementById('profile-screen');
const topProfileBtn = document.getElementById('top-profile-btn');
const closeProfileBtn = document.getElementById('close-profile');
const profileAvatarEditBtn = document.getElementById('profile-avatar-edit-btn');
const profileEditAvatarImg = document.getElementById('profile-edit-avatar');
const topAvatarImg = document.getElementById('top-avatar-img');
const profileSaveBtn = document.getElementById('profile-save-btn');
// Form Inputs
const profileNameInp = document.getElementById('profile-name');
const profileEmailInp = document.getElementById('profile-email');
const profilePhoneInp = document.getElementById('profile-phone');

// Formatting utilities
const formatCurrency = (val) => '₹' + val.toLocaleString('en-IN');
const formatNumber = (val) => val.toLocaleString('en-US');

// Initialize
function init() {
    updateUI();
    
    // Auth and Loading Flow
    const loadingScreen = document.getElementById('loading-screen');
    const authScreen = document.getElementById('auth-screen');
    const authSubmitBtn = document.getElementById('auth-submit');
    const authTabBtns = document.querySelectorAll('.auth-tab-btn');

    // Simulate load time
    setTimeout(() => {
        if(loadingScreen) loadingScreen.classList.remove('active-overlay');
        if(authScreen) {
            authScreen.classList.remove('hide-view');
            authScreen.classList.add('active-overlay');
        }
    }, 2000);

    // Auth screen interactions
    if (authSubmitBtn && authScreen) {
        authSubmitBtn.addEventListener('click', () => {
            authScreen.classList.remove('active-overlay');
            authScreen.classList.add('hide-view');
            showToast('Welcome to your NestEgg! 🥚');
            triggerConfetti(window.innerWidth/2, window.innerHeight/2, true);
        });
    }

    if (authTabBtns) {
        authTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                authTabBtns.forEach(b => b.classList.remove('active-tab'));
                btn.classList.add('active-tab');
                if(btn.id === 'tab-signup') {
                    if(authSubmitBtn) authSubmitBtn.textContent = 'Continue';
                } else {
                    if(authSubmitBtn) authSubmitBtn.textContent = 'Log In';
                }
            });
        });
    }

    // Profile Screen Interactions
    if (topProfileBtn && profileScreen) {
        topProfileBtn.addEventListener('click', () => {
            // Load state into inputs
            profileNameInp.value = state.name;
            profileEmailInp.value = state.email;
            profilePhoneInp.value = state.phone;
            profileEditAvatarImg.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${state.avatarSeed}&backgroundColor=7fdcf4`;
            
            profileScreen.classList.remove('hide-view');
            profileScreen.classList.add('active-overlay');
        });
    }

    if (closeProfileBtn && profileScreen) {
        closeProfileBtn.addEventListener('click', () => {
            profileScreen.classList.remove('active-overlay');
            profileScreen.classList.add('hide-view');
        });
    }

    if (profileAvatarEditBtn) {
        profileAvatarEditBtn.addEventListener('click', () => {
            // Shuffle seed randomly
            const seeds = ['Felix', 'Aneka', 'Max', 'Luna', 'Gizmo', 'Leo', 'Mia', 'Bella', 'Charlie'];
            const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + Math.floor(Math.random() * 100);
            state.avatarSeed = randomSeed;
            profileEditAvatarImg.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${state.avatarSeed}&backgroundColor=7fdcf4`;
            
            // Brief bounce effect
            profileAvatarEditBtn.style.transform = 'scale(0.8)';
            setTimeout(() => { profileAvatarEditBtn.style.transform = ''; }, 150);
        });
    }

    if (profileSaveBtn && profileScreen) {
        profileSaveBtn.addEventListener('click', () => {
            state.name = profileNameInp.value;
            state.email = profileEmailInp.value;
            state.phone = profilePhoneInp.value;
            
            // Sync Top avatar
            if (topAvatarImg) {
                topAvatarImg.src = profileEditAvatarImg.src;
            }
            
            // Close profile
            profileScreen.classList.remove('active-overlay');
            profileScreen.classList.add('hide-view');
            
            showToast('Profile updated effectively! 💾');
        });
    }

    // Setup Navigation
    navItems.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            navItems.forEach(i => i.classList.remove('active'));
            views.forEach(v => {
                v.classList.remove('active-view');
                v.classList.add('hide-view');
            });
            
            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            targetView.classList.remove('hide-view');
            targetView.classList.add('active-view');
        });
    });

    // Leaderboard Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active-tab'));
            btn.classList.add('active-tab');
            // Simply animate the list for demonstration
            const list = document.querySelector('.leaderboard-list');
            list.classList.remove('slide-up');
            void list.offsetWidth; // trigger reflow
            list.classList.add('slide-up');
        });
    });

    // Quick Save Buttons
    saveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const amount = parseInt(btn.getAttribute('data-amount'), 10);
            saveMoney(amount);
            
            // Confetti effect from button position
            const rect = btn.getBoundingClientRect();
            triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    });

    // Mascot click Easter Egg
    if (mascot) {
        mascot.addEventListener('click', () => {
            showToast('🐣 Chirp! Keep saving!');
        });
    }
}

function saveMoney(amount) {
    // Add to balance
    state.balance += amount;
    
    // Score logic: 1 pt per ₹10 + 5 bonus points
    const pointsEarned = Math.floor(amount / 10) + 5; 
    state.nestScore += pointsEarned;
    
    // Animate balance counting up (simple instant update here for demo)
    updateUI();
    
    showToast(`Saved ${formatCurrency(amount)}! +${pointsEarned} <i class="fa-solid fa-gem"></i>`);
    
    // Animate mascot briefly
    if(mascot) mascot.style.transform = 'scale(1.3) rotate(15deg)';
    setTimeout(() => { if(mascot) mascot.style.transform = ''; }, 200);
}

function updateUI() {
    // Update text content
    balanceEl.textContent = formatCurrency(state.balance);
    scoreEl.textContent = formatNumber(state.nestScore);
    streakEl.textContent = state.streak;
    
    // Progress Bar Logic
    let currentPhase = state.milestone;
    while(state.balance >= currentPhase) {
        currentPhase += 5000;
        // Optionally trigger big milestone confetti here
        if (state.balance === state.milestone) {
            triggerConfetti(window.innerWidth/2, window.innerHeight/2, true);
        }
    }
    state.milestone = currentPhase;
    
    const prevMilestone = currentPhase - 5000;
    const range = currentPhase - prevMilestone;
    const progress = state.balance - prevMilestone;
    const percentage = Math.min(100, Math.max(0, (progress / range) * 100));
    
    progressBarFill.style.width = `${percentage}%`;
    progressText.innerHTML = `${formatCurrency(state.balance)} / ${formatCurrency(state.milestone)} to next Tier 🥈`;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    
    // Make sure we clear the oldest ones if they stack up too much
    if (toastContainer.children.length > 3) {
        toastContainer.removeChild(toastContainer.firstElementChild);
    }
    
    setTimeout(() => {
        if(toast.parentElement) {
            toast.remove();
        }
    }, 3000);
}

function triggerConfetti(x, y, big = false) {
    if (typeof confetti === 'undefined') return;
    
    const normalizedX = x / window.innerWidth;
    const normalizedY = y / window.innerHeight;
    
    const count = big ? 150 : 50;
    const spread = big ? 100 : 70;
    
    confetti({
        particleCount: count,
        spread: spread,
        origin: { x: normalizedX, y: normalizedY },
        colors: ['#58cc02', '#1cb0f6', '#ffc800', '#ce82ff', '#ff9600'],
        disableForReducedMotion: true,
        zIndex: 1000,
        startVelocity: 35
    });
}

// Ensure DOM is ready, then run init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
