function set_difficulty() {
	var select = document.getElementById("difficulty");
	var difficulty = select.children[select.selectedIndex].value;
	localStorage.setItem('difficulty',difficulty);
	dict().createTable(difficulty);
}

document.querySelector('#diff').addEventListener('click', set_difficulty);

