/**
 * FileSelectController.java
 *
 * Copyright (c) 2014 Showtime Networks Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Showtime Networks Inc. (SNI). ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Showtime Networks Inc..
 *
 */
package com.sho.streamportal.controller;

import java.io.File;
import java.util.Properties;
import java.util.Set;
import java.util.logging.Logger;
import java.util.logging.Level;

import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.Session;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.Div;
import org.zkoss.zul.Html;
import org.zkoss.zul.Label;
import org.zkoss.zul.ListModel;
import org.zkoss.zul.ListModelList;
import org.zkoss.zul.Listbox;
import org.zkoss.zul.Textbox;
import org.zkoss.zul.Window;

import com.sho.streamportal.model.VideoFile;
import com.sho.streamportal.security.User;
import com.sho.streamportal.service.DataService;
import com.sho.streamportal.service.FileServiceImpl;
import com.sho.streamportal.util.VodConstants;
import com.sho.streamportal.util.VodLogger;
import com.sho.streamportal.conf.VodProperties;
/**
 * @author ylongtao
 *
 */
public class FileSelectController extends SelectorComposer<Window> {
    private static final long serialVersionUID = 1L;
	private static String video_folder = "E:/work/video";
	private static String video_player_prefix = "src=http://129.228.137.0:1935/StreamPortal/";
	private static String video_player_suffix = "/manifest.f4m";
	private static String file_filter = "mp4,mov";	
	private static String html_part1 = VodConstants.html_part1;
	private static String html_part2 = VodConstants.html_part2;
	private static String html_part3 = VodConstants.html_part3;
	private String url = "";		
	private static Properties vodProperties = null;
	private static Logger logger = VodLogger.getLogger();
    
    @Wire
    private Textbox keywordText;
      
    @Wire
    private Window win;
    
    @Wire
    private Listbox fileListbox;    
        
    @Wire
    private Div flashDiv;

    @Wire
    private Label loggedInId;
    
    @Wire
    private Label fileInPlay;
    
    @Wire
    private Html h;
    
    private String keywords;

    private ListModel<VideoFile> filesModel;
        
    public FileSelectController() {
    	if (null == vodProperties) readConfiguratoins();
    	listAllFiles();
    }
    
	private static void readConfiguratoins() {
		vodProperties = VodProperties.getProperties();
		video_folder = vodProperties.getProperty("video_folder");
		video_player_prefix = vodProperties.getProperty("video_player_prefix");
		video_player_suffix = vodProperties.getProperty("video_player_suffix");
		file_filter = vodProperties.getProperty("file_filter");
	}

    
	public void doAfterCompose(Window comp) throws Exception {
		super.doAfterCompose(comp);
		Session session = Executions.getCurrent().getDesktop().getSession();
		User user = (User) session.getAttribute("UserObject");
		loggedInId.setValue(user.getUserId());
	}
     
    public ListModel<VideoFile> getFilesModel() {
		return filesModel;
	}

	public void setFilesModel(ListModel<VideoFile> filesModel) {
		this.filesModel = filesModel;
	}

	@Listen("onClick=#searchSubmit")
	public void submit() {
		keywords = keywordText.getValue();
		logger.log(Level.INFO, "Search keywords = " + keywords);

		if (null == keywords || "".equals(keywords.trim()))
			listAllFiles();
		else {
			File folder = new File(video_folder);
			DataService fileSvc = new FileServiceImpl(folder);
			filesModel = new ListModelList<VideoFile>(
					fileSvc.listAllFilesByKeywords(file_filter, keywords, true));
			((ListModelList<VideoFile>) filesModel).setMultiple(false);
			logger.log(Level.INFO, "Number of files = " + filesModel.getSize());
		}
		fileListbox.setModel(filesModel);
	}
     
	@Listen("onSelect=#fileListbox")
	public void updateFlashURL() {
		Set<VideoFile> selectedFiles = ((ListModelList<VideoFile>) filesModel)
				.getSelection();

		VideoFile file = selectedFiles.iterator().next();
		String filename = file.getFileName();
		url = video_player_prefix + filename + video_player_suffix;
		String content = html_part1 + url + html_part2 + url + html_part3;
		logger.log(Level.INFO, "URL = " + url);
		// logger.log(Level.INFO, "content = " + content);

		h.setContent(content);
		fileInPlay.setValue(filename);
		h.invalidate();
		// flashDiv.invalidate();
	}
     
	public void listAllFiles() {
        File folder = new File(video_folder);
        DataService fileSvc = new FileServiceImpl(folder);
        filesModel = new ListModelList<VideoFile>(fileSvc.listAllFiles(file_filter));
        ((ListModelList<VideoFile>)filesModel).setMultiple(false);
    	logger.log(Level.INFO, "Number of files = " + filesModel.getSize());         
	}
	
    @Listen("onClick=#logout")
    public void doLogout(){
    	Session session = Executions.getCurrent().getDesktop().getSession();
    	session.removeAttribute("UserObject");       
        Executions.sendRedirect("/web/front.zul");
    }
    
    public String getUrl(){
        return this.url;
    }

}
