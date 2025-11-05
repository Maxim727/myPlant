import React, { useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MOCK_PLANTS = [
  {
    id: 1,
    title: "Peace Lily",
    photo: "https://picsum.photos/seed/1/400/300",
    waterNeeds: 7,
    lastWatered: 3,
    lightNeeds: "indirect",
    tempratureNeeds: 20,
    humidityNeeds: 50,
    soilType: "peat-based",
  },
  {
    id: 2,
    title: "Snake Plant",
    photo: "https://picsum.photos/seed/2/400/300",
    waterNeeds: 14,
    lastWatered: 10,
    lightNeeds: "low",
    tempratureNeeds: 22,
    humidityNeeds: 40,
    soilType: "well-draining",
  },
  {
    id: 3,
    title: "Fiddle Leaf Fig",
    photo: "https://picsum.photos/seed/3/400/300",
    waterNeeds: 10,
    lastWatered: 5,
    lightNeeds: "bright, indirect",
    tempratureNeeds: 21,
    humidityNeeds: 60,
    soilType: "well-draining",
  },
  {
    id: 4,
    title: "Monstera Deliciosa",
    photo: "https://picsum.photos/seed/4/400/300",
    waterNeeds: 7,
    lastWatered: 2,
    lightNeeds: "bright, indirect",
    tempratureNeeds: 23,
    humidityNeeds: 70,
    soilType: "peat-based",
  },
  {
    id: 5,
    title: "Pothos",
    photo: "https://picsum.photos/seed/5/400/300",
    waterNeeds: 10,
    lastWatered: 8,
    lightNeeds: "various",
    tempratureNeeds: 18,
    humidityNeeds: 50,
    soilType: "well-draining",
  },
];

export function Home() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (plant) => {
    setSelectedPlant(plant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlant(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.photo }} style={styles.photo} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_PLANTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      {selectedPlant && (
        <Modal
          animationType='slide'
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <Image source={{ uri: selectedPlant.photo }} style={styles.modalPhoto} />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <View style={styles.modalInfo}>
              <Text style={styles.modalTitle}>{selectedPlant.title}</Text>
              <Text>Water Needs: {selectedPlant.waterNeeds} days</Text>
              <Text>Last Watered: {selectedPlant.lastWatered} days ago</Text>
              <Text>Light Needs: {selectedPlant.lightNeeds}</Text>
              <Text>Temperature: {selectedPlant.tempratureNeeds}°C</Text>
              <Text>Humidity: {selectedPlant.humidityNeeds}%</Text>
              <Text>Soil Type: {selectedPlant.soilType}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    paddingBottom: 80, // To avoid being covered by the tab bar
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: 100,
  },
  title: {
    padding: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  modalPhoto: {
    width: "100%",
    height: "30%",
  },
  modalInfo: {
    padding: 20,
    gap: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
});
