import { Actor, CollisionType, Color, Engine, Text, ExitViewPortEvent, vec, Font, Label, FontUnit, Random, Loader, Sound,  } from "excalibur"

// 1 - Criar uma instancia de Engine, que respresenta o jogo

const game = new Engine({
	width: 800,
	height: 600
})    

// 2 - Cria barra do player

const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40,
	width: 200,
	height: 20,
	color: Color.Chartreuse

	
})



// Define o tipo de colisao da barra 
// CollisionType.Fixed = significa que ele nao ira se "mexer" quando colidir

barra.body.collisionType = CollisionType.Fixed

// Insere o Actor barra - player, no game 

game.add(barra)

//  3 - Movimentar a barra de acordo com a posicao do mouse

game.input.pointers.primary.on("move", (event) => {
	// Faz a posicao x da barra, ser igual a posicao x do mouse

	barra.pos.x = event.worldPos.x
})

//  4 - Criar o Actor de bolinha

const bolinha = new Actor({
	x: 100,
	y: 300,
	radius: 10,
	color: Color.Red
})


bolinha.body.collisionType = CollisionType.Passive

let coresBolinha = [
	Color.Black,
	Color.Chartreuse,
	Color.Cyan,
	Color.Green,
	Color.Magenta,
	Color.Orange,
	Color.Red,
	Color.Rose,
	Color.White,
	Color.Yellow
]

let numeroCores = coresBolinha.length

// 5 - Criar movimentacao da bolinha

const velocidadeBolinha = vec(400, 400)

// Apos 1 segundo (1000ms), define a velocidade da bolinha em x = 100 e y = 100,

setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000)

// 6 - Fazer bolinha rebater na parede 

bolinha.on("postupdate", () => {
	// Se a bolinha colidir com lado esquerdo
	if(bolinha.pos.x < bolinha.width / 2) {
		bolinha.vel.x = velocidadeBolinha.x
	}

	// Se a bolinha colidir com lado direito
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
		bolinha.vel.x = -velocidadeBolinha.x
}
// Se a bolinha colidir com a parte superior 
if (bolinha.pos.y < bolinha.height / 2) {
	bolinha.vel.y = velocidadeBolinha.y
}

// Se a bolinha colidir com a parte inferior 
// if (bolinha.pos.y + bolinha.height / 2 > game.drawHeight) {
// 	bolinha.vel.y = -velocidadeBolinha.y
// }
})
 

//  Insere a bolinha no game 

game.add(bolinha)

// 7 - Criar os blocos 
const padding = 20

const xoffset = 65
const yoffest = 20 

const colunas = 5
const linhas = 3

const corBloco = [Color.Red, Color.Orange, Color.Yellow]

// let bolinhaColor = [Color.Red, Color.Orange, Color.Yellow]

// let bolinhaColor[Math.trunc(Math.random() * 2.9)]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)

// const larguraBloco = 136

const alturaBloco = 30

const listaBlocos: Actor[] = []

//  Renderizacao dos bloquinhos

// Renderiza 3 linhas 
for (let j = 0; j < linhas; j++) {

	// renderiza o 5 bloquinhos 

for (let i = 0; i < colunas; i++) {
	listaBlocos.push(
		new Actor({
			x: xoffset + i * (larguraBloco + padding) + padding,
			y: yoffest + j * (alturaBloco + padding) + padding,
			width: larguraBloco,
			height: alturaBloco,
			color: corBloco[j]

		})
	)
}
}

listaBlocos.forEach( bloco => {
	// Define o tipo de colisor de cada bloco
	bloco.body.collisionType = CollisionType.Active

	// Adiciona cada bloco no game 
	game.add(bloco)
})

// Adicionando pontuacao

// let pontos = 0

// const textoPontos = new Text({
// 	text: "Hello World",
// 	font: new Font({size: 20})
// })


// const objetoTexto = new Actor ({
// 	x: game.drawWidth - 80,
// 	y: game.drawHeight - 15
// })

// objetoTexto.graphics.use(textoPontos)

// game.add(objetoTexto)

// Adicionado pontuacao

let pontos = 0

// text e Actor =
const textoPontos = new Label({
	text: pontos.toString(),
	font: new Font({
		size: 40,
		color: Color.White,
		strokeColor: Color.Black,
		unit: FontUnit.Px
	}),
	pos: vec(600, 500)
})

game.add(textoPontos)





// function getRandomColor() {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

const sound = new Sound("./sounds/bounce.wav")

const gameOverSound = new Sound("./sounds/gameoversound.wav")

const loader = new Loader([sound, gameOverSound])

let colidindo: boolean = false


bolinha.on("collisionstart", (event) => {

	// Se o elemento colidido for um bloco da lista de blocos (destrutivel)

	if (listaBlocos.includes(event.other) ) {
		// Destruir o bloco colidido 

		event.other.kill()

		// Executar som
		sound.play(1)

		// Adiciona um ponto 

		pontos++

		// Mudar a cor da bolinha

		bolinha.color = coresBolinha[ Math.trunc( Math.random() * numeroCores) ]

		//  math random -> 0 - 1 * numeroCores -> 10
		// 0.5 * 10 = 5
		// 0.3 * 10 = 3
		// 0.873 * 10 = 8.73

		// Math.trunc() -> retorna somente a porcao inteira de um numero

		//  mudar a cor da bolinha com a cor do bloco colidido

		bolinha.color = event.other.color

		// Atualiza valor de placar - textPontos

		textoPontos.text = pontos.toString()

		// Se acabar os blocos, mostrar msg de vitoria

		if(pontos == 15) {
			alert("Parabéns você venceu!!!")

			window.location.reload()
		}

		// bolinha.color.getRandomColor = getRandomColor;

		// game.push(bolinha)

		

		// const bolinhaColor = new Actor({
		// 	color: Color(bolinhaColor)
		// })
		

		// Retorna uma cor aleatoria da lista bolinhaColor
		// bolinhaColor[Math.trunc(Math.random() * 2.9)]

	// 	let indexColor = Math.trunc(Math.random() * 2.9)

	// // 	bolinha = new Actor ({
	// // 		const bolinha = new Actor(bolinhaColor);

	// let bolinha = new Actor({
	// 	color: bolinhaColor[indexColor]


	// bolinha.color = Color[bolinhaColor],

	// game.add(bolinha)


	// bolinha.color = (bolinhaColor)

	game.add(bolinha)

}
		
 


	// var colorRandom = randomColor();


	// rebater a bolinha - inventer as direcoes
	//  "minimum translation vector" is a vector 'normalize()'

	

	if (!colidindo) {
		colidindo = true

		let interseccao = event.contact.mtv.normalize()

		//  interseccao.x e interssecao.y
		//  O maior representa o eixo onde houve o contato

		if ( Math.abs(interseccao.x) > Math.abs(interseccao.y) )  {
			// bolinha.vel.x = -bolinha.vel.x
			// bolinha.vel.x *= -1

			bolinha.vel.x = bolinha.vel.x * -1 
		} else {
			// bolinha.vel.y = -bolinha.vel.y
			// bolinha.vel.y *= -1
			bolinha.vel.y = bolinha.vel.y * -1
		}

	}



})

bolinha.on("collisionend", () => {
	colidindo = false
})

bolinha.on("exitviewport", () => {
	// Excutar som de game over
	gameOverSound.play(1)
	.then(() => {
		alert("E morreu")

	window.location.reload()
	})
})
// Inicia o game

// game.start()

await game.start(loader)


