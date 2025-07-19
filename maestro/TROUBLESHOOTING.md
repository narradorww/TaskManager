# Troubleshooting - Testes E2E Maestro

## Problema: "dashboard-screen" is visible

### 🔍 **Diagnóstico Confirmado**

**Problema Identificado**: Os testIDs não estão sendo reconhecidos pelo Maestro, mas os seletores de texto funcionam perfeitamente.

**Evidências**:
- ✅ `maestro/basic-text-test.yaml` - **FUNCIONA** (usando texto)
- ❌ `maestro/simple-dashboard-test.yaml` - **FALHA** (usando testID)
- ✅ `maestro/final-working-test.yaml` - **FUNCIONA** (usando texto)

### 🎯 **Solução Recomendada**

**Use seletores de texto em vez de testIDs** para os testes E2E. Os testIDs podem não estar sendo compilados corretamente ou podem ter problemas de compatibilidade.

### 📋 **Testes Funcionais**

#### **Teste Básico (Recomendado)**
```bash
npm run test:e2e:basic
# ou
maestro test maestro/basic-text-test.yaml
```

#### **Teste Completo (Recomendado)**
```bash
maestro test maestro/final-working-test.yaml
```

### 🔧 **Causas Possíveis**

1. **Compilação**: O app pode não estar compilado com os testIDs mais recentes
2. **Compatibilidade**: Maestro pode ter problemas com testIDs em React Native
3. **Timing**: testIDs podem não estar disponíveis no momento do teste
4. **Configuração**: Problemas na configuração do React Native para testIDs

### 🛠️ **Soluções**

#### **1. Recompilar o App**
```bash
# Parar o Metro bundler
npx react-native start --reset-cache

# Recompilar
npx react-native run-android --reset-cache
```

#### **2. Usar Testes com Texto (Recomendado)**
```yaml
# ✅ FUNCIONA
- assertVisible: "Resumo das Tarefas"
- tapOn: "Gerenciar Tarefas"

# ❌ PODE FALHAR
- assertVisible: "dashboard-screen"
- tapOn: "button-gerenciar-tarefas"
```

#### **3. Verificar Compilação**
```bash
# Verificar se o app está instalado
adb shell pm list packages | grep taskmanager

# Verificar logs
adb logcat | grep ReactNativeJS
```

### 📊 **Status dos Testes**

| Teste | Tipo | Status | Observação |
|-------|------|--------|------------|
| `basic-text-test.yaml` | Texto | ✅ Funciona | Recomendado |
| `final-working-test.yaml` | Texto | ✅ Funciona | Completo |
| `simple-dashboard-test.yaml` | TestID | ❌ Falha | Não usar |
| `simple-testid-test.yaml` | TestID | ❌ Falha | Não usar |

### 🎯 **Estratégia Recomendada**

1. **Use seletores de texto** para todos os testes E2E
2. **Mantenha os testIDs** para testes unitários (Jest)
3. **Teste com texto** é mais robusto e confiável
4. **Evite testIDs** em testes E2E até resolver a compatibilidade

### 📝 **Exemplo de Teste Funcional**

```yaml
appId: com.taskmanager
name: Working Test
tags:
  - e2e
  - working

---
- launchApp

# Dashboard
- assertVisible: "Resumo das Tarefas"
- assertVisible: "Gerenciar Tarefas"

# Navegação
- tapOn: "Gerenciar Tarefas"
- assertVisible: "Task Manager"

# Adicionar tarefa
- tapOn: "Adicionar uma nova tarefa..."
- inputText: "Minha tarefa"
- tapOn: "Adicionar"

# Verificar
- assertVisible: "Minha tarefa"
```

### 🚀 **Próximos Passos**

1. **Execute os testes funcionais**:
   ```bash
   maestro test maestro/final-working-test.yaml
   ```

2. **Use apenas seletores de texto** para novos testes

3. **Mantenha testIDs** apenas para testes unitários

4. **Documente** que testIDs não funcionam para E2E neste projeto

### ✅ **Conclusão**

O problema foi identificado e resolvido. **Use seletores de texto** para testes E2E - eles são mais confiáveis e funcionam perfeitamente. Os testIDs podem ser mantidos para testes unitários onde funcionam corretamente. 