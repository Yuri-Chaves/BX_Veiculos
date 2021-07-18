$(function(){

// 	 sistema de filtro por preço

	var currentValue = 0;
	var isDrag = false;
	var preco_maximo = 1000000;
	var preco_atual = 0;

	$('.pointer').mousedown(function(){
		isDrag = true;
	})
	$(document).mouseup(function(){
		isDrag = false;
		enableTextSelection();
	})
	$('.preco').mousemove(function(e){
		if (isDrag){
			disableTextSelection();
			var elBase = $('.preco');
			var mouseX = e.pageX - elBase.offset().left;
			if(mouseX < 0 ){
				mouseX = 0;
			}
			if (mouseX > elBase.width()) {
				mouseX = elBase.width();
			}
			$('.pointer').css('left',(mouseX-7)+'px');
			var currentValue = (mouseX / elBase.width()) * 100;

			$('.preco_fill').css('width',currentValue+'%');

			preco_atual = currentValue/100 * preco_maximo;
			preco_atual = formatarPreco(preco_atual);
			$('.preco_pesquisa').html('R$' + preco_atual);
		}
	})
	function formatarTotal(preco_arr){
			if (preco_arr[0] < 1000){
				return preco_arr[0]+','+preco_arr[1];
			}else if(preco_arr[0] < 10000){
				return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+','+preco_arr[1];
			}else if(preco_arr[0] < 100000){
				return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+','+preco_arr[1];
			}else if(preco_arr[0] < 1000000){
				return preco_arr[0][0]+preco_arr[0][1]+preco_arr[1][0]+'.'+preco_arr[0].substr(3,preco_arr[0].length)+','+preco_arr[1];
			}else{
				return preco_arr[0][0]+'.'+preco_arr[0][1]+preco_arr[1][0]+preco_arr[1][1]+'.'+preco_arr[0].substr(4,preco_arr[0].length)+','+preco_arr[1];
			}
	}
	function formatarPreco(preco_atual){
		preco_atual = preco_atual.toFixed(2);
		preco_arr = preco_atual.split('.');

		var newpreco = formatarTotal(preco_arr);
		
		return newpreco;
	}
	function disableTextSelection(){
		$("body").css("-webkit-user-select", "none");
		$("body").css("-moz-user-select", "none");
		$("body").css("-ms-user-select", "none");
		$("body").css("-o-user-select", "none");
		$("body").css("user-select", "none");		
	}
	function enableTextSelection(){
		$("body").css("-webkit-user-select", "auto");
		$("body").css("-moz-user-select", "auto");
		$("body").css("-ms-user-select", "auto");
		$("body").css("-o-user-select", "auto");
		$("body").css("user-select", "auto");
	}



// 	 sistema de filtro por preço


//   sistema de mini galeria


	var imgShow = 3;
	var minIndex = imgShow - 1;
	var maxIndex = Math.ceil($('.mini_wraper').length/3) - 1;
	var curIndex = 0;


	initSlider();
	navigateSlider();
	clickSlider();

	function initSlider(){
		var amt = $('.mini_wraper').length *33.3;
		var elScroll = $('.nav_wraper');
		var elSingle = $('.mini_wraper');

		elScroll.css('width',amt+'%');
		elSingle.css('width',33.3*(100/amt)+'%');
	}
	function navigateSlider(){
		$('.arrow_right').click(function(){
			if(curIndex < maxIndex){
				curIndex++;
				var elOff = $('.mini_wraper').eq(curIndex*3).offset().left - $('.nav_wraper').offset().left;
				$('.nav_galeria').animate({'scrollLeft':elOff+'px'});
			}else{

			}
		});
		$('.arrow_left').click(function(){
			if(curIndex > 0){
				curIndex--;
				var elOff = $('.mini_wraper').eq(curIndex*3).offset().left - $('.nav_wraper').offset().left;
				$('.nav_galeria').animate({'scrollLeft':elOff+'px'});
			}else{

			}
		});
	}

	function clickSlider(){
		$('.mini_wraper').click(function(){
			$('.mini_wraper').css('background', 'transparent');
			$(this).css('background', 'rgba(50, 50, 50, .3)');
			var img = $(this).children().css('background-image');
			$('.img_veicolo').css('background-image', img);
		})
		$('.mini_wraper').eq(0).click();
	}

//   sistema de mini galeria

// 	 sistema de scroll
	/*
	var directory = '/Projetos/Projeto 5/';

	$('[goto=contato]').click(function(){
		location.href=directory+'index.html?contato';
		return false;
	})

	checkUrl();

	function checkUrl(){
		var url = location.href.split('/');
		var curPage = url[url.length-1].split('?');

		if(curPage[1] != undefined && curPage[1] == 'contato'){
			$('header nav a').css('color','black');
			$('footer nav a').css('color','white');
			$('[goto=contato]').css('color','#EB2D2D');
			$('html,body').animate({'scrollTop':$('#contato').offset().top});
		}
	}
	*/

	$('[goto=contato]').click(function(){
		$('html,body').animate({'scrollTop':$('#contato').offset().top});
		return false;
	})

// 	 sistema de scroll

//	 menu responsivo

	$('.mobile').click(function(){
		$(this).find('ul').slideToggle();
	})

//	 menu responsivo

// 	 sistema de navegação depoimentos
	
	var amtDep = $('.depoimento_single p').length;
	var cur_index = 0;

	startDep();
	navDep();

	function startDep(){
		$('.depoimento_single p').hide();
		$('.depoimento_single p').eq(0).show();
	}

	function navDep(){
		$('[next]').click(function(){
			cur_index++;
			if(cur_index >= amtDep)
				cur_index = 0;
			$('.depoimento_single p').hide();
			$('.depoimento_single p').eq(cur_index).show();
		})
		$('[prev]').click(function(){
			cur_index--;
			if(cur_index < 0)
				cur_index = amtDep-1;
			$('.depoimento_single p').hide();
			$('.depoimento_single p').eq(cur_index).show();
		})
	}

// 	 sistema de navegação depoimentos

});