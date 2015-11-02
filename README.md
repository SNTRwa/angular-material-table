# Angular material table

Angular matarial table is simply directive that allows you with no effort make good looking table in Google Material style. For now it supports:

  - Sorting for choosen columns.
  - Pagination
  - Searching through whole data set

### Dependencies

That directive needs two dependencies to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Angular Material] - The Angular Material project is an implementation of Material Design in Angular.js.

### Installing via bower

```
bower install angular-material-table
```

### Example

Live demo is available here: [codepen](http://codepen.io/sntr/pen/wKxJvq), check also how data structure looks like.

### Configuration options

Directive provide few configuration options via attributes:

  Table name:
  ```
  table-name = "Your data table name"
  ```
  Data for your table (array of objects):
  ```
  data = "Your data table name"
  ```
  Columns data (array of objects):
  ```
  columns = "Your table columns"
  ```
  Show search (false/true) default false:
  ```
  show-search="true"
  ```
  Page size for pagination purpose, if empty there is no pagination:
  ```
  page-size="10"
  ```
  Is loaded should be helpful if table wait for data. It has some fade in animation when data is finally delivered. Takes true/false.
  ```
 is-loaded="loaded"
  ```

### Todos

 - Write Tests

License
----
MIT

### Version
0.1.0
