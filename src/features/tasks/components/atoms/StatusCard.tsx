import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StatusType = 'PENDING' | 'COMPLETED';

interface StatusCardProps {
  label: string;
  count: number;
  statusType: StatusType;
}

export const StatusCard = ({ label, count, statusType }: StatusCardProps) => {
  const chipColor = statusType === 'PENDING' ? '#007AFF' : '#28a745';

  return (
    <View style={styles.card}>
      <View style={[styles.chip, { backgroundColor: chipColor }]}>
        <Text style={styles.chipText}>{label}</Text>
      </View>
      <Text style={styles.cardNumber}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  chip: {
    position: 'absolute',
    top: -10,
    left: 12,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    elevation: 5,
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardNumber: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#495057',
  },
});
