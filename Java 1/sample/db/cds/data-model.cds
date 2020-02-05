namespace my.bookshop;

using cuid from '@sap/cds/common';

entity CoffeeMachine : cuid {
    brand : String(20);
    numSimultCups : Integer;
    purDate : Date;
    descr : String(200);

    coffee: Association to many Coffee on coffee.coffeeMachine = $self;
}

entity Coffee : cuid {
    producer : String(20);
    type : String(20);

    coffeeMachine : Association to CoffeeMachine;
}
