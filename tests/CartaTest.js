var carta;

TestCase('Deve reconhecer o naipe e o numero de uma carta', {
	"testa com cinco de copas": function(){
		assertNoException("Deve criar carta sem gerar errors", function(){
			carta = new Carta("5C");
		});
		assertEquals('getNumero deve ser 5', 5, carta.getNumero() );
		assertEquals('getNumeroInteiro deve ser 5', 5, carta.getNumeroInteiro() );
		assertEquals('número deve ser C', "C", carta.getNipe() );
		assertEquals('número deve ser 5C', "5C", carta.get() );
	},
	"testa com valete de Paus": function(){
		carta = new Carta("JP");
		assertEquals('getNumero deve ser J', "J", carta.getNumero() );
		assertEquals('getNumeroInteiro deve ser 11', 11, carta.getNumeroInteiro() );
		assertEquals('número deve ser P', "P", carta.getNipe() );
		assertEquals('número deve ser JP', "JP", carta.get() );
	},
	"testa com rainha de Ouro": function(){
		carta = new Carta("qo");
		assertEquals('getNumero deve ser Q', "Q", carta.getNumero() );
		assertEquals('getNumeroInteiro deve ser 12', 12, carta.getNumeroInteiro() );
		assertEquals('número deve ser O', "O", carta.getNipe() );
		assertEquals('número deve ser QO', "QO", carta.get() );
	},
	"testa com rei de Copas": function(){
		carta = new Carta("JP");
		assertEquals('getNumero deve ser J', "J", carta.getNumero() );
		assertEquals('getNumeroInteiro deve ser 11', 11, carta.getNumeroInteiro() );
		assertEquals('número deve ser P', "P", carta.getNipe() );
		assertEquals('número deve ser JP', "JP", carta.get() );
	},
	"testa com as de Espada": function(){
		carta = new Carta("ae");
		assertEquals('getNumero deve ser A', "A", carta.getNumero() );
		assertEquals('getNumeroInteiro deve ser 14', 14, carta.getNumeroInteiro() );
		assertEquals('número deve ser E', "E", carta.getNipe() );
		assertEquals('número deve ser AE', "AE", carta.get() );
	}
});

TestCase('Deve lancar excessao com numeros e naipes de carta invalidos', {
    "testa com numero acima de 10": function(){
		assertException(function(){ new Carta("11C") }, "RangeError");
	},
    "testa com numero igual a 0": function(){
		assertException(function(){ new Carta("0C") }, "RangeError");
	},
    "testa com numero menor que 0": function(){
		assertException(function(){ new Carta("-11C") }, "RangeError");
	},
    "testa sem numero": function(){
		assertException(function(){ new Carta("C") }, "RangeError");
	},
    "testa sem nipe": function(){
		assertException(function(){ new Carta("1") }, "RangeError");
	},
    "testa com nipe nao conhecido": function(){
		assertException(function(){ new Carta("1B") }, "RangeError");
	}
});