import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styled, { css } from 'styled-components/native';

import {
    Wrapper,
    TopBar,
    Icon,
    DrawerButton,
    ScrollWrapper
} from '~/components/shared';


export default class UseTerms extends Component {
    render() {
        return (
            <Wrapper >
                <TopBar
                    title="Termos de uso"
                    rightComponent={<Icon inverted name="bell" />}
                    leftComponent={<DrawerButton />}
                />
                <ScrollWrapperStyle>
                    <Text>
                        Termos e Condições do Site da Nestlé
    Obrigado por visitar este site. Pedimos que leia os Termos e Condições contidos neste documento cuidadosamente, já que qualquer uso que você fizer deste site constitui a aceitação dos Termos e Condições aqui estipulados.

    Em todo este site, os termos “nós”, “nosso”, “Nestlé” e “Grupo Nestlé” referem-se à Nestlé S.A. e qualquer uma de suas afiliadas, conforme apropriado ao contexto. “Você” se refere a qualquer pessoa que acessar e/ou usar este site.

    Política de Privacidade do Site
    Qualquer informação pessoal ou material enviado a este site está sujeito aos termos e condições estipulados na Política de Privacidade contida neste mesmo site.

    Informações precisas, completas e atuais
    Apesar de tomarmos todas as medidas possíveis para garantir a precisão e integridade das informações em nosso site, não somos responsáveis se as informações que disponibilizamos neste site não forem precisas ou completas. Caberá exclusivamente a você decidir se confia nos materiais incluídos neste site. Fica acordado que é sua responsabilidade monitorar quaisquer mudanças nos materiais e informações contidos neste site.

    Transmissão
    Qualquer comunicação ou material não pessoal que você transmitir a este site por correio eletrônico, ou de qualquer outra forma, inclusive dados, perguntas, comentários, sugestões ou informações similares será tratada como não-confidencial e não-proprietária. Qualquer informação que você transmitir ou postar se tornará propriedade do Grupo Nestlé e poderá ser utilizada para qualquer finalidade, inclusive, mas não apenas, reprodução, divulgação, transmissão, publicação, difusão e postagem. Além disso, o Grupo Nestlé poderá utilizar livremente para qualquer propósito que seja (inclusive, entre outros, desenvolvimento, fabricação, publicidade ou comercialização de produtos) quaisquer ideias, artes finais, invenções, desenvolvimentos, sugestões ou conceitos contidos em qualquer comunicação que você enviar a este site. Tal uso não dará direito a qualquer tipo de remuneração à parte que submeter a informação. Ao submeter uma informação, você também está garantindo que é proprietário do material/conteúdo apresentado, que esse material/conteúdo não é difamatório e que, por tal uso, o Grupo Nestlé não violará os direitos de nenhum terceiro, ou qualquer lei aplicável. O Grupo Nestlé não tem obrigação de usar as informações apresentadas.

    Direitos de Propriedade Intelectual
    Todos os direitos autorais, marcas registradas e outros direitos de propriedade intelectual em todos os textos, imagens e outros materiais neste site são de propriedade do Grupo Nestlé, ou foram incluídos com a permissão do proprietário relevante.
    Você poderá navegar este site, reproduzir trechos por meio de impressão, baixando as informações para o disco rígido, ou com o objetivo de distribuir a outras pessoas. Isso somente poderá ser feito sob a condição de você manter intactos todos os direitos autorais e outras notificações proprietárias e da notificação de marca registrada abaixo constar em todas as reproduções. Nenhuma reprodução de qualquer parte deste site poderá ser vendida ou distribuída comercialmente, nem poderá ser modificada ou incorporada em qualquer trabalho, publicação ou site.

    ® Reg. Trademark of Société des Produits Nestlé S.A. . All rights reserved.
    As marcas registradas, logotipos, personagens e marcas de serviço (coletivamente, “Marcas Registradas”) exibidos neste site pertencem à Société des Produits Nestlé S.A., parte do Grupo Nestlé. Nada contido neste site deverá ser interpretado como a concessão de uma licença ou direito de uso de qualquer Marca Registrada exibida neste site. A utilização ou uso impróprio das Marcas Registradas exibidas neste site, ou em qualquer conteúdo aqui incluído, é estritamente proibido, exceto conforme disposto nestes Termos e Condições. Reiteramos que o Grupo Nestlé tomará todas as medidas legais previstas em lei para proteger seus direitos de propriedade intelectual.

    Links para outros sites
    Links nos sites do Grupo Nestlé podem conduzi-lo para fora da rede e dos sistemas do Grupo Nestlé, que não aceita nenhuma responsabilidade pelo conteúdo, exatidão ou funcionamento destes sites de terceiros. Os links são fornecidos de boa-fé e o Grupo Nestlé não pode ser considerado responsável por quaisquer alterações subsequentes nos sites de terceiros cujos links são fornecidos por nós. A inclusão de um link para outros sites não implica um endosso pelo Grupo Nestlé. Recomendamos insistentemente que você tenha cuidado e leia com atenção as notificações legais e de privacidade de todos os sites que visitar.

    Garantias e Isenção de Responsabilidade
    Você está utilizando este site por sua conta e risco.

    Garantias
    Este site lhe é apresentado “as is”, ou seja, no estado em que se encontra, e “as available”, a saber, conforme a disponibilidade, e, consequentemente, o Grupo Nestlé não dá nenhum tipo de garantia, seja expressa, implícita, legal, ou de qualquer outra forma (aqui incluídas as garantias implícitas de comercialização ou qualidade e adequação satisfatórias para um propósito específico), inclusive garantias ou declarações de que o material neste site é completo, exato, confiável, atual, e não infringe os direitos de terceiros; de que o acesso a este site será ininterrupto, livre de erros ou de vírus; de que este site será seguro; ou de que qualquer conselho ou opinião obtido do Grupo Nestlé neste site é preciso ou confiável; e que o Grupo Nestlé se isenta de qualquer responsabilidade com relação a declarações ou garantias relacionadas com tais conselhos ou opiniões.
    Observe que algumas jurisdições podem não permitir a exclusão de garantias implícitas, portanto, algumas exclusões podem não se aplicar a você. Por favor, verifique a legislação local.
    Reservamo-nos o direito de restringir, suspender ou impedir seu acesso a este site, no todo ou em parte, a qualquer tempo, sem notificação.

    Responsabilidade
    O Grupo Nestlé e/ou qualquer outra parte envolvida na criação, produção ou gerenciamento deste site em nosso nome não terá nenhuma responsabilidade por qualquer dano direto, incidental, consequente, indireto, especial ou punitivo, custo, perda ou responsabilidade de qualquer natureza e de qualquer forma decorrente de seu acesso, do uso, impossibilidade de uso ou mudança de conteúdo deste site ou de qualquer outro site que venha a ser acessado através de link neste site, ou ainda, conforme permitido por lei aplicável, ou por qualquer medida que venhamos a tomar ou deixar de tomar como resultado de quaisquer mensagens eletrônicas que você nos enviar.
    O Grupo Nestlé e/ou qualquer outra parte envolvida na criação, produção ou gerenciamento deste site não será responsável pela manutenção dos materiais ou serviços aqui disponibilizados ou por quaisquer correções, atualizações ou liberações referentes a estes. Qualquer material deste site está sujeito a alterações sem aviso prévio.
    Além disso, o Grupo Nestlé não terá nenhuma responsabilidade por qualquer perda sofrida em decorrência de vírus que possa infectar seu computador ou outro bem, devido ao seu uso, acesso ou baixa de qualquer material deste site. Se você decidir baixar qualquer material deste site, será sob sua inteira responsabilidade.
    Sujeito às leis aplicáveis, você renuncia expressamente a toda e qualquer reclamação contra o Grupo Nestlé, seus executivos, conselheiros, funcionários, fornecedores e programadores que possa resultar de seu uso ou acesso a este site.

    Atividades Proibidas
    Você está expressamente proibido de realizar qualquer ato que o Grupo Nestlé, à sua inteira discrição, possa considerar impróprio e/ou ilegal, ou que seja proibido pelas leis aplicáveis a este site, inclusive, entre outros:

    Qualquer ato que possa constituir uma violação de privacidade (inclusive a transferência de informações privadas sem o consentimento da pessoa em questão) ou qualquer outro direito legal das pessoas;
    O uso deste site para difamar ou caluniar o Grupo Nestlé, seus funcionários ou outras pessoas, ou agir de tal forma que prejudique o bom nome do Grupo Nestlé;
    Fazer a transferência de arquivos que contenham vírus que possam causar danos aos bens do Grupo Nestlé ou de outras pessoas; e,
    Postar ou transmitir para este site qualquer material não autorizado, inclusive, mas não apenas, material que, em nossa opinião, causar problemas, perdas ou constituir uma infração aos sistemas do Grupo Nestlé ou de terceiros, ou ainda à segurança da rede, ser difamatório, racista, obsceno, ameaçador, pornográfico ou, de qualquer outra forma, ilegal.


    Jurisdição e Legislação Aplicável
    O Grupo Nestlé não faz nenhuma declaração de que o material e as informações neste site são apropriados ou estão disponíveis em todas as localidades ou idiomas nacionais.
    Você e o Grupo Nestlé acordam que qualquer controvérsia ou reclamação resultante ou pertinente ao uso deste site será regida pela legislação da Suíça, ficando submetida à jurisdição exclusiva da justiça suíça.

    Atualização da notificação legal
    Reservamo-nos o direito de fazer quaisquer modificações e correções nesta notificação. Pedimos que retorne à esta página periodicamente para revisar estas e novas informações adicionais.




    Para maiores informações envie um e-mail para info@bovcontrol.com
                    </Text>
                </ScrollWrapperStyle>
            </Wrapper>
        )
    }
}


const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;






