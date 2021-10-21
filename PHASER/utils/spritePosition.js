class SpritePosition {
  constructor(sprites, scalePanel) {
    this.sprites = sprites
    this.checkedIndexSprite = 0
    this.sprite = null
    this.spriteName = null

    this.className = 'sprite-position-panel'
    this.scalePanel = scalePanel

    this.startPositionX = null
    this.startPositionY = null

    this.elementName = null
    this.elementX = null
    this.elementY = null
    this.step = 1
    this.stepAccelerator = 10

    this.init()
  }

  init = () => {
    this.update()

    this.createInfoPanel()
    this.setSpritePosition()
  }

  update = () => {
    this.sprite = Object.entries(this.sprites)[this.checkedIndexSprite][1]
    this.spriteName = Object.entries(this.sprites)[this.checkedIndexSprite][0]
    this.startPositionX = this.sprite.position.x
    this.startPositionY = this.sprite.position.y
  }

  checkoutSprite = () => {
    this.update()

    this.elementName.innerHTML = `Sprite: ${this.spriteName}`
    this.elementX.innerHTML = `X: ${Math.trunc(this.sprite.position.x)}`
    this.elementY.innerHTML = `Y: ${Math.trunc(this.sprite.position.y)}`
  }

  createInfoPanel = () => {
    const wrapInfo = document.createElement('div')
    wrapInfo.setAttribute('style', `
        position: absolute;
        top: 0;
        left: 0;
        min-width: 80px;
        padding: 10px 20px;
        font-size: ${this.scalePanel ? this.scalePanel : 3}em;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        cursor: none;
        z-index: 999;
    `)

    this.elementName = document.createElement('p')
    this.elementX = document.createElement('p')
    this.elementY = document.createElement('p')

    wrapInfo.append(this.elementName)
    wrapInfo.append(this.elementX)
    wrapInfo.append(this.elementY)
    document.body.append(wrapInfo)

    this.elementName.innerHTML = `Sprite: ${this.spriteName}`
    this.elementX.innerHTML = `X: ${Math.trunc(this.sprite.position.x)}`
    this.elementY.innerHTML = `Y: ${Math.trunc(this.sprite.position.y)}`
  }

  setSpritePosition() {
    document.addEventListener('keydown', (key) => {
      if (key.code === 'ArrowDown') this.startPositionY += this.step
      if (key.code === 'ArrowUp') this.startPositionY -= this.step
      if (key.code === 'ArrowLeft') this.startPositionX -= this.step
      if (key.code === 'ArrowRight') this.startPositionX += this.step

      // важен порядок → сперва зажимаем shift, потом кнопку
      if (key.code === 'ArrowDown' && key.shiftKey === true) this.startPositionY += this.stepAccelerator
      if (key.code === 'ArrowUp' && key.shiftKey === true) this.startPositionY -= this.stepAccelerator
      if (key.code === 'ArrowLeft' && key.shiftKey === true) this.startPositionX -= this.stepAccelerator
      if (key.code === 'ArrowRight' && key.shiftKey === true) this.startPositionX += this.stepAccelerator

      this.elementName.innerHTML = `Sprite: ${this.spriteName}`
      this.elementX.innerHTML = `X: ${Math.trunc(this.startPositionX)}`
      this.elementY.innerHTML = `Y: ${Math.trunc(this.startPositionY)}`

      this.sprite.position.set(this.startPositionX, this.startPositionY)

      // сменить sprite
      if (key.code === 'ArrowLeft' && key.ctrlKey === true) {
        this.checkedIndexSprite--
        this.checkoutSprite()
      }
      if (key.code === 'ArrowRight' && key.ctrlKey === true) {
        this.checkedIndexSprite++
        this.checkoutSprite()
      }
    })
  }
}