# rubik

## Deployed Link
  -- https://chances-rubik-cube.herokuapp.com/

## Hey hey, another Rubik Cube Game!
  -- I am sure there is a nice NPM library out there that wraps up all the math and logic to make this work, but why not do it the long way?
  
## Version
  -- Current Version 0.2.0
  
## Current Status
  -- Two Dimensional layout
  -- White can be Rotated Clockwise
  -- Green can be Rotated Clockwise
  -- Reset Button resets the Cube in the database.
  
## How to Start
  -- With Postgres, create a database for the app to intereact with
  -- Create a .env file at the root of this repository
    -- It needs to have a key of DATABASE_URL=<your postgres url>/<name of database you created for this project>
    -- Optionally, you can add a key of PORT=<Your favorite local port number>
  -- In your terminal, run `npm install`
  -- In your terminal, run `psql -d <database name> -f schema.sql`
    -- This will create all of the tables that are currently used in the database, it returns a solved cube by default
  -- In your terminal run `node server.js`
    -- You should see a console log in your terminal confirming the server is listening
  -- In your favorite web browser navigate to your local host
  
  
