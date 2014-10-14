/**
 *VodConstatns.java
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

/**
 * @author ylongtao
 *
 */
public class VodConstants {
	public static final String html_part1 = "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" "
									+ "width=\"720\" height=\"486\" id=\"Live\"> "
									+ "<param name=\"movie\" "
									+ "value=\"../flash/playback.swf\" />"
									+ "<param name=\"quality\" value=\"high\" />"
									+ "<param name=\"bgcolor\" "
									+ "value=\"#000000\" /> "
									+ "<param name=\"allowScriptAccess\" "
									+ "value=\"sameDomain\" /> "
									+ "<param name=\"allowFullScreen\" "
									+ "value=\"true\" /> "
									+ "<param name=\"FlashVars\" "
									+ "value=\"";
	public static final String html_part2 = "\"/> "
									+ "<!--[if !IE]>--> "
									+ "<object "
									+ "type=\"application/x-shockwave-flash\" "
									+ "data=\"../flash/playback.swf\" width=\"720\" height=\"486\"> "
									+ "<param name=\"quality\" value=\"high\" />"
									+ "<param name=\"bgcolor\" "
									+ "value=\"#000000\" /> "
									+ "<param name=\"allowScriptAccess\" "
									+ "value=\"sameDomain\" /> "
									+ "<param name=\"allowFullScreen\" "
									+ "value=\"true\" /> "
									+ "<param name=\"FlashVars\" "
									+ "value=\"";
	public static final String html_part3 = "\"/> "
									+ "<!--<![endif]--> "
									+ "<!--[if gte IE 6]>--> "
									+ "<p> "
									+ "	Either scripts and active "
									+ "	content are not permitted to "
									+ "	run or Adobe Flash Player "
									+ "	version 10.2.0 or greater is "
									+ "	not installed. "
									+ " </p> "
									+ "	<!--<![endif]--> "
									+ "	<a "
									+ "	href=\"http://www.adobe.com/go/getflashplayer\"> "
									+ "	<img "
									+ "	src=\"http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif\" "
									+ "	alt=\"Get Adobe Flash Player\" /> "
									+ "	</a> "
									+ "	<!--[if !IE]>--> "
									+ "</object> "
									+ "<!--<![endif]--> "
								    + "</object> ";
}
