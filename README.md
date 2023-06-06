# Madu App 🍃

## Concept 🧐
Madu is a Mobile app that lists on a map all eco-friendly adresses such as shops, resturants etc., in order to create more ethical and engaged consumers.

## Features
* Map of Shops
* List of shops and filters
* Profile
* "Cagnotte" (Points and awards)
* Défis

## Stack choices 📦
### Libraries 📕
* [Native-base](https://nativebase.io)
* [React-native-maps](https://github.com/react-native-community/react-native-maps)
* [Google maps API](https://developers.google.com/maps/documentation)
* [React-native-geocoding](https://github.com/marlove/react-native-geocoding)


#### Why React Native?
 React Native isn't necessary better than standard Native development. But React Native's main advantage compared to Native is enabling single JavaScript codebase for 2 different platforms. Furthermore, not only is it easier to maintain the app for both platforms, but also it requires less resources.

#### Why Native-base?
 Native-base gives you the potential of building applications that run on iOS and Android using a single codebase. It eases out your development. Since NativeBase is built on top of React Native, hence with any component you can pass the style property which will be merged to the default style of that component.

#### Why React-native-maps?
 React-native-maps is Having accurate information about your users’ location is a great way to enhance the user experience. For example, you could use this data to show users what is around them, offer exclusive deals for products and services in their area, and much more. Fortunately, if you have a React application, implementing maps is a breeze using the react-native-maps library.

#### Why Google maps API?
 Google maps API is a robust tool that can be used to create a custom map, a searchable map, check-in functions, display live data synching with location, plan routes, or create a mashup just to name a few.

#### Why React-native-geocoding?
 React-native-geocoding module for React Native to transform a description of a location (i.e. street address, town name, etc.) into geographic coordinates (i.e. latitude and longitude) and vice versa. This module uses Google Maps Geocoding API and requires an API key for purposes of quota management. It saves a considerable amount of time to create a localisation.


## Project setup 🚀

### Install expo (If not installed yet)
```npm install expo-cli --global```

### Install deps

```yarn install```

### Run project
```expo start```

### Publish project
```expo publish```

## Files system
```
.
+-- _assets
|   +--fonts
|   +--images
+-- _components
|   +-- ___test__
|    	 -++ ___snapshots__
|	      -++ StyledText-test.js.snap
|	 -++ StyledText-test.js
|    +-- _atoms
|    	 +-- Callout.js
|	 +-- Cardlcons.js
|	 +-- Criterium.js
|	 +-- FilterButton.js
|	 +-- FullButton.js
|	 +-- GoBack.js
|	 +-- LeavesCount.js
|	 +-- StyledText.js
|	 +-- Tag.js
|   +-- _molecules
|        +-- Card.js
|	 +-- CardChallenges.js
|	 +-- MiniCard.js
|	 +-- ProfileThumbnail.js
|   +-- _organisms
|    	 +-- Backdrop.js
|	 +-- Entreprise.js
|	 +-- FilterView.js
|	 +-- Individuel.js
|	 +-- Recompense.js
|	 +-- Rewardinfos.js
|	 +-- RewardItem.js
|	 +-- RewwardList.js
|	 +-- Sliding.js
|	 +-- UnlockRework.js
|	 +-- UnlockedReward.js
|   +-- TabBarlcon.js
+-- _constants
|    +-- Colors.js
|    +-- Layout.js
+-- _hooks
|    +-- api.js
|    +-- auth.js
|    +-- useCachedResources.js
+-- _navigation
|    +-- BottomTabNavigator.js
|    +-- LinkingConfiguration.js
+-- _screens
|   +-- _login-subscreens
|	 +-- Login.js
|   	 +-- Signin.js
|   +-- _profile-subscreens
|        +-- ChallengesScreen.js
|    	 +-- ContentChallengesScreen.js
|	 +-- NewAddressScreen.js
|   +-- _shops-subscreens
|	 +-- ConfirmationScreen.js
|	 +-- FeedBackScreen.js
|	 +-- GreenscoreScreen.js
|	 +-- ShopInfoScreen.js
|   +-- LoginScreen.js
|   +-- MapScreen.js
|   +-- PointsScreen.js
|   +-- ProfileScreen.js
+-- _utils
|    +-- DataEntreprise.js
|    +-- DataIndividuel.js
|    +-- FirsDataRecompense.js.js
|    +-- SecondDataRecompense.js
|    +-- api.js
|    +-- challenge-api-test.json
|    +-- data.js
|    +-- map.js
|    +-- po-api-test-users.json
|    +-- poi-api-test.json
+-- App.js
```

## BDD 🧐

### Structure


## API 🧐

### Définition
An API is used to make the data or functionality of an existing application available for use by other applications. Here is who should make the notion of application programming interface clearer 😊

### Structure



#### PET

- POST

`/pet`
Add a new pet to the store
Exemple object model
  `{
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}`

-Responses 
`405 	Invalid input`

`/pet/{petId}`
Updates a pet in the store with form data

- GET 

`/pet/findByStatus`

Finds Pets by status

Multiple status values can be provided with comma separated strings

-Responses 
`200 successful operation`

`400 Invalid status value`

`/pet/{petId}`


-Responses 
`200 successful operation`

`400 	Invalid ID supplied`

`404 Pet not found` 	




- PUT

`/pet`

Update an existing pet
Pet object that needs to be added to the store

`{
  "id": 0,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}`

-Responses 

`400 Invalid ID supplied`

`404 Pet not found`

`405 Validation exception`



- DELETE

`/pet/{petId}`

Deletes a pet

-Responses 

`400 Invalid ID supplied`

`404 Pet not found`


#### STORE 

- POST

`/store/inventory`

Place an order for a pet
order placed for purchasing the pet
Example Model

`{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2020-07-09T12:00:42.460Z",
  "status": "placed",
  "complete": false
}`

-Responses 

`200 	Succesfull operation`

exemple

`{
  "id": 0,
  "petId": 0,
  "quantity": 0,
  "shipDate": "2020-07-09T12:36:48.492Z",
  "status": "placed",
  "complete": false
}`

`400  Invalid Order`

- GET

- DELETE

`/store/order/{orderId}`

Delete purchase order by ID

-Responses 

`400 	Invalid ID supplied`

`404 	Order not found`


	






