/**
 *FileServiceImpl.java
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

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

import com.sho.streamportal.model.DirFilter;
import com.sho.streamportal.model.VideoFile;
import com.sho.streamportal.util.VodLogger;

/**
 * @author ylongtao
 *
 */
public class FileServiceImpl implements DataService {

	/* (non-Javadoc)
	 * @see com.sho.streamportal.service.FileService#listAllFiles(java.lang.String)
	 */
	private File folder = null;
	private Logger logger = VodLogger.getLogger();
	
	public FileServiceImpl(File folder) {		
		this.folder = folder;
	}
	
	@Override
	public List<VideoFile> listAllFiles(String filter) {
		List <VideoFile> fileList = new ArrayList <VideoFile> ();
    	DirFilter df = new DirFilter(filter, null, true);
		try {
			final File[] listOfFiles = folder.listFiles(df);
			for (int i = 0; i < listOfFiles.length; i++) {
				if (listOfFiles[i].isFile()) {
					final File file = listOfFiles[i];
					final String fileName = file.getName();
					final String path = file.getAbsolutePath();
					fileList.add(new VideoFile(fileName, path));
					logger.log(Level.INFO, "FileName = " + fileName + "FilePath = " + path);					
				}
			}
			Collections.sort(fileList);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "RuntimeException thrown in listAllFiles(): "
					+ e.toString());
		}		
		return fileList;
	}

	/* (non-Javadoc)
	 * @see com.sho.streamportal.service.FileService#listAllFilesByKeywords(java.lang.String)
	 */
	@Override
	public List<VideoFile> listAllFilesByKeywords(String filter, String keyword, boolean include) {
		List <VideoFile> fileList = new ArrayList <VideoFile> ();
    	DirFilter df = new DirFilter(filter, keyword, include);
		try {
			final File[] listOfFiles = folder.listFiles(df);
			for (int i = 0; i < listOfFiles.length; i++) {
				if (listOfFiles[i].isFile()) {
					final File file = listOfFiles[i];
					final String fileName = file.getName();
					final String path = file.getAbsolutePath();
					fileList.add(new VideoFile(fileName, path));
				}
			}
			Collections.sort(fileList);
		} catch (RuntimeException e) {
			logger.log(Level.INFO, "RuntimeException thrown in verifyFilesForYesterday(): "
					+ e.toString());
		}		
		
		return fileList;
	}

}
