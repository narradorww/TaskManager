# Configuração de Release Signing

Este documento explica como configurar o keystore para builds de release do TaskManager.

## Configuração Atual

As variáveis de ambiente estão configuradas no arquivo `android/gradle.properties`:

```properties
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=senha_da_keystore
MYAPP_UPLOAD_KEY_PASSWORD=senha_da_chave
```

## Como Gerar um Keystore de Release

### 1. Gerar o Keystore

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Colocar o Keystore no Local Correto

Coloque o arquivo `my-release-key.keystore` na pasta `android/app/`

### 3. Configurar as Variáveis de Ambiente

Atualize o arquivo `android/gradle.properties` com suas informações:

```properties
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=sua_senha_da_keystore
MYAPP_UPLOAD_KEY_PASSWORD=sua_senha_da_chave
```

## Para CI/CD

Para builds automatizados, configure as seguintes secrets no GitHub:

- `ANDROID_KEYSTORE_BASE64`: Conteúdo do keystore em base64
- `ANDROID_KEYSTORE_PASSWORD`: Senha da keystore
- `ANDROID_KEY_ALIAS`: Alias da chave
- `ANDROID_KEY_PASSWORD`: Senha da chave

## Build de Release

Para gerar um APK de release assinado:

```bash
cd android
./gradlew assembleRelease
```

O APK será gerado em: `android/app/build/outputs/apk/release/app-release.apk`

## Segurança

⚠️ **IMPORTANTE**: 
- Nunca commite o arquivo keystore no repositório
- Mantenha as senhas seguras
- Use variáveis de ambiente para CI/CD
- Faça backup do keystore em local seguro 