//MOCK service
module.exports = (srv) => {

    srv.on('READ', 'CoffeeMachine', () => [
        {
            cmid: 'CM01', date: "2019-12-30", numSimultCups: 1, descr: "CM1",
            toBrand: [
                {bid: "B001", cmid: "CM01", name: "Brand1", toCoffeeMachine: {cmid: 'U001', date: "2019-12-30", numSimultCups: 1, descr: "CM1"}}
            ],
            toCoffee: [
                {cid: "C001", cmid: "CM01", name: "Coffee1", producer: "Producer1", type: "Type1", toCoffeeMachine: {cmid: 'U001', date: "2019-12-30", numSimultCups: 1, descr: "CM1"}}
            ]
        }
    ]);

    srv.on('READ', 'Brand', () => [
        {bid: "B001", cmid: "CM01", name: "Brand1", toCoffeeMachine: {cmid: 'CM01', date: "2019-12-30", numSimultCups: 1, descr: "CM1"}, toAddress: {adid: "A001", bid: "B01", city: "Gotam", strt: "unknown"}}
    ]);

    srv.on('READ', 'Address', () => [
        { adid: "A001", bid: "B01", city: "Gotam", strt: "unknown" }
    ]);

    srv.on('READ', 'Coffee', () => [
        {cid: "C001", cmid: "CM01", name: "Coffee1", producer: "Producer1", type: "Type1", toCoffeeMachine: {cmid: 'U001', date: "2019-12-30", numSimultCups: 1, descr: "CM1"}}
    ]);

};
