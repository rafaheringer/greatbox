/*
 * jQuery greatBox
 * 
 * @project		greatbox
 * @source		https://github.com/rafaheringer/greatbox
 * @version		0.1
 *
 * Agradecimentos aos criadores do jQuery Boilerplate, utilizado
 * como base para este código.
 */
 
;(function ($, window, undefined) {
	//Nome do plugin
	var pluginName = "greatbox";

	//Opções padrões
	var defaults = {
		//Callbacks
		onShow: null, 				//Callback que será executado logo que o html for exibido na tela
		onClose: null,				//Callback que será executado assim que o modal receber evento para se fechar
		onCreate: null,				//Callback que será executado quando o html for criado no DOM, mas ainda não exibido

		//Customização visual
		addClass: "",				//Adiciona novas classes ao elemento pai do modal
		fadeSpeed: 200,			//Velocidade das animações de fading, 0 para desativar

		//Customização do comportamento
		buttons: null,				//Botões customizáveis que ficam no rodapé do modal

		//Ajax
		ajax: false,				//Habilita ajax. Se for "true", pegar URL do href ou data-ajaxurl. Pode ser passado a url direto

		//Textos
		loadingText: 'Loading...'	//Texto padrão para "carregando"
	};

	//Construtor
	function Plugin(element, options) {
		//Prefixo utilizado nas classes e ids
		this.prefix = pluginName + '_';

		//Variáveis a serem utilizadas pelo plugin
		this._defaults = defaults;
		this._name = pluginName;
		this.element = $(element);

		//Extendendo as opções
		this.options = $.extend({}, defaults, options);

		//Inicialização
		this.init();
	};

	//Inicializador
	Plugin.prototype.init = function() {
		//Utilizado para poder chamar funções do plugin dentro de callbacks do jQuery
		var _this = this;

		//Caso seja elemento, dispara no click
		if (this.element.length) {
			this.element.on('click', function(event) {
				//Começa o modal
				_this.startModal();

				//Previne o evento padrão, assegurando que a página não recarregue
				event.preventDefault();
			});
		}

		//Se não, abre modal diretamente
		else {
			//Começa o modal
			this.startModal();
		}
		
	};

	//Primeiros passos para criação do modal
	Plugin.prototype.startModal = function() {

		//Previne que exista mais de um modal na tela

		//Exibe blackout
		this.showBlackout();

		//Caso possua ajax
		if (this.options.ajax) {
			//Adiciona loading na página
			this.showLoading();

			//Faz chamada ajax

				//Cria html
		}

		//Tratamento caso não seja ajax
		else {
			//Cria html
			this.createHtml();
		}
	};

	//Construção do HTML de acordo com as opções passadas
	Plugin.prototype.createHtml = function() {

		html += '<div id="' + pluginName + '">';
			//Topo com título
			html += '<div class="' + this.prefix + 'header">';
			html += '</div>';

			//Rodapé e seus links de ação
			html += '<div class="' + this.prefix + 'footer">';
			html += '</div>';			
		html += '</div>';

		//Retorno
		return html;
	};

	/*
	 * Loading - Carregamento do modal
	 * ===============================
	 */

	//Chama loading
	Plugin.prototype.showLoading = function() {
		var loadingElement = document.getElementById(this.prefix + 'loading');

		//Verifica se já não existe um loading
		if ( loadingElement ) {
			loadingElement = $(document.getElementById(this.prefix + 'loading')).fadeIn(this.options.fadeSpeed);
		}

		//Caso não exista o loading
		else {
			//Cria html do loading
			var html = '<div id="' + this.prefix + 'loading">';
				html += '<div class="' + this.prefix + 'loadingContainer">';
					if(this.options.loadingText) {
						html += '<span class="' + this.prefix + 'loadingText">';
							html += this.options.loadingText;
						html += '<span>';
					}
				html += '</div>';
			html += '</div>';

			//Adiciona na página com fade
			loadingElement = $(html).appendTo('body');
			loadingElement.fadeOut(0).fadeIn(this.options.fadeSpeed);

		}

		return loadingElement;
	};

	//Cancela loading
	Plugin.prototype.hideLoading = function() {
		var loadingElement = document.getElementById(this.prefix + 'loading');
		loadingElement.fadeOut(this.options.fadeSpeed);
	};

	/*
	 * Blackout - Fundo do modal
	 * =========================
	 */

	//Chama blackout
	Plugin.prototype.showBlackout = function() {
		var blackoutElement = document.getElementById(this.prefix + 'blackout');

		//Verifica se já não existe um blackout
		if ( blackoutElement ) {
			blackoutElement = $(document.getElementById(this.prefix + 'blackout')).fadeIn(this.options.fadeSpeed);
		}

		//Caso não exista o blackout
		else {
			//Cria html do blackout
			var html = '<div id="' + this.prefix + 'blackout"></div>';

			//Adiciona na página com fade
			blackoutElement = $(html).appendTo('body');
			blackoutElement.fadeOut(0).fadeIn(this.options.fadeSpeed);

		}

		//Blackout, usado para "tapar" o site
		

		return blackoutElement;
	};

	//Cancela blackout
	Plugin.prototype.hideBlackout = function() {
		var blackoutElement = document.getElementById(this.prefix + 'blackout');
		blackoutElement.fadeOut(this.options.fadeSpeed);
	};


	/*
	 * Outros
	 * ======
	 */
	//Criação do plugin em jQuery
	$.fn[pluginName] = function(options) {
		//Verifica se o elemento usado existe
		if (!this.length) { return this; }

		//Passa por todos os elementos
		return this.each(function(){
			$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
		});
	};


}(jQuery, window));