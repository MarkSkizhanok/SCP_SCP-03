package com.leverx.sample.handlers;

import org.springframework.stereotype.Component;

import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.cds.CdsCreateEventContext;
import com.sap.cds.services.cds.CdsService;

import my.bookshop.CoffeeMachine_;
import leverx.com.sample.catalogservice.CatalogService_;

@Component
@ServiceName(CatalogService_.CDS_NAME) 
public class CoffeeMachineHandler implements EventHandler {
	
	@Before(event = CdsService.EVENT_CREATE, entity = CoffeeMachine_.CDS_NAME)
	public void checkBefore(CdsCreateEventContext context) {
		
	}
	
	@On(event = CdsService.EVENT_CREATE, entity = CoffeeMachine_.CDS_NAME)
	public void checkOn(CdsCreateEventContext context) {
		
	}

	@After(event = CdsService.EVENT_CREATE, entity = CoffeeMachine_.CDS_NAME)
	public void checkAfter(CdsCreateEventContext context) {
		
	}

}
