// HACKS SIMPLES ---------------------------------------------------------------------------

// concatenando strings - usando +=
var str = "";
for (var i = 0; i < 50; i++) {
	str += i;
}
console.log(str);

// concatenando strings - usando Array.join
var vetor = [];
for (var i = 0; i < 50; i++) {
	vetor.push(i);
}
console.log(vetor.join(''));

// valores falsos em javascript
var v;		// undefined, null, NaN, "", 0, false
if(v) {
	console.log('valor VERDADEIRO de v: ' + v);
} else {
	console.log('valor FALSO de v: ' + v);
}

// convertendo para number usando o +
function paraNumero(numeroComoString) {
	return +numeroComoString;
}
var preco = "13.45";
console.log(paraNumero(preco) + 7.3);

// recuperando os milisegundos de uma data
function milisegundosDeHoje() {
	return +new Date();
}
console.log(milisegundosDeHoje());

// condicionais usando short-circuits
var t = true;
function retornaValor() {
	return true;
}
if(t) {
	console.log('VERDADEIRO');
}

t && console.log('VERDADEIRO');

// valores default com ||
function Usuario(nome, idade) {
	this.nome = nome;
	this.idade = idade || 18;
}
var pedro = new Usuario("Pedro", 25);
console.log(pedro.nome);
console.log(pedro.idade);

var itanor = new Usuario("Itanor");
console.log(itanor.nome);
console.log(itanor.idade);

// pegando o último elemento do array
var arr = [1,2,3,4,5,6];
console.log(arr.slice(-1));
console.log(arr.slice(-2));
console.log(arr.slice(-3));

// replace all usando replace com regexp
var string = "joão joão";
console.log(string.replace(/ão/, "ana"));  // "joana joão"  - soh o substitui o primeiro
console.log(string.replace(/ão/g, "ana")); // "joana joana" - substitui todas ocorrencias

// IIFEs ---------------------------------------------------------------------------

(function () {
	console.log('dentro de uma IIFE');
})();

// com parametro...
(function (parametro) {
	console.log('dentro de uma IIFE recebendo ' + parametro);
})(4.90);

// retornando um valor...
var iife = (function (parametro) {
	return parametro + 5.5;
})(4.90);
console.log(iife);

// chamando um metodo...
var botao = (function(id) {
	return {
		imprimeId: function() {
			return id;
		}
	}
})("btSalvar");
console.log(botao.imprimeId());

function totalMaioresQue20() {
	var vetor = [23, 45, 34, 12, 5, 9, 33, 19];
	var maioresQue20 = vetor.filter(function(n) {
		return n > 20;
	});
	return maioresQue20.reduce(function(acumulado, atual) {
		return acumulado + atual;
	}, 0);
}

function totalMaioresQue20SaoMaioresQue30() {
	return totalMaioresQue20() > 30;
}

var botao = (function(id, fn) {
	return {
		imprimeId: function() {
			return id;
		},
		configuraClickListener: function() {
			if(fn && fn()) console.log('click configurado...');
		}
	}
})("btSalvar", undefined);

console.log(botao.imprimeId());
console.log(botao.configuraClickListener());

// MODULE PATTERN ---------------------------------------------------------------------------

// versao 1 - com acoplamento... view e model
var livraria = {
	livros: [
		{titulo: "javascript", preco: 77.90},
		{titulo: "clojure",    preco: 90.55},
		{titulo: "docker",     preco: 120.25}
	],
	imprimeLivros: function() {
		this.livros.forEach(function(livro){
			console.log("titulo: " + livro.titulo.toUpperCase() + " com preco de: " + livro.preco);
		});
	},
	imprimePrecosAdicionando30PorCento: function() {
		this.precosCom30PorCentoDeAumento().forEach(function(preco){
			console.log("com aumento de 30%: " + preco);
		});
	},
	precosCom30PorCentoDeAumento: function() {
		return this.livros.map(function(livro) {
			return livro.preco + (livro.preco * 0.3);
		});
	}
};
livraria.imprimeLivros();
livraria.imprimePrecosAdicionando30PorCento();

// versao 2 - separando view do model...
var LIVRARIA = {};
LIVRARIA.model = {
	livros: [
		{titulo: "javascript", preco: 77.90},
		{titulo: "clojure",    preco: 90.55},
		{titulo: "docker",     preco: 120.25}
	],
	precosCom30PorCentoDeAumento: function() {
		return this.livros.map(function(livro) {
			return livro.preco + (livro.preco * .3);
		});
	}
};
//console.log(LIVRARIA.model.precosCom30PorCentoDeAumento());

LIVRARIA.view = {
	model: LIVRARIA.model,

	imprimeLivros: function() {
		this.model.livros.forEach(function(livro){
			console.log("titulo: " + livro.titulo.toUpperCase() + " com preco de: " + livro.preco);
		});
	},
	imprimePrecosAdicionando30PorCento: function() {
		this.model.precosCom30PorCentoDeAumento().forEach(function(preco){
			console.log("com aumento de 30%: " + preco);
		});
	}
};
//LIVRARIA.view.imprimePrecosAdicionando30PorCento();

LIVRARIA.controller = {
	view: LIVRARIA.view,

	adicionaClickListener: function() {
		jQuery("#botao").click(function() {
			this.view.imprimePrecosAdicionando30PorCento();
		}.bind(this));
	}
};
LIVRARIA.controller.adicionaClickListener();

// SIMPLES INTRO A CLOSURES ---------------------------------------------------------------------------

function adicaoCom(x) {
	return function(y) {
		return x + y;
	}
}
var quatroMais = adicaoCom(4);
var seteMais = adicaoCom(7);

console.log(quatroMais(4));
console.log(seteMais(3));

