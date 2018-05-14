# d3 Cars dataset visualization

This visualization aims to study and understand the relationships between the different attributes of a car. The plots only use a subset of 12 of the 26 variables. These are the variables that I personally consider most important after doing a statistical PCA and MCA.

## Plots

This visualization uses a Parallel Coordinates Plot as the main plot and then three secondary plots: two donuts and one data table (SlickGrid library). All these plots all linked and synchronized. Any modification in any plot is translated to the others.

## Exploration

I provide many tools to explore the data. Try hovering the donuts, or the data table. Brush the parallel coordinates plot or sort the table!

## Data

The data used in this example is contained in the folder assets/data in .csv format and can be found [here] (http://archive.ics.uci.edu/ml/datasets/Automobile) 

## Advice

For any reason D3 does not work well with Chrome and CORS origin so if you want to try it, is better to use Firefox.

## Example

![Example of the visualization](https://github.com/mtrebi/d3_cars/blob/master/example_vis.png)
