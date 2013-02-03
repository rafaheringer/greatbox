jQuery GreatBox
===============
A great jquery lightbox plugin

Opções:
-------
O greatbox aceita diversas opções e é completamente flexível. 

### Botões personalizados ###
+	**buttons: [{class:string, name:string, action:function}, ...]** padrão: null
	Adiciona botões personalizados ao rodapé da página. Cada botão é simbolizado por um objeto com as seguintes propriedades:
	class - Classe css adicional ao botão. Todos os botões já vem com a classe "greatbox_btn" por padrão.
	name - O nome que ficará dentro do botão, como "Fechar" ou "Confirmar".
	action - A ação executada ao clicar no botão. Poderá passar uma função ou apenas passar a string "close" para fechar o modal. Caso o botão tenha a classe "disabled", a ação não ocorrerá.
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
			name: 'Outrobotão',
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
+	Sistema inteligente de cálculo (ativado manualmente) para conteúdos maiores que a página
+	Tipos padrões de modal ( ex.: success, alert, error, question e default )
+	Botões padrões de acordo com o tipo do modal
+	Adicionar exemplos na documentação com jsFiddle
+	Opção de posição ( center, vcenter, hcenter, none )
+	Opções de texto para botões padrões e link de fechar
+	Botar opção de slideUpUp, slideDownDown, slideUpDown, além do padrão fadeInOut para animações
+	Adicionar opção de plugin "easing"
+	Fazer modal navegável, modificando hashtag e podendo usar o "ir" e "voltar" do navegador

Links de estudo e referências:
------------------------------
+	http://www.smashingmagazine.com/2009/05/27/modal-windows-in-modern-web-design/
+	http://br.jqueryboilerplate.com/
