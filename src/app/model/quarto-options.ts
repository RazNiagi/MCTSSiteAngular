export class QuartoOptions {
  playFirst: boolean;
  botLevel: number;

  constructor(playFirst: boolean = false, botLevel: number = 1) {
    this.playFirst = playFirst;
    this.botLevel = botLevel;
  }
}
