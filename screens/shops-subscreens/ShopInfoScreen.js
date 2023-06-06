import React, { useState, useEffect, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import axios from "axios";
import global from "../../Global";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Title,
  ItalicText,
  SimpleText,
  SecondaryTitle,
  SecondaryText,
  ButtonText,
} from "../../components/atoms/StyledText";
import { API_URL } from "../../utils/api";
import shops from "../../utils/poi-api-test.json";
import { Button, Subtitle, Spinner } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Tag } from "../../components/atoms/Tag";
import { Criterium } from "../../components/atoms/Criterium";
import { FullButton } from "../../components/atoms/FullButton";
import { getLocation, geocodeLocationByName } from "../../utils/map";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { MiniCard } from "../../components/molecules/MiniCard";
import Colors from "../../constants/Colors";
import { LeavesCount } from "../../components/atoms/LeavesCount";
import { SuggestionIcon } from "../../components/atoms/CardIcons";

export default function ShopInfoScreen({ route, navigation }) {
  navigation.setOptions({ headerShown: false });
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [selectedShops, setSelectedShops] = useState(null);
  const [criteria, setCriteria] = useState(null);
  const index = route.params.id;

  const ref = useRef(null);

  useScrollToTop(ref);

  useEffect(() => {
    if (index) {
      axios
        .get(`${global.base_api_url}shop/${index}/`)
        .then((res) => setData(res.data));
    }
    ref.current.scrollTo({ top: 0, left: 0, animated: true });
  }, [index]);

  useEffect(() => {
    if (data) {
      const address = `${data.address}, ${data.zipcode}, ${data.city}`;
      Geocoder.from(address)
        .then((json) => {
          setLocation({
            latitude: json.results[0].geometry.location.lat,
            longitude: json.results[0].geometry.location.lng,
          });
        })
        .catch((error) => console.warn(error));

      axios
        .get(`${global.base_api_url}shop/`)
        .then((res) =>
          setSelectedShops(
            res.data.results.filter((s) => s.uid !== index).slice(0, 2)
          )
        );

      if (data.greenscore) {
        async function fetchCriteria() {
          const cleanArray = Object.values(data.greenscore).slice(1);
          const slicedArray = Object.keys(data.greenscore).slice(1);
          const result = cleanArray.slice(1).map((g, i) => {
            return { ...g, greenUid: slicedArray[i] };
          });
          result.forEach(async (uid) => {
            await axios
              .get(`${global.base_api_url}greenscore-criteria/${uid.greenUid}/`)
              .then((res) =>
                setCriteria((prevState) => [
                  ...prevState,
                  {
                    ...uid,
                    name: res.data.name,
                  },
                ])
              );
          });
        }
        fetchCriteria();
      }
    }
  }, [data]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ref={ref}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()} light style={styles.back}>
          <Ionicons name="md-arrow-round-back" size={20} />
        </Button>
        {data && data.image ? (
          <Image
            source={
              data.image
                ? { uri: data.image }
                : require("../../assets/images/abattoirveg.jpg")
            }
            style={{
              flex: 1,
              width: null,
              height: 200,
              resizeMode: "cover",
            }}
          />
        ) : (
          <Spinner color={Colors.secondary} />
        )}
      </View>

      <View style={styles.infosContainer}>
        {data ? (
          <>
            <View style={styles.rate}>
              <View>{<LeavesCount rate={data.greenscore.value} />}</View>
              <View>
                <SuggestionIcon
                  suggestionRate={data.ratings}
                  color={Colors.secondary}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <SecondaryTitle style={{ textAlign: "center" }} fontSize={20}>
                {data.name}
              </SecondaryTitle>
            </View>
            <ItalicText style={{ textAlign: "center", marginBottom: 20 }}>
              {data.address}
            </ItalicText>
            <SimpleText>{data.description}</SimpleText>
            <View style={[styles.tagsContainer, { marginBottom: 50 }]}>
              {data.tags.map((tag, idx) => (
                <Tag title={tag.name} key={idx} />
              ))}
            </View>
            <SecondaryTitle
              style={{ textAlign: "center", marginBottom: 30 }}
              fontSize={20}
            >
              Critères de sélection
            </SecondaryTitle>
            <View style={styles.criteria}>
              {criteria &&
                criteria
                  .slice(1)
                  .map((criterium) => (
                    <Criterium
                      title={criterium.name}
                      imageType={criterium.name}
                      score={criterium.value}
                      key={criterium.greenUid}
                    />
                  ))}
            </View>
            <View>
              <SecondaryTitle
                style={{ textAlign: "center", marginBottom: 10 }}
                fontSize={20}
              >
                Horaires:
              </SecondaryTitle>
              <SimpleText style={{ textAlign: "center" }} color={Colors.grey}>
                {data.hours}
              </SimpleText>
              {location && (
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.00922,
                      longitudeDelta: 0.00421,
                    }}
                  >
                    <Marker coordinate={location} />
                  </MapView>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginBottom: 50,
                marginTop: 50,
              }}
            >
              <SecondaryTitle
                style={{ textAlign: "center", marginBottom: 10 }}
                fontSize={20}
              >
                veux tu exprimer ton avis ?
              </SecondaryTitle>

              <Button
                style={styles.searchButton}
                onPress={() => navigation.navigate("Feedback", { id: index })}
              >
                <ButtonText style={styles.buttonText} transform>
                  Donner mon avis
                </ButtonText>
              </Button>
            </View>
            <SecondaryTitle
              style={{ textAlign: "center", marginBottom: 10 }}
              fontSize={20}
            ></SecondaryTitle>
            <View style={styles.miniCards}>
              {selectedShops &&
                selectedShops.map((shop, idx) => (
                  <MiniCard
                    key={idx}
                    id={shop.uid}
                    name={shop.name}
                    address={shop.address}
                    greenscore={shop.greenscore.value}
                    suggestionRate={shop.ratings ? shop.ratings : null}
                    tags={shop.tags}
                    image={shop.image}
                  />
                ))}
            </View>
            <View>
              {data.website ? (
                <View>
                  <FullButton
                    title="Site Internet"
                    onPress={() =>
                      data.website ? Linking.openURL(data.website) : null
                    }
                  />
                </View>
              ) : null}
              <FullButton
                title="Donner mon avis"
                onPress={() => navigation.navigate("Feedback", { shop: data })}
              />
              <FullButton
                title="Remettre en question le greenscore"
                onPress={() =>
                  navigation.navigate("Greenscore", { shop: data })
                }
              />
            </View>
          </>
        ) : (
          <Spinner color={Colors.secondary} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    justifyContent: "center",
  },
  header: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: 250,
    position: "relative",
  },
  back: {
    position: "absolute",
    top: 20,
    left: 10,
    padding: 20,
  },
  infosContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    padding: 20,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "transparent",
    marginTop: -20,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    marginTop: 20,
    width: Dimensions.get("window").width,
  },
  back: {
    position: "absolute",
    top: 20,
    left: 10,
    width: 55,
    padding: 20,
    zIndex: 399,
  },
  criteria: {
    width: Dimensions.get("window").width,
    marginBottom: 30,
    paddingRight: 20,
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: 200,
    marginLeft: -20,
    marginBottom: 30,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: 200,
  },
  rate: {
    width: Dimensions.get("window").width,
    left: -40,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  searchButton: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    width: 198,
    left: 62,
  },
  buttonText: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    color: Colors.white,
  },
  miniCards: {
    flexDirection: "row",
    marginBottom: 30,
  },
});
