package com.leverx.sample.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.Jwt;

import com.sap.cloud.security.xsuaa.XsuaaServiceConfiguration;
import com.sap.cloud.security.xsuaa.token.TokenAuthenticationConverter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	XsuaaServiceConfiguration xsuaaServiceConfiguration;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
			.authorizeRequests()
			.antMatchers("/secure/manager").hasAnyAuthority("insert", "update", "delete")
			.antMatchers("/secure/visitor").hasAuthority("view")
			.antMatchers("/").permitAll()
			.anyRequest().authenticated()
	    .and()
	        .oauth2ResourceServer().jwt().jwtAuthenticationConverter(getJwtAuthenticationConverter());
		
	}
	
	Converter<Jwt, AbstractAuthenticationToken> getJwtAuthenticationConverter() {
		TokenAuthenticationConverter converter = new TokenAuthenticationConverter(xsuaaServiceConfiguration);
		converter.setLocalScopeAsAuthorities(true);
		return converter;
	}

}