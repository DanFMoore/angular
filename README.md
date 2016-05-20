## Angular example

The JavaScript files are in `app` The HTML templates are in `/views`. Both are fully commented. Since the JavaScript is compiled into file, it needs a main entry point which is `app/index.js`.

To run, first run `npm install`. Then to start the server, `npm start` and to compile the client-side JavaScript to a single file, `npm run webpack`.

The first example app is at [http://localhost:3000/](http://localhost:3000/) and uses `app/app.js` and `views/index.html`.

The second is at [http://localhost:3000/ajax](http://localhost:3000/ajax) and uses `app/ajax.js` and `views/ajax.html`.* 

The third is at [http://localhost:3000/routes](http://localhost:3000/routes) and uses `app/routes.js` and `views/routes.html`.

To test, run `npm test` and go to that URL in a browser. There is one example test, which test the `ajax` module, found in `/spec/ajaxSpec.js`. Again. this is fully commented.

One area I've not covered is directives. Every angular attribute or element such as `ng-click`, `ng-controller`, `ng-repeat` etc is a directive. You can define your own, but don't often need to. For more information see [https://docs.angularjs.org/guide/directive](https://docs.angularjs.org/guide/directive).

*`ajax.js` is the first introduction to promises, the greatest invention in JavaScript ever. If you learn nothing else, learn promises. You can also do them in jQuery; they are called `deferred`. An example - [https://api.jquery.com/deferred.then/](https://api.jquery.com/deferred.then/) - see the jQuery.get example about half way down.