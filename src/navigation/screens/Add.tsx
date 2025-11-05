import { Text } from "@react-navigation/elements";
import { useFocusEffect } from "@react-navigation/native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useCallback, useRef, useState } from "react";
import { Button, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";

export function Add() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [images, setImages] = useState<string[]>([]);
  const cameraRef = useRef<CameraView>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsCameraOpen(false);
      };
    }, [])
  );

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title={'grant permission'} />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setImages((prevImages) => [photo.uri, ...prevImages]);
      }
    }
  }

  if (!isCameraOpen) {
    return (
      <View style={styles.identifyContainer}>
        <TouchableOpacity style={styles.identifyButton} onPress={() => setIsCameraOpen(true)}>
          <Text style={styles.identifyButtonText}>Add Plant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.backButton} onPress={() => setIsCameraOpen(false)}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.identifyCameraButton} onPress={takePicture}>
          <Image source={require('../../assets/camera.png')} style={{width: 24, height: 24, tintColor: 'white'}} />
          <Text style={{...styles.identifyButtonText, marginLeft: 10}}>Identify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  identifyContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  headerButtons: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
  },
  backButton: {},
  toggleButton: {},
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
  },
  button: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  galleryContainer: {
    position: "absolute",
    bottom: 0,
    height: 120,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  identifyButton: {
    backgroundColor: "#2E8B57",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
  },
  identifyButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  identifyCameraButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
