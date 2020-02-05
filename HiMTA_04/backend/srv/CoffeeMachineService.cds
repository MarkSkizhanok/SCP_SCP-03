using CoffeeMachine as _CoffeeMachine from '../db/CoffeeMachine';
using Brand as _Brand from '../db/ExtraInfo';
using Address as _Address from '../db/ExtraInfo';
using Coffee as _Coffee from '../db/ExtraInfo';

service odata {

  entity CoffeeMachine @(
		title: 'CoffeeMachine',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _CoffeeMachine;

  entity Brand @(
		title: 'Brand',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Brand;

  entity Address @(
		title: 'Address',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Address;

  entity Coffee @(
		title: 'Coffee',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Coffee;

}
