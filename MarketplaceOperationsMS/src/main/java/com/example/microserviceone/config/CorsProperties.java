package com.example.microserviceone.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.StringJoiner;

@Configuration
@ConfigurationProperties(prefix = "app.cors")
public class CorsProperties {

    private List<String> allowedOrigins;

    public List<String> getAllowedOriginsList() {
        return allowedOrigins;
    }

    public String getAllowedOriginsString() {
        return joinWithComma(allowedOrigins);
    }
    private static String joinWithComma(List<String> strings) {
        if (strings == null || strings.isEmpty()) {
            return "";
        }

        StringJoiner joiner = new StringJoiner(",");
        for (String s : strings) {
            if (s != null) {
                joiner.add(s);
            }
        }
        return joiner.toString();
    }



    public void setAllowedOrigins(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }
}