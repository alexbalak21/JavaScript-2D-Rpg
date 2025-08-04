class Resources {
  constructor() {
    //EVERYTHING TO LOAD
    this.toLoad = {
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      hero: "/sprites/hero-sheet.png",
      shadow: "/sprites/shadow.png",
    };
    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      //Create image object
      const img = new Image();
      //Set image source
      img.src = this.toLoad[key];
      //Add image to images object
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

//Export resources
export const resources = new Resources();