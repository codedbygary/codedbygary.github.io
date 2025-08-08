// Theme management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon();

function updateThemeIcon() {
	const icon = themeToggle.querySelector('i');
	if (body.getAttribute('data-theme') === 'dark') {
		icon.className = 'fa-solid fa-sun';
	} else {
		icon.className = 'fa-solid fa-moon';
	}
}

themeToggle.addEventListener('click', () => {
	const currentTheme = body.getAttribute('data-theme');
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

	body.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
	updateThemeIcon();
});

// Smooth scrolling for navigation links
document.querySelectorAll('.scroll-link').forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const targetId = link.getAttribute('href');
		const targetSection = document.querySelector(targetId);

		if (targetSection) {
			targetSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	});
});

// Scroll animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, observerOptions);

// Add fade-in class to elements and observe them
document.querySelectorAll('section').forEach((section) => {
	section.classList.add('fade-in');
	observer.observe(section);
});

// Skills interaction
document.querySelectorAll('.cell').forEach((cell) => {
	cell.addEventListener('click', () => {
		const skill = cell.getAttribute('data-skill');
		showSkillInfo(skill);
	});
});

function showSkillInfo(skill) {
	const messages = {
		HTML: 'The backbone of the web! I structure content like a pro.',
		CSS: 'Making things pretty since forever. Flexbox is my best friend.',
		JavaScript: 'The magic that makes websites interactive. ES6+ all the way!',
		'Node.js': 'Backend power with JavaScript. npm is my second home.',
		React: 'Component-based UI development. Hooks are life-changing!',
	};

	const message = messages[skill] || 'This is one of my skills!';

	// Create a temporary notification
	const notification = document.createElement('div');
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
	notification.textContent = message;

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = 'slideOutRight 0.3s ease';
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 3000);
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	// Clear previous errors
	clearErrors();

	// Get form data
	const formData = new FormData(contactForm);
	const name = formData.get('name').trim();
	const email = formData.get('email').trim();
	const message = formData.get('message').trim();

	// Validate form
	let isValid = true;

	if (!name) {
		showError('name', 'Name is required');
		isValid = false;
	}

	if (!email) {
		showError('email', 'Email is required');
		isValid = false;
	} else if (!isValidEmail(email)) {
		showError('email', 'Please enter a valid email address');
		isValid = false;
	}

	if (!message) {
		showError('message', 'Message is required');
		isValid = false;
	}

	if (!isValid) return;

	// Show loading state
	submitBtn.classList.add('loading');
	submitBtn.disabled = true;

	// Simulate form submission (replace with actual API call)
	try {
		await simulateFormSubmission({ name, email, message });
		showSuccessMessage();
		contactForm.reset();
	} catch (error) {
		showErrorMessage();
	} finally {
		submitBtn.classList.remove('loading');
		submitBtn.disabled = false;
	}
});

function clearErrors() {
	document.querySelectorAll('.error-message').forEach((error) => {
		error.textContent = '';
	});
	document.querySelectorAll('input, textarea').forEach((field) => {
		field.classList.remove('error');
	});
}

function showError(fieldName, message) {
	const field = document.getElementById(fieldName);
	const errorElement = document.getElementById(fieldName + 'Error');

	field.classList.add('error');
	errorElement.textContent = message;
}

function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

async function simulateFormSubmission(data) {
	// Simulate API call delay
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('Form submitted:', data);
			resolve();
		}, 2000);
	});
}

function showSuccessMessage() {
	const notification = document.createElement('div');
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
	notification.innerHTML =
		'<i class="fa-solid fa-check"></i> Message sent successfully!';

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = 'slideOutRight 0.3s ease';
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 3000);
}

function showErrorMessage() {
	const notification = document.createElement('div');
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--error-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
	notification.innerHTML =
		'<i class="fa-solid fa-exclamation-triangle"></i> Failed to send message. Please try again.';

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = 'slideOutRight 0.3s ease';
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 300);
	}, 3000);
}

// Interactive Game Modal
const gameLink = document.getElementById('gameLink');
const gameModal = document.getElementById('gameModal');
const closeGame = document.getElementById('closeGame');
const gameIntro = document.getElementById('gameIntro');
const gameArea = document.getElementById('gameArea');
const codeBlock = document.getElementById('codeBlock');
const timer = document.getElementById('timer');
const score = document.getElementById('score');
const submitAnswer = document.getElementById('submitAnswer');
const newGame = document.getElementById('newGame');

