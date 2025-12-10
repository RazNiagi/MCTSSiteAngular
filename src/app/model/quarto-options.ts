export class QuartoOptions {
  playFirst: boolean;
  botLevel: number;
  advancedMode: boolean;

  constructor(playFirst: boolean = false, botLevel: number = 1, advancedMode: boolean = false) {
    this.playFirst = playFirst;
    this.botLevel = botLevel;
    this.advancedMode = advancedMode;
  }
}
