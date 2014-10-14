/**
 *VodProperties.java
 *
 * Copyright (c) 2014 Showtime Networks Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Showtime Networks Inc. (SNI). ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Showtime Networks Inc..
 *
 */
package com.sho.streamportal.conf;
/**
 *VodProperty.java
 *
 * Copyright (c) 2014 Showtime Networks Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Showtime Networks Inc. (SNI). ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Showtime Networks Inc..
 *
 */

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Logger;
import java.util.logging.Level;


import com.sho.streamportal.util.VodLogger;

/**
 * @author ylongtao
 *
 * Jun 16, 2014
 */
public class VodProperties {
	private static Logger logger = VodLogger.getLogger();
	private static String PROPERTIES_FILENAME = "vod.properties";
	private static Properties properties = null;
	
	public VodProperties() {};
	
	public static Properties getProperties() {
		if (null == properties) readProperties();
		return properties;		
	}
	
	// /////////////////////////PROPERTIES////////////////////////////
	private static void readProperties() {
		properties = new Properties();
		InputStream in = null;
		try {
			in = VodProperties.class.getClassLoader().getResourceAsStream(PROPERTIES_FILENAME);
			properties.load(in);
		} catch (IOException ioe) {			
			logger.log(Level.SEVERE, "Can't read the properties file, reason - " + ioe.getMessage());
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
				}
			}
		}
	}
}
