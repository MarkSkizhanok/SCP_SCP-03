namespace leverx.com.sample;

using my.bookshop as my from '../db/index';

service CatalogService {
    @readonly entity CoffeeMachine as projection on my.CoffeeMachine;
    @readonly entity Coffee as projection on my.Coffee;
}
