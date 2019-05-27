var endScreenState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    Extends: gamePlayState,
    initialize:
    function EndScreen(){
        Phaser.Scene.call(this, {key: 'EndScreen'});
    },
  
    preload: function() {
        this.load.image('bgEnd', 'Assets/Pictures/GameOverTwo.png');
        this.load.image('playButton', 'Assets/Pictures/button_play.png', 193, 71);
        this.load.image('exitButton', 'Assets/Pictures/button_exit.png', 193, 71);
        this.load.audio('EndingMusic', 'Assets/Music/background sound/saint_saens_danse_macabre.ogg');
    },

    create: function() {
        console.log("EndScreen");
        var background = this.add.image(640, 400, 'bgEnd');
        this.input.setDefaultCursor( 'url(Assets/Pictures/New-Piskel.cur), pointer');
        
        var scoreText = this.add.text(1034,434, '').setFontFamily('Stencil').setFontSize(55).setColor('#FFFFFF');
        scoreText.text=score;
        
        var wavesReached = this.add.text(1034, 530, '').setFontFamily('Stencil').setFontSize(55).setColor('#FFFFFF');
        wavesReached.text=waveInc;
        
        var playButton = this.add.image(332, 696, 'playButton');
        playButton.setInteractive();
        playButton.once('pointerdown', function(pointer){ 
            game.scene.start('GamePlay');
            music.stop();
            background.visible = false;
            playButton.visible = false;
            exitButton.visible = false;
            scoreText.visible = false;
            wavesReached.visible = false;
            
            });
        
        var exitButton = this.add.image(948, 696, 'exitButton');
        exitButton.setInteractive();
        exitButton.once('pointerdown', function(pointer){ window.close();});
        
        var music= this.sound.add('EndingMusic');
        music.play();
        
        
    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(endScreenState);