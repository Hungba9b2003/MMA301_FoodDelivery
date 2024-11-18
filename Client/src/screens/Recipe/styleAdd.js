import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#333",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#4CAF50",
  },
  buttonContainer: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,

    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 50,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    marginBottom: 60,
    backgroundColor: "#FF6347",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    backgroundColor: "#FF4C4C",
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  ingredientContainer: {
    marginBottom: 10,
    backgroundColor: "#e9f5e9",
    padding: 10,
    borderRadius: 8,
  },
  stepContainer: {
    marginBottom: 10,
    backgroundColor: "#e9f5e9",
    padding: 10,
    borderRadius: 8,
  },
});
