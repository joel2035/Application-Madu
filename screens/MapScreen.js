import React, { useState, useEffect } from "react";
import axios from "axios";
import global from "../Global";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Title, SimpleText } from "../components/atoms/StyledText";
import MapView, { Marker, Callout } from "react-native-maps";
import { getLocation } from "../utils/map";
import { MapBackDrop } from "../components/organisms/Backdrop";
import Geocoder from "react-native-geocoding";
import { useNavigation } from "@react-navigation/native";
import { MapCallout } from "../components/atoms/Callout";
import ShopInfoScreen from "./shops-subscreens/ShopInfoScreen";
import GreenscoreScreen from "./shops-subscreens/GreenscoreScreen";
import ConfirmationScreen from "./shops-subscreens/ConfirmationScreen";
import FeedbackScreen from "./shops-subscreens/FeedbackScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// MAP SCREEN

const Map = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [shops, setShops] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    getLocation().then((data) => {
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      });
    });
    async function getShops() {
      await axios
        .get(`${global.base_api_url}shop/`)
        .then((res) => setShops(res.data.results));
    }
    getShops();
  }, [null]);
  useEffect(() => {
    if (shops) {
      async function fetchAddress() {
        shops.forEach(async (shop) => {
          const address = `${shop.address}, ${shop.zipcode}, ${shop.city}`;
          await Geocoder.from(address)
            .then((json) => {
              setMarkers((prevState) => [
                ...prevState,
                {
                  ...shop,
                  latitude: json.results[0].geometry.location.lat,
                  longitude: json.results[0].geometry.location.lng,
                },
              ]);
            })
            .catch((error) => console.warn(error));
        });
      }

      setVisibleCards(
        shops.map((marker) => ({ id: marker.id, visible: false }))
      );
      fetchAddress();
    }
  }, [shops]);

  const handleCardVisibility = (idx) =>
    setVisibleCards(
      visibleCards.map((card) => {
        if (idx === card.id) {
          if (card.visible) {
            return { id: card.id, visible: false };
          } else {
            return { id: card.id, visible: true };
          }
        }
        return card;
      })
    );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={location}
        onPress={() => setVisible(false)}
        provider="google"
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
        moveOnMarkerPress={false}
        showsUserLocation={true}
        showsCompass={true}
        showsPointsOfInterest={false}
      >
        {markers &&
          markers
            .filter((marker) => marker !== null)
            .map((marker, idx) => (
              <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                name={marker.name}
                key={idx}
                stopPropagation={true}
                onPress={() => handleCardVisibility(marker.id)}
                onSelect={() => handleCardVisibility(marker.id)}
                onCalloutPress={() =>
                  navigation.navigate("Shop", { id: marker.id })
                }
                image={require("../assets/images/pin.png")}
                calloutVisible={
                  visibleCards[marker.id] &&
                  visibleCards[marker.id].visible &&
                  visibleCards
                }
              >
                <MapCallout
                  id={marker.id}
                  name={marker.name}
                  address={marker.address}
                  tags={marker.tags}
                  price={marker.price}
                  accessibility={marker.accessibility}
                  suggestionRate={marker.suggestionRate}
                  image={marker.image}
                  mapCard
                  onPress={() =>
                    navigation.navigate("Shop", { id: marker.uid })
                  }
                />
              </Marker>
            ))}
      </MapView>
      <MapBackDrop visible={visible} onFocus={() => setVisible(!visible)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 30,
  },
  mapStyle: {
    flex: 1,
  },
  markerContainer: {
    flex: 1,
    flexDirection: "column",
  },
  closePlateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
  },
  closePlate: {
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#bdbdbd",
  },
});

export default function MapScreen() {
  const PointsStack = createStackNavigator();
  return (
    <PointsStack.Navigator>
      <PointsStack.Screen name="Map" component={Map} />
      <PointsStack.Screen name="Shop" component={ShopInfoScreen} />
      <PointsStack.Screen name="Greenscore" component={GreenscoreScreen} />
      <PointsStack.Screen name="Confirmation" component={ConfirmationScreen} />
      <PointsStack.Screen name="Feedback" component={FeedbackScreen} />
    </PointsStack.Navigator>
  );
}
