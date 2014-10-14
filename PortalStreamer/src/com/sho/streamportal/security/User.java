/*
 * User.java
 * 
 * Copyright (c) 2014 Showtime Networks Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Showtime Networks Inc. (SNI). ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Showtime Networks Inc..
 *
 */
package com.sho.streamportal.security;


/**
 * Data transfer object for User.
 * 
 * Author: ylongtao
 * Date:   Sept. 23, 2014
 */
public class User implements java.io.Serializable {  
    /**
	 * 
	 */
	private static final long serialVersionUID = 8359029960724717134L;
	private String domain;
    private String userId;
    private String password;
    
    public User(String domain, String userId) {
    	this.userId = userId;
    	this.domain = domain;
	//usersName = SecurityFactory.getSecurity().getLoggedInUser();
    }

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    

}