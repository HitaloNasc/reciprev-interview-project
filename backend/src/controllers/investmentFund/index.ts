import { create } from './create';
import { fromId } from './fromId';
import { fromCNPJ } from './fromCNPJ';
import { list } from './list';
import { update } from './update';
import { remove } from './remove';
import { _create } from './_create';
import { _fromCNPJ } from './_fromCNPJ';
import { _fromId } from './_fromId';
import { _list } from './_list';
import { _update } from './_update';
import { _delete } from './_delete';
import { _deleteMany } from './_deleteMany';

export default class InvestmentFund {
    // controllers
    create: Function;
    fromId: Function;
    fromCNPJ: Function;
    list: Function;
    update: Function;
    remove: Function;

    // services
    _create: Function;
    _fromCNPJ: Function;
    _fromId: Function;
    _list: Function;
    _update: Function;
    _delete: Function;
    _deleteMany: Function;

    constructor() {
        this.create = create;
        this.fromId = fromId;
        this.fromCNPJ = fromCNPJ;
        this.list = list;
        this.update = update;
        this.remove = remove;

        this._create = _create;
        this._fromCNPJ = _fromCNPJ;
        this._fromId = _fromId;
        this._list = _list;
        this._update = _update;
        this._delete = _delete;
        this._deleteMany = _deleteMany;
    }
}
