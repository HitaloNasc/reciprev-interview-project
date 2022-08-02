import { create } from './create';
import { fromId } from './fromId';
import { list } from './list';
import { update } from './update';
import { fromInvestmentFundId } from './fromInvestmentFundId';
import { remove } from './remove';
import { _create } from './_create';
import { _fromId } from './_fromId';
import { _list } from './_list';
import { _update } from './_update';
import { _fromInvestmentFundId } from './_fromInvestmentFundId';
import { _deleteByInvestmentFundId } from './_deleteByInvestmentFundId';
import { _deleteMany } from './_deleteMany';
import { _delete } from './_delete';

export default class Transactions {
    // controllers
    create: Function;
    fromId: Function;
    list: Function;
    update: Function;
    fromInvestmentFundId: Function;
    remove: Function;

    // services
    _create: Function;
    _fromId: Function;
    _list: Function;
    _update: Function;
    _fromInvestmentFundId: Function;
    _deleteByInvestmentFundId: Function;
    _deleteMany: Function;
    _delete: Function;

    constructor() {
        this.create = create;
        this.fromId = fromId;
        this.list = list;
        this.update = update;
        this.fromInvestmentFundId = fromInvestmentFundId;
        this.remove = remove;

        this._create = _create;
        this._fromId = _fromId;
        this._list = _list;
        this._update = _update;
        this._fromInvestmentFundId = _fromInvestmentFundId;
        this._deleteByInvestmentFundId = _deleteByInvestmentFundId;
        this._deleteMany = _deleteMany;
        this._delete = _delete;
    }
}
