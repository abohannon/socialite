![Dual](https://raw.githubusercontent.com/abohannon/socialite/develop/screenshots/dual.jpg) 

# Socialite
> Mobile social coordination prototype built with React Native and Firebase

Demo: https://expo.io/@abo46n2/react-native-socialite


## Stack
React, Redux, Firebase, React Native Elements, React Native Router Flux, Location API


## Installing / Getting started

To clone the repo and install dependencies:

```shell
clone https://github.com/abohannon/socialite.git
cd socialite/
npm install
```

To get the development environment up and running, you'll first need to signup for an Expo account install the Expo XDE if you prefer a GUI: https://expo.io/tools

Using Expo Client:

1. Open Expo XDE
2. Select 'Open existing project...'
3. Find and select the cloned project folder
4. Once the project has initialized, click 'Device' and select your preferred simulator

Using Expo CLI:

1. `npm install -d exp` to install expo globally
2. `exp login` to login
3. `ios [project-dir]` to open project in Expo and in an iOs simulator
or
3. `android [project-dir]` to open project in Expo and in an Android simulator

You'll also need a unique Yelp Fusion API key which you can get here: https://www.yelp.com/developers/documentation/v3/get_started

Once you've obtained your unique API key, add the following to `config/index.js` in the root dir:

`export const YELP_API_KEY = 'API KEY STRING'`


### Building

To build the project, select 'Publish' in the Expo XDE dashboard.


### Testing

Currently no testing has been implemented. This is something planned for future versions.


## Features

* User can signup and login to an authenticated view
* User can immediately see places nearby their current latitude and longitude
* User can see relevant information about places nearby
* User can search places that are in proximity to their current location and the results will display in real-time
* User can call a place by tapping the phone number listed on the card
* User can RSVP to any place that appears
* User can see how many other people have also RSVP'd
* User can see their current RSVP'd places in their 'My Places' view
* User can easily remove their RSVP from a place and the place will subsequently be removed from their 'My Places' view

![Login](https://raw.githubusercontent.com/abohannon/socialite/develop/screenshots/login.png)  

![Signup](https://raw.githubusercontent.com/abohannon/socialite/develop/screenshots/signup.png)  

![Nearby](https://raw.githubusercontent.com/abohannon/socialite/develop/screenshots/nearby.png) 

![Search](https://raw.githubusercontent.com/abohannon/socialite/develop/screenshots/coffee.png)

![My Places](https://raw.githubusercontent.com/abohannon/socialite/develop/screenshots/myplaces.png) 


## Future Considerations and Open Thoughts

This app is a starting point for a more robust experience. Future features to include are:

* Ability to view, by username, which users are also attending the same place
* Friend/Follow functionality
* Ability to receive push notifications when a friend RSVPs to the same place
* Archive or calendar or past places you visited
* Ability to sort/search places by category
* User authentication needs to be included in a single component; currently, both Login and Signup forms are separate components with a lot of duplicated code.


## Contributing

If you find this project helpful as a starting point for your own project, please feel free to clone. If you are interested in submitting improvements, PRs are welcome!


## Links

- Repository: https://github.com/abohannon/socialite
- Issue tracker: https://github.com/abohannon/socialite/issues
  - In case of sensitive bugs like security vulnerabilities, please contact
    abo46n2@gmail.com directly instead of using issue tracker. I value your effort
    to improve the security and privacy of this project!
    

## Licensing

The code in this project is licensed under MIT license.
