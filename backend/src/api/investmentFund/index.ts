import { activate } from './activate';
import { create } from './create';
import { deactivate } from './deactivate';
import { fromId } from './fromId';
import { list } from './list';
import { update } from './update';

export default class InvestmentFund {
    activate: Function;
    create: Function;
    deactivate: Function;
    fromId: Function;
    list: Function;
    update: Function;

    constructor() {
        this.activate = activate;
        this.create = create;
        this.deactivate = deactivate;
        this.fromId = fromId;
        this.list = list;
        this.update = update;
    }
}
