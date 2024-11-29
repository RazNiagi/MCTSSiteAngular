import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {OnitamaOptions} from '../../model/onitama-options';
import {OnitamaService} from '../onitama.service';
import {OnitamaMovementCard} from '../../model/onitama-movement-card';

export class OnitamaMovementCardWithEnabledFlag {
  movementCard: OnitamaMovementCard;
  enabled: boolean;
  constructor(movementCard: OnitamaMovementCard, enabled: boolean) {
    this.movementCard = movementCard;
    this.enabled = enabled;
  }
}

export class OnitamaExpansionEnabler {
  expansionName: string;
  enabled: boolean;
  partiallyEnabled: boolean;
  cardList: OnitamaMovementCardWithEnabledFlag[]

  constructor(expansionName: string, partiallyEnabled: boolean, enabled: boolean, cardList: OnitamaMovementCardWithEnabledFlag[]) {
    this.expansionName = expansionName;
    this.enabled = enabled;
    this.partiallyEnabled = partiallyEnabled;
    this.cardList = cardList;
  }
}

@Component({
  selector: 'app-onitama-settings',
  templateUrl: './onitama-settings.component.html',
  styleUrl: './onitama-settings.component.scss',
})
export class OnitamaSettingsComponent implements OnInit {
  public options: OnitamaOptions = new OnitamaOptions('r');
  public onitamaExpansionCards: OnitamaExpansionEnabler[] = [];
  readonly dialogRef = inject(MatDialogRef<OnitamaSettingsComponent>);

  public onCancelClick(): void {
    this.dialogRef.close()
  }

  public onSaveClick(): void {
    this.changeOptionsOfAllCards();
    this.dialogRef.close(this.options);
  }

  constructor(private _onitamaService: OnitamaService) {
  }

  public ngOnInit() {
    this.initializeAllCardsInOptions();
    this.setAllCardsToServiceOptions();
    this.initializeOnitamaExpansionEnabler();
  }

  public initializeAllCardsInOptions(): void {
    for (let card of this._onitamaService.getAllCards()) {
      if (!this.options.enabledCards.has(card.name)) {
        this.options.enabledCards.set(card.name, true);
      }
    }
  }

  public initializeOnitamaExpansionEnabler(): void {
    this.onitamaExpansionCards = [];
    let expansionSet: Set<string> = this._onitamaService.getAllExpansions();
    let expansionArray: string[] = Array.from(expansionSet);
    for (let expansion of expansionArray) {
      const listOfCards = this._onitamaService.getAllCardsFromExpansion(expansion).sort((a, b) => a.name.localeCompare(b.name));
      let listOfCardsWithFlags: OnitamaMovementCardWithEnabledFlag[] = [];
      for (let card of listOfCards) {
        listOfCardsWithFlags.push(new OnitamaMovementCardWithEnabledFlag(card, this.isCardEnabled(card.name)));
      }
      let expansionEnabled: boolean = true;
      let expansionPartiallyEnabled: boolean = false;
      if (listOfCardsWithFlags.every(card => !card.enabled)) {
        expansionEnabled = false;
      }
      if (listOfCardsWithFlags.some(card => card.enabled) && !listOfCardsWithFlags.every(card => card.enabled)) {
        expansionPartiallyEnabled = true;
      }
      this.onitamaExpansionCards.push(new OnitamaExpansionEnabler(expansion, expansionPartiallyEnabled, expansionEnabled, listOfCardsWithFlags));
    }
  }

  public isCardEnabled(cardName: string): boolean {
    let enabled = this.options.enabledCards.get(cardName);
    if (enabled !== undefined) {
      return enabled;
    }
    return true;
  }

  public updateCard(cardName: string, checked: boolean) {
    this.options.enabledCards.set(cardName, checked);
  }

  public updateCardWithExpansion(expansion: string, cardName: string, checked: boolean) {
    let expansionEnabler: OnitamaExpansionEnabler | undefined = this.onitamaExpansionCards
      .find(expansionCard => expansionCard.expansionName === expansion);
    if (expansionEnabler) {
      let card = expansionEnabler.cardList.find(card => card.movementCard.name === cardName);
      if (card) {
        card.enabled = checked;
      }
      if (expansionEnabler.cardList.every(card => !card.enabled)) {
        expansionEnabler.enabled = false;
      }
      this.updateExpansionPartiallyEnabled(expansionEnabler);
    }
  }

  public updateExpansionPartiallyEnabled(expansionEnabler: OnitamaExpansionEnabler): void {
    expansionEnabler.partiallyEnabled = expansionEnabler.cardList.some(card => card.enabled)
      && !expansionEnabler.cardList.every(card => card.enabled);
  }

  public updateAllCardsForExpansion(checked: boolean, expansion: string): void {
    let expansionEnabler: OnitamaExpansionEnabler | undefined = this.onitamaExpansionCards
      .find(expansionCard => expansionCard.expansionName === expansion);
    if (expansionEnabler) {
      for (let card of expansionEnabler.cardList) {
        card.enabled = checked;
      }
      expansionEnabler.partiallyEnabled = false;
    }
  }

  public getExpansionNameForDisplay(expansion: string) {
    return this._onitamaService.getExpansionNameForDisplay(expansion);
  }

  public changeOptionsOfAllCards(): void {
    for (let expansionCard of this.onitamaExpansionCards) {
      for (let card of expansionCard.cardList) {
        this.updateCard(card.movementCard.name, card.enabled);
      }
    }
  }

  doesCardHaveStudentMasterMoves(movementCard: OnitamaMovementCardWithEnabledFlag) {
    if (movementCard.movementCard.studentOnlyMoves && movementCard.movementCard.studentOnlyMoves?.length > 0) {
      return {
        height: '287px',
        color: 'white'
      }
    } else {
      return {
        height: '135px'
      }
    }
  }

  public getEnabledCardClass(movementCard: OnitamaMovementCardWithEnabledFlag) {
    return movementCard.enabled ? 'enabled' : '';
  }

  public setAllCardsToServiceOptions(): void {
    for (let [cardName, enabled] of this._onitamaService.options.enabledCards) {
      if (enabled !== undefined) {
        this.updateCard(cardName, enabled);
      }
    }
  }
}
