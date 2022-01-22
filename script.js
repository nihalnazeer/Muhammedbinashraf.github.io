console.log("it's working");

const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement= txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this. type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function(){
    const current= this.wordIndex % this.words.length;

    const fullTxt = this.words[current];

    if(this.isDeleting){
        this.txt = fullTxt.substring(0,this.txt.length - 1)
    }else{
        this.txt = fullTxt.substring(0,this.txt.length + 1)
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;

    if (this.isDeleting){
        typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait;

        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;

        this.wordIndex++;

        typeSpeed = 500;
    }

    setTimeout(() => this.type(),typeSpeed)
}


document.addEventListener('DOMContentLoaded',init);
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait)
}

let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}


let themeDots = document.getElementsByClassName('theme-dot')

for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
        let mode = this.dataset.mode
        console.log('option clicked: ', mode)
        setTheme(mode)
    })
}

function setTheme(mode){
    if(mode == 'light'){
        document.getElementById('theme-style').href = 'default.css'
    }


	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}
    localStorage.setItem('theme', mode)
}

