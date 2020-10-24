# rubik

## Deployed Link
  -- https://chances-rubik-cube.herokuapp.com/

## Hey hey, another  Online Rubik Cube!
  -- I am sure there is a nice NPM library out there that wraps up all the math and logic to make this work, but why not do it the long way?
  
## Version
  -- Current Version 0.6.1
  
## Current Status
  -- Two Dimensional layout<br>
  -- White can be Rotated Clockwise<br>
  -- Green can be Rotated Clockwise<br>
  -- Red can be Rotated Clockwise<br>
  -- Yellow can be Rotated Clockwise<br>
  -- Orange can be Rotated Clockwise<br>
  -- Blue can be Rotated Clockwise<br>
  -- Reset Button resets the Cube in the database<br>
  
## How to Start
  -- With Postgres, create a database for the app to intereact with<br>
  -- Create a .env file at the root of this repository<br>
  -- It needs to have a key of DATABASE_URL=your postgres url/name of database you created for this project<br>
  -- Optionally, you can add a key of PORT=Your favorite local port number<br>
  -- In your terminal, run `npm install`<br>
  -- In your terminal, run `psql -d <database name> -f schema.sql`<br>
  -- This will create all of the tables that are currently used in the database, it returns a solved cube by default<br>
  -- In your terminal run `node server.js`<br>
  -- You should see a console log in your terminal confirming the server is listening<br>
  -- In your favorite web browser navigate to your local host<br>
  
## Current Tickets
  -- Create Counter Clockwise Function without using .reverse() method.<br>
  -- Streamline the SQL statements. Either narrowing the promise chain down to a clean Promise.all, or combining the current statements to cut down on the amount of querys to the database.<br>
  -- Get a random cube! Right now it currently defaults to a solved cube on load. It retains the moves you make via SQL, but you would have to purposely get yourself lost in a cube to begin to properly solve it.<br>
  -- Users. Incorporate the ability to bring up your current cube at any location, keep track of how many solves, possibly also a timer for high score purposes.<br>
  -- Add option for 180 degree turns.<br>
  -- Eventually this needs to become a cube, not just a big grid that takes imagination and a lot of familiarity of a physical cube to figure out what all is happening as the moves are made.<br>
 
  
  
