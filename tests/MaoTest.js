var mao;

TestCase('Devo saber receber cartas', {
	"testa se consegue receber uma carta": function(){
		var carta = new Carta("5C");
		mao = new Mao();
		mao.add(carta);
		assertEquals("Mao deve ter uma carta 5C", 1, mao.has(carta));
	},
	"testa se consegue receber ateh cinco cartas": function(){
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