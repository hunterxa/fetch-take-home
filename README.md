# Fetch Take Home Project
[Try it out!](https://fetch.tokyrios.com)
![The Catch homepage](./images/homepage.png)
___
## About the project
For this project, I built Catch! Catch is a website to pair prospective dog owners with
shelter animals looking for a home!  
The way the site works is once a user logs in, they will be presented with a page with the
dogs that are available to be adopted. The user can filter the results and choose which
breeds of dogs they would like to see. The user can also change what order the results are
displayed in. By default, the dogs are displayed in ascending alphabetical order by breed.
The user can change the sorting behavior to also sort by the dogs' name or age. Any of these
three sorting options can be set to display in descending order as well.  
The user can add dogs to their list of favorites that they can see on the "Favorites" page.
On the "Favorites" page, the user can remove any dogs that they may have decided they would
not want to adopt and then proceed to find a match. When the user finds a match, the site
takes all of their favorited dogs and then displays to them the one they match with for
adoption.  
### Technology  
The project was built mainly in React and CSS with React Router for routing between pages.
All data is pulled from the fetch-take-home API.

## User flow
When the user loads the site, they should be greeted with a home/login page. The user should
out in a name and email to be logged in. Once the user has done this, they will be sent to
the "Dogs" page where they can browse and search through the available dogs. Under each dog
is a button that will add the dog to the user's favorites list (or remove it if the dog is
already favorited.) Once the user is satisfied with their selections, they can hit the "Find
your Catch!" button to be taken to the "Favorites" page. On the "Favorites" page the user can
remove any dogs they may have changed their mind on and then hit the "Find your Catch!" button
in the center of the screen to have their match generated for them. The user will then be
taken to a page to see the dog that they matched with for adoption.

## Building and running locally
To run or build the project, first clone the repository:  
`git clone https://github.com/hunterxa/fetch-take-home.git`  

Then run `npm install` to install the dependencies  

Then to run the project locally in a development environment:  
`npm run dev`  
  
Or to build the app and run a preview build version:  
first run: `npm run build`  
and then: `npm run preview`