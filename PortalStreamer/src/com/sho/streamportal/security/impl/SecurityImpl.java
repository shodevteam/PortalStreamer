/*
 * SecurityImpl.java
 * 
 * Copyright (c) 2008 Johnson & Johnson. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of 
 * Johnson & Johnson. ("Confidential Information"). You shall not disclose such 
 * Confidential Information and shall use it only in accordance with the terms 
 * of the license agreement you entered into with Johnson & Johnson.
 */
package com.sho.streamportal.security.impl;

import java.util.Hashtable;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.naming.Context;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.Session;

import com.sho.streamportal.security.IStreamPortalSecurity;
import com.sho.streamportal.security.User;
import com.sho.streamportal.util.VodLogger;

/**
 * SecurityImpl provides the basic security methods for all the modules in iSpec
 * Application
 * 
 */
public class SecurityImpl implements IStreamPortalSecurity {
	private static Logger logger = VodLogger.getLogger();

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.jnj.gco.ispec.security.ISpecSecurity#validateUser(java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	public boolean validateUser(String domain, String userName, String password) {
		DirContext ctx = null;
		;
		LdapContext ldapContext = null;
		String host = "ad-dns-nyc.ad.cbs.net"; // LDAP Server host name
		String port = "3268"; // LDAP Server Port

		String url = "ldap://" + host + ":" + port + "/";

		try {
			Hashtable<String, String> env = new Hashtable<String, String>();
			env.put(Context.INITIAL_CONTEXT_FACTORY,
					"com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.PROVIDER_URL, url);

			ldapContext = new InitialLdapContext(env, null);

			String activeDirUser = domain + "\\" + userName;

			env.put(Context.SECURITY_AUTHENTICATION, "simple");
			env.put(Context.SECURITY_PRINCIPAL, activeDirUser);
			env.put(Context.SECURITY_CREDENTIALS, password);

			ctx = new InitialDirContext(env);

			ctx.close();
			return true;

		} catch (Exception e) {
			logger.log(Level.INFO, "Invalid user: " + e.toString());
			return false;
		} finally {
			try {
				if (ctx != null)
					ctx.close();
				if (ldapContext != null)
					ldapContext.close();
			} catch (Exception ex) {
				logger.log(Level.SEVERE,
						"ldapContext close error: " + ex.toString());
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.jnj.gco.ispec.security.ISpecSecurity#validateApplicationAccess()
	 */
	public boolean validateApplicationAccess(HttpServletRequest request,
			HttpServletResponse response) {
		HttpSession session = request.getSession();
		if (session.getAttribute("UserObject") != null) {
			return true;
		}
		return false;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.jnj.gco.ispec.security.ISpecSecurity#getLoggedInUser()
	 */
	public String getLoggedInUser() {
		if (Executions.getCurrent() == null) {
			return null;
		}
		Session session = Executions.getCurrent().getDesktop().getSession();
		User user = (User) session.getAttribute("UserObject");
		if (user != null) {
			return user.getDomain().toLowerCase() + "/"
					+ user.getUserId().toLowerCase();
		} else {
			return null;
		}
	}
}
