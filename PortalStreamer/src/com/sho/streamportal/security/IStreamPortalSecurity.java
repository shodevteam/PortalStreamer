/*
 * ISpecSecurity.java
 * 
 * Copyright (c) 2008 Johnson & Johnson. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of 
 * Johnson & Johnson. ("Confidential Information"). You shall not disclose such 
 * Confidential Information and shall use it only in accordance with the terms 
 * of the license agreement you entered into with Johnson & Johnson.
 */
package com.sho.streamportal.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Interface ISpecSecurity provides the basic security methods
 * for all the modules in iSpec Application
 * 
 * Author: RMukerje
 * Date:   Dec 6, 2007
 */
public interface IStreamPortalSecurity {
      
    /**
     * validateUser
     * This method validates a specific User.
     * @param domain - The Domain Name
     * @param userName - The User Name
     * @param password - The Password
     * @return true if User is valid else false
     */
    public boolean validateUser(String domain, String userName, String password);
    
    /**
     * validateApplicationAccess
     * description
     * @param request
     * @param response
     * @return
     */
    public boolean validateApplicationAccess(HttpServletRequest request,
	    HttpServletResponse response);    
    
    /**
     * getLoggedInUser
     * Method to return currently logged in User from the Session
     * @return User Name
     */
    public String getLoggedInUser();
}