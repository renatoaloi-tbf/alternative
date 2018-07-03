import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styled, { css } from 'styled-components/native';

import {
    Wrapper,
    TopBar,
    Icon,
    DrawerButton,
    ScrollWrapper,
    BackButton,
    LargeTopBar
} from '~/components/shared';


export default class PrivacyPolicy extends Component {
    render() {
        return (
            <Wrapper >
                <LargeTopBar
                    title="Política de Privacidade"
                    rightComponent={<Icon inverted name="bell" />}
                    leftComponent={<BackButton />}
                />
                <ScrollWrapperStyle>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            Política de Privacidade{"\n"}
                            Em vigor a partir de novembro de 2014.
                        </Text>
                        <Text style={styles.text}>
                            A Nestlé Brasil Ltda., sediada na Avenida Doutor Chucri Zaidan, 246, Vila Cordeiro, CEP 04583-110,
                            inscrita no CNPJ/MF sob ° 60.409.075/0001-52 ("Nestlé") está comprometida com a segurança de sua privacidade e a garantia de
                            que você continuará a confiar seus dados pessoais à Nestlé. Quando você interage conosco, compartilha suas informações pessoais que
                            nos permitem individualiza-lo (por exemplo, nome, endereço, número de telefone). Isso é conhecido como "dados pessoais".

                            </Text>

                        <Text style={styles.title}>
                            Atenção
                        </Text>




                        <Text style={styles.text}>
                            Esta notificação ("Política de Privacidade") estabelece:
                            {"\n"}
                            {"\n"}
                            1. Escopo e aceitação{"\n"}
                            2. Dados pessoais coletados pela Nestlé{"\n"}
                            3. Dados pessoais de crianças{"\n"}
                            4. Porque a Nestlé coleta os dados pessoais e como os utiliza{"\n"}
                            5. O compartilhamento de dados pessoais pela Nestlé{"\n"}
                            6. Seus direitos{"\n"}
                            7. Cookies e outras tecnologias{"\n"}
                            8. Segurança e retenção dos dados{"\n"}
                            9. Como entrar em contato conosco{"\n"}




                        </Text>

                        <Text style={styles.title}>
                            1 - Escopo e Aceitação desta Política de Privacidade
                        </Text>


                        <Text style={styles.text}>
                            Esta Notificação de Política de Privacidade se aplica aos dados pessoais que coletamos sobre você com a finalidade de lhe fornecer nossos
                            produtos e serviços.
                            Ao utilizar os Sites da Nestlé (conforme definição abaixo), ou ao nos fornecer seus dados pessoais, você está aceitando as práticas descritas nesta Política de Privacidade. Pedimos que não use os Sites da Nestlé (conforme definição abaixo) ou nos forneça seus dados pessoais se não concordar com esta Política de Privacidade.
                            A Nestlé se reserva o direito de fazer alterações nesta Política de Privacidade a qualquer tempo. Encorajamos nossos consumidores a revisarem-na regularmente para ter certeza de que estão cientes de quaisquer mudanças e de como seus dados pessoais poderão ser utilizados.
                            {"\n"}
                            {"\n"}
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            2 - Dados coletados pela Nestlé
                        </Text>


                        <Text style={styles.text}>
                            A Nestlé poderá coletar seus dados pessoais de inúmeras fontes, inclusive:
                            {"\n"}
                            {'\u25CB'} Interações online e eletrônicas conosco, inclusive através dos Sites da Nestlé, aplicativos para celular, programas de mensagem de texto ou através das páginas ou aplicativos das marcas da Nestlé em redes sociais de terceiros (p.ex., Facebook) {"\n"}
                            {'\u25CB'} Interações off-line conosco, inclusive por meio de campanhas de marketing direto, cadastros impressos, inscrições em concursos e contatos através dos serviços de atendimento ao consumidor Nestlé; e, {"\n"}
                            {'\u25CB'} Nossa interação mediante conteúdo direcionado online (como propaganda, por exemplo) que a Nestlé, ou seus provedores de serviços, lhe fornecem através de Sites ou aplicativos de terceiros. {"\n"}
                            1. Dados que você nos fornece diretamente{"\n"}
                            Estes são dados que você nos fornece com seu consentimento para uma finalidade específica, inclusive:{"\n"}
                            {'\u25AA'} Informações sobre seus contatos pessoais, inclusive qualquer informação que permita à Nestlé entrar em contato com você pessoalmente (p.ex., nome, endereço residencial ou de e-mail e número de telefone);{"\n"}
                            {'\u25AA'} Informações demográficas, inclusive data de nascimento, idade, sexo, localização (p.ex., CEP, cidade e estado e localização geográfica), produtos favoritos, hobbies, interesses, e informações sobre o seu lar e estilo de vida;{"\n"}
                            {'\u25AA'} Informações de pagamento, inclusive para fazer compras (p.ex., número de cartão de crédito, data de validade, endereço para faturamento);{"\n"}
                            {'\u25AA'} Informações sobre o login do cadastro, inclusive informações necessárias para você criar um cadastro de usuário junto à Nestlé (p.ex., ID/e-mail de login, nome de usuário, senha e pergunta/resposta de segurança);{"\n"}
                            {'\u25AA'} Feedback do consumidor, inclusive informações que você compartilha com a Nestlé sobre sua experiência no uso de produtos e serviços Nestlé (p.ex., seus comentários e sugestões, depoimentos e outros feedbacks relacionados com os produtos Nestlé); e,{"\n"}
                            {'\u25AA'} Conteúdo gerado pelo consumidor, inclusive qualquer conteúdo (p.ex., fotos, vídeos e histórias pessoais) que você cria e compartilha com a Nestlé (e, talvez, outras pessoas) ao carregar esse conteúdo em um Site da Nestlé.{"\n"}
                            2. Dados que coletamos quando você interage com os Sites da Nestlé{"\n"}
                            Usamos cookies ou outras tecnologias de rastreamento que coletam certos tipos de informação quando você interage com os Sites da Nestlé. Para mais informações, consulte o item 7 (sete) desta Política.{"\n"}
                            3. Dados coletados de outras fontes
                            Coletamos informações sobre você de outras fontes legítimas com o objetivo de lhe proporcionar nossos produtos e serviços. Essas fontes incluem agregadores de dados de terceiros, parceiros promocionais da Nestlé, fontes públicas e sites de redes sociais de terceiros. Essas informações podem incluir:{"\n"}
                            {'\u25AA'} Informações de contato pessoal; e{"\n"}
                            {'\u25AA'} Quaisquer dados pessoais que sejam parte de seu perfil em uma rede social de terceiros (p.ex., Facebook) e que você permita que a rede social de um terceiro compartilhe conosco (p.ex., nome, endereço de e-mail, sexo, aniversário, cidade, foto do perfil, ID de usuário, lista de amigos). Você pode aprender mais sobre esses dados que podemos obter visitando o Site da rede social do terceiro.{"\n"}
                            {'\u25AA'} Também podemos receber dados pessoais sobre indivíduos quando adquirimos outras companhias.{"\n"}


                        </Text>
                        <Text style={styles.title}>
                            3 - Dados pessoais de crianças
                        </Text>
                        <Text style={styles.text}>
                            A Nestlé não solicita ou coleta, intencionalmente, dados de crianças abaixo de 13 anos de idade. Se a Nestlé descobrir que coletou acidentalmente dados pessoais de uma criança abaixo de 13 anos, removerá os dados pessoais dessa criança de seus registros assim que possível. Contudo, a Nestlé pode coletar dados pessoais sobre crianças com menos de 13 anos de idade diretamente de pais ou responsáveis e, portanto, com o consentimento explícito destes.
                            {"\n"}
                        </Text>
                        <Text style={styles.title}>
                            4 - Porque a Nestlé coleta dados pessoais e como os utiliza
                        </Text>

                        <View style={styles.listView}>
                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Pedidos de Compra -
                            </Text>
                            <Text style={styles.listViewFont}>
                                para processar, enviar e manter você informado sobre asituação de seus pedidos. Observe que há muitos sites de comércio eletrônico que vendem os produtos Nestlé, mas não são controlados ou operados pela Nestlé. Recomendamos que você leia suas políticas, inclusive a política de privacidade, antes de fazer suas compras nesses outros Sites. {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Manutenção de Cadastro -
                            </Text>
                            <Text style={styles.listViewFont}>
                                para criar e manter seus cadastrosconosco, inclusive administrar programas de fidelidade ou recompensa associados a seucadastro. {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Serviços ao Consumidor -
                            </Text>
                            <Text style={styles.listViewFont}>
                                fornecer-lhe serviços aoconsumidor, inclusive respostas às suas perguntas, reclamações e feedback em geral sobre nossosprodutos. Os serviços ao consumidor podem ser prestados por meio de diferentes formas decomunicação, inclusive via e-mail, carta, telefonema, chat on-line e SMS. {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Envolvimento do Consumidor -
                            </Text>
                            <Text style={styles.listViewFont}>
                                fazer com que você se envolva mais ativamente com nossos produtos eserviços. Isso pode incluir o uso ou publicação de conteúdo gerado pelo consumidor. {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Personalização -
                            </Text>
                            <Text style={styles.listViewFont}>
                                a Nestlé poderá combinar seus dadospessoais coletados de uma fonte (p.ex., um Site) com dados coletados de outra fonte (p.ex., um evento off-line). Isso fornecerá à Nestlé uma visão mais completa de você como consumidor, oque, por sua vez, permite que a Nestlé lhe ofereça serviços melhores e mais personalizados,inclusive com relação a: {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Sites -
                            </Text>
                            <Text style={styles.listViewFont}>
                                para melhorar e personalizar sua experiêncianos Sites, usando dados como as informações de login de cadastro, informações computadorizadas,e/ou informações sobre o uso prévio do Site; {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Produtos -
                            </Text>
                            <Text style={styles.listViewFont}>
                                para melhorar osprodutos Nestlé, adaptá-los às suas necessidades e desenvolver novas ideias de produtos. Issoinclui o uso de informações demográficas, informações sobre o perfil do consumidor e feedback doconsumidor; e {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Publicidade baseada em interesses -
                            </Text>
                            <Text style={styles.listViewFont}>
                                para lhe apresentarpublicidade adequada aos seus interesses. Uma maneira de a Nestlé fazer isto é combinando asatividades ou informações coletadas nos Sites da Nestlé com dados coletados sobre você em sitesde terceiros (ou seja, correspondência de dados). Esse tipo de publicidade também é conhecidocomo “publicidade comportamental online” ou “publicidade direcionada”. Essa personalização ébasicamente realizada através de cookies ou tecnologias similares. {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Comunicações de marketing -
                            </Text>
                            <Text style={styles.listViewFont}>
                                para fornecer comunicações de marketing que você tenhaoptado por receber (inclusive informações sobre a Nestlé, seus produtos e serviços, concursos epromoções). Essas comunicações podem ser compartilhadas através dos meios eletrônicos (p.ex.,SMS, e-mails e propaganda online) ou posts. Se você optar por receber SMS (opt-in), a política do seu provedor de serviços de telefonia celular para o recebimento de SMS  {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Comunicações de marketing -
                            </Text>
                            <Text style={styles.listViewFont}>
                                para fornecer comunicações de marketing que você tenhaoptado por receber (inclusive informações sobre a Nestlé, seus produtos e serviços, concursos epromoções). Essas comunicações podem ser compartilhadas através dos meios eletrônicos (p.ex.,SMS, e-mails e propaganda online) ou posts. Se você optar por receber SMS (opt-in), a política do seu provedor de serviços de telefonia celular para o recebimento de SMS será aplicável, o que poderá ter um custo.{"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Recursos Sociais -
                            </Text>
                            <Text style={styles.listViewFont}>
                                para oferecer-lhe diferentes recursos sociais, inclusive os seguintes:{"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Recursos de Comunidades Virtuais em um Site Nestlé -
                            </Text>
                            <Text style={styles.listViewFont}>
                                Quando você visita um Site Nestlé com um recurso de comunidade virtual e carrega ou compartilha receitas, fotos, vídeos,trabalhos artísticos ou outro conteúdo, a Nestlé pode usar e divulgar os dados pessoais que você compartilhar nesses sites.{"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Recursos virais na Web -
                            </Text>
                            <Text style={styles.listViewFont}>
                                A Nestlé poderá usarseus dados pessoais para lhe oferecer recursos virais, como um programa recomendar um amigo, emque você pode compartilhar diferentes notícias, informações sobre produtos, promoções ou outrosconteúdos com sua família e seus amigos. Isso exige, normalmente, a coleta e uso deinformações de contato pessoal (p.ex., nomes e e-mails) de forma que a mensagem/conteúdo únicopersonalizado possa ser entregue a todos os recipientes.{"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Rede social de terceiro -
                            </Text>
                            <Text style={styles.listViewFont}>
                                A Nestlé poderá usar seus dados pessoais resultantes de suas interaçõescom funcionalidades de redes sociais de terceiros, como o “Conectar” ou “Curtir” do Facebook.Esses recursos podem ser integrados aos Sites da Nestlé, inclusive com o objetivo de realizar concursos e para permitir que você compartilhe o conteúdo com seus amigos. Se você utilizar esses recursos, a Nestlé poderá ser obrigada a habilitar alguns dos dados pessoais das informações de sua rede social. Você pode aprender mais sobre o funcionamento desses recursos eos dados do seu perfil que a Nestlé pode obter, visitando o Site da rede social do terceiro.{"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Outros objetivos específicos -
                            </Text>
                            <Text style={styles.listViewFont}>
                                Podemos usar seus dados pessoais para outras finalidades comerciais específicas, inclusive para manter as operações e a segurançadiária dos Sites da Nestlé, realizar estudos demográficos e auditorias e entrar em contato comvocê para fazer pesquisas do consumidor.{"\n"}
                            </Text>

                        </View>

                        <Text style={styles.title}>
                            5 - O compartilhamento de dados pessoais pela Nestlé
                        </Text>
                        <Text style={styles.text}>
                            A Nestlé não compartilha seus dados pessoais com terceiros que pretendem usá-los para fins de marketing direto, a não ser que você tenha dado um consentimento específico para tanto.
                            A Nestlé poderá compartilhar seus dados pessoais com terceiros para outras finalidades, massomente nas seguintes circunstâncias:
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            1.5.1. -Afiliadas
                        </Text>
                        <Text style={styles.text}>
                            A Nestlé poderá fornecer seus dados pessoais para suasafiliadas ou companhias relacionadas para fins comerciais legítimos.
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            1.5.2. -Prestadores de serviços
                        </Text>
                        <Text style={styles.text}>
                            A Nestlé poderá contratar prestadores de serviços,representantes ou autônomos para prestar serviços da Nestlé, inclusive administrar os Sites daNestlé e os serviços que são disponibilizados a você. Esses terceiros poderão ter acesso ou, dequalquer outra forma, processar seus dados pessoais durante a prestação desses serviços.

                            A Nestlé exige que esses terceiros, que podem estar sediados fora do país do qual você estáacessando o site ou serviço da Nestlé, a cumprirem com todas as leis relevantes de proteção dedados e requisitos de segurança relacionados com seus dados pessoais, geralmente por meio de umcontrato escrito.
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            1.5.3. -Parceiros e promoções conjuntas
                        </Text>
                        <Text style={styles.text}>
                            A Nestlé poderá fazer programas ou promoções conjuntas ou em copatrocínio com outra companhia e, comoparte de seu envolvimento nessa atividade, coletar e usar seus dados pessoais.
                            Seus dado spessoais serão compartilhados com outra companhia somente se você tiver optado por receberinformações diretamente daquela companhia. A Nestlé pede que você leia a política de privacidade da outra companhia antes de compartilhar seus dados pessoais. Se você não quiser que seus dados pessoais sejam coletados ou compartilhados com outra companhia, exceto a Nestlé, pode sempre decidir não participar dessa atividade. Se você optar (opt-in) por receber comunicações dessaoutra companhia, lembre-se que tem o direito de optar pelo não recebimento (opt-out) a qualquertempo, mas, para tanto, precisará entrar diretamente em contato com a outra companhia.
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            1.5.4. -Requisitos legais e transferência de negócio
                        </Text>
                        <Text style={styles.text}>
                            A Nestlé poderá divulgar seus dados pessoais se exigido por força de lei ou se, de acordo com uma decisão de boa-fé da Nestlé,essa divulgação legal for considerada razoavelmente necessária para cumprir com procedimentos judiciais ou contestar qualquer ação.
                            Na hipótese de uma fusão total ou parcial, ou aquisição da totalidade ou parte da Nestlé por outra companhia, o adquirente terá acesso às informações mantidas pelo negócio Nestlé, o que inclui dados pessoais.
                            {"\n"}
                        </Text>


                        <Text style={styles.title}>
                            6 -Seus Direitos
                        </Text>
                        <Text style={styles.title}>
                            1.6.1. -Opção por receber comunicações de marketing (opt-in)
                        </Text>
                        <Text style={styles.text}>
                            Você pode optar por receber (opt-in) comunicações de marketing sobre a Nestlé e pode fazer isso:
                            {"\n"}
                            1. (a) seguindo as instruções para receber (opt-in) as comunicações de marketing relevantes;
                            {"\n"}
                            2. (b) se você tiver um cadastro com a Nestlé, terá a opção de mudar suas preferências de recebimento de comunicações comerciais (opt-in/opt-out) na seção editar seu cadastro; ou
                            {"\n"}
                            3. (c) entrando emcontato conosco pelo Fale Conosco Observe que mesmo que você opte por não receber (opt-out) comunicações de marketing, poderá sempre receber comunicações administrativas da Nestlé, como confirmações de pedidos de compra enotificações sobre as atividades de seu cadastro (p.ex., confirmações de cadastro e trocas desenha)
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            2.6.2. -Acesso e retificação
                        </Text>
                        <Text style={styles.text}>
                            Você tem o direito de solicitar o acesso a seus dados pessoais. Você podenos enviar um pedido para esse acesso. Se a Nestlé não puder fornecer o acesso a seus dados pessoais, lhe enviará uma resposta explicando as razões para tanto. Você também terá o direitode solicitar que a Nestlé corrija quaisquer informações incorretas em seus dados pessoais. Sevocê tiver um cadastro em um Site da Nestlé, isso poderá ser feito, na maioria das vezes,através da seção apropriada “seu cadastro” ou “seu perfil” no Site da Nestlé (quando disponível). Caso contrário, você poderá sempre nos enviar um pedido para retificar seus dados.
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            7. -Cookies e outras tecnologias de rastreamento
                        </Text>

                        <Text style={styles.title}>
                            7.1 -O que são cookies?
                        </Text>
                        <Text style={styles.text}>
                            Cookies são pequenos arquivos de texto colocados noseu computador por Sites que você visita. São amplamente utilizados para fazer os Sitesfuncionarem, ou funcionarem de forma mais eficiente, bem como para fornecer informações aosproprietários do site.
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            7.2 -Como e por que usamos cookies?
                        </Text>
                        <Text style={styles.text}>
                            Usamoscookies para melhorar o uso e a funcionalidade dos Sites da Nestlé e entender melhor como nossosvisitantes usam os Sites da Nestlé, bem como as ferramentas e serviços ali oferecidos. Oscookies nos ajudam a adaptar os Sites da Nestlé às suas necessidades pessoais, facilitar cadavez mais o seu uso, receber feedback da satisfação do consumidor e nos comunicarmos com você deoutros locais na internet.
                            {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            7.3 -Que tipos de cookies são usados nos Sites da Nestlé?
                        </Text>
                        <Text style={styles.text}>
                            Usamos os seguintes tipos de cookies nos Sites daNestlé:

                            {"\n"}
                        </Text>

                        <View style={styles.listView}>
                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Cookies de sessão -
                            </Text>
                            <Text style={styles.listViewFont}>
                                São cookies temporáriosque são apagados quando você fecha o seu navegador. Quando você reinicia o seu navegador e voltapara o site que criou o cookie, esse site trata você como um novovisitante.
                            {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Cookies persistentes -
                            </Text>
                            <Text style={styles.listViewFont}>
                                Esses cookiespermanecem no seu navegador até você deletá-los manualmente ou até o seu navegador deletá-los deacordo com o período de duração estabelecido pelo cookie. Esses cookies reconhecerão seu retornocomo visitante.
                            {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Cookies necessários -
                            </Text>
                            <Text style={styles.listViewFont}>
                                São cookiesestritamente necessários para a operação de um Site da Nestlé. Eles permitem que você naveguepelo site e uso nossos recursos.
                            {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Cookies que nos mandam informações sobre você -
                            </Text>
                            <Text style={styles.listViewFont}>
                                Esses cookies são colocados por nós em um Site da Nestlé esó podem ser lidos por esse site. São conhecidos como cookies “de primeira parte”.
                            {"\n"}
                            </Text>


                        </View>

                        <Text style={styles.text}>
                            Tambémcolocamos cookies em propagandas da Nestlé que são exibidas em sites de terceiros (p.ex.,Facebook). Obtemos informações através desses cookies quando você clica ou interage com apropaganda. Nessa situação, a Nestlé está colocando um cookie “de terceiro”. A Nestlé poderáusar as informações obtidas por esses cookies para mandar-lhe outras propagandas que sãorelevantes ou de seu interesse com base no seu comportamento online anterior.

                            {"\n"}
                        </Text>

                        <View style={styles.listView}>
                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Cookies que mandam informações para outras companhias -
                            </Text>
                            <Text style={styles.listViewFont}>
                                São cookies colocados em um SiteNestlé por nossas companhias parceiras (p.ex., Facebook ou anunciantes). Eles podem usar osdados coletados por esses cookies para lhe enviar anonimamente propagandas direcionadas deoutros sites, com base em sua visita ao Site Nestlé. Por exemplo, sevocê usar um widget social(p.ex., ícone do Facebook) em um Site da Nestlé, ele registrará seu “compartilhar” ou “curtir”.O Facebook (como é a companhia que colocou o cookie) coletará esses dados.
                            {"\n"}
                            </Text>
                        </View>


                        <Text style={styles.title}>
                            7.4. -Exemplos de cookies colocados neste Site
                        </Text>


                        <View style={styles.listView}>
                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Cookies de Desempenho | Tipo: Analíticos | Categoria: Persistentes de Sessão de Terceiros
                            </Text>
                            <Text style={styles.listViewFont}>
                                Objetivo : Ajudam-nos a entender como os visitantes interagem com nosso Site fornecendo informações sobre as áreas visitadas, o tempo gasto e quaisquer problemas encontrados, como erros de mensagem. Isso nos ajuda a melhorar o desempenho de nossos Sites.
                                {"\n"}
                                Dados coletados: Todos os dados são coletados e agregados anonimamente.
                                {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Cookies de Compartilhamento Social (também conhecidos como cookies “de Terceiros” ou “Widgets Sociais”) | Tipo: Midia Social / Compartilhamento | Categoria: de Terceiros
                            </Text>
                            <Text style={styles.listViewFont}>
                                Objetivo : O compartilhamento social oferecido no Site é executado por terceiros. Esses terceiros podem colocar cookies no seu computador quando você usa recursos de compartilhamento social no Site, ou se você já tiver feito o login neles. Esses cookies ajudam a melhorar sua experiência no Site. Permitem que você compartilhe comentários / avaliações / páginas / indicadores e ajudam a dar acesso às redes sociais e às ferramentas sociais online com maior facilidade.
                                {"\n"}
                                Dados coletados: Esses cookies podem coletar dados pessoais que você divulgou voluntariamente, como seu nome de usuário.
                                {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Direcionado / Propaganda | Tipo: Rastreamento Cruzado de Sites | Categoria: Persistente de Sessão de Terceiros
                            </Text>
                            <Text style={styles.listViewFont}>
                                Objetivo : Esses cookies são usados para entregar conteúdo através de propaganda direcionada e relevante para você e seus interesses, ou para limitar o número de vezes que você vê um anúncio específico. Esses cookies também nos ajudam a medir a eficácia das campanhas de propaganda em Sites da Nestlé e Não-Nestlé. Podemos compartilhar essas informações com outras partes, inclusive nossas agências.
                                {"\n"}
                                Dados coletados: Esses cookies rastreiam os usuários através de seus endereços IP.
                                {"\n"}
                            </Text>

                            <Text style={styles.listViewFontBold}>
                                {'\u25CB'} Diversos | Tipo: Flash Cookies | Categoria: Persistente de Terceiros
                            </Text>
                            <Text style={styles.listViewFont}>
                                Objetivo : Flash cookies podem armazenar suas preferências, como controle de volume ou pontuação alta em jogos, ou mostrar conteúdo baseado no que você vê no Site para personalizar sua visita. Nossos parceiros podem fornecer alguns recursos no Site, como promoções e jogos, e usar Flash Cookies para coletar e armazenar suas informações.
                                {"\n"}
                                Dados coletados: Esses cookies podem coletar dados anônimos e pessoais.
                                {"\n"}
                            </Text>
                        </View>

                        <Text style={styles.title}>
                            7.5. -Outras tecnologias similares
                        </Text>


                        <Text style={styles.text}>
                            Os Sites da Nestlé também usam outras tecnologias de rastreamento, inclusive endereços IP,arquivos de registro e sinalizadores da web, que também nos ajudam a adaptar os Sites da Nestléàs suas necessidades pessoais.

                            {"\n"}
                        </Text>


                        <Text style={styles.title}>
                            Endereços de IP
                        </Text>

                        <Text style={styles.text}>
                            Um endereço de IP é um número usado por computadores na rede para identificar seu computadortodas as vezes que você se conecta na Internet. Podemos registrar Endereços de IP para asseguintes finalidades: (i) problemas técnicos de troubleshoot, (ii) manutenção da proteção esegurança do Site, (iii) melhor compreensão de como nossos Sites são utilizados, e, (iv)conteúdo mais bem adaptado às suas necessidades, dependendo do país em que você estiver.
                        {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            Arquivos de Registro
                        </Text>

                        <Text style={styles.text}>
                            Nós (ou um terceiro em nosso nome) poderemos coletar informações na forma de arquivos de registroque registram as atividades do Site e coletam estatísticas sobre os hábitos de navegação dousuário. Em geral, esses registros são gerados anonimamente e nos ajudam a coletar (entre outrascoisas) (i) o tipo de navegador e o sistema do usuário; (ii) informações sobre a sessão dousuário (como seu URL de origem, a data, hora e quais páginas o usuário visitou em nosso Site equanto tempo permaneceu nele); e, (iii) outros dados de navegação ou de contagem de cliques(p.ex., relatório de tráfego de site e contagem de visitantes únicos).
                        {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            Sinalizadores da Web
                        </Text>

                        <Text style={styles.text}>
                            Usamos os sinalizadores da web (ou GIFs transparentes) nos Sites da Nestlé. Os sinalizadores daweb (também conhecidos como “web bugs”) são pequenas sequencias de código que permitem a entregade uma imagem gráfica em uma página da web com o objetivo de transferir dados de volta para nós.Usamos as informações dos sinalizadores da web para os mais variados propósitos, inclusiveinformações sobre como um usuário responde a campanhas de e-mail (p.ex., a hora em que o e-mailé aberto, que link o usuário faz a partir do e-mail), relatórios de tráfego do site, contagem devisitantes únicos, auditoria e relatórios de propaganda e e-mail, e personalização.
                        {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            7.6. Gerenciamento de seus cookies/preferências
                        </Text>


                        <Text style={styles.text}>
                            Você deve se assegurar que as configurações do seu computador reflitam se você consente emaceitar cookies ou não. Você pode configurar o seu navegador para avisá-lo antes de aceitarcookies ou simplesmente recusá-los. Você não precisa ter cookies para usar ou navegar a maiorparte dos Sites da Nestlé, apesar de que, provavelmente, não conseguirá acessar todos os seusrecursos nesse caso. Veja no botão “ajuda” no seu navegador (p.ex., Internet Explorer, Firefox)como você pode fazer isso. Lembre-se que se você usar computadores diferentes em locaisdiferentes, você precisará se assegurar de que cada navegador está ajustado para suaspreferências de cookies.
                            Como o sinalizador da web faz parte de uma página da web, não é possível usar o recurso “opt-out”com relação a esse sinalizador, mas você pode torna-lo ineficaz usando o recurso “opt-out” paraos cookies colocados por esse sinalizador.
                            Além disso, quando disponível, você pode decidir se permite que cookies sejam colocados no seucomputador ou fazer o opt-out dos cookies visitando os seguintes sites e selecionando quaiscookies da companhia você deseja recusar:
                            http://www.aboutads.info/choices/#completed ou http://www.youronlinechoices.eu/.
                        {"\n"}
                        </Text>


                        <Text style={styles.title}>
                            8. Segurança e retenção dos dados
                        </Text>

                        <Text style={styles.title}>
                            8.1. Segurança dos dados
                        </Text>

                        <Text style={styles.text}>
                            Para manter seus dados pessoais seguros, a Nestlé implementou uma série de medidas de segurança,inclusive:

    - Ambientes operacionais seguros - A Nestlé armazena seus dados em ambientes operacionais segurose acessíveis somente aos funcionários, representantes e prestadores de serviços Nestlé conformenecessário. A Nestlé também segue os padrões da indústria geralmente aceitos com relação a essetema.

    - Criptografia para informações de pagamento - A Nestlé usa criptografia de padrão industrialpara proteger informações financeiras sensíveis, como as informações de cartão de créditoenviadas pela Internet (p.ex., quando você faz pagamentos através das lojas Nestlé online).

    - Autenticação prévia para acessar o cadastro

    A Nestlé exige que os consumidores registrados verifiquem sua identidade (p.ex., ID de login esenha) antes de poderem acessar ou fazer alterações em seus cadastros. O objetivo é prevenir acessos não autorizados.

    Observe que essas proteções não se aplicam aos dados pessoais que você decide compartilhar em áreas públicas, como nos Sites das Comunidades Virtuais (Mídia Social).
                        {"\n"}
                        </Text>


                        <Text style={styles.title}>
                            8.2. Retenção
                        </Text>


                        <Text style={styles.text}>
                            A Nestlé reterá somente seus dados pessoais pelo tempo necessário para o objetivo estipulado, levando em conta também nossa necessidade de responder perguntas ou resolver problemas, fornecer serviços novos e melhores, e cumprir com os requisitos legais nos termos das leis aplicáveis.
    
    Isso significa que poderemos reter seus dados pessoais por um prazo razoável após sua última interação conosco. Quando os dados pessoais que coletamos não forem mais necessários, nós os destruiremos ou deletaremos de forma segura.
                        {"\n"}
                        </Text>

                        <Text style={styles.title}>
                            9. Entre em contato conosco
                        </Text>


                        <Text style={styles.text}>
                            A Nestlé age como um “controlador de dados” com relação aos dados pessoais que processa de acordo com a estrutura desta Política de Privacidade. Se você tiver perguntas ou comentários relacionados com esta Política de Privacidade, ou com as práticas de coleta de dados pessoais da Nestlé, entre em contato:
                            {"\n"}
                            Telefone: clique aqui para ver nossos telefones
                            {"\n"}
                            E-mail: falecom@nestle.com.br
                            {"\n"}
                            Endereço:
                            {"\n"}
                            Nestlé Brasil Ltda.
                            {"\n"}
                            Av. Dr. Chucri Zaidan, 246
                            {"\n"}
                            CEP: 04583-110 - Vila Cordeiro
                            {"\n"}
                            São Paulo - SP
                        {"\n"}
                        </Text>

                        <Text style={styles.infoBottom}>
                            Para maiores informações envie um e-mail para info@bovcontrol.com
                    </Text>

                    </View>
                </ScrollWrapperStyle>
            </Wrapper >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    },
    text: {
        color: "#000000",
        fontSize: 14,
        marginLeft: 10,
        textAlign: 'justify'
    },
    title: {
        color: "#000000",
        fontWeight: "900",
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10
    },
    infoBottom: {
        marginTop: 30,
        marginBottom: 20,
        marginLeft: 10,
        color: "#000000",
    },
    listView: {
        marginLeft: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    listViewFont: {
        color: "#000000"
    },
    listViewFontBold: {
        fontWeight: "900",
        color: "#000000",
        marginRight: 5
    }
})

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;






