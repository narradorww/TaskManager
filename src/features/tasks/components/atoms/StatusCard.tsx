import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define os tipos de status que o card pode representar para controlar as cores
type StatusType = 'PENDING' | 'COMPLETED';

interface StatusCardProps {
  label: string;
  count: number;
  statusType: StatusType;
}

/**
 * StatusCard é um componente atômico que exibe um contador para um status específico.
 * Ele é reutilizável e sua aparência (cores) é controlada pela prop `statusType`,
 * encapsulando a lógica de estilização e tornando o componente mais declarativo.
 */
export const StatusCard = ({ label, count, statusType }: StatusCardProps) => {
  // Mapeia o tipo de status para uma cor específica
  const chipColor = statusType === 'PENDING' ? '#007AFF' : '#28a745';

  return (
    <View style={styles.card}>
      {/* O chip agora usa a cor dinâmica */}
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
