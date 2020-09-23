# MyGamestocks #
<img width="300" height="250" src="https://mygamestocks.com/resources/logo.png">

## About MyGamestocks
MyGamestocks is Web Application for video game collectors, enthusiasts or anyone who wants to track their video game collection. With MyGamestock, users can add to their their collections, track the value of their collections, and see how the value of their collection stacks up to other users. Click <a href="https://mygamestocks.com/">HERE</a> to start your collection! 

This Application was built by a team of eight Full Stack Software Engineers from the Hack Reactor, Austin, 50th Cohort (HRATX50).

## Visit the Website and interact!
<a href="https://mygamestocks.com/">MyGameStocks.com</a>


## Demo 1
![Gamestock](https://github.com/hratx-blue-ocean/Gamestock/blob/master/Demo1.gif)

## Demo 2
![Gamestock](https://github.com/hratx-blue-ocean/Gamestock/blob/master/Demo2.gif)

## Demo 3
![Gamestock](https://github.com/hratx-blue-ocean/Gamestock/blob/master/Demo3.gif)


## Dev Team

  * [Mariella Arias]: 
  * [Andrew Binkard]: Tasked with developing and implementing the user profile component of this web app, used React functional components exclusively and managed state with hooks to dynamically render individual item records, utilized styled components for a consistent all-around look and visual user experience, created a user-friendly front-end interface to allow for efficient interaction with users’ collections, implemented RESTful API routes through a Node.js/Express server and PostgreSQL queries to allow for fast, consistent, sorting to support the above front-end functionality, and implemented pagination natively with JavaScript without the use of an external dependency in order to keep the app lightweight
  * [Danielle Blom]: UX Design Lead - Created wireframes, researched/implemented eBay API routes, and funtionality to save items to the database
  * [Steven Brotherton]: Architect Lead - Compared and ultimately decided on the tech stack and git workflow used on this project. Created SOPs for team consistency and partnered with Mariella Arias on building out the authoriation of the site implementing Bcrypt and JSON Web Tokens to ensure user permissions without bulking up the database with extra salt or session cookie columns. Organized a class and subclass system of database query implementation to seperate concerns and enhance code readability. Had a hand in each component as system architect working to eliminate any connection issues or bugs. Finally, deployed the site to https://mygamestocks.com.
  * [Mike Champagne]: Project Manager
  * [Rahul Chauhan]: 
  * [Belle Nguyen]: 
  * [Ryan Walker]: 

## Client Deliverables

* As a user, I want to be able to add items to my collection
* As a user, I want to be able to view items in my collection and the total value of my collection
* As a user, I want to be able print my collection
* As a user, I want to be able to view other user's collections
* As a user, I want to be able to view a leaderboard of collections with the highest values
* As a user, I want to be able to see how the value of an item in my collection changes over time
* As a user, I want to be able to sort the leaderboard by different characteristics

## Tech Stack 
*MyGamestocks* was built primarily with ReactJS on the front end and Node/Express on the backend. Other key technologies used are listed below: 

### Technologies

<table style="width:50%">
  <tr>
    <td class="subheading">Frontend</td>
    <td><a href="https://reactjs.org/">React</a></td>
    <td><a href="https://reactrouter.com/">React Router</a></td>
    <td><a href="https://styled-components.com/">styled-components</a></td>
  </tr>
  <tr rowspan="2">
    <td class="subheading">Backend</td>
    <td><a href="http://nodejs.org">Node</a></td> 
    <td><a href="http://expressjs.com">Express</a></td>
    <td><a href="https://www.postgresql.org/">Postgres</a></td>
  </tr>
  <tr>
      <td class="subheading">Dev Tools</td>
      <td><a href="https://webpack.js.org/">Webpack</a></td>
      <td><a href="https://babeljs.io/">Babel</a></td>
    </tr>
  <tr>
    <td class="subheading">APIs</td>
    <td><a href="https://www.pricecharting.com/">PriceCharting</a></td>
    <td><a href="https://www.npmjs.com/package/ebay-node-api">Ebay API Node.js</a></td>
  </tr>
  <tr>
      <td class="authentication">Authentication</td>
      <td><a href="https://www.npmjs.com/package/bcrypt">bcrypt</a></td>
      <td><a href="https://jwt.io/">Json Web Token</a></td>
    </tr>
</table>

### Installation
Install the dependencies and devDependencies and start the server.

```sh
$ cd Gamestock
Generate an eBay API access token and save the token in a file called eBay.config.js
Generate a jws token and save it in the .env file
$ npm run start
$ npm run build
Go to localhost:7711/
```

### Workflow
Our team managed workflow and responsibilities by utilizing Agile methodology. Trello was used to to keep track of tickets. With git feature branch workflow, our team ensured that the master branch always contained working code. Developers created feature branches off the development branch, then merged into development upon completion of that feature after approval of the pull request.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [Mariella Arias]: <https://github.com/Mariella-Arias>
   [Andrew Binkard]: <https://github.com/andrewbinkard>
   [Danielle Blom]: <https://github.com/dlblom>
   [Steven Brotherton]: <https://github.com/SMbrobot10>
   [Mike Champagne]: <https://github.com/GeauxDrum>
   [Rahul Chauhan]: <https://github.com/RahulJung>
   [Belle Nguyen]: <https://github.com/BelleNg>
   [Ryan Walker]: <https://github.com/jryanwalker93>

