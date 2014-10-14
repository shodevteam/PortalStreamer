/**
 *VideoFile.java
 *
 * Copyright (c) 2014 Showtime Networks Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Showtime Networks Inc. (SNI). ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Showtime Networks Inc..
 *
 */
package com.sho.streamportal.model;


/**
 * @author ylongtao
 * 
 */
public class VideoFile implements Comparable <VideoFile> {
	
	private String filePath;
	private String fileName;

    public VideoFile() {
    }
    
    public VideoFile(String fileName, String filePath) {
    	this.fileName = fileName;
    	this.filePath = filePath;
    }    

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public int compareTo(VideoFile that) {
		if (this.fileName.compareTo(that.getFileName()) == 0)  return 0; 
		else if (this.fileName.compareTo(that.getFileName()) < 0) return -1; 
		else return 1; 		
	}
}
