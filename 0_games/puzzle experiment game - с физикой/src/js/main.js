import {crystalParts, crystalPartsParams} from './const.js';
import Part from './Crystal.js';

export default  class Game {
  constructor() {
    this.game  = null
    this.target = null
    this.crystal = null
    this.crystals = []
  
    this.crystalPartsParams = crystalPartsParams
    this.target         = null
    this.currentCrystal = null
  
    this.crystalParts = crystalParts
  }

  init() {
    this.game = new Phaser.Game(
      800,
      800,
      Phaser.CANVAS,
      null,
      {
        preload: this.preload,
        create : this.create,
        update : this.update,
        render : this.render
      })
  }

  preload = () => {
    this.game.stage.backgroundColor = '#114333'
    this.game.load.image('crystalBodyWrap', '/src/img/crystalBody-wrap.png')
    this.game.load.image('crystalBody', '/src/img/crystalBody.png')

    this.game.load.image('crystalLeft', '/src/img/crystalLeft.png')
    this.game.load.image('crystalTop', '/src/img/crystalTop.png')
    this.game.load.image('crystalRight', '/src/img/crystalRight.png')
    this.game.load.image('dots', '/src/img/dots.png')
  
    // загрузка физики
    this.game.load.physics('physicsData', 'src/geometry/sprites.json')
  }

  create = () => {
    this.game.add.sprite(200, 90, 'crystalBodyWrap')
    this.#createCrystals()
    this.game.add.sprite(190, 185, 'dots')
  }

  update = () => {
  }

  render = () => {
    this.crystals.forEach(crystal => {
      // this.game.debug.spriteBounds(crystal.block)
    })
  }
  
  #createCrystals = () => {
    crystalPartsParams.forEach(crystal => {
      this.crystals.push(
        new Part(
          this.game,
          crystal.x,
          crystal.y,
          crystal.anchor,
          crystal.key,
          crystal.isDisabled,
          crystal.initAngle,
          'physicsData'
        )
      )
    })
  }
}

new Game().init()

