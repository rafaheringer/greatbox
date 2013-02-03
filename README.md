jQuery GreatBox
===============
A great jquery lightbox plugin

Como usar:
----------

Opções:
-------
O greatbox aceita diversas opções e é completamente flexível. Para passar as opções você possui duas maneiras:   

***Opções via javascript***   
As opções via javascript são passadas normalmente como qualquer outro plugin. Veja o exemplo:   

```javascript
$('.meuElemento').greatbox({
	option: 'value',
	addclass: 'nova-classe-do-modal',
	removepagescroll: true
});
```

***Opções via html***   
Além via javascript, há a possibilidade de passar as opções via atributo "data". O plugin irá procurar automaticamente por este atributo no elemento. Veja o exemplo:   

```html
<a class="greatbox-enabled" href="" data-option="value" data-addclass="nova-classe-do-modal" data-removepagescroll="false">Abrir modal</a>
```

### Customização visual ###
+	**addclass: string** default: ''   
	Adiciona uma nova classe no modal, muito utilizado para modais de diferentes tipos em uma mesma página.   
	
	```javascript
	addclass: 'modal-tipo-alerta'
	```
+	**duration: int** default: 200   
	Duração em ms de todas as animações do modal. 0 para desativar as animações.   
	
	```javascript
	duration: 1000
	```
+	***errordisplaytime: int*** default: 6500   
	Duração da exibição do erro, geralmente o erro ocorre em requisições ajax e é exibido na tela uma mensagem explicando o ocorrido.   
	
	```javascript
	errordisplaytime: 4000
	```
+	***centralize: bool*** default: true   
	Opção para centralizar automaticamente o modal no centro da página.   
	
	```javascript
	centralize: false
	```
+	***removepagescroll: bool*** default: false   
	Opção para remover o scroll da página assim que o modal for aberto.   
	
	```javascript
	removepagescroll: true
	```
+	***effect: string(fadeInOut,puffInIn,puffInOut)*** default: 'fadeInOut'   
	Efeito visual ao abrir e fechar o modal. O padrão é um simples fade, mas poderá passar outras opções com puffInOut. Experimente as opções visuais.   
	
	```javascript
	effect: 'puffInIn'
	```

### Comportamento ###
+	**content: (string, DOMElement)** default: ''   
	Conteúdo que será exibido no modal. Poderá passar uma string com o html formatado ou passar um elemento. Neste caso, o HTML interno do HTML será copiado e exibido no modal.   

	```javascript
	//HTML como string
	content: '<h1>Lorem ipsum</h1> <p>Dolor sit amet</p>'

	//HTML de um elemento (pegará o innerHTML)
	content: $('#myElement')
	```
+	**closeonesc: bool** default: true   
	Opção para fechar o modal ao apertar o ESC no teclado.   

	```javascript
	closeonesc: false
	```
+	**closeinoutside: bool** default: true
	Opção para fechar o modal ao clicar do lado de fora.   

	```javascript
	closeinoutside: false
	```
+	**closebutton: bool** default: true
	Opção para inserir o botão "fechar" no modal. Poderá ser customizado via CSS.   
	
	```javascript
	closebutton: false
	```

### Textos ###
+	**title: string** default: null   
	Título do modal. Caso o título esteja vazio, o modal também não possuirá o "header".

	```javascript
	title: 'Este é o título do modal'
	```
+	**ajaxerrortext: string** default: 'Ops! Algum erro ocorreu com a requisição'   
	Texto padrão para exibir o erro quando o AJAX falha. Se passado "null" desabilita a mensagem.   

	```javascript
	ajaxerrortext: 'Vixi! Deu erro no ajax... Tente novamente'
	```
+	**contenterror: string** default: 'Ops! Parece que o conteúdo está vazio...'   
	Mensagem de erro quando o conteúdo veio vazio ou não foi encontrado. Se passado "null" desabilita a mensagem.   

	```javascript
	contenterror: 'O conteúdo sumiu (!)'
	```
+	**loadingtext: string** default: 'Carregando...'   
	Texto usado para o elemento de "loading" do modal, principalmente usado em ajax. Se passado "null" desabilita a mensagem.    

	```javascript
	loadingtext: 'Aguarde'
	```
+	**closebuttontext: string** default: 'Fechar'   
	Texto do botão padrão de fechar.    

	```javascript
	closebuttontext: 'Sair'
	```


### Ajax ###
+	**ajax: (bool, string)** default: true   
	Opção usada para carregar o conteúdo via ajax. O valor padrão "true" pega automaticamente a URL do atributo "href" do elemento. Use "false" para forçar a nunca tentar ajax. Poderá também passar a URL direta como string.   

	```javascript
	//Pega a url do "href" do elemento, caso não tenha sido usada a opção "content:"
	ajax: true

	//Passa url diretamente para ser carregada
	ajax: 'myContent.php?lorem=ipsum'
	```	
+	**ajaxcache: bool** default: true   
	Habilitar cache do arquivo a ser chamado pelo AJAX   

	```javascript
	ajaxcache: false
	```
+	**ajaxdata: object** default: null   
	Dados a serem passados como parâmetros para a URL do ajax   
 
	```javascript
	ajaxdata: {login: 'lorem', pass: '*****'}
	```
