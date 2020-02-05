package com.leverx.sample.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sap.cds.feature.platform.PlatformEnvironment;

@Configuration
public class PlatformEnvironmentConfig {
	
	@Bean
	public PlatformEnvironment platformEnv() {
		return PlatformEnvironment.INSTANCE;
	}
	
}
