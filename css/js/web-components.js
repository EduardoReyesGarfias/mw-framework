// tooltip or PopupupNotify
const template = document.createElement('template');
template.innerHTML = `
	
	<style>

		.tooltip-connect{
			display:inline-block;
			position:relative;
			z-index:3;
		}

		.tooltip-connect-text{
			text-decoration: underline;
			cursor:pointer;
		}

		.tooltip-connect-text:hover{
			opacity:0.7;
		}

		.tooltip-container{
			display:inline-block;
			position:absolute;
			bottom: 100%;
			max-width: 250px;
			height: auto;
			z-index:9;
			border-radius:3px;
			box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
			background-color:white;
			overflow: hidden;
			transform: scale(0);
			transform-origin: bottom left;
			transition: transform .5s ease;
		}

		.tooltip-container > .tooltip-title{
			font-size:16px;
			margin:0;
			padding:.5em;
			background-color:#ddd;
		}

		.tooltip-container > .tooltip-text{
			font-size:14px;
			margin:0;
			padding:1em;
			line-height:1.7;
			text-align:left;	
		}
		
	</style>

	<div class="tooltip-connect">
		<span class="tooltip-connect-text">This is the text that the user can click</span>
	</div>

	<div class="tooltip-container">
		<h1 class="tooltip-title"> this is my title </h1>

		<p class="tooltip-text"> 
			<slot name="message">
		</p>
	</div>

`;

class PopupupNotify extends HTMLElement{

	constructor(){

		super();
		this.attachShadow({mode:'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true));

	}

	// Abre y cierra el tolltip
	tooltip( expandState ){

		const tooltip = this.shadowRoot.querySelector('.tooltip-container');

		if (expandState == true)
			tooltip.style.transform = "scale(1)";
		else
			tooltip.style.transform = "scale(0)";

	}

	// Se crea cuando nace el elemento
	connectedCallback(){
		this.shadowRoot.querySelector('.tooltip-connect').addEventListener('click', () => {

			const elemntStyle = this.shadowRoot.querySelector('.tooltip-container').style.transform;
			const tooltipState = (elemntStyle == '<empty string>' || elemntStyle == 'scale(1)') ? false : true;
			this.tooltip( tooltipState );

			// recibir atributos para personalizar
			if (this.getAttribute('background'))
				this.shadowRoot.querySelector('.tooltip-container').style.backgroundColor = this.getAttribute('background');

			if (this.getAttribute('color'))
				this.shadowRoot.querySelector('.tooltip-container').style.color = this.getAttribute('color');
			

		});
	}

}
window.customElements.define('popup-notify', PopupupNotify);