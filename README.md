# DevTinder

- Created a Vite + React application
- Remove unnecessary code and create a hello world
- Install Tailwind CSS - npm install -D tailwindcss postcss autoprefixer npx tailwindcss init -p
- Add Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate component file
- Install react router dom
- Create BrowserRounter > Routes > Route = /Body > RouteChildren
- Create an Outlet in Body component
- Add a Footer
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configurations: origin, credentials: true
- Whenever you're making API call so pass axios => { withCredentials: true }
- Install @redux/toolkit react-redux
- Create a store => configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refractor code to add constants file + create a components folder
- npm i react-cookie
- Wrap root App inside CookiesProvider in main.jsx
- set accessToken and refreshToken
- To refresh add headers in axios headers: {
          'Authorization': `Bearer ${accessTokenValue}`
        }
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout
- Get the feed and add the feed in the store
- Build the user card on feed
- Edit Profile
- Show toast message on save of profile
- See all my connections


Body
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections
    Route=/profile => Profile