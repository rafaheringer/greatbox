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
	//Modo Strict para boas práticas
	"use strict";

	//Nome do plugin
	var pluginName = "greatbox";

	//Controles de Timeout e Interval
	var ERRORPID = null;

	//Construtor
	function Plugin(element, options) {
		//Variáveis a serem utilizadas pelo plugin
		this._defaults = $[pluginName].defaultOptions;	//As opções padrões inalteradas
		this._name = pluginName;	//Nome do plugin
		this.element = $(element);	//O elemento que chamou o modal
		this.modalElement = $('');	//O próprio modal, assim que for criado

		//Prefixo utilizado nas classes e ids
		this.prefix = this._name + '_';

		//Extendendo as opções
		this.options = $.extend({}, $[pluginName].defaultOptions, options);

		//Verifica atributos no elemento (///TODO: Parse para transformar string de callbacks em funções)
		$.extend(this.options, this.element.data());

		//Inicialização
		this.init();
	};

	//Inicializador
	Plugin.prototype.init = function() {
		//Utilizado para poder chamar funções do plugin dentro de callbacks do jQuery
		var _this = this;

		//Verifica se será executado como ajax
		if(this.options.ajax === null && typeof this.element.attr('href') != 'undefined') {
			//Verifica se a URL do elemento não é um hash ou javascript
			if( this.element.attr('href').split('')[0] != '#' && this.element.attr('href').indexOf('javascript:') == -1 && this.element.attr('href') != '')
				this.options.ajax = this.element.attr('href');
		}

		//Caso seja elemento, dispara no click
		if (this.element.length) {
			this.element.on('click.' + this._name, function(event) {
				//Começa o modal
				_this.start();

				//Previne o evento padrão, assegurando que a página não recarregue
				event.preventDefault();
			});
		}

		//Se não, abre modal diretamente
		else {
			//Começa o modal
			this.start();
		}
	};

	//Primeiros passos para criação do modal
	Plugin.prototype.start = function() {
		//Utilizado para poder chamar funções do plugin dentro de callbacks do jQuery
		var _this = this;

		//Previne que exista mais de um modal na tela
		if(document.getElementById(this._name)) {
			this.modalElement = $(document.getElementById(this._name));
			this.close({force: true});
		}

		//Atualiza opções resgatáveis
		$[pluginName].openedModal = this.element;

		//Exibe blackout
		this.showBlackout();

		//Caso possua ajax
		if (this.options.ajax) {
			//Adiciona loading na página
			this.showLoading();

			//Faz chamada ajax
			$.ajax({
				url: this.options.ajax,
				cache: this.options.ajaxcache,
				data: this.options.ajaxdata,
				beforeSend: this.options.ajaxbeforesend,
				complete: function() {
					//Esconde loading
					_this.hideLoading();

					//Executa callback do usuário
					if (typeof eval(_this.options.ajaxcomplete) == 'function') {
						$.fn.callback = _this.options.ajaxcomplete;
						$(_this.element).callback();
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					//Plota erro no console
					if(typeof console != 'undefined') {
						console.log('url:', _this.options.ajax, ' jqXHR:', jqXHR, ' textStatus:', textStatus, ' errorThrown:', errorThrown);
					}

					//Exibe erro
					if(_this.options.ajaxerrortext) {
						_this.showError(_this.options.ajaxerrortext);
					}

					//Executa callback do usuário
					if (typeof eval(_this.options.errorCallback) == 'function') {
						$.fn.callback = _this.options.errorCallback;
						$(_this.element).callback();
					}
				},
				success: function(data, textStatus, jqXHR){
					//Cria html
					_this.create(data);
				}
			});
		}

		//Tratamento caso não seja ajax
		else {
			//Verifica se foi passado um elemento e se existe HTML nele
			if(typeof this.options.content == 'object' && $(this.options.content).html().length != 0) {
				//Cria html
				this.create($(this.options.content).html());
			}

			//Caso tenha passado conteúdo tipo "string" e se existe conteúdo
			else if(typeof this.options.content == "string" && this.options.content.length != 0) {
				//Cria html
				this.create(this.options.content);
			}

			//Caso venha nulo
			else {
				this.showError(this.options.contenterror);
			}
		}
	};

	//Construção do HTML de acordo com as opções passadas e continua execução
	Plugin.prototype.create = function(htmlInside) {
		//Utilizado para poder chamar funções do plugin dentro de callbacks do jQuery
		var _this = this;

		//Estrutura html
		var html = '<div id="' + pluginName + '" class="' + this.options.addclass + '">';
			html += '<div id="' + pluginName + '_container">';
				//Topo com título
				html += '<div class="' + this.prefix + 'header">';
				html += '</div>';

				//Conteúdo
				html += '<div class="' + this.prefix + 'content">';
					html += '<div class="' + this.prefix + 'contentContainer">';
						if(this.options.closebutton)
							html += '<span class="' + this.prefix + 'closeButton"><a href="javascript:;">' + this.options.closebuttontext +  '</a></span>';
						html += htmlInside;
					html += '</div>';
				html += '</div>';

				//Rodapé e seus links de ação
				html += '<div class="' + this.prefix + 'footer">';
				html += '</div>';			
			html += '</div>';
		html += '</div>';

		//Cria DOM
		this.modalElement = $(html).appendTo('body');

		//Aplica ações padrões
		this.doActions();

		//Truque para executar qualquer aplicação
		//de plugins visuais (como selectbox estilizado).
		//O width e height dos elementos só é calculado
		//Quando eles estão visíveis na tela.
		this.modalElement.fadeTo(0, 0.01);

		//Callback onCreate
		if (typeof eval(this.options.oncreate) == 'function') {
			$.fn.callback = this.options.oncreate;
			$(this.modalElement).callback();
		}

		//Remove o scroll da página
		if(this.options.removepagescroll == true) {
			$('body, html').css({'overflow':'hidden'});
		}

		//Calcula o centro do modal
		if(this.options.centralize == true) {
			this.centralize();
		}

		//Exibe o modal
		this.modalElement.fadeTo(this.options.fadespeed, 1, function(){
			//Callback onShow
			if (typeof eval(_this.options.onShow) == 'function') {
				$.fn.callback = _this.options.onShow;
				$(_this.modalElement).callback();
			}
		});

		//Retorno
		return html;
	};

	//Centralizar o modal de acordo com sua altura e largura
	Plugin.prototype.centralize = function() {
		this.modalElement.css({
			'top': '50%', 
			'left': '50%', 
			'margin-left': this.modalElement.outerWidth() / -2,
			'margin-top': this.modalElement.outerHeight() / -2
		});
	};

	/*
	 * Ações padrões
	 * =============
	 */

	//Controle de ações padrões do modal
	Plugin.prototype.doActions = function() {
		//Utilizado para poder chamar funções do plugin dentro de callbacks do jQuery
		var _this = this;

		//Sair ao apertar ESC - utilizado keydown em detrimento do 
		if(this.options.closeonesc) {
			//keypress por causa de bug do chrome 
			//http://code.google.com/p/chromium/issues/detail?id=12744
			$(document)
				.off('keydown.' + this._name + 'esc')					//Previne de múltiplos keypress
				.on('keydown.' + this._name + 'esc', function (e) {		//Atribui um nome ao evento para poder ser removido posteriormente
					if (e.keyCode == 27) {								//27 = ESC
						_this.close();
					}
				});
		}

		//Fechar modal ao clicar do lado de fora (blackout)
		if(this.options.closeinoutside) {
			$('body')
				.off('click.' + this._name + 'outside')					//Previne de múltiplos clicks
				.on('click.' + this._name + 'outside', function(event){	//Atribui um nome ao evento para poder ser removido posteriormente
					if(event.target.getAttribute('id') == _this.prefix + 'blackout') {
						_this.close();
					}
				});
		}

		//Fechar ao clicar em "fechar"
		if(this.options.closebutton) {
			$('.' + this.prefix + 'closeButton', this.modalElement).on('click.' + this._name, function(event) {
				_this.close();
			});
		}
	};

	//Ação executada para fechar o modal
	Plugin.prototype.close = function(closeOpt) {
		//Utilizado para poder chamar funções do plugin dentro de callbacks do jQuery
		var _this = this;

		//Opções secundárias para o função de fechar
		closeOpt = $.extend({
			force: false
		}, closeOpt);

		//Remove keybinds
		$(document).off('keydown.' + this._name + 'esc');			//Esc key
		$('body').off('click.' + this._name + 'outside');			//Click outside

		//Fecha modal
		this.modalElement.fadeTo(closeOpt.force ? 0 : this.options.fadespeed, 0, function(){
			_this.modalElement.remove();							//Remove para limpar memória e keybinds
		});

		//Volta com o scroll da página
		if(this.options.removepagescroll == true) {
			$('body, html').css({'overflow':''});
		}

		//Atualiza opções resgatáveis
		$[pluginName].openedModal = null;

		//Fecha blackout e loading
		if(!closeOpt.force)
			this.hideBlackout();
		this.hideLoading();
	};

	/*
	 * Loading e erros
	 * ===============
	 */

	//Chama elemento de erro
	Plugin.prototype.showError = function(text) {
		//Utilizado para poder chamar funções do plugin dentro de callbacks do jQuery
		var _this = this;

		var errorElement = document.getElementById(this.prefix + 'error');

		//Verifica se já não existe um erro
		if ( errorElement ) {
			errorElement = $(document.getElementById(this.prefix + 'error')).fadeIn(this.options.fadespeed);
		}

		//Caso não exista o loading
		else {
			//Cria html do loading
			var html = '<div id="' + this.prefix + 'error">';
				html += '<div class="' + this.prefix + 'errorContainer">';
					html += '<span class="' + this.prefix + 'errorText">';
					html += '<span>';
				html += '</div>';
			html += '</div>';

			//Adiciona na página com fade
			errorElement = $(html).appendTo('body');
			errorElement.fadeOut(0).fadeIn(this.options.fadespeed);
		}

		//Plota texto
		$('.' + this.prefix + 'errorText', errorElement).html(text);

		//Esconde blackout (///TODO: Esconder somente se não existir modal na tela)
		_this.hideBlackout();

		//Esconde o erro depois de alguns segundos
		if(this.options.errordisplaytime != 0) {
			clearTimeout(ERRORPID);
			ERRORPID = setTimeout(function() {
				errorElement.fadeOut(_this.options.fadespeed);
			}, this.options.errordisplaytime);
		}

		return errorElement;
	};

	//Chama loading
	Plugin.prototype.showLoading = function() {
		var loadingElement = document.getElementById(this.prefix + 'loading');

		//Verifica se já não existe um loading
		if ( loadingElement ) {
			loadingElement = $(document.getElementById(this.prefix + 'loading')).fadeIn(this.options.fadespeed);
		}

		//Caso não exista o loading
		else {
			//Cria html do loading
			var html = '<div id="' + this.prefix + 'loading">';
				html += '<div class="' + this.prefix + 'loadingContainer">';
					html += '<span class="' + this.prefix + 'loadingtext">';
					html += '<span>';
				html += '</div>';
			html += '</div>';

			//Adiciona na página com fade
			loadingElement = $(html).appendTo('body');
			loadingElement.fadeOut(0).fadeIn(this.options.fadespeed);

		}

		//Plota texto
		$('.'+this.prefix + 'loadingtext', loadingElement).html(this.options.loadingtext);

		return loadingElement;
	};

	//Cancela loading
	Plugin.prototype.hideLoading = function() {
		return $(document.getElementById(this.prefix + 'loading')).fadeOut(this.options.fadespeed);
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
			blackoutElement = $(document.getElementById(this.prefix + 'blackout')).fadeIn(this.options.fadespeed);
		}

		//Caso não exista o blackout
		else {
			//Cria html do blackout
			var html = '<div id="' + this.prefix + 'blackout"></div>';

			//Adiciona na página com fade
			blackoutElement = $(html).appendTo('body');
			blackoutElement.fadeOut(0).fadeIn(this.options.fadespeed);

		}

		//Blackout, usado para "tapar" o site
		

		return blackoutElement;
	};

	//Cancela blackout
	Plugin.prototype.hideBlackout = function() {
		return $(document.getElementById(this.prefix + 'blackout')).fadeOut(this.options.fadespeed);
	};

	/*
	 * Outros
	 * ======
	 */
	 
	//Método para criação de opções padrões
	$[pluginName] = {
		//Opções padrões
		defaultOptions: {
			//Callbacks
			onshow: null, 				//Callback que será executado logo que o html for exibido na tela
			onclose: null,				//Callback que será executado assim que o modal receber evento para se fechar
			oncreate: null,				//Callback que será executado quando o html for criado no DOM, mas ainda não exibido

			//Customização visual
			addclass: "",				//Adiciona novas classes ao elemento pai do modal
			fadespeed: 200,				//Velocidade das animações de fading, 0 para desativar
			errordisplaytime: 6500,		//Tempo de exibição dos erros na tela, até ele desaparecer. 0 para deixar sempre exibido.
			centralize: true,			//Centralizar o modal no meio da página?
			removepagescroll: false,	//Remover o scroll da página quando estiver com o modal?

			//Customização do comportamento
			buttons: null,				//Botões customizáveis que ficam no rodapé do modal
			content: null,				//Conteúdo que será plotado no modal. Pode ser string ou elemento jquery
			closeonesc: true,			//Fechar o modal ao apertar ESC?
			closeinoutside: true,		//Fechar modal ao clicar do lado de fora (blackout)?
			closebutton: true,			//Botão de fechar

			//Ajax
			ajax: null,					//Habilita ajax. Se for "true", pegar URL do href ou data-ajaxurl. "False" para forçar desabilitação.
			ajaxcache: true,			//Habilita cache para ajax
			ajaxdata: null,				//Dados para serem passados por ajax
			ajaxbeforesend: null,		//Função de callback padrão para jquery ajax
			ajaxcomplete: null,			//Função de callback padrão para jquery ajax
			ajaxerror: null,			//Função de callback padrão para jquery ajax

			//Textos
			ajaxerrortext: 'Ops! Algum erro ocorreu com a requisição',	//Erro no ajax
			contenterror: 'Ops! Parece que o conteúdo está vazio...',	//Texto caso ocorra erro qualquer com conteúdo
			loadingtext: 'Carregando...',								//Texto padrão para "carregando"
			closebuttontext: 'Fechar'									//Botão de fechar
		},

		//Modal atual aberto
		openedModal: null,

		//Método para definir as opções padrões
		setDefaults: function(options) {
			return this.defaultOptions = $.extend({}, this.defaultOptions, options);
		},

		//Método para fechar modal
		close: function() {
			if($[pluginName].openedModal) {
				return $[pluginName].openedModal.data('plugin_' + pluginName).close();
			}
		}
	};

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