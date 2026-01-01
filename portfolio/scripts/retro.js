// BOOT SEQUENCE
const bootText = [
    "Initializing MOZTAFA OS kernel...",
    "Loading drivers... csharp.sys, dotnet.sys, coffee.sys",
    "Checking memory... 640K OK",
    "Mounting file system...",
    "User profile: 'BackendDev' loaded.",
    "System ready."
];

// Theme Switcher Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
             if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});


let bootComplete = false;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Boot typing effect
    const options = {
        strings: [bootText.join('^100\n') + '^200\n\nWelcome to Mostafa iOS/OS.'],
        typeSpeed: 1, // Much faster
        backSpeed: 0,
        contentType: 'text', // preserves newlines
        onComplete: () => {
            const logo = document.getElementById('boot-logo');
            logo.classList.remove('hide');

            // Auto-redirect after 4 seconds
            let countdown = 4;
            const btn = document.getElementById('enter-os-btn');
            const originalText = btn.innerText;

            const interval = setInterval(() => {
                btn.innerText = `${originalText} (${countdown})`;
                countdown--;
                if (countdown < 0) {
                    clearInterval(interval);
                    enterBtn.click();
                }
            }, 1000);

            // Stop auto-redirect if user clicks manually
            btn.addEventListener('click', () => clearInterval(interval));
        }
    };

    // Only run Typed if the element exists
    if(document.getElementById('boot-text')) {
        new Typed('#boot-text', options);
    }

    // 2. Enter OS
    const enterBtn = document.getElementById('enter-os-btn');
    if(enterBtn) {
        enterBtn.addEventListener('click', () => {
            const bootScreen = document.getElementById('boot-screen');
            bootScreen.style.transition = "transform 0.5s ease-out";
            bootScreen.style.transform = "translateY(-100%)";
            document.getElementById('desktop').classList.remove('hide');
            startClock();
        });
    }

    // 3. Initialize Draggables
    initDraggables();
});

// CLOCK
function startClock() {
    const clockEl = document.getElementById('clock');
    if(!clockEl) return;
    setInterval(() => {
        const now = new Date();
        clockEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 1000);
}

// WINDOW MANAGEMENT
let highestZ = 100;

window.openWindow = function(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
        win.classList.remove('closed');
        bringToFront(win);

        // Center animation (simple GSAP)
        gsap.fromTo(win,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.7)" }
        );
    }
}

window.closeWindow = function(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
         gsap.to(win, {
             scale: 0.8,
             opacity: 0,
             duration: 0.15,
             onComplete: () => win.classList.add('closed')
        });
    }
}

function bringToFront(element) {
    highestZ++;
    element.style.zIndex = highestZ;
}

function initDraggables() {
    Draggable.create(".retro-window", {
        type: "x,y",
        trigger: ".window-header",
        bounds: "#desktop",
        edgeResistance: 0.65,
        onPress: function() {
            bringToFront(this.target);
        }
    });

    // Add click listener to windows to bring to front even if not dragging header
    document.querySelectorAll('.retro-window').forEach(win => {
        win.addEventListener('mousedown', () => bringToFront(win));
    });
}
