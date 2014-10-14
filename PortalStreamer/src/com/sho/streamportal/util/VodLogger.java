/**
 *Logger.java
 *
 * Copyright (c) 2014 Showtime Networks Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Showtime Networks Inc. (SNI). ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Showtime Networks Inc..
 *
 */
package com.sho.streamportal.util;

import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

/**
 * @author ylongtao
 *
 */
public class VodLogger {
	private static final int LOG_FILE_SIZE = 50000000; //Max 50M for live log file 
	private static Logger logger = null;
	
	public VodLogger () {
		init();
	}
	
	private static void init() {
		try {
			FileHandler fh = new FileHandler("StreamPortal.log", LOG_FILE_SIZE, 5, true);
			fh.setFormatter(new SimpleFormatter());
			logger = Logger.getLogger(VodLogger.class.getName());
			logger.setLevel(Level.INFO);
			logger.addHandler(fh);
		} catch (Exception e) {
			System.out.println("Can't create Log monitor file! - StreamPortal.log, reason = "
					+ e.getMessage());
		}

	}
	
	public static Logger getLogger() {
		if (null == logger) init();
		return logger;
	}
}
