/**
 *FileService.java
 *
 * Copyright (c) 2014 Showtime Networks Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Showtime Networks Inc. (SNI). ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Showtime Networks Inc..
 *
 */
package com.sho.streamportal.service;

import java.util.List;

import com.sho.streamportal.model.VideoFile;

/**
 * @author ylongtao
 * 
 */
public interface DataService {
	
	/**
	 * Retrieve all video files in a given folder.
	 * 
	 * @return all VideoFiles.
	 */
	public List<VideoFile> listAllFiles(String filter);

	/**
	 * Retrieve all video files in a given folder by key words in file name.
	 * 
	 * @return all VideoFiles.
	 */

	public List<VideoFile> listAllFilesByKeywords(String filter, String keyword, boolean include);
}