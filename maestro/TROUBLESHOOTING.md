# 🛠️ Troubleshooting E2E (Maestro)

Principais problemas e soluções ao rodar testes E2E com Maestro:

- **TestIDs não funcionam:**  
  Maestro, em React Native, pode não reconhecer testIDs. Sempre utilize seletores de texto visível nos testes E2E.

- **App não carrega ou não atualiza:**  
  Recompile o app para garantir que as últimas mudanças estejam presentes:
  ```bash
  npx react-native run-android --reset-cache
  # ou para iOS
  npx react-native run-ios
  ```

- **Elemento não encontrado:**  
  - Verifique se o texto usado no teste está exatamente igual ao exibido na tela (maiúsculas, acentos, espaços).
  - Use textos curtos e únicos para evitar ambiguidades.

- **Emulador travado ou lento:**  
  - Reinicie o emulador/dispositivo.
  - Feche e reabra o Metro bundler (`npm start`).

- **Testes falham de forma intermitente:**  
  - Certifique-se de que não há delays de carregamento não tratados.
  - Adicione verificações intermediárias de texto para garantir que a tela está pronta.

- **Logs detalhados e relatórios:**  
  Gere relatórios para análise:
  ```bash
  maestro test maestro/test.yaml --format junit
  ```

- **Verifique o ambiente:**  
  - Confirme que o Maestro CLI está instalado e atualizado (`maestro --version`).
  - Certifique-se de que o emulador está rodando e visível para o Maestro (`adb devices`). 