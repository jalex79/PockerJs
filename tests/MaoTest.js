var mao;

TestCase('Devo saber receber cartas', {
	"testa se consegue receber uma carta": function (){
		var carta = new Carta("5C");
		mao = new Mao();
		mao.add(carta);
		assertEquals("Mao deve ter uma carta 5C", 1, mao.get().length);
	},
	"testa se consegue receber ateh cinco cartas": function (){
		var carta = new Carta("5C");
		mao = new Mao();
		assertException("Deve falhar ao receber 6ª carta",
			function(){
				mao.add(carta);
				mao.add(carta);
				mao.add(carta);
				mao.add(carta);
				mao.add(carta);
				mao.add(carta);
			},
			"Error"
		);
	}
});

TestCase('Devo saber ordenar cartas', {
	"testa se consegue ordenar as cartas pelo numero": function (){
		mao = new Mao();
		mao.add( new Carta("JC") );
		mao.add( new Carta("10P") );
		mao.add( new Carta("3O") );
		mao.add( new Carta("AE") );
		mao.add( new Carta("5C") );
		assertEquals( "A order deve ser 3O, 5C, 10P, JC, AE", "3O,5C,10P,JC,AE", mao.ordenarPorNumero().toString() );
	},
	"testa se consegue ordenar as cartas pelo nipe": function (){
		mao = new Mao();
		mao.add( new Carta("JC") );
		mao.add( new Carta("10P") );
		mao.add( new Carta("3O") );
		mao.add( new Carta("AE") );
		mao.add( new Carta("5C") );
		assertEquals( "A order deve ser 5C, JC, AE, 3O, 10P", "JC,5C,AE,3O,10P", mao.ordenarPorNipe().toString() );
	},
	"testa se consegue ordenar as cartas pelo nipe e pelo numero": function (){
		mao = new Mao();
		mao.add( new Carta("JC") );
		mao.add( new Carta("10P") );
		mao.add( new Carta("3O") );
		mao.add( new Carta("AE") );
		mao.add( new Carta("5C") );
		assertEquals( "A order deve ser 5C, JC, AE, 3O, 10P", "5C,JC,AE,3O,10P", mao.ordenar().toString() );
	}
});

TestCase('Devo saber reconhecer que jogo tenho', {
	"testa se consegue descobrir se tem um Royal Straight Flush": function (){
		mao = new Mao();
		mao.add( new Carta("AC") );
		mao.add( new Carta("JC") );
		mao.add( new Carta("KC") );
		mao.add( new Carta("QC") );
		mao.add( new Carta("10C") );
		assertEquals("Deve retornar 9", 9, mao.queJogoTenho());
	},
	"testa se consegue descobrir se tem um Straight Flush": function (){
		mao = new Mao();
		mao.add( new Carta("9C") );
		mao.add( new Carta("JC") );
		mao.add( new Carta("KC") );
		mao.add( new Carta("QC") );
		mao.add( new Carta("10C") );
		assertEquals("Deve retornar 8", 8, mao.queJogoTenho());
	},
	"testa se consegue descobrir se tem um Four Kind": function (){
		mao = new Mao();
		mao.add( new Carta("9C") );
		mao.add( new Carta("JC") );
		mao.add( new Carta("KC") );
		mao.add( new Carta("QC") );
		mao.add( new Carta("10C") );
		assertEquals("Deve retornar 8", 8, mao.queJogoTenho());
	}
});