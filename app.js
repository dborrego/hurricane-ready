// === HurricaneReady.ai - App JavaScript ===

document.addEventListener('DOMContentLoaded', () => {
    initRiskChecker();
    initWaitlistForm();
    initWaitlistCounter();
    initSmoothScroll();
});

// === RISK CHECKER ===
function initRiskChecker() {
    const form = document.getElementById('risk-form');
    const result = document.getElementById('risk-result');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const address = document.getElementById('address-input').value;
        
        // Simulate API call with realistic data
        const zone = determineZone(address);
        displayRiskResult(zone);
        
        result.classList.remove('hidden');
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

function determineZone(address) {
    const addr = address.toLowerCase();
    
    // Miami-Dade evacuation zone logic (simplified simulation)
    // Zone A - Coastal areas, barrier islands
    const zoneAKeywords = ['beach', 'key biscayne', 'miami beach', 'fisher island', 'star island', 
                           'venetian', 'palm island', 'hibiscus island', 'surfside', 'bal harbour',
                           'sunny isles', 'collins', 'ocean dr', 'ocean drive', 'brickell key'];
    
    // Zone B - Near coastal, flood-prone
    const zoneBKeywords = ['brickell', 'downtown miami', 'edgewater', 'midtown', 'wynwood',
                           'little haiti', 'design district', 'overtown', 'allapattah'];
    
    // Zone C - Inner areas with some flood risk
    const zoneCKeywords = ['coral gables', 'coconut grove', 'little havana', 'flagami',
                           'westchester', 'sweetwater', 'doral'];
    
    // Zone D/E - Inland, lower risk
    const zoneDKeywords = ['kendall', 'homestead', 'cutler', 'palmetto', 'miami gardens',
                           'hialeah', 'opa-locka', 'north miami', 'aventura'];
    
    for (const keyword of zoneAKeywords) {
        if (addr.includes(keyword)) return 'A';
    }
    for (const keyword of zoneBKeywords) {
        if (addr.includes(keyword)) return 'B';
    }
    for (const keyword of zoneCKeywords) {
        if (addr.includes(keyword)) return 'C';
    }
    for (const keyword of zoneDKeywords) {
        if (addr.includes(keyword)) return 'D';
    }
    
    // Random assignment for unknown addresses (weighted toward higher risk for demo)
    const zones = ['A', 'A', 'B', 'B', 'B', 'C', 'C', 'D'];
    return zones[Math.floor(Math.random() * zones.length)];
}

function displayRiskResult(zone) {
    const zoneDisplay = document.getElementById('zone-display');
    const riskLevel = document.getElementById('risk-level');
    const description = document.getElementById('risk-description');
    const services = document.getElementById('recommended-services');
    
    const zoneData = {
        'A': {
            level: 'High Priority Evacuation',
            description: 'Your property is in a mandatory evacuation zone for Category 1+ hurricanes. This includes coastal areas and barrier islands with highest storm surge risk.',
            services: [
                '✓ Hurricane shutters installation',
                '✓ Emergency evacuation planning',
                '✓ Backup generator (portable)',
                '✓ Emergency supply kit (5-day)',
                '✓ Flood barrier system',
                '✓ Important document backup'
            ],
            color: 'zone-a'
        },
        'B': {
            level: 'Elevated Evacuation Zone',
            description: 'Your property is in an evacuation zone for Category 2+ hurricanes. You may need to evacuate for major storms.',
            services: [
                '✓ Hurricane shutters installation',
                '✓ Backup generator service',
                '✓ Emergency supply kit (3-day)',
                '✓ Tree trimming service',
                '✓ Flood protection assessment'
            ],
            color: 'zone-b'
        },
        'C': {
            level: 'Moderate Risk Zone',
            description: 'Your property is in an evacuation zone for Category 3+ hurricanes. Prep is still essential for major storms.',
            services: [
                '✓ Hurricane shutters installation',
                '✓ Generator maintenance',
                '✓ Emergency supply kit',
                '✓ Tree trimming service'
            ],
            color: 'zone-c'
        },
        'D': {
            level: 'Lower Evacuation Priority',
            description: 'Your property is in an inland area with lower evacuation priority. Still important to prepare for power outages and wind damage.',
            services: [
                '✓ Hurricane shutters (optional)',
                '✓ Generator backup',
                '✓ Emergency supply kit',
                '✓ Basic storm prep'
            ],
            color: 'zone-d'
        },
        'E': {
            level: 'Lowest Evacuation Priority',
            description: 'Your property is in an inland area. Focus on power backup and basic storm preparation.',
            services: [
                '✓ Generator backup',
                '✓ Emergency supply kit',
                '✓ Basic storm prep'
            ],
            color: 'zone-e'
        }
    };
    
    const data = zoneData[zone];
    
    zoneDisplay.textContent = `Zone ${zone}`;
    zoneDisplay.className = `risk-zone ${data.color}`;
    riskLevel.textContent = data.level;
    description.textContent = data.description;
    services.innerHTML = data.services.map(s => `<li>${s}</li>`).join('');
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
        
        // Show loading state
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        btn.disabled = true;
        
        // Collect form data
        const formData = {
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            propertyType: document.getElementById('property-type').value,
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage for demo (in production, send to backend)
        const waitlist = JSON.parse(localStorage.getItem('hurricaneready_waitlist') || '[]');
        waitlist.push(formData);
        localStorage.setItem('hurricaneready_waitlist', JSON.stringify(waitlist));
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success
        form.classList.add('hidden');
        success.classList.remove('hidden');
        
        // Update counter
        incrementWaitlistCount();
        
        // Track event (would integrate with analytics)
        console.log('Waitlist signup:', formData);
    });
}

// === WAITLIST COUNTER ===
function initWaitlistCounter() {
    const counter = document.getElementById('waitlist-count');
    if (!counter) return;
    
    // Get stored count or use default
    let count = parseInt(localStorage.getItem('hurricaneready_count') || '247');
    counter.textContent = count;
    
    // Animate counter on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(counter, count);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
}

function animateCounter(element, target) {
    const duration = 1500;
    const start = Math.floor(target * 0.7);
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function incrementWaitlistCount() {
    const counter = document.getElementById('waitlist-count');
    if (!counter) return;
    
    let count = parseInt(localStorage.getItem('hurricaneready_count') || '247');
    count++;
    localStorage.setItem('hurricaneready_count', count.toString());
    counter.textContent = count;
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed nav
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === SHARE FUNCTION ===
function shareOnTwitter() {
    const text = encodeURIComponent("Just signed up for HurricaneReady.ai — AI that auto-books hurricane prep services before the storm hits. No more last-minute panic! 🌀🏠");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// === NAV SCROLL EFFECT ===
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
    }
});
