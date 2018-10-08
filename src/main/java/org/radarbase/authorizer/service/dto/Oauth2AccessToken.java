package org.radarbase.authorizer.service.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Oauth2AccessToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("expires_in")
    private String expiresIn;

    @JsonProperty("token_type")
    private String tokenType;

    public String getAccessToken() {
        return accessToken;
    }

    public Oauth2AccessToken accessToken(String accessToken) {
        this.accessToken = accessToken;
        return this;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Oauth2AccessToken refreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    public String getExpiresIn() {
        return expiresIn;
    }

    public Oauth2AccessToken expiresIn(String expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    public String getTokenType() {
        return tokenType;
    }

    public Oauth2AccessToken tokenType(String tokenType) {
        this.tokenType = tokenType;
        return this;
    }

    @Override
    public String toString() {
        return "DeviceAccessToken{" + "accessToken='" + accessToken + '\'' + ", refreshToken='"
                + refreshToken + '\'' + ", expiresIn='" + expiresIn + '\'' + ", tokenType='"
                + tokenType + '\'' + '}';
    }
}
