import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface AnswerItemProps {
  children: React.ReactNode,
  index: number
}

export default function AnswerItem({ 
  children,   
  index 
}: AnswerItemProps) {
  return (
    <TouchableOpacity style={[styles.item, index === 0 ? styles.itemCorrect : index === 1 ? styles.itemWrong : null]}>
      <Text style={styles.itemText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {    
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 20,
    marginBottom: 12,
    backgroundColor: '#FFF',
    shadowColor: "#222",
    shadowOpacity: 0.025,
    shadowOffset: { 
      width: 4,
      height: 8,
    },
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "transparent"
  },
  itemCorrect: {    
    borderColor: "green",
    backgroundColor: "lightgreen"
  },
  itemWrong: {
    borderColor: "red",
    backgroundColor: "pink"
  },
  itemText: {
    color: "#374151",
    fontWeight: "500"
  },  
});