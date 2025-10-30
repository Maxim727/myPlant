import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton } from "@react-navigation/elements";
import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text } from "react-native";

import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { Updates } from "./screens/Updates";
import { NotFound } from "./screens/NotFound";
import { List } from "./screens/List";
import { Diagnose } from "./screens/Diagnose";
import { Add } from "./screens/Add";

import bell from "../assets/bell.png";
import newspaper from "../assets/newspaper.png";
import add from "../assets/add.png";
import stethoscope from "../assets/stethoscope.png";
import user from "../assets/user.png";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Feed",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },

    Add: {
      screen: Add,
      options: {
        title: "Add",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={add}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },

    Diagnose: {
      screen: Diagnose,
      options: {
        title: "Diagnose",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={stethoscope}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Profile: {
      screen: List,
      options: {
        title: "Profile",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={user}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
