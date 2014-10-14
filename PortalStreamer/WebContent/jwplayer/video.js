/**
 * video.js
 * @author Sumner Warren <sumner_warren@brown.edu>
 * @date April 25, 2011
 *
 * A script which generates a video player for a video file hosted on Brown's Wowza server.
 */

/**
 * Configures settings for the player
 * 
 * @param params, an object with the following properties:
 *        Required:
 *          id: id attribute of the element which will contain the video player (must already exist on the page)
 *          folder: folder where the video file resides on the Wowza server
 *          file: name of the video file on the Wowza server
 *        Optional:
 *          wrapper_id: id attribute of the wrapper element for the player (defaults to brown-jw-video-player)
 *          image: URL of the poster image
 *          logo: URL of the logo image (defaults to /sites/default/themes/ursa/img/brown-logo.png)
 *          controlbar: where to the dock should be located (defaults to 'over')
 *          dock: whether or not plugin buttons should be placed in the dock (defaults to false)
 *          duration: duration of the video, in seconds (defaults to zero - only for display purposes)
 *          player_width: width of the player in pixels (if supported), an integer (defaults to 800)
 *          player_height: height of the player in pixels (if supported), an integer (defaults to (480)
 *          player: URL of the flast player (defaults to brown.edu/media/jwplayer-5.6/player.swf)
 *          server: fully-qualified domain of the Wowza server (defaults to mediastream2.brown.edu/media)
 *          buffer: number of seconds to load before allowing playback (for Flash only, defaults to 2)
 *          use_captions: whether or not to use captions plugin (defaults to false)
 *          captions_file: file containing captions (only valid if captions is true)
 *          captions_state: intial state of captions (defaults to true)
 *          use_gapro: whether or not to use google analytics plugin (default to false)
 *          gapro_id: google analytics account id (only valid if gapro is true)
 *          gapro_bridgemode: whether or not to use google analytics in bridgemode (defaults to false)
 *
 *   We need to add support for playlist functionality as well. I'll work on this hopefully later today.
 */
function configurePlayer(params) {
    
    valid_params = true;
    if (!params) 
        valid_params = false;
    
    if (!params.id)
        valid_params = false;
    
    if (!params.folder)
        valid_params = false;
    
    if (!params.file)
        valid_params = false;
    
    if (!valid_params) {
        // Invalid parameters, so bail out.
        if (window.console != undefined) {
            console.log("decidePlayer() requries an argument, none was provided.");
        }
		return false;
    }
    
    // Set up some defaults if values are not provided
    if (!params.wrapper_id)
        params.wrapper_id = "jw-video-player";
		
    if (!params.logo)
        params.logo = "http://www.brown.edu/sites/default/themes/ursa/img/brown-logo.png";
		
    if (!params.controlbar)
        params.controlbar = "over";
		
    if (!params.dock)
        params.dock = false;
		
    if (!params.duration)
        params.duration = 0;
    
    if (!params.player_width)
        params.player_width = 800;
    
    if (!params.player_height)
        params.player_height = 480;
    
    if (!params.player)
        params.player = "/jwplayer/jwplayer.flash.swf";
    
    if (!params.server)
        params.server = "mediastream2.brown.edu/media";
    
    if (!params.buffer)
        params.buffer = 2;
    
    if (!params.use_captions)
        params.use_captions = false;
    
    if (!params.captions_file)
        params.use_captions = false;
    
    if (!params.captions_state)
        params.captions_state = true;
    
    if (!params.use_gapro)
        params.use_gapro = true;
    
    if (!params.gapro_id)
        params.gapro_id = "UA-69450-1";
    
    if (!params.gapro_bridgemode)
        params.gapro_bridgemode = true;
    
    // Get the element which will contain the player.
    if (document.getElementById(params.id)) {
        var e = document.createElement('div');
        e.id = params.wrapper_id;
        document.getElementById(params.id).appendChild(e);
        params.container = e;
    }
    else {
        // There is not a valid element to contain the player, so bail out.
        if (window.console != undefined) {
            console.log("Invalid HTML element to contain player.");
        }
        return false;
    }
    
    if (params.folder.lastIndexOf('/') != params.folder.length - 1)
        params.folder += '/'
    
    jw_player(params);
	
}

/**
 * Creates an instance of the JW Player, first trying Flash, then HTML5, and a download link if both fail
 * 
 * @param params, object with the following properties:
 *        container: element which will contain the player
 *        wrapper_id: id attribute of the wrapper element
 *        image: URL of the poster image
 *        logo: URL of the logo image (defaults to Brown logo)
 *        controlbar: where the dock should be located
 *        dock: whether or not plugin controls are shown in dock
 *        duration: duration of the video, in seconds (defaults to zero)
 *        player_width: width of the player
 *        player_height: height of the player
 *        player: URL of the flash player
 *        server: fully-qualified domain of Wowza server
 *        folder: folder where the video file lives on Wowza server
 *        file: name of the video file on Wowza server
 *        buffer: number of seconds to load before allowing playback (for Flash only, defaults to 2)
 *        use_captions: whether or not to use captions plugin (defaults to false)
 *        captions_file: file containing captions (only valid if captions is true)
 *        captions_state: intial state of captions (defaults to true)
 *        use_gapro: whether or not to use google analytics plugin (default to false)
 *        gapro_id: google analytics account id (only valid if gapro is true)
 *        gapro_bridgemode: whether or not to use google analytics in bridgemode (defaults to false)
 */
function jw_player(params) {
    
    var settings = {};
    settings['id'] = params.container.id + '2';
    settings['file'] = params.folder + params.file;
    settings['provider'] = 'rtmp';
    settings['streamer'] = 'rtmp://' + params.server;
    settings['controlbar'] = params.controlbar;
    settings['dock'] = params.dock;
    settings['duration'] = params.duration;
    settings['stretching'] = 'fill';
    if (params.image != undefined)
        settings['image'] = params.image;
    settings['logo.file'] = params.logo;
    settings['width'] = params.player_width;
    settings['height'] = params.player_height;
    settings['buffer'] = params.buffer;
    var fallback = 'http://' + params.server + '/_definst_/' + params.folder + 'mp4:' + params.file + '/playlist.m3u8';
    settings['modes'] = [
        { 'type': 'flash', 'src': params.player },
        { 'type': 'html5', 'config': { 'provider': 'http', 'file': fallback } }
    ],
    plugins = {};
    if (params.use_captions)
        plugins['captions'] = { 'file': params.captions_file, 'state': params.captions_state };
    if (params.use_gapro) {
        plugins['gapro'] = { 'accountid': params.gapro_id };
        if (params.gapro_bridgemode) {
            plugins['gapro']['trackingmode'] = 'bridge';
            plugins['gapro']['bridgeobject'] = window.pageTracker;
        }
    }
    settings['plugins'] = plugins;
    jwplayer(params.container.id).setup(settings);
	
}