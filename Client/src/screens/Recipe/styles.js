import { StyleSheet, Dimensions } from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  carouselContainer: {
    minHeight: 250,
  },
  carousel: {
    flexGrow: 0,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    width: viewportWidth - 20, // Add padding to prevent edge stretching
    height: 250,
    overflow: "hidden",
    borderRadius: 15,
    marginHorizontal: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: 250,
    borderRadius: 15,
  },
  paginationContainer: {
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 8,
    marginTop: 220,
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: "#2cd18a",
    opacity: 0.9,
  },
  paginationDotInactive: {
    backgroundColor: "#d3d3d3",
    opacity: 0.6,
  },
  infoRecipeContainer: {
    flex: 1,
    marginHorizontal: 25,
    marginTop: 20,
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
    color: "#444",
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    color: "#2cd18a",
  },
  infoDescriptionRecipe: {
    textAlign: "left",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 20,
    marginHorizontal: 15,
    color: "#555",
  },
  infoRecipeName: {
    fontSize: 28,
    marginVertical: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});

export default styles;