let gameState = {
	difficulty: 'easy',
	time: 0,
	score: 0,
	timer: null,
	currentProblem: null,
};

gameLink.addEventListener('click', (e) => {
	e.preventDefault();
	gameModal.style.display = 'block';
	document.body.style.overflow = 'hidden';
});

closeGame.addEventListener('click', () => {
	gameModal.style.display = 'none';
	document.body.style.overflow = 'auto';
	stopGame();
});

window.addEventListener('click', (e) => {
	if (e.target === gameModal) {
		gameModal.style.display = 'none';
		document.body.style.overflow = 'auto';
		stopGame();
	}
});

// Game difficulty selection
document.querySelectorAll('.game-btn[data-difficulty]').forEach((btn) => {
	btn.addEventListener('click', () => {
		gameState.difficulty = btn.getAttribute('data-difficulty');
		startGame();
	});
});

function startGame() {
	gameIntro.style.display = 'none';
	gameArea.style.display = 'block';

	gameState.time = 0;
	gameState.score = 0;
	updateDisplay();

	generateProblem();
	startTimer();
}

function stopGame() {
	if (gameState.timer) {
		clearInterval(gameState.timer);
		gameState.timer = null;
	}
	gameIntro.style.display = 'block';
	gameArea.style.display = 'none';
}

function startTimer() {
	gameState.timer = setInterval(() => {
		gameState.time++;
		updateDisplay();
	}, 1000);
}

function updateDisplay() {
	timer.textContent = `Time: ${gameState.time}s`;
	score.textContent = `Score: ${gameState.score}`;
}

function generateProblem() {
	const problems = {
		easy: [
			{
				code: `function add(a, b) {
    return a + b;
}`,
				question: 'What does this function do?',
				options: [
					'Adds two numbers',
					'Subtracts two numbers',
					'Multiplies two numbers',
					'Divides two numbers',
				],
				correct: 0,
			},
			{
				code: `let name = "Gary";
console.log("Hello " + name);`,
				question: 'What will be logged?',
				options: ['Hello Gary', 'Hello name', 'Gary', 'Error'],
				correct: 0,
			},
		],
		medium: [
			{
				code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
				question: 'What will be logged?',
				options: [
					'[1, 2, 3, 4, 5]',
					'[2, 4, 6, 8, 10]',
					'[1, 4, 9, 16, 25]',
					'Error',
				],
				correct: 1,
			},
		],
		hard: [
			{
				code: `function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}
console.log(fibonacci(5));`,
				question: 'What will be logged?',
				options: ['3', '5', '8', '13'],
				correct: 1,
			},
		],
	};

	const difficultyProblems = problems[gameState.difficulty];
	gameState.currentProblem =
		difficultyProblems[Math.floor(Math.random() * difficultyProblems.length)];

	displayProblem();
}

function displayProblem() {
	codeBlock.innerHTML = `
        <div style="color: #e06c75;">// ${
									gameState.currentProblem.question
								}</div>
        <br>
        <pre style="margin: 0;">${gameState.currentProblem.code}</pre>
        <br>
        <div style="margin-top: 15px;">
            ${gameState.currentProblem.options
													.map(
														(option, index) => `
                <div style="margin: 5px 0;">
                    <input type="radio" name="answer" value="${index}" id="option${index}">
                    <label for="option${index}" style="margin-left: 8px;">${option}</label>
                </div>
            `
													)
													.join('')}
        </div>
    `;
}

submitAnswer.addEventListener('click', () => {
	const selectedAnswer = document.querySelector('input[name="answer"]:checked');

	if (!selectedAnswer) {
		alert('Please select an answer!');
		return;
	}

	const answer = parseInt(selectedAnswer.value);

	if (answer === gameState.currentProblem.correct) {
		gameState.score += 10;
		alert('Correct! +10 points 🎉');
	} else {
		alert(
			`Wrong! The correct answer was: ${
				gameState.currentProblem.options[gameState.currentProblem.correct]
			}`
		);
	}

	updateDisplay();
	generateProblem();
});

newGame.addEventListener('click', () => {
	stopGame();
	gameIntro.style.display = 'block';
	gameArea.style.display = 'none';
});

// Add slide animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
