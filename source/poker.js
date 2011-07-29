var Carta;

Carta = function(carta){
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
		getNumeroInteiro: function(){
			return prvt.numero;
		},
		getNumero: function(){
			return prvt.numeroEspecial;
		},
		setNumero: function(numero){
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
		getNipe: function(){return prvt.nipe},
		setNipe: function(nipe){
			var naipesPossiveis = "PECO";
			nipe = nipe.toUpperCase();
			if ( nipe.length == 1 && naipesPossiveis.indexOf(nipe) >= 0 ) {
				return prvt.nipe = nipe;
			}

			throw new RangeError("Nipe da carta não reconhecido.");
		},
		get: function(){return prvt.numeroEspecial + prvt.nipe},
		set: function(carta){
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