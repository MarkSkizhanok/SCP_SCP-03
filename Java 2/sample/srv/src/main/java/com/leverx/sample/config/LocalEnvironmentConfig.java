package com.leverx.sample.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.sap.cds.feature.platform.local.LocalPlatformEnvironment;

@Configuration
@Profile("!cloud")
public class LocalEnvironmentConfig {

    @Bean
	public LocalPlatformEnvironment localEnvironment() {
		return (LocalPlatformEnvironment) LocalPlatformEnvironment.INSTANCE;
	}

}
