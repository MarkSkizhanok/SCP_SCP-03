using CoffeeMachine from './CoffeeMachine';
using Id from './CoffeeMachine';

		entity Address {
		    key adid : Id;
		    bid : Id;
		    city : String(100);
		    strt : String(100);
		    hnum : Integer;
		};

		entity Brand {
		    key bid : Id;
		    cmid : Id;
		    name : String(20);

    		toCoffeeMachine : association to one CoffeeMachine on toCoffeeMachine.cmid = cmid;
    		toAddress : association to one Address on toAddress.bid = bid;
		};

		entity Coffee {
		    key cid : Id;
		    cmid : Id;
		    name : String(20);
		    producer : String(20);
		    type : String(20);

    		toCoffeeMachine : association to one CoffeeMachine on toCoffeeMachine.cmid = cmid;
		};
