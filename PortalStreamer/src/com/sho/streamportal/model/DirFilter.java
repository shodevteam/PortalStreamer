/**
 *DirFilter.java
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

import java.io.File;
import java.io.FileFilter;

/**
 * @author ylongtao
 *
 */
public class DirFilter implements FileFilter {
	private String filter;
	private String [] filters;
	private String [] keywords;
	private String filterInFilter;
	/* includeOnly flag: if true, include only the files with the file name containing filterInFilter
					     if false, exclude the files with the file name containing filterInFilter 
	 */
	private boolean includeOnly; 

	public DirFilter(String filter, final String filterInFilter, boolean includeOnly) {
		this.filter = filter;
		this.filters = filter.split(",");
		this.filterInFilter = filterInFilter;
		if (null != filterInFilter) this.keywords = filterInFilter.split(",");
		this.includeOnly = includeOnly;
	}

	public boolean accept(File file) {
		if ("".equals(filter)) {
			return true;
		}
					
		for (int i=0; i < filters.length; i++) {
			if (file.getName().toLowerCase().endsWith(filters[i].toLowerCase())) {
				if (filterInFilter != null) {
					if (includeOnly) {
						for (int j=0; j < keywords.length; j++) {
							if (file.getName().toLowerCase().contains(keywords[j].trim().toLowerCase())) return true;							
						}
						return false;
					}
					else {
						for (int j=0; j < keywords.length; j++) {
							if (file.getName().toLowerCase().contains(keywords[j].trim().toLowerCase())) return false;							
						}
						return true;
					}
				}
				return true;
			}				
		}			
		return false;
	}
}
