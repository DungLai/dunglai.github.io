---
layout : post
title : Mapping MySQL to MongoDB
desc : <div class="tag">MongoDB</div><div class="tag">JSON</div></br>Mapping fundamental querry and concept of relational MySQL database (structured data) to MongoDB (un-structured data)
img  : ../public/post-assets/MongoDBmapping/title.png
---
**Content:**
<!-- MarkdownTOC depth=5 -->

- [1. Introduction](#1-introduction)
- [2. Mapping Tables, Rows, Columns](#2-mapping-tables-rows-columns)
	- [2.1. Quick SQL review](#21-quick-sql-review)
	- [2.2. Collection](#22-collection)
	- [2.3. Dynamic Schema](#23-dynamic-schema)
- [3. Mapping Join and Relationships](#3-mapping-join-and-relationships)
	- [3.1. Quick SQL review](#31-quick-sql-review)
- [4. Linking Documents and Embedding Documents](#4-linking-documents-and-embedding-documents)
	- [4.1. Linking Documents](#41-linking-documents)
	- [4.2. Embedding Documents](#42-embedding-documents)
- [5. Mapping Query](#5-mapping-query)
	- [5.1. Create](#51-create)
	- [5.2. Insert](#52-insert)
	- [5.3. Read](#53-read)
		- [5.3.1. Read All Data](#531-read-all-data)
		- [5.3.2. Read specific data in collection](#532-read-specific-data-in-collection)
		- [5.3.3. Read data with condition](#533-read-data-with-condition)
		- [5.3.4. Read auto generate ID](#534-read-auto-generate-id)
		- [5.3.5. Read specific data with condition](#535-read-specific-data-with-condition)
		- [5.3.6. Logical Operator](#536-logical-operator)
		- [5.3.7. Sort](#537-sort)
		- [5.3.8. Limit display output data](#538-limit-display-output-data)
	- [5.4. Update](#54-update)
	- [5.5. Remove](#55-remove)
- [6. Conclusion](#6-conclusion)

<!-- /MarkdownTOC -->

*Abstract*

NoSQL database are becoming a fundamental role of the database landscape nowadays, first version released in 2007, at that time, MySQL, an open-source relational database management system (RDBMS) has been developed extensively for more than 10 years. NoSQL has a handful of advantages including lower cost, easier scalability and open sources features. However, NoSQL is still a relatively young technology, making it difficult for  IT engineer and student to learn.

<a name="1-introduction"></a>
## 1. Introduction
With the less constrained structure, scalable schema design of NoSQL and faster access compared to traditional RDBMS. Coming from an SQL background, it could be challenging and time-consuming to map database management concept from SQL to NoSQL. This report will go through fundamental concept of MongoDB functionality, terms and simple query syntax. The difference of this report is that we assume that you have basic knowledge of SQL, and everything from this report will be built and map based on that knowledge you have on SQL.

<a name="2-mapping-tables-rows-columns"></a>
## 2. Mapping Tables, Rows, Columns
<a name="21-quick-sql-review"></a>
### 2.1. Quick SQL review
In SQL databse, tables are objects that are being managed, all data or information of objects and database are stored in tables. Table contains column (a set of data values of a particular type) and row (attribute type and their value). The columns provide the structure according to which the rows are composed.
<a name="22-collection"></a>
### 2.2. Collection
Each database in MongoDB consists of collections which are equivalent to an RDBMS database consisting of SQL tables.
Collection stores data in the form of documents which is equivalent to tables storing data in rows.

| SQL    | NoSQL          |
|-------------------------|
| Table  | Collection     |
| Column | JSON structure |
| Row    | Field          |

<div class="imgcap">
	<img style="display: inline-block; width: 50%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/collection.png" width = "500" align = "center">
</div>
The document above is equivalent to a row in RDBMS, a collection contains multiple document above. This document use JSON format, it consists of key value pairs.

Notice that the field above has a unique id. It is considered as primary key when comparing to MySQL.
<div class="imgcap">
	<img style="display: inline-block; width: 100%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/collection_mapping.PNG" width = "500" align = "center">
	<div class="thecap">Fig.1: Mapping table to collection</div>
</div>
<a name="23-dynamic-schema"></a>
### 2.3. Dynamic Schema
In NoSQL, documents within a collection can have different schema. The fields in MongoDB can be easily added, removed and modified. For example, typical documents have 4 fields, like students have name, class, gender and date of birth, now, it is possible to create a student that have name, faculty and parent details. The number of fields as well as structure can be different. There is no constraint on data types of the fields. This functionality to use dynamic schema allows us to generate dynamic documents at run time.

For instance, consider the following two documents inside the same collection but having different schemas (Fig 2):
<div class="imgcap">
	<img style="display: inline-block; width: 100%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/dynamicshema.png" width = "500" align = "center">
	<div class="thecap">Fig.2: Dynamic schema example</div>
</div>
The first document contains the fields address and dob which are not present in the second document while the second document contains fields gender and occupation which are not present in the first one. Imagine if we would have designed this thing in SQL, we would have kept four extra columns for address, dob, gender and occupation, some of which would store empty (or null) values, and hence occupying unnecessary space.

This model of dynamic schema is the reason why NoSQL databases are highly scalable in terms of design. Various complex schemas (hierarchical, tree-structured, etc) which would require number of RDBMS tables can be designed efficiently using such documents. A typical example would be to store user posts, their likes, comments and other associated information in the form of documents. An SQL implementation for the same would ideally have separate tables for storing posts, comments and likes while a MongoDB document can store all these information in a single document.
<a name="3-mapping-join-and-relationships"></a>
## 3. Mapping Join and Relationships
<a name="31-quick-sql-review"></a>
### 3.1. Quick SQL review
Relationships in RDBMS are achieved using primary and foreign key relationships and querying those using joins. There is no such straightforward mapping in MongoDB but the relationships here are designed using embedded and linking documents.
<div class="imgcap">
	<img style="display: inline-block; width: 55%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/pfkf.PNG" width = "500" align = "center">
	<div class="thecap">Fig.3: Relation in SQL</div>
</div>
<a name="4-linking-documents-and-embedding-documents"></a>
## 4. Linking Documents and Embedding Documents
<a name="41-linking-documents"></a>
### 4.1. Linking Documents
Linking documents is a method in which multiple collections are created with some similar fields both collection, these similar fields are equivalent to foreign key in SQL.
<div class="imgcap">
	<img style="display: inline-block; width: 55%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/linkingdocuments.PNG" width = "500" align = "center">
	<div class="thecap">Fig.4: Linking Document in NoSQL</div>
</div>
The user id field in our document in Fig 4 is simply a field that holds some data and all the logic associated with it has to be implemented by us. For example, even if you will insert some user id in the contact information document that does not exist in the user information collection, MongoDB is not going to throw any error saying that corresponding user id was not found in the user information collection(unlike SQL where this would be an invalid foreign key constraint).
<a name="42-embedding-documents"></a>
### 4.2. Embedding Documents
Embedding documents mean instead of creating separate collections as we did in Linking Document, we will try to merge every information into one collection. The fields that are being copied from one collection to another collection will be extended in only one collection.
<div class="imgcap">
	<img style="display: inline-block; width: 55%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/embeddeddocuments.PNG" width = "500" align = "center">
	<div class="thecap">Fig.5: Embedded Documents  in NoSQL</div>
</div>
In the above example, we have embedded a small document of contact information inside the user information. In the similar manner, large complex documents and hierarchical data can be embedded like this to relate entities.
<a name="5-mapping-query"></a>
## 5. Mapping Query
In this section, we will translate all fundamental query from MySQL to MongoDB along with example in syntax.
Let's start with a brief on terminology and concepts:

| SQL         | NoSQL                      |
|-------------|----------------------------|
| database    | database                   |
| table       | collection                 |
| row         | document or JSON document  |
| column      | field                      |
| index       | index                      |
| table joins | lookup, embedded documents |
| primary key | primary key                |
| aggregation | aggregation pipeline       |

<a name="51-create"></a>
### 5.1. Create
In MongoDB, it is not possible and not necessary to define the structure of a collection as we normally did in MySQL (create table, naming column, define data type). MongoDB use JSON format which is an unstructured format to store data.\\
The structure of the document is automatically created when the first insert occurs in the collection. However, you can create an empty collection using createCollection command.

<div class="imgcap">
	<img style="display: inline-block; width: 40%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/createsql.PNG" width = "500" align = "center">
	<div class="thecap">Fig.6: Create table in SQL</div>
</div>
In MongoDB, we can only create an empty collection:```db.createCollection("posts")```
<a name="52-insert"></a>
### 5.2. Insert
<div class="imgcap">
	<img style="display: inline-block; width: 35%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/insertsql.PNG" width = "500" align = "center">
	<div class="thecap">Fig.7: Insert data in SQL</div>
</div>
Data in NoSQL has JSON format, we can either insert the JSON file to collection or insert key-value pair into collection:
```db.people.insert({ userid: "bcd001", age: 45, status: "A" })```
**Note**: We can create a new field for id. However, The inserted document will contain the auto generated id field.
<a name="53-read"></a>
### 5.3. Read
<a name="531-read-all-data"></a>
#### 5.3.1. Read All Data
MongoDB uses the find method which is equivalent to the SELECT command in SQL. The following statements simply read all the documents from the posts collection.
<div class="imgcap">
	<img style="display: inline-block; width: 40%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/read1.PNG" width = "500" align = "center">
	<div class="thecap">Fig.8: Read all data</div>
</div>
<a name="532-read-specific-data-in-collection"></a>
#### 5.3.2. Read specific data in collection
The following query fetches specific columns, post text  and post likes count as specified in the second set of braces ```{}```. We mark the value as 1 in the second bracket to include the field in the output.
<div class="imgcap">
	<img style="display: inline-block; width: 55%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/read2.PNG" width = "500" align = "center">
	<div class="thecap">Fig.9: Read specific data</div>
</div>
<a name="533-read-data-with-condition"></a>
#### 5.3.3. Read data with condition
The following query does a conditional search for documents having username field as mark. All the criteria for fetching the documents have to be placed in the first braces ```{}``` separated by commas.
<div class="imgcap">
	<img style="display: inline-block; width: 55%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/read3.PNG" width = "500" align = "center">
	<div class="thecap">Fig.10: Read data with condition</div>
</div>
<a name="534-read-auto-generate-id"></a>
#### 5.3.4. Read auto generate ID
In MongoDB, every time we input new data, one specific id will be auto generated and this id will be displayed by all read commands that we described above. Set id to 0 to disable showing id with find command.
```db.posts.find({},{posttext:1,postlikescount:1,id:0})```
<a name="535-read-specific-data-with-condition"></a>
#### 5.3.5. Read specific data with condition
<div class="imgcap">
	<img style="display: inline-block; width: 70%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/read4.PNG" width = "500" align = "center">
	<div class="thecap">Fig.11: Read specific data with condition</div>
</div>
<a name="536-logical-operator"></a>
#### 5.3.6. Logical Operator
We will examine how to do an ```OR``` operator in MongoDB, same syntax applied to other logical operators.
<div class="imgcap">
	<img style="display: inline-block; width: 40%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/orsql.PNG" width = "500" align = "center">
	<div class="thecap">Fig.12: Logical operator OR in MySQL</div>
</div>
In MongoDB, we use the following command: 
```db.posts.find({\$or:[{username:'mark'},{postprivacy: 'public'}]},{posttext:1,postlikescount:1})```
<a name="537-sort"></a>
#### 5.3.7. Sort
Next, we will use the sort method which sorts the result in ascending order of postlikescount(indicated by 1).
<div class="imgcap">
	<img style="display: inline-block; width: 35%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/sortsql.PNG" width = "500" align = "center">
	<div class="thecap">Fig.13: Sort in MySQL</div>
</div>
```db.posts.find({username:"mark"}).sort({postlikescount:1})```
To sort the results in descending order,  we specify -1 as the value of the field.
```db.posts.find({username:"mark"}).sort({postlikescount:-1})```
<a name="538-limit-display-output-data"></a>
#### 5.3.8. Limit display output data
To limit the number of documents to be returned, we use the limit method specifying the number of documents.
<div class="imgcap">
	<img style="display: inline-block; width: 45%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/Limit.PNG" width = "500" align = "center">
	<div class="thecap">Fig.14: Limit number of output data being displayed</div>
</div>
<a name="54-update"></a>
### 5.4. Update
The first parameter to the update method specifies the criteria to select the documents. The second parameter specifies the actual update operation to be performed. For example, the following query selects all the documents with username as mark and sets their postprivacy as private.

One difference here is that by default, MongoDB update query updates only one (and the first matched) document. To update all the matching documents we have to provide a third parameter specifying multi as true indicating that we want to update multiple documents.
```db.posts.update({username:"mark"},{\$set:{postprivacy:"private"\\}},{multi:true})```
<div class="imgcap">
	<img style="display: inline-block; width: 40%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/updatesql.PNG" width = "500" align = "center">
	<div class="thecap">Fig.15: Update in SQL</div>
</div>
<a name="55-remove"></a>
### 5.5. Remove
<div class="imgcap">
	<img style="display: inline-block; width: 55%;" src ="/public/post-assets/MongoDBmapping/ReportLatex/remove.PNG" width = "500" align = "center">
	<div class="thecap">Fig.16: Remove comparison</div>
</div>
<a name="6-conclusion"></a>
## 6. Conclusion
This report has shown you fundamental concept of MongoDB, most of the core concepts in term of data management are similar to MySQL. Upon this report, reader should try out more complex queries such as map reduce in order to gain more knowledge of NoSQL.\\
Attached to this report is an example where the author of this report convert an University database in SQL to NoSQL. Reader can check out that report for further details.

[**Download Report**](dunglai.github.io/public/post-assets/MongoDBmapping/report latex/bare_conf.pdf)

*Reference*
1. https://docs.microsoft.com/en-us/sql/relational-databases/tables/primary-and-foreign-key-constraints

2. https://www.javatpoint.com/mongodb-history

3. https://code.tutsplus.com/articles/mapping-relational-databases-and-sql-to-mongodb--net-35650

4. https://docs.mongodb.com/manual/reference/sql-comparison/

5. https://docs.microsoft.com/en-us/sql/relational-databases/tables/create-foreign-key-relationships