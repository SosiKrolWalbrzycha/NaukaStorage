const input = document.querySelector('#text-input')
const output = document.querySelector('#text-output')
const keyInput = document.querySelector('#key-input')
const keyOutput = document.querySelector('#key-output')
//BUTTONS
const localUpload = document.querySelector('.localupload')
const sessionUpload = document.querySelector('.sessionupload')
const localDownload = document.querySelector('.localdownload')
const storageDelete = document.querySelector('.storageDelete')

const rangeInput = document.querySelector('.range');

let sourceOfStorage = sessionStorage;

const changeSource = () => {
	if (rangeInput.value == 1) {
		sourceOfStorage = localStorage
	} else {
		sourceOfStorage = sessionStorage
	}
	KeyName();
	output.textContent = "";
}


const test = () => {
	console.log(sourceOfStorage.length)
}

const KeyName = () => {
	keyOutput.innerHTML = ""
	let keyNumbers = sourceOfStorage.length
	const optionArr = []

	while (keyNumbers > 0) {
		optionArr.push(keyNumbers - 1)
		

		keyOutput.innerHTML += `<option>${sourceOfStorage.key(keyNumbers - 1)}</option>`
		keyNumbers--
	}
}
KeyName();

const addToStorage = e => {
	function localStorageTest() {
		const test = 'test' + new Date().valueOf()
		try {
			localStorage.setItem(test, test)
			localStorage.removeItem(test)
			return true
		} catch (e) {
			return false
		}
	}

	if (localStorageTest()) {
		if (input.value !== '' && keyInput.value !== '') {
			if (e == 1) {
				localStorage.setItem(keyInput.value, input.value)
			} else {
				sessionStorage.setItem(keyInput.value, input.value)
			}
			input.value = ''
			keyInput.value = ''
		} else {
			alert('Sprawdż czy uzupełniłeś wszystkie pola!')
		}
	} else {
		alert('Twoja przeglądarka nie obsługuje STORAGE!')
	}

	KeyName();
}

const contentDownload = () => {
	const elementToDisplay = sourceOfStorage.getItem(keyOutput.value);
	output.textContent = elementToDisplay;

}

const contentDelete = () => {
	sourceOfStorage.clear()
	KeyName();
	output.textContent=""
}

const addLocal = () => {
	addToStorage(1)
}
const addSession = () => {
	addToStorage(2)
}

localUpload.addEventListener('click', addLocal)
sessionUpload.addEventListener('click', addSession)
localDownload.addEventListener('click', contentDownload)
storageDelete.addEventListener('click', contentDelete)

rangeInput.addEventListener('input', changeSource)
