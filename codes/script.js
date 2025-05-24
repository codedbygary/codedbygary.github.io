const txt = document.getElementById('h3');

const minNum = 1;
const maxNum = 100;
const ans = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

let attempt = 0;
let guess;
let running = true;

while (running) {
	guess = window.prompt(`guess a number between ${minNum} - ${maxNum}`);
	guess = Number(guess);

	if (isNaN(guess)) {
		window.alert(`that is NOT a number`);
	} else if (guess < minNum || guess > maxNum) {
		window.alert(`please enter a number between ${minNum} - ${maxNum}.`);
	} else {
		attempt++;
		if (guess < ans) {
			window.alert(`guess higher :D`);
		} else if (guess > ans) {
			window.alert(`guess lower :D`);
		} else {
			window.alert(
				`BOOM! you've guess it. the number was ${ans}. and it took you ${attempt} attempts`
			);
            running = false;
		}
	}
}

txt.textContent = `Yep! the answer was ${ans}!`;
