/*
 * ZkLoaderFrontController.java
 * 
 * Copyright (c) 2008 Johnson & Johnson. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of 
 * Johnson & Johnson. ("Confidential Information"). You shall not disclose such 
 * Confidential Information and shall use it only in accordance with the terms 
 * of the license agreement you entered into with Johnson & Johnson.
 */
package com.sho.streamportal.security;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.zkoss.zk.ui.http.DHtmlLayoutServlet;

//import com.jnj.gco.ispec.security.ISpecSecurity;
//import com.jnj.gco.ispec.security.SecurityFactory;

/**
 * Please provide description for class ZkLoaderFrontController.
 * 
 * Author: R. Mukerjee Date: Jan 21, 2008
 */
public class ZkLoaderFrontController extends DHtmlLayoutServlet {
	static final long serialVersionUID = 0;
	private static String path = null;

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.zkoss.zk.ui.http.DHtmlLayoutServlet#doGet(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doGet(HttpServletRequest request,
		HttpServletResponse response) throws ServletException, IOException {

		response.setHeader("Cache-Control", "no-cache"); // Forces caches to
															// obtain a new copy
															// of the page from
															// the origin server
		response.setHeader("Cache-Control", "no-store"); // Directs caches not
															// to store the page
															// under any
															// circumstance
		response.setDateHeader("Expires", 0); // Causes the proxy cache to see
												// the page as "stale"
		response.setHeader("Pragma", "no-cache"); // HTTP 1.0 backward
													// compatibility

		HttpSession session = request.getSession();
		if ("/PortalStreamer/login.zul".equals(request.getRequestURI())) {
			session.removeAttribute("UserObject");
			session.invalidate();
			super.doGet(request, response);
		} else {
/*			session.removeAttribute("UserObject");
			session.invalidate();
			response.sendRedirect("/PortalStreamer/login.zul");
*/
			IStreamPortalSecurity security = SecurityFactory.getSecurity();
			if (security.validateApplicationAccess(request, response)) {
				super.doGet(request, response);
			} else {
				session.removeAttribute("UserObject");
				session.invalidate();
				response.sendRedirect("/PortalStreamer/login.zul");
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.zkoss.zk.ui.http.DHtmlLayoutServlet#init(javax.servlet.ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		try {
			path = config.getServletContext().getRealPath("/");
			if (null == path)
				path = config.getServletContext().getResource("/").getPath();

			// Calling iSpec scheduler start method.
			//com.jnj.gco.ispec.util.Scheduler.start();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.zkoss.zk.ui.http.DHtmlLayoutServlet#doPost(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	public static String getServletPath() {
		return path;
	}

}
