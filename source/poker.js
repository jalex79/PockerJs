var Carta, Mao, Poker;

Carta = function (carta) {
	var pvt = {
		nipe: null,
		numero: null,
		numeroEspecial: null,
		numerosEspeciais: {
			"j": 11,
			"q": 12,
			"k": 13,
			"a": 14
		}
	},
	pbc = {
		getNumeroInteiro: function (){ return pvt.numero; },
		getNumero: function (){ return pvt.numeroEspecial; },
		setNumero: function (numero) {
			var numeroEquivalente = pvt.numerosEspeciais[numero.toLowerCase()];
			if (numeroEquivalente) {
				pvt.numero = numeroEquivalente;
				return pvt.numeroEspecial = numero.toUpperCase();
			}
			if ( numero > 0 && numero < 11 ) {
				return pvt.numeroEspecial = pvt.numero = numero;
			}

			throw new RangeError("'Numero da carta nao reconhecido.");
		},
		getNipe: function (){ return pvt.nipe },
		setNipe: function (nipe) {
			var naipesPossiveis = "PECO";
			nipe = nipe.toUpperCase();
			if ( nipe.length == 1 && naipesPossiveis.indexOf(nipe) >= 0 ) {
				return pvt.nipe = nipe;
			}
			throw new RangeError("Nipe da carta não reconhecido.");
		},
		get: function (){ return pvt.numeroEspecial + pvt.nipe },
		set: function (carta) {
			if ( typeof carta !== undefined ){
				var length = carta.length;
				this.setNipe( carta.slice(length -1, length) );
				this.setNumero( carta.slice(0, length-1) );
			}
		}
	};
	
	pbc.set(carta);

	return pbc;
};

Mao = function() {
	var pvt = {
		cartas : [],
		MAXIMO_CARTAS: 5,
		hasRoyalStraightFlush: function () {
			pbc.ordenarPorNumero()
			var cartas = pvt.cartas,
				nipeReferencia;
			if ( cartas.length === this.MAXIMO_CARTAS ) {
				nipeReferencia = cartas[0].getNipe();
				if ( pbc.toString() === "10"+ nipeReferencia
					+",J"+ nipeReferencia
					+",Q"+ nipeReferencia
					+",K"+ nipeReferencia
					+",A"+ nipeReferencia
				) { return true; }
			}
			return false;
		},
		hasStraightFlush: function () {
			pbc.ordenarPorNumero()
			var cartas = pvt.cartas,
				nipeReferencia, numeroReferencia, expressaoReferencia;
			if ( cartas.length === this.MAXIMO_CARTAS ) {
				nipeReferencia = cartas[0].getNipe();
				numeroReferencia = cartas[0].getNumeroInteiro();
				expressaoReferencia = numeroReferencia++ + nipeReferencia
					+","+ numeroReferencia++ + nipeReferencia
					+","+ numeroReferencia++ + nipeReferencia
					+","+ numeroReferencia++ + nipeReferencia
					+","+ numeroReferencia++ + nipeReferencia;
				console.log(expressaoReferencia)
				return ( pbc.toString("numeroInteiro") === expressaoReferencia )
			}
			return false;
		},
		hasFourKind: function () {
			return false;
		},
		hasFullHouse: function () {
			return false;
		},
		hasFlush: function () {
			return false;
		},
		hasStraight: function () {
			return false;
		},
		hasThreeKind: function () {
			return false;
		},
		hasDoisPares: function () {
			return false;
		},
		hasUmPar: function () {
			return false;
		},
	},
	pbc = {
		add: function (carta) {
			if ( pvt.MAXIMO_CARTAS > pvt.cartas.length ){
				pvt.cartas.push(carta);
				return this;
			}
			throw new Error("Maximo de cartas atingido");
		},
		get: function (){
			return pvt.cartas;
		},
		ordenar: function (){
			return this.ordenarPorNumero().ordenarPorNipe();
		},
		ordenarPorNumero: function (){
			pvt.cartas = pvt.cartas.sort(function (carta1, carta2){
					return carta1.getNumeroInteiro() - carta2.getNumeroInteiro();
				});
			return this;
		},
		ordenarPorNipe: function (){
			pvt.cartas = pvt.cartas.sort(function (carta1, carta2){
					if ( carta1.getNipe() > carta2.getNipe() ) return 1
					if ( carta1.getNipe() < carta2.getNipe() ) return -1
					return 0;
				});
			return this;
		},
		toString: function(opcao) {
			var cartas = pvt.cartas,
				cartasToTexto = [],
				size = cartas.length;
			for ( var i = 0; i < size; ++i ) {
				if (opcao === "numeroInteiro"){
					cartasToTexto.push( cartas[i].getNumeroInteiro() + cartas[i].getNipe());
				} else {
					cartasToTexto.push( cartas[i].get() );
				}

			}
			return cartasToTexto.join();
		},
		queJogoTenho: function () {
			if ( pvt.hasRoyalStraightFlush() ) return 9;
			if ( pvt.hasStraightFlush() ) return 8;
			if ( pvt.hasFourKind() ) return 7;
			if ( pvt.hasFullHouse() ) return 6;
			if ( pvt.hasFlush() ) return 5;
			if ( pvt.hasStraight() ) return 4;
			if ( pvt.hasThreeKind() ) return 3;
			if ( pvt.hasDoisPares() ) return 2;
			if ( pvt.hasUmPar() ) return 1;
			return 0;
		}
	};

	return pbc;
};

Poker = function (){
	var pvt = {
		mao1: null,
		mao2: null
	},
	pbc = {
		setRodada: function (mao1, mao2){
			pvt.mao1 = mao1;
			pvt.mao2 = mao2;
			return this;
		},
		quemGanha: function (mao1, mao2){
			if ( pvt.mao1.queJogoTenho() > pvt.mao2.queJogoTenho()) {
				alert('Jogador 1 ganhou com '+ pvt.mao1.queJogoTenho());
			} else if ( pvt.mao2.queJogoTenho() > pvt.mao1.queJogoTenho()) {
				alert('Jogador 2 ganhou com '+ pvt.mao2.queJogoTenho());
			} else {
				if ( pvt.mao1.qualCaraMaisAlta() > pvt.mao2.qualCaraMaisAlta()) {
					alert('Jogador 1 desempatou o jogo por ter a maior carta: '+ pvt.mao1.qualCaraMaisAlta());
				} else {
					alert('Jogador 2 desempatou o jogo por ter a maior carta:  '+ pvt.mao2.qualCaraMaisAlta());
				}
			}
			return this;
		}
	}
};