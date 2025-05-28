document.getElementById('gameLink').onclick = function (event) {
	event.preventDefault();

	const minNum = 1;
	const maxNum = 100;
	const ans = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

	let attempt = 0;
	let guess;
	let running = true;

	while (running) {
		guess = window.prompt(`Guess a number between ${minNum} - ${maxNum}`);

		if (guess === null) {
			window.alert('Game cancelled. Bye! 👋');
			break;
		}

		// Trim whitespace and check if it's empty
		guess = guess.trim();
		if (guess === '') {
			window.alert('You entered nothing!');
			continue;
		}

		guess = Number(guess);

		if (isNaN(guess)) {
			window.alert(`That is NOT a number`);
		} else if (guess < minNum || guess > maxNum) {
			window.alert(`Please enter a number between ${minNum} - ${maxNum}.`);
		} else {
			attempt++;
			if (guess < ans) {
				window.alert(`Guess higher :D`);
			} else if (guess > ans) {
				window.alert(`Guess lower :D`);
			} else {
				window.alert(
					`BOOM! You guessed it! 🎉 The number was ${ans} and it took you ${attempt} attempts.`
				);
				running = false;
			}
		}
	}
};
