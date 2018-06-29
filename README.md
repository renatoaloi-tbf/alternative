# This is a react native app source-code

Procedimentos para Montar o Ambiente

- Instalar Chocolatey 

Abrir um CMD como administrador e executar a linha abaixo

@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

- Instalar Python 2.7 + Node.Js + JDK8

Executar a linha de comando abaixo também em um CMD como administrador

choco install -y nodejs.install python2 jdk8

- Instalar o Reactive Native CLI

Executar o comando abaixo em um CMD normal

npm install -g react-native-cli

- Instalar o Android Studio

Na instalação selecionar os itens abaixo

Android SDK
Android SDK Platform
Performance (Intel ® HAXM)
Android Virtual Device

- Baixar o Android SDK 6.0 (Marshmallow)

Na tela de bem-vindo do Android Studio, selecionar a opção "Configure" e depois "SDK Manager"

Navegar no SDK Manager até a aba SDK Platforms e habilitar a opção "Show Package Details"

Expandir o nó do Android 6.0 (Marshmallow)

Selecionar os itens:

Google APIs
Android SDK Platform 23
Intel x86 Atom_64 System Image
Google APIs Intel x86 Atom_64 System Image

Navegar até a aba "SDK Tools", selecionar a opção "Show Package Details" e expandir a opção "Android SDK Build-Tools"

Marcar a opção 23.0.1


- Configurar as variáveis de ambiente

PATH (adicionar)
%USERPROFILE%\AppData\Local\Android\Sdk\platform-tools

ANDROID_HOME
C:\Users\renat\AppData\Local\Android\Sdk

JAVA_HOME
C:\Program Files\Java\jdk1.8.0_172


- Instalar pacote do App Leiteria

Copiar os arquivos em uma pasta, por exemplo c:\reactnative\leiteria

Ou fazer clone do GIT:

> git clone https://github.com/bovcontrol/alternative leiteria

Acessar a pasta do projeto e atualizar os pacotes com os comandos abaixo:

> cd c:\reactnative\leiteria
> npm install

- Abrir projeto no Android Studio

Na tela de bem-vindo do Android Studio, selecionar opção "Open an Existing Android Studio Project"

Obs: Se já tiver um projeto aberto, acesse "File > Close Project" e depois abra o projeto localizado na pasta abaixo:

c:\reactnative\leiteria\android

- Resolva os erros do Gradle e instale os tools que ele solicitar

- Abrir o Emulador do Android

- Execute o App no Emulador

- Nesta nova versão foi adicionada um novo componente de gráfico, portanto executar os comando abaixo

referência: https://github.com/wuxudong/react-native-charts-wrapper

> npm install --save react-native-charts-wrapper
> react-native link react-native-charts-wrapper

Execute os comandos abaixo para executar o aplicativo no emulador:

> cd c:\reactnative\leiteria
> react-native run-android

- Resetando o cache

Quando der o erro 500 do registerScreen.js executar os comandos abaixo:

> cd c:\reactnative\leiteria
> npm cache clean --force
> npm install
> react-native start --reset-cache

- Atualize o Emulador

Para atualizar o emulador, tecle a tecla "R" duas vezes.

- Copie a fonte Ionicons

Siga os passos indicados na seção Android > Option: Manually

https://github.com/oblador/react-native-vector-icons#option-manually-1

Copie apenas o arquivo Ionicons.ttf da pasta C:\reactnative\leiteria\node_modules\react-native-vector-icons\Fonts para a pasta C:\reactnative\leiteria\android\app\src\main\assets\fonts

- Instalar DevTools

Ferramenta para auxiliar na depuração dos elementos.

https://github.com/facebook/react-devtools/tree/master/packages/react-devtools

- Mudar página inicial

Mudar a página inicial do arquivo containers\App\App.js de:

screen: 'Quality',

para:

screen: 'Login',