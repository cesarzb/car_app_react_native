import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Menu } from "react-native-paper"; // You can use a library like react-native-paper for Menu
import { Feather } from "@expo/vector-icons"; // Assuming you're using Expo for the vector icons
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const countries = [
    {
      code: "pl",
      name: "Polski",
      country_code: "pl",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
  ];

  return (
    <View>
      <Menu
        onDismiss={() => {
          /* Handle menu dismissal */
        }}
        anchor={
          <TouchableOpacity
            onPress={() => {
              /* Handle menu button press */
            }}
            style={{
              paddingHorizontal: 3,
              paddingLeft: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather name="globe" size={24} color="black" />
          </TouchableOpacity>
        }
      >
        {countries.map((lng) => (
          <Menu.Item
            key={lng.code}
            onPress={() => {
              /* Handle language change */
              i18n.changeLanguage(lng.code);
              // Close the menu after language change if needed
              // setMenuVisible(false);
            }}
            disabled={i18n.language === lng.code}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              {/* Replace 'fi' with your icon font library or use Image component for custom icons */}
              <Text>{lng.name}</Text>
            </TouchableOpacity>
          </Menu.Item>
        ))}
      </Menu>
    </View>
  );
}

export default LanguageSelector;
