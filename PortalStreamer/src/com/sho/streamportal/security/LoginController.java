/**
 *LoginController.java
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
 * @author ylongtao
 *
 */

import java.util.logging.Level;
import java.util.logging.Logger;

import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.Button;
import org.zkoss.zul.Label;
import org.zkoss.zul.Messagebox;
import org.zkoss.zul.Textbox;

import com.sho.streamportal.util.VodLogger;
 
public class LoginController extends SelectorComposer<Component> {
	private static Logger logger = VodLogger.getLogger();
 
    /**
	 * 
	 */
	private static final long serialVersionUID = -7624284987932307220L;
	@Wire
    private Component component;	
    @Wire
    private Textbox userName;
    @Wire
    private Textbox passWord;
    @Wire
    private Textbox domain;
    @Wire
    private Button login;
    @Wire
    private Label msg;
     
    @Listen("onClick=#login")
    public void doLogin() {
    	User user = new User(domain.getValue(), userName.getValue());

        if (validate()) {
        	logger.log(Level.INFO, "validate() = true.");
        	Executions.getCurrent().getDesktop().getSession().setAttribute("UserObject", user);
            Executions.sendRedirect("/web/front.zul");
        }
        else {
        	logger.log(Level.INFO, "User " + user.getUserId() + " validation failed.");
        	msg.setVisible(true);
        	msg.setValue("Invalid user. Please retry...");
        }
    }
    private boolean validate() {
        if (isNull(userName.getValue())) {
            Messagebox.show("Please enter the username");
            userName.setFocus(true);
            return false;
        } else if (isNull(passWord.getValue())) {
            Messagebox.show("Please enter the password");
            passWord.setFocus(true);
            return false;
        } 
		IStreamPortalSecurity security = SecurityFactory.getSecurity();
        return security.validateUser(domain.getValue(), userName.getValue(), passWord.getValue());
    }
    
    public boolean isNull(String value) {
        boolean result = true;
        if (value != null && value.trim().length() > 0
                && !value.trim().equalsIgnoreCase("null")) {
            result = false;
        }
        return result;
    }
}

