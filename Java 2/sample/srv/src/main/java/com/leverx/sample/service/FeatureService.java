package com.leverx.sample.service;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.sap.cds.feature.platform.PlatformEnvironment;
import com.sap.cds.feature.platform.ServiceBinding;
import com.sap.cloud.security.xsuaa.token.SpringSecurityContext;
import com.sap.cloud.security.xsuaa.token.Token;

@Service
public class FeatureService {
	
	@Autowired
	private PlatformEnvironment platformEnv;
	
	public Map<String, String> getTokenInfo() {
		 Token token = SpringSecurityContext.getToken();
		 Map<String, String> tokenInfo = new HashMap<>();
		 tokenInfo.put("grant type", token.getGrantType());
		 tokenInfo.put("client id", token.getClientId());
		 tokenInfo.put("subaccount id", token.getSubaccountId());
		 tokenInfo.put("logon name", token.getLogonName());
		 tokenInfo.put("family name", token.getFamilyName());
		 tokenInfo.put("given name", token.getGivenName());
		 tokenInfo.put("email", token.getEmail());
		 tokenInfo.put("authorities", String.valueOf(token.getAuthorities()));
		 tokenInfo.put("scopes", String.valueOf(token.getScopes()));
	     return tokenInfo;
	}
}
