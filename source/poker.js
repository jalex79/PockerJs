var Carta, Mao, Poker;

Carta = function (carta) {
	var prvt = {
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
	pblc = {
		getNumeroInteiro: function (){
			return prvt.numero;
		},
		getNumero: function (){
			return prvt.numeroEspecial;
		},
		setNumero: function (numero) {
			var numeroEquivalente = prvt.numerosEspeciais[numero.toLowerCase()];
			if (numeroEquivalente) {
				prvt.numero = numeroEquivalente;
				return prvt.numeroEspecial = numero.toUpperCase();
			}
			if ( numero > 0 && numero < 11 ) {
				return prvt.numeroEspecial = prvt.numero = numero;
			}

			throw new RangeError("'Numero da carta nao reconhecido.");
		},
		getNipe: function (){ return prvt.nipe },
		setNipe: function (nipe) {
			var naipesPossiveis = "PECO";
			nipe = nipe.toUpperCase();
			if ( nipe.length == 1 && naipesPossiveis.indexOf(nipe) >= 0 ) {
				return prvt.nipe = nipe;
			}

			throw new RangeError("Nipe da carta não reconhecido.");
		},
		get: function (){ return prvt.numeroEspecial + prvt.nipe },
		set: function (carta) {
			if ( typeof carta !== undefined ){
				var length = carta.length;
				this.setNipe( carta.slice(length -1, length) );
				this.setNumero( carta.slice(0, length-1) );
			}
		}
	};
	
	pblc.set(carta);

	return pblc;
};

Mao = function() {
	var prvt = {
		cartas : [],
		MAXIMO_CARTAS: 5,
		tenhoRoyalStraightFlush: function () {
			return false;
		},
		tenhoStraightFlush: function () {
			return false;
		},
		tenhoFourKind: function () {
			return false;
		},
		tenhoFullHouse: function () {
			return false;
		},
		tenhoFlush: function () {
			return false;
		},
		tenhoStraight: function () {
			return false;
		},
		tenhoThreeKind: function () {
			return false;
		},
		tenhoDoisPares: function () {
			return false;
		},
		tenhoUmPar: function () {
			return false;
		},
	},
	pblc = {
		has: function (){
			return prvt.cartas.length;
		},
		add: function (carta) {
			if ( prvt.MAXIMO_CARTAS > prvt.cartas.length ){
				return prvt.cartas.push(carta);
			}
			
			throw new Error("Maximo de cartas atingido");
		},
		queJogoTenho: function () {
			if ( pvt.tenhoRoyalStraightFlush() ) return 9;
			if ( pvt.tenhoStraightFlush() ) return 8;
			if ( pvt.tenhoFourKind() ) return 7;
			if ( pvt.tenhoFullHouse() ) return 6;
			if ( pvt.tenhoFlush() ) return 5;
			if ( pvt.tenhoStraight() ) return 4;
			if ( pvt.tenhoThreeKind() ) return 3;
			if ( pvt.tenhoDoisPares() ) return 2;
			if ( pvt.tenhoUmPar() ) return 1;
			return 0;
		}
	};

	return pblc;
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