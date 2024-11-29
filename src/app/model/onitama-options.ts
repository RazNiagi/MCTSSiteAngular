export class OnitamaOptions {
  public playAsColor: string = 'r';
  public enabledCards: Map<string, boolean> = new Map();

  constructor(playAsColor: string, enabledCards: Map<string, boolean> = new Map()) {
    this.playAsColor = playAsColor;
    this.enabledCards = enabledCards;
  }
}
