---
layout : post
title : Image Compression Application
desc : <div class="tag">Pascal</div><div class="tag">Machine Learning</div></br> This is application let you do k-means algorithm on image, the image after processing will have exactly K number of colors. The file size will be decreased dramatically.
img : ../public/post-assets/ImageCompression/title.gif
---
<div class="tag">Pascal</div><div class="tag">Machine Learning</div>
This blog post is an extension to [my previous post on K-means algorithm](https://dunglai.github.io/2017/06/01/k-means/). We will use K-means clustering method to find $$k$$ dominent colors of an image. Each pixel of an image is represented as a 3 dimensional vector (containing RGB value) where the previous blog post visualize k-means on 2D vector (points on 2D plane).
**Content:**
<!-- MarkdownTOC depth=3 -->

- [1. Introduction](#1-introduction)
- [2. Main functions](#2-main-functions)
- [3. Demo Video](#3-demo-video)
- [4. Algorithm Recap](#4-algorithm-recap)
	- [4.1. K-means on 3-dimensional space](#41-k-means-on-3-dimensional-space)
	- [4.2. Represent data in array format](#42-represent-data-in-array-format)
- [5. Source Code and PDF report](#5-source-code-and-pdf-report)

<!-- /MarkdownTOC -->
<a name="1-introduction"></a>
## 1. Introduction
This blog is an extra section of the previous blog [K-Means Clustering with Visualization tool](https://dunglai.github.io/2017/06/01/k-means/) that i wrote.

Let's see a quick demo of the program, the main function of the program is:
<a name="2-main-functions"></a>
## 2. Main functions
**Input:**
1. **Image** (filename of image)
2. **K** (integer, number of color we want after compressing)

**Output:** New image which contains K colors
<div class="imgcap">
<img style="display: inline-block; width: 100%;" src ="/public/post-assets/ImageCompression/demo.png" width = "500" align = "center">
<div class="thecap">Left image (1000KB) - Righ image (10KB)<br></div>
</div>
<a name="3-demo-video"></a>
## 3. Demo Video
<embed class="video" width="1600" height="400" style="width: 100%" src="/public/post-assets/ImageCompression/demo.mp4" scale="aspect" controller="true">
<div class="thecap">Demo video</div>
<a name="4-algorithm-recap"></a>
## 4. Algorithm Recap
<a name="41-k-means-on-3-dimensional-space"></a>
### 4.1. K-means on 3-dimensional space
Let me briefly explain the algorithm that I use in this program.

According to the previous blog [K-Means Clustering with Visualization tool](https://dunglai.github.io/2017/06/01/k-means/). K-means algorithm is able to put data into group/ or cluster. In the visualization tool, each data is a point on a plane, each point has 2 properties, namely x-axis location and y-axis location. In this image compression application, each data point is one pixel of the image, each data point (pixel) has 3 properties, namely, Red color, Green color and Blue color density (RGB color). Each red, green and blue density will have a value ranging from 0-255. 

When data is points on plane, all data points are put in a 2-dimensional space. In the case of image compression application, each data is a point on a 3-dimensional space, our goal here is to cluster all these points. For example, if we have a 100x100 resolution image, we have 10000 pixels in total, they will be 10000 points on a 3-dimensional space.
<a name="42-represent-data-in-array-format"></a>
### 4.2. Represent data in array format
The way I choose to represent a pixel in array format is below:
```pascal
img[x][y][RGB]
```
```
img: the image we store, Img will be a 3-dimensional array.
[x]: x-location (if we have a 20x30 image, x will range from 0 to 19)
[y]: y-location (if we have a 20x30 image, y will range from 0 to 29)
[RGB]: Red, green and blue channel. RGB will have 3 value: 0, 1 and 2 corresponding to Red, Green and Blue
```
*Example:* 
img[1][2][0]: The Red channel value of pixel in the location 1 (x-axis) and 2 (y-axis).
<a name="5-source-code-and-pdf-report"></a>
## 5. Source Code and PDF report
**Source Code:**
```pascal
type	
// type used for application  
	RGB 				= array[0..2] of Single;			// x-axis 	// store red, green and blue of an image
	CollumnPixels 		= array of RGB;						// y-axis, rowPixels
	imgArray 			= array of CollumnPixels;			// 3-dimensional array used to store red, green, blue color of each pixel in an image 
	IntArray			= array of Integer;					// label

	SingleColorArray	= array of Color;					// 1 dimensional array used to store color
	ColorArray 			= array of SingleColorArray;		// 2 dimensional array used to store color
// typed used for Visualization
	PointsRecord = Record
		x    : Single;										// x-axit on panel
		y    : Single;										// y-axit on panel
		idx  : Integer; 									// store label of each point, instead of create another array or enumeration to store it
	end;

	PointsArray = array of PointsRecord; 					// Store all the points on panel and the init points

// Setlength to 3-dimen array
procedure AddSize(var Img: ImgArray; row: Integer; col: Integer);
var
	i: Integer;
begin
	SetLength(Img, row);
	for i:=0 to row-1 do
	begin
		SetLength(Img[i], col);
	end;
end;

//return 3-dimensional array
function ReadImage(var filename: String): ImgArray;
var
	userBmp: Bitmap;
	row, col: Integer;
	i,j: Integer;
	c: Color;
begin
	WriteLn('Reading in image... Please wait...');

	userBmp := BitmapNamed(filename);

	row := BitmapHeight(userBmp);
	col := BitmapWidth(userBmp);

	AddSize(result, row, col);

	for i:=0 to row-1 do
	begin
		for j:=0 to col-1 do
		begin
			c := GetPixel(userBmp, j, i);
			result[i][j][0] := RedOf(c);
			result[i][j][1] := GreenOf(c);
			result[i][j][2] := BlueOf(c);
		end;
	end;
end;

//return width*height x 3, put all pixel into one array
function Reshape(var img: ImgArray): CollumnPixels; 
var
	row, col: Integer;
	i,j,rgb: Integer;
begin
	row := Length(img);
	col := Length(img[0]);

	SetLength(result, row*col);

	for i:=0 to col-1 do
	begin
		for j:=0 to row-1 do
		begin
			for rgb:=0 to 2 do
			begin
				result[i*row+j][rgb] := img[j][i][rgb]; 
			end;
		end;
	end;
	WriteLn('Reading in image successfully!');
end;

//return 3-dimensional array from two dimensional array
function InverseReshape(var imgSingle: CollumnPixels; row: Integer; col: Integer): ImgArray;
var
	i, j, rgb: Integer;
begin
	//SetLength to 3 dimensional matrix aka the result of the function according to row, col
	SetLength(result, row);
	for i:=0 to row-1 do
	begin
		Setlength(result[i], col);
	end;

	//Processing inverse reshape function
	for i:=0 to col-1 do
	begin
		for j:=0 to row-1 do
		begin
			for rgb:=0 to 2 do
			begin
				result[j][i][rgb] := imgSingle[i*row+j][rgb]; 
			end;
		end;
	end;
end;

//use random color later
function RandomInitColors(var colorNum: Integer): CollumnPixels;
var 
	c: Color;
	i: Integer;
begin
	SetLength(result, colorNum);
	for i:=0 to colorNum-1 do
	begin
		c := RandomColor();
		result[i][0] := RedOf(c);
		result[i][1] := GreenOf(c);
		result[i][2] := BlueOf(c);
	end;
end;

//return label for each pixels (form 0 to clusterNumber-1)
function ReadLabels(var imgSingle: CollumnPixels; initColor: CollumnPixels): IntArray;
var
	i,j,rgb: Integer;
	imgRow, initRow: Integer;
	distance, min: single;
begin
	imgRow := Length(imgSingle);
	initRow := Length(initColor);

	SetLength(result, imgRow);

	for i:=0 to imgRow-1 do
	begin
		// a random value that is big enough so that first distance value is always smaller than min
		min := 3*256*256;
		//loop through each pixels to calculate minimum distance
		for j:=0 to initRow-1 do
		begin
			distance := 0;
			// calculate distance in euculide space
			for rgb:=0 to 2 do
			begin
				distance += sqr(imgSingle[i][rgb]-initColor[j][rgb]);
			end;

			if (distance < min) then
			begin
				min := distance;
				result[i] := j;
			end;
		end;
	end;
end;

//calculate the in each cluster then return a vector contain the sum of these cluster
function SumInCluster(var imgSingle: CollumnPixels; idx: IntArray; clusterNum: Integer): CollumnPixels;
var
	i, rgb, lengthIdx: Integer;
begin
	Setlength(result, clusterNum);

	//assign initial value 
	for i:=0 to clusterNum-1 do
	begin
		for rgb:=0 to 2 do
		begin
			result[i][rgb] := 0;
		end;
	end;

	//cal total sum
	lengthIdx := Length(idx);
	for i:=0 to lengthIdx-1 do
	begin
		for rgb:=0 to 2 do
		begin
			result[idx[i]][rgb] += imgSingle[i][rgb];
		end;
	end;
end;

//return num_k
function CountCluster(var imgSingle: CollumnPixels; idx: IntArray; clusterNum: Integer): IntArray;
var
	i, rgb, lengthIdx: Integer;
begin
	Setlength(result, clusterNum);

	//assign initial value 
	for i:=0 to clusterNum-1 do
	begin
		for rgb:=0 to 2 do
		begin
			result[i] := 0;
		end;
	end;

	//check iteration of cluster 
	lengthIdx := Length(idx);
	for i:=0 to lengthIdx-1 do
	begin
		result[idx[i]] += 1;
	end;
end;

//assign new value to cluster after calculating the mean
procedure ReassignCluster(var initialColors: CollumnPixels; sum_k: CollumnPixels; num_k: IntArray);
var
	i, rgb: Integer;
begin
	for i:=0 to Length(initialColors)-1 do
	begin
		for rgb:=0 to 2 do
		begin
			if num_k[i] = 0 then
				initialColors[i][rgb] := 0
			else
				initialColors[i][rgb] := sum_k[i][rgb] / num_k[i];
		end;
	end;
end;

//return the imgSingle (all pixels in one row) after doing the algorithm
procedure AssignLabelToPixel(var imgSingle: CollumnPixels; idx: IntArray; finalCentroids: CollumnPixels);
var
	i, rgb: Integer;
begin
	for i:=0 to High(imgSingle) do
	begin
		for rgb :=0 to 2 do
		begin
			imgSingle[i][rgb] := finalCentroids[idx[i]][rgb];
		end;
	end;
end;

//return final centroids
function KMeansOnPixel(var img: ImgArray; clusterNum: Integer; iter: Integer; initialColors: CollumnPixels): ImgArray;
var
	//initialColors: CollumnPixels; //initial random colors 
	imgSingle: CollumnPixels; //2-dimensional array after reshape 3 dimensional array 
	num_k: IntArray; //  clusterNumx3
	sum_k: array of RGB; // sum off all pixel in same cluster  clusterNumx3
	i: Integer;
	idx: IntArray; // The label of each pixel (size = size(imgSingle)); value range from 0 to clusterNum-1
	row, col: Integer;
begin
	//convert to 2 dimensional array
	imgSingle := Reshape(img);

	row := Length(img);
	col := Length(img[0]);

	initialColors := RandomInitColors(clusterNum);

	WriteLn('...Running k means....');
	for i:=0 to iter-1 do
	begin
		//label of each picxel
		idx := ReadLabels(imgSingle, initialColors);

		//caculate means
		sum_k := SumInCluster(imgSingle, idx, clusterNum);
		num_k := CountCluster(imgSingle, idx, clusterNum);

		ReassignCluster(initialColors, sum_k, num_k);

		WriteLn('K-Means iteration '+ IntToStr(i+1) + '/' + IntToStr(iter) + '...');
	end;

	//reassign imgSingle
	AssignLabelToPixel(imgSingle, idx, initialColors);
	result := InverseReshape(imgSingle, row, col);
end;

//convert 3 dimensional RGB value to 2 dimensional type color
function RGBToColor(var img: ImgArray): ColorArray;
var
	row, col: Integer;
	i,j: Integer;
begin
	row := Length(img);
	col := Length(img[0]);

	//SetLength for colorarray (row and col size of imgArray);
	Setlength(result, row);
	for i:=0 to row-1 do
	begin
		Setlength(result[i], col);
	end;

	//begin converting using RGBFloatColor (swinGame API)
	for i:=0 to row-1 do
	begin
		for j:=0 to col-1 do
		begin
			result[i][j] := RGBFloatColor(img[i][j][0]/255, img[i][j][1]/255, img[i][j][2]/255);
		end;
	end;
end;

//pass by value function. Use this type to modify the bmp without changing the original one, in other way, we create a copy of the bitmap
function MatrixToBitmap(img: ImgArray): Bitmap;
var
	i, j: Integer;
	row, col: Integer;
	colorArr: ColorArray;
begin
	row := Length(img);
	col := Length(img[0]);

	result := CreateBitMap(col, row);
	colorArr := RGBToColor(img);

	for i:=0 to row-1 do
	begin
		for j:=0 to col-1 do 
		begin
			PutPixel(result, colorArr[i][j], j, i);
		end;
	end;
end;

//main funcion of the application
function KMeans(var filename: String; var clusterNum: Integer; var iter: Integer): Bitmap;
var
	img: ImgArray;	//3 dimensional array of image
	imgKMeans: ImgArray;
	initialColors: CollumnPixels;
	bmpOriginal: Bitmap;
begin
	// Return 3-dimen array
	img := ReadImage(filename);
	bmpOriginal := BitmapNamed(filename);

	initialColors := RandomInitColors(clusterNum);

	imgKMeans := KMeansOnPixel(img, clusterNum, iter, initialColors);

	result := MatrixToBitmap(imgKMeans);
end;
```
[Download PDF Report](/public/post-assets/Kmeans/Report.pdf)

Full Source Code: https://github.com/DungLai/Image-Compression-Segmentation