+	**ajaxbeforesend: function** default: null   
	Função de callback utilizada antes de o ajax acontecer   

	```javascript
	ajaxbeforesend: function(jqXHR, settings) {
		alert('Ajax vai começar...');
	}
	```
+	**ajaxcomplete: function** default: null   
   Função de callback para executar quando o ajax completar   

   ```javascript
	ajaxcomplete: function(jqXHR, textStatus) {
		alert('Ajax terminou!');
	}
	```
+	**ajaxerror: function** default: null   
   Função de callback para executar quando o ajax retornar com algum erro   

   ```javascript
	ajaxerror: function(jqXHR, textStatus, errorThrown) {
		alert('Ajax deu erro :/');
	}
	```

### Callbacks ###
+	**onshow: function** default: null   
	Função que será executada logo que o modal for exibido na tela.  

	```javascript
	onshow: function() {
		alert('Opa! O modal já está na tela');
		console.log('Elemento HTML do modal:', this);
	}
	```	
+	**onclose: function** default: null   
	Função que será executada assim que o modal for fechado.   

	```javascript
	onclose: function() {
		alert('Fechei...');
		console.log('Elemento HTML do modal:', this);
	}
	```
+	**oncreate: function** default: null   
	Função que será executada assim que o modal for criado no DOM, mas ainda não exibido

	```javascript
	oncreate: function() {
		alert('Acabei de ser criado.');
		console.log('Elemento HTML do modal:', this);
	}
	```	

### Botões personalizados ###
+	**buttons: [{class: string, name: string, action: function}, ...]** default: null  
	Adiciona botões personalizados ao rodapé da página. Cada botão é simbolizado por um objeto com as seguintes propriedades:  
	**class** - Classe css adicional ao botão. Todos os botões já vem com a classe "greatbox_btn" por padrão.  
	**name** - O nome que ficará dentro do botão, como "Fechar" ou "Confirmar".  
	**action** - A ação executada ao clicar no botão. Poderá passar uma função ou apenas passar a string "close" para fechar o modal. Caso o botão tenha a classe "disabled", a ação não ocorrerá.  

	```javascript
	buttons: [  
		{  
			class: 'closeBtn',  
			name: 'Fechar modal',
			action: function() {
				alert('Modal será fechado');
				$.greatbox.close();
			}
		}, 
		{
			class: 'newBtn disabled',
			name: 'Outro botão',
			action: function() {
				alert('Esta ação não ocorrerá por causa da classe disabled');
				$.greatbox.close();
			}
		}
	]
	```

Releases:
---------
### Current development ###

03.02.2012
+	Adicionado opção para título do modal
+	Opção para criar botões de ações personalizados ( ex.: [ {name: 'btn1', class="newClass", action: function(){}} ] )
+	Início da documentação de opções

27.01.2012
+	Modal ser ativado por elementos com classe ( ex.: <a href="ajax.html" class="greatbox-enabled" /> )
+	Classe "greatbox-enabled" adicionado aos elementos que possuirem a ativação do plugin
+	Adicionado segunda opção de animação, puffInIn, para "effect"

06.01.2013
+	Fechar o modal pelo botão padrão "Fechar"
+	Fechar modal aberto anteriormente ao abrir um novo
+	Opções de classes para o modal
+	Método para definir opções padrões ( ex.: $.greatBox.setDefaults({opt1: val1}); )
+	Modal abrir automaticamente quando a página carrega ou de forma anônima ( ex.: $.greatBox(); )
+	Método para fechar o modal via javascript

03.12.2012
+	Método para fechar modal
+	Fechar modal com a tecla "ESC"
+	Fechar modal clicando do lado de fora
+	Callback onclose ( quando o modal é fechado )

01.12.2012
+	Criação da base do plugin
+	Criação do github
+	Criação do html base para o modal ( blackout, topo, corpo, rodapé etc. )
+	Modal ser ativado por chamada direta no js ( ex.: $('.el').greatBox(); )
+	Opções serem passadas pela função ( ex.: $('.el').greatBox({op1: val1}); )
+	Opção de AJAX
+	Callback onshow	( Ao exibir o modal na tela )
+	Callback oncreate ( ao criar o modal, logo que o HTML existe ) 
+	Opções serem passadas por meta-dados ( ex.: <a href="#noAjax" class="greatBoxLink" data-option1="value1" /> )
+	Posicionamento automático do modal de acordo com a opção do usuário
+	Opção de passar HTML puro
+	Opção de passar um outro elemento para copiar o html

List to do:
-----------
+	Permitir passar booleano e até função via atributo "data-". Hoje, como pega apenas a string, algumas opções não são aceitas via atributo.
+	Sistema inteligente de cálculo (ativado manualmente) para conteúdos maiores que a página
+	Tipos padrões de modal ( ex.: success, alert, error, question e default )
+	Botões padrões de acordo com o tipo do modal
+	Opção de posição ( center, vcenter, hcenter, none )
+	Opções de texto para botões padrões e link de fechar
+	Botar opção de slideUpUp, slideDownDown, slideUpDown, além do padrão fadeInOut para animações
+	Adicionar opção de plugin "easing"
+	Fazer modal navegável, modificando hashtag e podendo usar o "ir" e "voltar" do navegador

Links de estudo e referências:
------------------------------
+	http://www.smashingmagazine.com/2009/05/27/modal-windows-in-modern-web-design/
+	http://br.jqueryboilerplate.com/
