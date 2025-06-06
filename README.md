# Habit Tracker

- Habits can be added with a frequency pattern (daily, weekly, fortnightly and monthly) selected
- The added habits will be shown as a list
- Each habit will show the details along with the 'Mark as Complete' button and 'Delete' button. Also it shows the current streak as a progess bar
- At the bottom of the page, there will be Habit Statistics that shows total habits, habits completed today and longest streak

### Tech used

- React 19
- Typescript
- Redux Toolkit + Redux Toolkit Query
- Tanstack Form
- Zod
- Material-UI
- json-server

### Implementation Highlights

- Implemented a central store using Redux Toolkit and Redux Toolkit Query
- store the habits in local json file and gets updated using json-server

### TODOs:

- ~~store habits in the database. Example: db.json file and updating through json-Server~~
- add filter persistence while page refresh. Example: sessionStorage
- ~~edit a habit (title and frequency)~~
- ~~show a message when there are no habits~~
- ~~add a frequency filter~~
- ~~use a form library. React hook form or Tanstack form~~
- ~~use form validation. Zod~~
- any Typescript improvements
- Authentication (login, logout, user dashboard, user settings)
- Authorisation (user vs admin roles and capabilities)
- probably add a graph
- any style improvements including animations
- showing fun images based on age?
