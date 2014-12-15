// Configs
S.cfga({
	defaultToCurrentScreen: false,
	secondsBetweenRepeat: 0.1,
	checkDefaultsOnLoad: true,
	focusCheckWidthMax: 3000,
	orderScreensLeftToRight: true
});

// Monitors
var monLap = function() {
	return S.screenCount() === 1 ? '0' : '1';
};
var monTbolt = '0';

// Operations
var full = S.op('move', {
	x: 'screenOriginX',
	y: 'screenOriginY',
	width: 'screenSizeX',
	height: 'screenSizeY'
});

// Laptop
var lapFull = full.dup({ screen: monLap() });
var lapLeft = lapFull.dup({ width: 'screenSizeX/2' });
var lapRight = lapLeft.dup({ x: 'screenOriginX+(screenSizeX/2)' });
var lapCenter = lapFull.dup({
	x: 'screenOriginX+(screenSizeX*0.2)',
	y: 'screenOriginY+(screenSizeY*0.2)',
	width: 'screenSizeX*0.6',
	height: 'screenSizeY*0.6'
});
var lapLeftNarrow = lapFull.dup({ width: 'screenSizeX/3' });
var lapCenterNarrow = lapLeftNarrow.dup({ x: 'screenOriginX+(screenSizeX/3)' });
var lapRightNarrow = lapLeftNarrow.dup({ x: 'screenOriginX+(screenSizeX/3*2)' });

// Thunderbolt
var tboltFull = full.dup({ screen: monTbolt });
var tboltLeft = tboltFull.dup({ width: 'screenSizeX/2' });
var tboltRight = tboltLeft.dup({ x: 'screenOriginX+(screenSizeX/2)' });
var tboltCenter = tboltFull.dup({
	x: 'screenOriginX+(screenSizeX*0.2)',
	y: 'screenOriginY+(screenSizeY*0.2)',
	width: 'screenSizeX*0.6',
	height: 'screenSizeY*0.6'
});
var tboltLeftNarrow = tboltFull.dup({ width: 'screenSizeX/3' });
var tboltCenterNarrow = tboltLeftNarrow.dup({ x: 'screenOriginX+(screenSizeX/3)' });
var tboltRightNarrow = tboltLeftNarrow.dup({ x: 'screenOriginX+(screenSizeX/3*2)' });
var tboltLeftWide = tboltFull.dup({
	width: '1530'
});
var tboltRightWide = tboltFull.dup({
	x: 'screenSizeX-1530',
	width: '1530'
});
var tboltCenterWide = tboltFull.dup({
	x: 'screenOriginX',
	y: 'screenOriginY+(screenSizeY-768)*0.5',
	width: 'screenSizeX',
	height: '768'
});

var genBrowserHash = function( regex ) {
	return {
		operations: [function( windowObject ) {
			var title = windowObject.title();
			if (title !== undefined && title.match( regex )) {
				windowObject.doOperation( lapRight );
			} else {
				windowObject.doOperation( tboltRight );
			}
		}],
		'ignore-fail': true,
		repeat: true
	};
};

var lapFullHash = {
	operations: [lapFull],
	'ignore-fail': true,
	repeat: true
};

var lapTwitterHash = {
	operations: [lapRightNarrow],
	'ignore-fail': true,
	repeat: true
};

var tboltRightHash = {
	operations: [tboltRight],
	'ignore-fail': true,
	repeat: true
};

var tboltLeftHash = {
	operations: [tboltLeft],
	'ignore-fail': true,
	repeat: true
};

var tboltRightWideHash = {
	operations: [tboltRightWide],
	'ignore-fail': true,
	repeat: true
};

var tboltLeftWideHash = {
	operations: [tboltLeftWide],
	'ignore-fail': true,
	repeat: true
};

var tboltFullHash = {
	operations: [tboltFull],
	'ignore-fail': true,
	repeat: true
};

var tboltCenterHash = {
	operations: [tboltCenter],
	'ignore-fail': true,
	repeat: true
};

var tboltCenterWideHash = {
	operations: [tboltCenterWide],
	'ignore-fail': true,
	repeat: true
};

var tboltRightNarrowHash = {
	operations: [tboltRightNarrow],
	'ignore-fail': true,
	repeat: true
};

