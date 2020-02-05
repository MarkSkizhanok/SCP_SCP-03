type Id : String(4);
using Brand from './ExtraInfo';
using Coffee from './ExtraInfo';

entity CoffeeMachine {
    key cmid : Id;
    date : Date;
    numSimultCups : Integer;
    descr : String(200);

    toBrand : association to one Brand on toBrand.cmid = cmid;
    toCoffee : association to many Coffee on toCoffee.cmid = cmid;
};
