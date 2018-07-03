import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import styled, { css } from 'styled-components/native';

import {
    Wrapper,
    TopBar,
    Icon,
    DrawerButton,
    ScrollWrapper,
    BackButton
} from '~/components/shared';


export default class PrivacyPolicy extends Component {
    render() {
        return (
            <Wrapper >
                <TopBar
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
                            1- Escopo e Aceitação desta Política de Privacidade
                        </Text>


                        <Text style={styles.text}>
                            Esta Notificação de Política de Privacidade se aplica aos dados pessoais que coletamos sobre você com a finalidade de lhe fornecer nossos
                            produtos e serviços.
                            {"\n"}
                            {"\n"}
                            {"\n"}
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
    }
})

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;






