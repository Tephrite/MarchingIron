class Menu extends Phaser.Scene{
  
    preload() {
        this.load.image('bg', 'Assets/Pictures/Menu.png');
    }

    create() {
        console.log("MainMenu");
        this.add.image(0, 0, 'bg');

        game.scene.start('GamePlay');
    }

    update() {
        // Update objects & variables
    }
}
