import { useState } from "react";
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbe0f5ff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#49c2f1ff",
  },
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    width: "100%",
    maxWidth: 300,
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#6892c8ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    paddingHorizontal: 10,
  },
});

export default function Index() {
  const [valorMensal, setValorMensal] = useState("");
  const [meses, setMeses] = useState("");
  const [juros, setJuros] = useState("");
  const [resultado, setResultado] = useState<string | null>(null);

  function calcular() {
    const p = parseFloat(valorMensal);
    const n = parseInt(meses);
    const i = parseFloat(juros) / 100;

    if (isNaN(p) || isNaN(n) || isNaN(i) || n <= 0) {
      setResultado("Preencha todos os campos corretamente.");
      return;
    }

    const totalSemJuros = p * n;

    const totalComJuros = p * ((Math.pow(1 + i, n) - 1) / i);

    setResultado(
      `Valor total sem juros: R$ ${totalSemJuros.toFixed(2)}\n` +
      `Valor total com juros compostos: R$ ${totalComJuros.toFixed(2)}`
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Simulador de Investimentos</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={valorMensal}
        onChangeText={setValorMensal}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantos meses deseja investir"
        keyboardType="numeric"
        value={meses}
        onChangeText={setMeses}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a taxa de juros"
        keyboardType="numeric"
        value={juros}
        onChangeText={setJuros}
      />

      <TouchableOpacity style={styles.button} onPress={calcular}>
        <Text style={styles.buttonText}>Simular</Text>
      </TouchableOpacity>

      {resultado && <Text style={styles.result}>{resultado}</Text>}
    </KeyboardAvoidingView>
  );
}
