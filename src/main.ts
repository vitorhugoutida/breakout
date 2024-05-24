import { Actor, CollisionType, Color, Engine, vec } from "excalibur"

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

const corBloco = [Color.Violet, Color.Orange, Color.Yellow]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)

// const larguraBloco = 136

const alturaBloco = 30

const listaBlocos: Actor[] = []

// Inicia o game

game.start()