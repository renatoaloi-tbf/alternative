# This is a react native app source-code

### Procedimentos para Montar o Ambiente

#### Instalar Chocolatey 

Abrir um CMD como administrador e executar a linha abaixo

```
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

#### Instalar Python 2.7 + Node.Js + JDK8

Executar a linha de comando abaixo também em um CMD como administrador

```
choco install -y nodejs.install python2 jdk8
```

#### Instalar o Reactive Native CLI

Executar o comando abaixo em um CMD normal

```
npm install -g react-native-cli
```

#### Instalar o Android Studio

Na instalação selecionar os itens abaixo

* Android SDK
* Android SDK Platform
* Performance (Intel ® HAXM)
* Android Virtual Device

#### Baixar o Android SDK 6.0 (Marshmallow)

* Na tela de bem-vindo do Android Studio, selecionar a opção ```Configure``` e depois ```SDK Manager```
* Navegar no ```SDK Manager``` até a aba ```SDK Platforms``` e habilitar a opção ```Show Package Details```
* Expandir o nó do ```Android 6.0 (Marshmallow)```

Selecionar os itens:

* Google APIs
* Android SDK Platform 23
* Intel x86 Atom_64 System Image
* Google APIs Intel x86 Atom_64 System Image

Navegar até a aba ```SDK Tools```, selecionar a opção ```Show Package Details``` e expandir a opção ```Android SDK Build-Tools```

* Marcar a opção 23.0.1


#### Configurar as variáveis de ambiente

* PATH (adicionar)

```
%USERPROFILE%\AppData\Local\Android\Sdk\platform-tools
```

* ANDROID_HOME

```
C:\Users\renat\AppData\Local\Android\Sdk
```

* JAVA_HOME

```
C:\Program Files\Java\jdk1.8.0_172
```

#### Instalar pacote do App Leiteria

Copiar os arquivos em uma pasta, por exemplo c:\reactnative\leiteria

Ou fazer clone do GIT:

```
git clone https://github.com/bovcontrol/alternative leiteria
```

Acessar a pasta do projeto e atualizar os pacotes com os comandos abaixo:

```
cd c:\reactnative\leiteria
npm install
```

#### Abrir projeto no Android Studio

Na tela de bem-vindo do Android Studio, selecionar opção ```Open an Existing Android Studio Project```

> Obs: Se já tiver um projeto aberto, acesse ```File > Close Project``` e depois abra o projeto localizado na pasta abaixo:
> ```c:\reactnative\leiteria\android```

Resolva os erros do Gradle e instale os tools que ele solicitar

Abrir o Emulador do Android

#### Componente de Gráfico

> referência: https://github.com/wuxudong/react-native-charts-wrapper

Nesta nova versão foi adicionada um novo componente de gráfico, portanto executar os comando abaixo

```
npm install --save react-native-charts-wrapper
react-native link react-native-charts-wrapper
```

Excluir a linha abaixo do project build.gradle

> referência: https://github.com/wuxudong/react-native-charts-wrapper/issues/130

```
buildscript {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

E deixar apenas no nó do allprojects assim:

```
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Caso aconteça o problema "Could not expand ZIP", executar os comandos abaixo:

```
cd android
gradlew clean
```

#### Execute o App no Emulador

Execute os comandos abaixo para executar o aplicativo no emulador:

```
cd c:\reactnative\leiteria
react-native run-android
```

#### Resetando o cache

Quando der o erro 500 do registerScreen.js executar os comandos abaixo:

```
cd c:\reactnative\leiteria
npm cache clean --force
npm install
react-native start --reset-cache
```

#### Atualize o Emulador

Para atualizar o emulador, tecle a tecla "R" duas vezes.

### Configurando MPChartLib

#### Baixando Código Fonte

Efetue o clone do repositório da biblioteca com o comando:

```
git clone https://github.com/renatoaloi-tbf/MPAndroidChart.git
```

Depois mude para o branch da correção da linha laranja com label, assim:

```
git fetch --all
git checkout linha-laranja-com-label-v303
```

O diretório da biblioteca deve ficar em paralelo com o diretório da aplicação do reactive native, assim:

```
C:\desenvolvimento\bovcontrol.com\leiteria
C:\desenvolvimento\bovcontrol.com\MPAndroidChart
```

Caso você decida instalar a biblioteca MPAndroidChart em outro lugar, lembre-se de alterar o arquivo ```settings.gradle``` da pasta ```android``` do projeto ```leiteria``` para acompanhar o caminho que você escolher, assim:

```
project(':MPChartLib').projectDir = new File(rootProject.projectDir, '../../MPAndroidChart/MPChartLib')
```

#### Atualizando o Gradle

Depois de baixar o código fonte da biblioteca ```MPAndroidChart```, abra ela no Android Studio e deixe o Gradle sincronizar.

Clique no botão de executar (que é uma seta verde) para verificar se a biblioteca está funcionando normalmente.

Caso apareça o erro ```Please select Android SDK``` e você não consiga executar o exemplo da biblioteca, então execute os passos mostrados no vídeo abaixo:

https://www.youtube.com/watch?v=XDq2P1uM7uo

Caso você não encontre esse menu no Android Studio, procure pelo botão ```sync now``` mostrado nesse link abaixo e clique nele.

https://stackoverflow.com/questions/34353220/android-studio-please-select-android-sdk?answertab=votes#tab-top

Se precisar feche e abra novamente o projeto no Android Studio até que você consiga executar o exemplo no emulador.

#### Configurando o Módulo react-native-charts-wrapper

Instalada a biblioteca e depois de executar o comando ```npm install``` configure os arquivos conforme orientado nessa sessão.

> É necessário executar o npm install antes, pois como o módulo fica dentro da pasta node_modules, ele é atualizado toda vez que os módulos do npm são instalados ou atualizados.

- Primeiro atualize o arquivo ```node_modules\react-native-charts-wrapper\android\build.gradle``` na parte de ```dependencies``` para ficar conforme indicado abaixo:

```
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.facebook.react:react-native:0.20.+'
    //compile 'com.github.PhilJay:MPAndroidChart:v3.0.3'
    compile project(':MPChartLib')
}
```

Adicione também o código abaixo na linha 287 do arquivo ```node_modules\react-native-charts-wrapper\android\src\main\java\com\github\wuxudong\rncharts\charts\ChartBaseManager.java```

```
axis.removeAllLimitLines();
```

Agora basta executar o ```react-native run-android``` normalmente.

### Ferramentas de Depuração

#### Instalar DevTools

Ferramenta para auxiliar na depuração dos elementos.

> referência: https://github.com/facebook/react-devtools/tree/master/packages/react-devtools

#### Remote Debug

Para ativar a depuração remota de JS, basta teclar ```CRTL + M``` no emulador e selecionar a opção:

```
Debug JS Remotely
```

Isso vai abrir um navegador acessando o endereço:

```
http://localhost:8081/debugger-ui/
```

Tecle ```CTRL + Shift + J``` no teclado para abrir o console de depuração do Google Chrome.

Para testar no telefone, execute o comando abaixo para abrir o menu de depuração:

```
adb shell input keyevent 82
```

### Gerar APK

Seguir os passos desse tutorial: https://facebook.github.io/react-native/docs/signed-apk-android.html

Caso dê o problema abaixo:

> react native unable to process incoming event 'progress complete' (progress complete event)

Rodar o comando abaixo no CMD do Windows:

```
gradlew --console plain assembleRelease
```

--------------

#### Copie a fonte Ionicons (Não é mais necessário na nova versão do App)

Siga os passos indicados na seção ```Android > Option: Manually```

> referência: https://github.com/oblador/react-native-vector-icons#option-manually-1

Copie apenas o arquivo ```Ionicons.ttf``` da pasta ```C:\reactnative\leiteria\node_modules\react-native-vector-icons\Fonts``` para a pasta ```C:\reactnative\leiteria\android\app\src\main\assets\fonts```

> Atenção para o ```fonts``` em minúsculo na pasta de destino

#### Mudar página inicial (Não é mais necessário na nova versão do App)

Mudar a página inicial do arquivo ```containers\App\App.js``` de:

```
screen: 'Quality',
```

para:

```
screen: 'Login',
```