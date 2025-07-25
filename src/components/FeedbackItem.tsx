import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../theme/colors";

interface FeedbackItemProps {
  rating: number;
  comment: string;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ rating, comment }) => {
  return (
    <View style={styles.card}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Ionicons
            key={i}
            name={i <= rating ? "star" : "star-outline"}
            size={28}
            color={colors.star}
            style={styles.starIcon}
          />
        ))}
      </View>
      <Text style={styles.comment}>“{comment}”</Text>
    </View>
  );
};

export default FeedbackItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
    width: "80%",
    maxWidth: 400,
    alignSelf: "center",
  },
  stars: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "flex-start",
  },
  starIcon: {
    marginHorizontal: 2,
  },
  comment: {
    fontSize: 17,
    color: colors.text,
    fontStyle: "italic",
    marginTop: 4,
    lineHeight: 22,
  },
});
