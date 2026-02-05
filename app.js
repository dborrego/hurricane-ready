// === HurricaneReady.ai - App JavaScript ===

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initRiskChecker();
    initWaitlistForm();
    initDownloadForm();
    initFAQ();
    initAnimatedCounters();
    initSmoothScroll();
    initExampleAddresses();
});

// === COUNTDOWN TO HURRICANE SEASON ===
function initCountdown() {
    const countdownEl = document.getElementById('days-countdown');
    if (!countdownEl) return;
    
    const hurricaneSeasonStart = new Date('2026-06-01');
    const today = new Date();
    const diffTime = hurricaneSeasonStart - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    countdownEl.textContent = diffDays > 0 ? diffDays : 0;
}

// === ANIMATED COUNTERS ===
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.proof-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 1500;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// === EXAMPLE ADDRESSES ===
function initExampleAddresses() {
    const exampleBtns = document.querySelectorAll('.example-btn');
    const addressInput = document.getElementById('address-input');
    
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addressInput.value = btn.dataset.address;
            document.getElementById('risk-form').dispatchEvent(new Event('submit'));
        });
    });
}

// === RISK CHECKER ===
function initRiskChecker() {
    const form = document.getElementById('risk-form');
    const result = document.getElementById('risk-result');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const address = document.getElementById('address-input').value;
        
        const riskData = analyzeRisk(address);
        displayRiskResult(riskData);
        
        result.classList.remove('hidden');
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

function analyzeRisk(address) {
    const addr = address.toLowerCase();
    
    // Zone A - Coastal areas, barrier islands (highest risk)
    const zoneAKeywords = ['beach', 'key biscayne', 'miami beach', 'fisher island', 'star island', 
                           'venetian', 'palm island', 'hibiscus island', 'surfside', 'bal harbour',
                           'sunny isles', 'collins', 'ocean dr', 'ocean drive', 'brickell key',
                           'north bay', 'south beach'];
    
    // Zone B - Near coastal, flood-prone
    const zoneBKeywords = ['brickell', 'downtown miami', 'edgewater', 'midtown', 'wynwood',
                           'little haiti', 'design district', 'overtown', 'allapattah', 'coconut grove'];
    
    // Zone C - Inner areas with some flood risk
    const zoneCKeywords = ['coral gables', 'little havana', 'flagami', 'westchester', 
                           'sweetwater', 'doral', 'pinecrest', 'south miami'];
    
    // Zone D/E - Inland, lower risk
    const zoneDKeywords = ['kendall', 'homestead', 'cutler', 'palmetto', 'miami gardens',
                           'hialeah', 'opa-locka', 'north miami', 'aventura', 'miami lakes'];
    
    let evacZone = 'B';
    let floodZone = 'AE';
    let surgeRisk = 'Moderate';
    let score = 65;
    
    for (const keyword of zoneAKeywords) {
        if (addr.includes(keyword)) {
            evacZone = 'A';
            floodZone = 'VE';
            surgeRisk = 'High';
            score = Math.floor(Math.random() * 10) + 85; // 85-95
            break;
        }
    }
    
    if (evacZone !== 'A') {
        for (const keyword of zoneBKeywords) {
            if (addr.includes(keyword)) {
                evacZone = 'B';
                floodZone = 'AE';
                surgeRisk = 'Moderate-High';
                score = Math.floor(Math.random() * 10) + 70; // 70-80
                break;
            }
        }
    }
    
    if (evacZone !== 'A' && evacZone !== 'B') {
        for (const keyword of zoneCKeywords) {
            if (addr.includes(keyword)) {
                evacZone = 'C';
                floodZone = 'AH';
                surgeRisk = 'Moderate';
                score = Math.floor(Math.random() * 10) + 55; // 55-65
                break;
            }
        }
    }
    
    if (evacZone !== 'A' && evacZone !== 'B' && evacZone !== 'C') {
        for (const keyword of zoneDKeywords) {
            if (addr.includes(keyword)) {
                evacZone = 'D';
                floodZone = 'X';
                surgeRisk = 'Low';
                score = Math.floor(Math.random() * 10) + 35; // 35-45
                break;
            }
        }
    }
    
    // Default for unknown addresses
    if (!zoneAKeywords.some(k => addr.includes(k)) && 
        !zoneBKeywords.some(k => addr.includes(k)) && 
        !zoneCKeywords.some(k => addr.includes(k)) && 
        !zoneDKeywords.some(k => addr.includes(k))) {
        const zones = ['A', 'B', 'B', 'C', 'C', 'D'];
        evacZone = zones[Math.floor(Math.random() * zones.length)];
        score = evacZone === 'A' ? 85 : evacZone === 'B' ? 72 : evacZone === 'C' ? 58 : 42;
        floodZone = evacZone === 'A' ? 'VE' : evacZone === 'B' ? 'AE' : evacZone === 'C' ? 'AH' : 'X';
        surgeRisk = evacZone === 'A' ? 'High' : evacZone === 'B' ? 'Moderate-High' : evacZone === 'C' ? 'Moderate' : 'Low';
    }
    
    return { evacZone, floodZone, surgeRisk, score };
}

function displayRiskResult(data) {
    const { evacZone, floodZone, surgeRisk, score } = data;
    
    // Update score circle
    const scoreCircle = document.getElementById('score-circle');
    const scoreDisplay = document.getElementById('risk-score');
    const evacDisplay = document.getElementById('evac-zone');
    const floodDisplay = document.getElementById('flood-zone');
    const surgeDisplay = document.getElementById('surge-risk');
    const description = document.getElementById('risk-description');
    const services = document.getElementById('recommended-services');
    
    // Animate score
    scoreDisplay.textContent = score;
    
    // Calculate stroke offset (283 is full circle circumference)
    const offset = 283 - (283 * score / 100);
    scoreCircle.style.strokeDashoffset = offset;
    
    // Color based on score
    if (score >= 70) {
        scoreCircle.style.stroke = '#ef4444';
        scoreDisplay.style.color = '#ef4444';
    } else if (score >= 50) {
        scoreCircle.style.stroke = '#f59e0b';
        scoreDisplay.style.color = '#f59e0b';
    } else {
        scoreCircle.style.stroke = '#10b981';
        scoreDisplay.style.color = '#10b981';
    }
    
    // Update zone displays
    evacDisplay.textContent = `Zone ${evacZone}`;
    floodDisplay.textContent = floodZone;
    surgeDisplay.textContent = surgeRisk;
    
    // Zone colors
    const zoneColors = {
        'A': '#ef4444',
        'B': '#f59e0b', 
        'C': '#eab308',
        'D': '#10b981',
        'E': '#10b981'
    };
    evacDisplay.style.color = zoneColors[evacZone];
    
    // Descriptions and services
    const zoneData = {
        'A': {
            description: 'Your property is in a HIGH-RISK mandatory evacuation zone. Category 1+ hurricanes require evacuation. Storm surge and flooding are major concerns.',
            services: [
                '✓ Hurricane shutters (critical)',
                '✓ Emergency evacuation plan',
                '✓ Flood barrier system',
                '✓ Backup generator (portable)',
                '✓ 5-day emergency supplies',
                '✓ Document backup service'
            ]
        },
        'B': {
            description: 'Your property is in an ELEVATED-RISK evacuation zone for Category 2+ hurricanes. Flooding and wind damage are significant concerns.',
            services: [
                '✓ Hurricane shutters installation',
                '✓ Backup generator service',
                '✓ Flood protection assessment',
                '✓ 3-day emergency supplies',
                '✓ Tree trimming service'
            ]
        },
        'C': {
            description: 'Your property is in a MODERATE-RISK zone, evacuating for Category 3+ hurricanes. Wind damage and localized flooding are possible.',
            services: [
                '✓ Hurricane shutters',
                '✓ Generator maintenance',
                '✓ Emergency supply kit',
                '✓ Tree trimming service'
            ]
        },
        'D': {
            description: 'Your property is in a LOWER-RISK inland area. While evacuation priority is lower, preparation for power outages and wind damage is still essential.',
            services: [
                '✓ Hurricane shutters (recommended)',
                '✓ Generator backup',
                '✓ Emergency supply kit',
                '✓ Basic storm prep'
            ]
        }
    };
    
    const zoneInfo = zoneData[evacZone] || zoneData['C'];
    description.textContent = zoneInfo.description;
    services.innerHTML = zoneInfo.services.map(s => `<li>${s}</li>`).join('');
}

// === WAITLIST FORM ===
function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    const success = document.getElementById('waitlist-success');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');
        
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        btn.disabled = true;
        
        const formData = {
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            propertyType: document.getElementById('property-type').value,
            timestamp: new Date().toISOString(),
            referralCode: generateReferralCode()
        };
        
        // Store locally
        const waitlist = JSON.parse(localStorage.getItem('hurricaneready_waitlist') || '[]');
        waitlist.push(formData);
        localStorage.setItem('hurricaneready_waitlist', JSON.stringify(waitlist));
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        form.classList.add('hidden');
        success.classList.remove('hidden');
        
        // Update position number and referral link
        const position = 1247 + waitlist.length;
        document.getElementById('position-number').textContent = position.toLocaleString();
        document.getElementById('referral-link').value = `hurricaneready.ai/r/${formData.referralCode}`;
        
        incrementWaitlistCount();
    });
}

function generateReferralCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// === DOWNLOAD FORM ===
function initDownloadForm() {
    const form = document.getElementById('download-form');
    const success = document.getElementById('download-success');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');
        
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        btn.disabled = true;
        
        const email = document.getElementById('download-email').value;
        
        // Store download lead
        const downloads = JSON.parse(localStorage.getItem('hurricaneready_downloads') || '[]');
        downloads.push({ email, timestamp: new Date().toISOString() });
        localStorage.setItem('hurricaneready_downloads', JSON.stringify(downloads));
        
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        form.classList.add('hidden');
        success.classList.remove('hidden');
    });
}

// === FAQ ACCORDION ===
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// === WAITLIST COUNTER ===
function incrementWaitlistCount() {
    const counter = document.getElementById('waitlist-count');
    if (!counter) return;
    
    let count = parseInt(localStorage.getItem('hurricaneready_count') || '1247');
    count++;
    localStorage.setItem('hurricaneready_count', count.toString());
    counter.textContent = count.toLocaleString();
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 120;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === SHARE FUNCTIONS ===
function copyReferralLink() {
    const input = document.getElementById('referral-link');
    input.select();
    document.execCommand('copy');
    
    // Show feedback
    const btn = input.nextElementSibling;
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = originalText, 2000);
}

function shareOnTwitter() {
    const text = encodeURIComponent("I just joined the waitlist for HurricaneReady.ai — AI that auto-books hurricane prep services before the storm hits. No more last-minute panic! 🌀🏠 Miami homeowners, check it out:");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const text = encodeURIComponent("Check out HurricaneReady.ai — AI that auto-books hurricane prep services before the storm hits. Perfect for us Miami folks! 🌀 " + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

// === NAV SCROLL EFFECT ===
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// === INITIALIZE WAITLIST COUNT ON LOAD ===
document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('waitlist-count');
    if (counter) {
        const count = parseInt(localStorage.getItem('hurricaneready_count') || '1247');
        counter.textContent = count.toLocaleString();
    }
});
