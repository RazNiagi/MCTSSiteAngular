export class QuartoOptions {
  playFirst: boolean;
  botLevel: number;

  constructor(playFirst: boolean = true, botLevel: number = 1) {
    this.playFirst = playFirst;
    this.botLevel = botLevel;
  }
}
