import React from "react";
import { View, Button, TextInput, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Register: undefined;
  Categories: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, "Register">;

type Props = {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
};

const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters long")
    .required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
});

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register } = useAuth();

  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
      }}
      validationSchema={registerValidationSchema}
      onSubmit={(values) => {
        register(
          values.name,
          values.lastName,
          values.email,
          values.password,
          values.phone
        );
        navigation.navigate("Categories");
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            placeholder="Name"
          />
          {touched.name && errors.name && <Text>{errors.name}</Text>}
          <TextInput
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
            placeholder="Last Name"
          />
          {touched.lastName && errors.lastName && (
            <Text>{errors.lastName}</Text>
          )}
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text>{errors.email}</Text>}
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text>{errors.password}</Text>
          )}
          <TextInput
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
            value={values.phone}
            placeholder="Phone"
          />
          {touched.phone && errors.phone && <Text>{errors.phone}</Text>}
          <Button onPress={() => handleSubmit()} title="Register" />
        </View>
      )}
    </Formik>
  );
};

export default RegisterScreen;
