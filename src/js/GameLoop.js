export class GameLoop {
    constructor(update, render) {
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStamp = 1000 / 60;

        this.gameLoop = null;
        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;

    }

    mainLoop = (timeStamp) => {
        if (!this.isRunning) return;

        //Calculate time since last frame
        let deltaTime = timeStamp - this.lastFrameTime;
        this.lastFrameTime = timeStamp;

        //Accumulate time since last frame
        this.accumulatedTime += deltaTime;

        //Fixed time step updates
        //Update until accumulated time is less than target time step
        while (this.accumulatedTime >= this.timeStamp) {
            this.update(this.timeStamp);
            this.accumulatedTime -= this.timeStamp;
        }

        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start() {
        if (!this.isRunning){  
            this.isRunning = true;
            this.lastFrameTime = performance.now();
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }
    
    stop() {
       if (this.rafId){
        cancelAnimationFrame(this.rafId);
       }
       this.isRunning = false;
    }
}