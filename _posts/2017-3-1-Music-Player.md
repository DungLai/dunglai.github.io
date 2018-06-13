---
layout : post
title :	Music Player with GUI
desc : <div class="tag">Pascal</div></br> Music player application with GUI, able to add track, change song, select album, see album and song description. 
img  : ../public/post-assets/MusicPlayer/title.png
---
<div class="tag">Pascal</div>
**Content:**
<!-- MarkdownTOC depth=3 -->

<!-- /MarkdownTOC -->
Music player application with GUI, able to add track, change song, select album, see album and song description

Compiler: [Free Pascal Compiler](https://www.freepascal.org/)

Graphical API: [swinGame API](http://www.swingame.com/)

[Download Full code](https://github.com/DungLai/Music-Player)

<embed class="video" width="1600" height="400" style="width: 100%" src="/public/post-assets/MusicPlayer/demo.mp4" scale="aspect" controller="true">
<div class="thecap">Demo video</div>
```pascal
program GameMain;
uses TerminalUserInput, Sysutils, ShellApi, Strings, SwinGame, sgTypes;
type
	Album = record
		albumName: String;
		artistName: String;
		trackNames: array of String;
		fileLocations: array of String;
	end;
var	
	AlbumData: array of Album;
	titles: array[0..3] of String;
	paused: Boolean;
	currentTrack: Integer;
	albumChoice: Integer;

procedure FillNowPlaying();
begin
	FillRectangle(ColorBlack,670 ,60, 150, 150);
end;

procedure LoadData();
var	
	albumDataLengthTxt, albumNameTxt, artistNameTxt, trackNamesAndFileLocationTxt: TextFile;
	i, j, numberOfAlbum, trackLength: Integer;
begin
	//load number of album:	
	AssignFile(albumDataLengthTxt, PathToResource('AlbumDataLengthTxt.dat'));
	Reset(albumDataLengthTxt);
	ReadLn(albumDataLengthTxt, numberOfAlbum);
	SetLength(AlbumData, numberOfAlbum);
	Close(albumDataLengthTxt);

	//load album name
	AssignFile(albumNameTxt, PathToResource('AlbumNameTxt.dat'));
	Reset(albumNameTxt);
	for i:=0 to High(AlbumData) do
		ReadLn(albumNameTxt, AlbumData[i].albumName);
	Close(albumNameTxt);

	//load artist name
	AssignFile(artistNameTxt,PathToResource('ArtistNameTxt.dat'));
	Reset(artistNameTxt);
	for i:=0 to High(AlbumData) do
		ReadLn(artistNameTxt, AlbumData[i].artistName);
	Close(artistNameTxt);

	
	//load trackNames and fileLocations (also length of tracks)
	AssignFile(trackNamesAndFileLocationTxt, PathToResource('TrackNamesAndFileLocationTxt.dat'));
	Reset(trackNamesAndFileLocationTxt);
		//first line is number of tracks (max=15)
	for i:=0 to High(AlbumData) do
	begin
		ReadLn(trackNamesAndFileLocationTxt, trackLength);
		SetLength(AlbumData[i].trackNames, trackLength);
		SetLength(AlbumData[i].fileLocations, trackLength);
		for j:=0 to High(AlbumData[i].trackNames) do
		begin
			ReadLn(trackNamesAndFileLocationTxt, AlbumData[i].trackNames[j]);
			ReadLn(trackNamesAndFileLocationTxt, AlbumData[i].fileLocations[j]);
		end;
	end;
	Close(trackNamesAndFileLocationTxt);
end;

function ButtonClicked(X1, Y1, X2, Y2: Single): Boolean;
var
	X, Y, SumX, SumY: Single;
begin
	X := MouseX();
	Y := MouseY();
	SumX := X1 + X2;
	SumY := Y1 + Y2;
	result := false;
	if MouseClicked(LeftButton) then
	begin
		if (X >= X1) and (X <= SumX) and (Y >=Y1) and (Y <= SumY) then
		begin
			result := true;
		end;
	end;
end;

procedure LoadResources();
var 
	i, j: Integer;
begin
	LoadBitmapNamed('album1', 'album1.png');		
	LoadBitmapNamed('album2', 'album2.png');
	LoadBitmapNamed('album3', 'album3.png');
	LoadBitmapNamed('album4', 'album4.png');
	for i:=0 to High(AlbumData) do
	begin
		for j:=0 to High(AlbumData[i].fileLocations) do
			LoadMusic(AlbumData[i].fileLocations[j]);
	end;
end;	

procedure DrawAlbumArtWork();		
begin
	DrawBitMap('album1', 20, 20);
	DrawBitMap('album2', 20, 310);
	DrawBitMap('album3', 320, 20);
	DrawBitMap('album4', 320, 310);		
	RefreshScreen(60);
end;

procedure CreateTitles();
var 
	i: Integer;
begin
	for i:=0 to 3 do
		titles[i] := AlbumData[i].albumName + ' - ' + AlbumData[i].artistName;
end;

procedure SongChoose(i: Integer); //i is album index
begin
	if ButtonClicked(620, 60, 50, 10) then
	begin
		StopMusic();
		PlayMusic(AlbumData[i].fileLocations[0]);
		RefreshScreen(60);
		FillNowPlaying();
		if i=0 then currentTrack := 1;
		if i=1 then currentTrack := 4;
		if i=2 then currentTrack := 6;
		if i=3 then currentTrack := 8;
	end;

	if ButtonClicked(620, 100, 50, 13) then
	begin
		StopMusic();
		PlayMusic(AlbumData[i].fileLocations[1]);
		FillNowPlaying();
		RefreshScreen(60);
		if i=0 then currentTrack := 2;
		if i=1 then currentTrack := 5;
		if i=2 then currentTrack := 7;
		if i=3 then currentTrack := 9;
	end;

	if i=0 then
	begin
		if ButtonClicked(620, 140, 50, 13) then
		begin
			StopMusic();
			PlayMusic(AlbumData[i].fileLocations[2]);
			FillNowPlaying();
			RefreshScreen(60);
			if i=0 then currentTrack := 3;
		end;
	end;
end;

procedure DisplayAlbum1(); //display album name and artist
begin
	DrawText(titles[0], ColorWhite,  620, 20);
	DrawText(AlbumData[0].trackNames[0], ColorWhite, 620, 60);
	DrawText(AlbumData[0].trackNames[1], ColorWhite, 620, 100);
	DrawText(AlbumData[0].trackNames[2], ColorWhite, 620, 140);
end;

procedure DisplayAlbum2();
begin
	DrawText(titles[1], ColorWhite,  620, 20);
	DrawText(AlbumData[1].trackNames[0], ColorWhite, 620, 60);
	DrawText(AlbumData[1].trackNames[1], ColorWhite, 620, 100);
end;	

procedure DisplayAlbum3();
begin
	DrawText(titles[2], ColorWhite,  620, 20);
	DrawText(AlbumData[2].trackNames[0], ColorWhite, 620, 60);
	DrawText(AlbumData[2].trackNames[1], ColorWhite, 620, 100);
end;

procedure DisplayAlbum4();
begin
	DrawText(titles[3], ColorWhite,  620, 20);
	DrawText(AlbumData[3].trackNames[0], ColorWhite, 620, 60);
	DrawText(AlbumData[3].trackNames[1], ColorWhite, 620, 100);
end;


procedure SpaceButton();
begin
	if (KeyTyped(VK_SPACE)) then
	begin
		if paused = false then
		begin
			PauseMusic();
			paused := true;
		end

		else
		begin
			ResumeMusic();
			paused := false;
		end;
	end;
end;

procedure AlbumChoose();
begin
	if albumChoice=1 then 
	begin
		DisplayAlbum1();
		SongChoose(0);
		if currentTrack = 1 then
			DrawText('(Now playing)', ColorWhite, 670, 60);
		if currentTrack = 2 then
			DrawText('(Now playing)', ColorWhite, 670, 100);
		if currentTrack = 3 then 
			DrawText('(Now playing)', ColorWhite, 670, 140);
	end;
	if albumChoice=2 then 
	begin
		DisplayAlbum2();
		SongChoose(1);
		if currentTrack = 4 then
			DrawText('(Now playing)', ColorWhite, 670, 60);
		if currentTrack = 5 then
			DrawText('(Now playing)', ColorWhite, 670, 100);	
	end;
	if albumChoice=3 then
	begin;
		DisplayAlbum3();
		SongChoose(2);
		if currentTrack = 6 then
			DrawText('(Now playing)', ColorWhite, 670, 60);
		if currentTrack =7 then
		 	DrawText('(Now playing)', ColorWhite, 670, 100);
	end;
	if albumChoice=4 then
	begin
		DisplayAlbum4();
		SongChoose(3);
		if currentTrack = 8 then
			DrawText('(Now playing)', ColorWhite, 670, 60);
		if currentTrack = 9 then
		 	DrawText('(Now playing)', ColorWhite, 670, 100);
	end;
end;

procedure Main();
begin
	OpenGraphicsWindow('GUI music player', 800, 600);
	// ShowSwinGameSplashScreen();		
	LoadResources();
	LoadData();
	ClearScreen(ColorBlack);
	DrawAlbumArtWork();
	CreateTitles();
	RefreshScreen(60);

	paused := false;
	repeat // The game loop...
		ProcessEvents();
		SpaceButton();		
		if ButtonClicked(20, 20, 280, 270) then
		begin
			ClearScreen(ColorBlack);
			albumChoice := 1;
			DrawAlbumArtWork();
		end;
		if ButtonClicked(20, 310, 280, 270) then
		begin
			ClearScreen(ColorBlack);
			albumChoice := 2;
			DrawAlbumArtWork();
		end;

		if ButtonClicked(320, 20, 280, 270) then
		begin
			ClearScreen(ColorBlack);
			albumChoice := 3;
			DrawAlbumArtWork();
		end;

		if ButtonClicked(320, 310, 280, 270) then
		begin
			ClearScreen(colorBlack);
			albumChoice := 4;
			DrawAlbumArtWork();
		end;

		AlbumChoose();
		DrawFramerate(0,0);

		RefreshScreen(60);	
	until 
		WindowCloseRequested();
end;


begin
	Main();
end.
```