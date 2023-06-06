import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FilterButton } from "../atoms/FilterButton";
import { SecondaryTitle, ButtonText, SimpleText, ThirdlyTitle } from "../atoms/StyledText";
import { Button, CheckBox } from "native-base";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import global from "../../Global";

export const FilterView = (props) => {
  const [activeTags, setActiveFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [typeOfShop, setTypeOfShop] = useState([]);

  useEffect(() => {
    axios
      .get(`${global.base_api_url}type-of-shop/`)
      .then((res) => setTypeOfShop(res.data.results));
  }, []);

  const onTagFilter = (type) => {
    setActiveFilters((prevState) =>
      prevState.includes(type)
        ? prevState.filter((t) => t !== type)
        : [...prevState, type]
    );
  };
  const onTypeFilter = (type) => {
    setTypeFilters((prevState) =>
      prevState.includes(type)
        ? prevState.filter((t) => t !== type)
        : [...prevState, type]
    );
  };

  const onPriceFilter = (type) => {
    setPriceFilters((prevState) =>
      prevState.includes(type)
        ? prevState.filter((t) => t !== type)
        : [...prevState, type]
    );
  };

  const onSearch = () => {
    if (activeTags || priceFilters || typeFilters) {
      const parsedTags = activeTags.map((tag) => tag.uid).join(",");
      const parsedTypes = typeFilters.map((t) => t.uid).join(",");
      axios
        .get(
          `${global.base_api_url}shop/?tag_uid__in=${parsedTags}&price_range__in=${priceFilters}&type_of_shop_uid__in=${typeFilters}`
        )
        .then((res) => props.setShops(res.data.results));
    }
    props.setModalVisible(!props.modalVisible);
  };

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableOpacity
        onPress={props.handleClose}
        style={{
          justifyContent: "flex-end",
          flexDirection: "row",
          paddingRight: 20,
          paddingBottom: 20,
        }}
      >
        <SimpleText>Terminer</SimpleText>
      </TouchableOpacity>
      <ThirdlyTitle>Populaires</ThirdlyTitle>
      <View style={styles.buttons}>
        <FilterButton
          title="Végétarien"
          imageType="veggie"
          onPress={() => onTagFilter("veggie")}
          focused={activeTags.includes("veggie")}
          filterView
        />
        <FilterButton
          title="Local"
          imageType="local"
          onPress={() => onTagFilter("local")}
          focused={activeTags.includes("local")}
          filterView
        />
        <FilterButton
          title="Vegan"
          imageType="vegan"
          onPress={() => onTagFilter("vegan")}
          focused={activeTags.includes("vegan")}
          filterView
        />
        <FilterButton
          title="Bio"
          imageType="bio"
          onPress={() => onTagFilter("bio")}
          focused={activeTags.includes("bio")}
          filterView
        />
        <FilterButton
          title="Sans gluten"
          imageType="glutenfree"
          onPress={() => onTagFilter("glutenfree")}
          focused={activeTags.includes("glutenfree")}
          filterView
        />
      </View>
      <ThirdlyTitle>Types d'établissements</ThirdlyTitle>
      <View style={styles.buttons}>
        {typeOfShop &&
          typeOfShop.map((shop, i) => (
            <Button
              style={[
                styles.shopButton,
                {
                  backgroundColor:
                    typeFilters && typeFilters.includes(shop.uid)
                      ? Colors.secondary
                      : Colors.white,
                },
              ]}
              onPress={() => onTypeFilter(shop.uid)}
              key={i}
            >
              <ButtonText
                style={[
                  styles.buttonText,
                  {
                    color:
                      typeFilters && typeFilters.includes(shop.uid)
                        ? Colors.white
                        : Colors.text,
                  },
                ]}
              >
                {shop.name}
              </ButtonText>
            </Button>
          ))}
      </View>
      <ThirdlyTitle>Budget</ThirdlyTitle>
      <View style={styles.buttons}>
        <View style={styles.checkbox}>
          <CheckBox
            checked={priceFilters && priceFilters.includes(1)}
            onPress={() => onPriceFilter(1)}
            color={Colors.secondary}
          />
          <SimpleText style={{ marginLeft: 15 }}>1€ à 15€</SimpleText>
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            checked={priceFilters && priceFilters.includes(2)}
            onPress={() => onPriceFilter(2)}
            color={Colors.secondary}
          />
          <SimpleText style={{ marginLeft: 15 }}>15€ à 30€</SimpleText>
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            checked={priceFilters && priceFilters.includes(3)}
            onPress={() => onPriceFilter(3)}
            color={Colors.secondary}
          />
          <SimpleText style={{ marginLeft: 15 }}>30€ et plus</SimpleText>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button style={styles.searchButton} onPress={() => onSearch()}>
          <ButtonText style={styles.buttonText} transform>
            Rechercher
          </ButtonText>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
    paddingTop: 50,
  },
  contentContainer: {
    justifyContent: "center",
    paddingTop: 50,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    marginTop: 10,
  },
  shopButton: {
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
  },
  searchButton: {
    marginTop: 30,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    borderRadius: 4,
    color: Colors.white,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
});
