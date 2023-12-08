import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState('BRL');
  const [moedaDestino, setMoedaDestino] = useState('USD');
  const [valorEntrada, setValorEntrada] = useState('');
  const [resultado, setResultado] = useState('');

  const handleConverter = async () => {
    let URL = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`;
    try {
      let page = await fetch(URL);
      let json = await page.json();
      let indice = parseFloat(json[`${moedaOrigem}${moedaDestino}`].high);
      let valor = parseFloat(valorEntrada);
      setResultado((indice * valor).toFixed(2));
    } catch (error) {
      setResultado(`Erro: ${error.message}`);
    }
  };

  const handleLimpar = () => {
    setResultado('');
    setValorEntrada('');
    setMoedaOrigem('BRL');
    setMoedaDestino('USD');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Moedas</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.tbMoeda}>Moeda 1</Text>
        <Picker
          style={styles.picker}
          selectedValue={moedaOrigem}
          onValueChange={(itemValue, itemIndex) => setMoedaOrigem(itemValue)}>
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Peso Argentino" value="ARS" />
          <Picker.Item label="Libra Esterlina" value="GBP" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.tbMoeda}>Moeda 2</Text>
        <Picker
          style={styles.picker}
          selectedValue={moedaDestino}
          onValueChange={(itemValue, itemIndex) => setMoedaDestino(itemValue)}>
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Peso Argentino" value="ARS" />
          <Picker.Item label="Libra Esterlina" value="GBP" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.tbMoeda}>Valor para Conversão</Text>
        <TextInput
          style={styles.input}
          value={valorEntrada}
          onChangeText={setValorEntrada}
          keyboardType="numeric"
        />
      </View>
      <Pressable onPress={handleConverter} style={styles.button}>
        <Text style={styles.buttonText}>Converter</Text>
      </Pressable>
      <Pressable onPress={handleLimpar} style={styles.button}>
        <Text style={styles.buttonText}>Limpar</Text>
      </Pressable>
      <View>
        <Text style={styles.lbResultado}>{resultado}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', // Background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ecf0f1', // Font color
    fontSize: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    color: '#ecf0f1', // Font color
    width: 200,
    height: 50,
    backgroundColor: '#34495e', // Picker background color
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    color: '#ecf0f1', // Font color
    textAlign: 'right',
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ecf0f1', // Border color
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  tbMoeda: {
    color: '#ecf0f1', // Font color
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#3498db', // Button color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ecf0f1', // Font color
  },
  lbResultado: {
    color: '#ecf0f1', // Font color
    fontSize: 18,
    marginTop: 10,
  },
});