// 1 small monitor layout
var oneSmallMonitorLayout = S.lay('oneSmallMonitor', {
	'iTerm':			lapFullHash,
	'Sublime Text 2':	lapFullHash,
	'IntelliJ IDEA':	lapFullHash,
	'Photoshop':		lapFullHash,
	'Google Chrome':	lapFullHash,
	'Firefox':			lapFullHash,
	'Safari':			lapFullHash,
	'Spotify':			lapFullHash,
	'HipChat':			lapCenter,
	'Skype':			lapCenter,
	'Twitter':			lapTwitterHash,
	'Lightroom':		lapFullHash
});

// 1 big monitor layout
var oneBigMonitorLayout = S.lay('oneBigMonitor', {
	'iTerm':			tboltCenterHash,
	'Sublime Text 2':	tboltRightHash,
	'IntelliJ IDEA':	tboltFullHash,
	'Photoshop':		tboltFullHash,
	'Google Chrome':	tboltLeftHash,
	'Firefox':			tboltLeftHash,
	'Safari':			tboltLeftHash,
	'Spotify':			tboltCenterHash,
	'HipChat':			tboltRightNarrowHash,
	'Skype':			tboltRightNarrowHash,
	'Twitter':			tboltRightHash,
	'Lightroom':		tboltFullHash
});

// 2 monitor layout
var twoMonitorLayout = S.lay('twoMonitor', {
	'Google Chrome':	genBrowserHash(/^Facebook/),
	'Firefox':			genBrowserHash(/^Facebook/),
	'Safari':			genBrowserHash(/^Facebook/),
	'iTerm':			lapFullHash,
	'Sublime Text 2':	tboltLeftWideHash,
	'IntelliJ IDEA':	tboltRightWideHash,
	'Photoshop':		tboltFullHash,
	'Spotify':			lapFullHash,
	'HipChat':			lapCenter,
	'Skype':			lapCenter,
	'Twitter':			lapTwitterHash,
	'Lightroom':		tboltFullHash
});

// Defaults
S.def(2, twoMonitorLayout);
S.def(1, oneSmallMonitorLayout);

// Layout Operations
var twoMonitor = S.op('layout', { name: twoMonitorLayout });
var oneSmallMonitor = S.op('layout', { name: oneSmallMonitorLayout });
var oneBigMonitor = S.op('layout', { name: oneBigMonitorLayout });
var universalLayout = function() {
	// Should probably make sure the resolutions match but w/e
	S.log('SCREEN COUNT: ' + S.screenCount());
	if( S.screenCount() === 2 ) {
		twoMonitor.run();
	} else if( S.screenCount() === 1 ) {
		if( S.screen().rect().width > 1440 )
			oneBigMonitor.run();
		else
			oneSmallMonitor.run();
	}
};

S.bnda({
	// Layout Bindings
	'padEnter:ctrl':			universalLayout,
	'space:ctrl':				universalLayout,

	// LapTop Location Bindings
	'left:ctrl,alt,cmd':		lapLeft,
	'down:ctrl,alt,cmd':		lapCenter,
	'right:ctrl,alt,cmd':		lapRight,
	'up:ctrl,alt,cmd':			lapFull,

	'1:ctrl,alt,cmd':			lapLeftNarrow,
	'2:ctrl,alt,cmd':			lapCenterNarrow,
	'3:ctrl,alt,cmd':			lapRightNarrow,

	'pad4:ctrl':				lapLeft,
	'pad5:ctrl':				lapCenter,
	'pad6:ctrl':				lapRight,
	'pad+:ctrl':				lapFull,

	// Thunderbolt Location Bindings
	'pad7:alt':					tboltLeftWide,
	'pad8:alt':					tboltCenterWide,
	'pad9:alt':					tboltRightWide,
	
	'pad4:alt':					tboltLeft,
	'pad5:alt':					tboltCenter,
	'pad6:alt':					tboltRight,
	'pad+:alt':					tboltFull,

	'pad1:alt':					tboltLeftNarrow,
	'pad2:alt':					tboltCenterNarrow,
	'pad3:alt':					tboltRightNarrow,
	
	'4:ctrl,alt,cmd':			tboltLeft,
	'5:ctrl,alt,cmd':			tboltRight
});