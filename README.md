# Alameda Analysis
##Water Shortage Vulnerability Scores for California

### Building an interactive webpage to provide data visualizations and analysis relating to 'social vulnerability' in Alameda County, Ca. 

```
Collaborators:  Daniel Rodriguez, Luis Hernandez, Lorela Cabral, and Drew Barnhart. 
```

## Background
> The data utilized was retrieved from Ca.Gov within a section titled "California Open Data Portal." We utilized a file initially created by the California Department of Water Resources. This data was created using 2020 census geogrpahic block groups as the units of analysis. The initial goal of this data was to: "Provide a spatial representation of social and economic factors that can affect water shortage vulnerability in the state of California." The files we used were the CSV and GeoJSON files. We predominanlty focused on Alameda county. 
> 
> Source: https://data.ca.gov/dataset/i07-water-shortage-social-vulnerability-blockgroup

> File used:  https://data.ca.gov/dataset/i07-water-shortage-social-vulnerability-blockgroup/resource/1891891b-0765-4cc8-8ba5-1b9db4f7a72a?inner_span=True

## Objectives

### The objectives for this process were divided into several subsections: 

Data and Delivery
> - Create a data and delivery system incorporating a dataset with at least 100 records (ours had over 23,000!)
> - Integrate this inforamtion into a database to house the data
> - The project is powered by a Python Flask API and includes HTML/CSS, JavaScript, and the chosen database. 

Back End & Visualizations
> - The page is created to showcase data visualizations 
> - A minimum of three unique views present the data.
> - Multiple user-driven interactions


## Procedure

### Step 1. Extract and data

> -  Read the GeoJSON data within a jupyter notebook
> - Grab the data and filter the appropriate columns
>  - Generate this information within a DataFrame 
>  - Narrow down our data to only Alameda County (create a more manageable data set to work with)
>  - Create a SQLite database 
>  - Pushing inforamtion to SQLite 

### Step 2: Run flask app calling SQLite Data base (app.py)
> - Create data URL
> - Grab all the data 
> - jsonyfying all rows 
> - sneding all the information to a local host

### Step 3: HTML to call the JavaScript file 
> - index.html

### Step 4: Divide data into 2 sections 
> - One group of isolated data was used to create polygons. These Polygons created an outline of the geographic sections within Alameda County. This data contained the Latitude and longitude cordinaates (which accounted for a substantial portion of the data). 
> - The other data table we created removed the lat/long and focused mainly on other columns that were pertinent to our analysis. This mad ethe data significntly more manageble and easier to load & make alterations

### Step 5: Create the initial map 
> - Integrated a polygon layer which displayed outlines of geogrpahic information divided into townships/ranges within Alameda County. these townships/ranges were identified by a unique GeoID/identifier. 

### Step 6: Create an interactive dropdown menu
> - This dropdown menu enabled interface by allowing the user to select from a drop down list to see the information pertaining to a specific section within Alameda County. 
> - We integrated a 'hover feature' that served a simialr purpose. This feauture allowed the user to see the relevant information pertaining to each specific township/range within Alameda County. 

### Step 7: Format the polygons to represent Social Vulnerability
> - One of the columns we initially integrated into our DataFrame was that of social vulnerability. At a cursory level, this metric captured an areas susceptibility to climate or environmentally induced change and the adverse effect/impact this could have on the areas' population. 
> - a score of 1 represented the msot susceptible, While a score of 0 was the least susceptible. 
> - we created bins of .2 increments with a dark green to red color scale to make the data and polygons eaier to interpret. 
> - Red indicated an area that was most vulnerable, while green was an area that was relatively resilient. 

### Step 8: Create a Scatteplot of the entire county
> - An additional analysis we thought would be valuable was utilizing a scatterplot to compare a few sections of our data. ]
> - Our scatterplot compared th eSocial Vulnerability and Median Household Income

### Step 9: Create a Bubblechart

## Software Used:

> - Python
> - SQLite
> - HTML
> - Javascript
> - CSS
> - Jupyter Notebook
> - GitHub

### Functions used: 

> 
>
