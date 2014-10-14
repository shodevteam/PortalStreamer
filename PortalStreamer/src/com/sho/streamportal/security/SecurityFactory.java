/*
 * SecurityFactory.java
 * 
 * Copyright (c) 2008 Johnson & Johnson. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of 
 * Johnson & Johnson. ("Confidential Information"). You shall not disclose such 
 * Confidential Information and shall use it only in accordance with the terms 
 * of the license agreement you entered into with Johnson & Johnson.
 */
package com.sho.streamportal.security;

import com.sho.streamportal.security.impl.SecurityImpl;

/**
 * Factory class to initialize the iSpec Security.
 * 
 * Author: R. Mukerjee
 * Date:   Feb 25, 2008
 */
public class SecurityFactory {
    public static IStreamPortalSecurity getSecurity() {
	return new SecurityImpl();
    }
}
