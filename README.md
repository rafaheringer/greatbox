jQuery GreatBox
===============
A great jquery lighbox plugin

Releases:
---------
### Current development ###
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

List to do:
-----------
+	Sistema inteligente de cálculo (ativado manualmente) para conteúdos maiores que a página
+	Modal abrir automaticamente quando a página carrega ou de forma anônima ( ex.: $.greatBox(); )
+	Modal ser ativado por elementos com classe ( ex.: <a href="ajax.html" class="greatBoxLink" /> )
+	Fechar modal com a tecla "ESC"
+	Fechar o modal pelo botão padrão "Fechar"
+	Fechar modal clicando do lado de fora
+	Tipos padrões de modal ( ex.: success, alert, error, question e default )
+	Botões padrões de acordo com o tipo do modal
+	Adicionar exemplos na documentação com jsFiddle
+	Fechar modal aberto anteriormente ao abrir um novo
+	Método para fechar modal
+	Método para definir opções padrões ( ex.: $.greatBox.setDefaults({opt1: val1}); )
+	Opções de classes para o modal e para o blackout
+	Opção para criar botões de ações personalizados ( ex.: [ {name: 'btn1', class="newClass", action: function(){}} ] )
+	Opção de posicionamento automático
+	Opção de passar HTML puro
+	Opção de passar um outro elemento para copiar o html
+	Opção de posição ( center, vcenter, hcenter, none )
+	Opções de texto para botões padrões e link de fechar
+	Callback onclose ( quando o modal é fechado )

Links de estudo e referências:
------------------------------
+	http://www.smashingmagazine.com/2009/05/27/modal-windows-in-modern-web-design/
+	http://br.jqueryboilerplate.com/