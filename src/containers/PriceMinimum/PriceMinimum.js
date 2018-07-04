import React, {Component} from 'react';
import {View} from 'react-native';

import styled, {css} from 'styled-components/native';

import {
    Wrapper,
    TopBar,
    Icon,
    DrawerButton,
    ScrollWrapper,
    Text
  } from '~/components/shared';
import { TextInput } from 'react-native';

class PriceMinimum extends Component {
    render() {
        return (
            <Wrapper secondary>
                <TopBar
                    title="Preço Mínimo"
                    rightComponent={<Icon inverted name="bell" />}
                    leftComponent={<DrawerButton />}
                />
                <ScrollWrapperStyle>
                    <WrapperHeader>
                        <Message size='19'>Insira os dados de sua propriedade abaixo para simular a previsão de preço a ser pago em Abril de 2018</Message>
                    </WrapperHeader>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Preço base</Column1>
                            <Column2>(R$/Litro)</Column2>
                        </StyledView>
                        <StyledTextInput inverted blue>0,7500</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Ad. mercado</Column1>
                            <Column2>(R$/Litro)</Column2>
                        </StyledView>
                        <StyledTextInput inverted blue>0,3400</StyledTextInput>
                    </WrapperItem>

                    <WrapperSeparator>
                    </WrapperSeparator>

                    <WrapperItem>
                        <StyledView>
                            <Column1>Ad. Volume</Column1>
                            <Column2>(L/Dia)</Column2>
                        </StyledView>
                        <StyledTextInput white>0,0390</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Ad. Distância</Column1>
                            <Column2>(Km)</Column2>
                        </StyledView>
                        <StyledTextInput white>0,0390</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>CBT</Column1>
                            <Column2>(x 1.000)</Column2>
                        </StyledView>
                        <StyledTextInput white>0,0390</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>CCS</Column1>
                            <Column2>(x 1.000)</Column2>
                        </StyledView>
                        <StyledTextInput white>0,0390</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Proteína</Column1>
                            <Column2>(g/100g)</Column2>
                        </StyledView>
                        <StyledTextInput white>0,0390</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Gordura</Column1>
                            <Column2>(g/100g)</Column2>
                        </StyledView>
                        <StyledTextInput white>0,0390</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>BPF</Column1>
                            <Column2>(????)</Column2>
                        </StyledView>
                        <StyledTextInput white>0,0390</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>PNCBT</Column1>
                            <Column2>(????)</Column2>
                        </StyledView>
                        <StyledTextInput white>0,0390</StyledTextInput>
                    </WrapperItem>
                    <WrapperItemTotal>
                        <StyledView>
                            <Column1 inverted>Total</Column1>
                            <Column2 inverted>(soma simples)</Column2>
                        </StyledView>
                        <StyledTextInput inverted white>1,0997</StyledTextInput>
                    </WrapperItemTotal>

                    <WrapperSeparator>
                    </WrapperSeparator>

                    <WrapperItem>
                        <View>
                            <Message size='19' textblack>Indicativo de variação do adicional de mercado para o leite fornecido em:</Message>
                        </View>
                        <StyledViewFooter>
                            <Indicativo1>Maio de 2018</Indicativo1>
                            <Indicativo2>ALTA</Indicativo2>
                        </StyledViewFooter>
                    </WrapperItem>

                    <WrapperFooter>
                        <Message size='12'>* O indicativo de preço não é um compromisso de preço a ser praticado. É uma tendência de preço, baseado em análises da equipe Nestlé...</Message>
                    </WrapperFooter>
                </ScrollWrapperStyle>
            </Wrapper>
        );
    }
}

const StyledView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const StyledViewFooter = StyledView.extend`
    width: 100%;
    /* border: 1px solid red; */
`;

const StyledTextInput = styled.TextInput`
    text-align: center;
    margin-top: 18;
    margin-right: 18;
    margin-bottom: 8;
    height: 50;
    width: 90;
    background-color: rgba(255,255,255,0.0);
    border: 1px solid #0196ff;
    color: #0196ff;
    font-size: 18;

    ${props =>
        props.blue &&
        css`
          background-color: rgba(1,150,255,1.0);
        `}
    
    ${props =>
        props.inverted &&
        css`
          color: ${props => props.theme.textInverted};
        `}

    ${props =>
        props.inverted && props.white &&
        css`
            border: 1px solid #ffffff;
        `}
`;

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;

const WrapperHeader = styled.View`
  padding-bottom: 2;
`;

const WrapperFooter = styled.View`
  padding-bottom: 2;
`;

const WrapperItem = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${props => props.theme.bg};
  padding-right: 8;
  padding-left: 8;
  padding-bottom: 8;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid #ededed;
  box-shadow: 0px 1px 3px #101010;
`;

const WrapperSeparator = styled.View`
  padding-right: 8;
  padding-left: 8;
  padding-bottom: 8;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid #ededed;
  box-shadow: 0px 1px 3px #101010;
`;

const WrapperItemTotal = WrapperItem.extend`
  background-color: #00cdff;
`;

const Message = Text.extend`
  padding-top: 28;
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
  color: #707070;

  ${props =>
    props.textblack &&
    css`
        color: #000000;
    `}

  ${props =>
    props.size &&
    css`
      font-size: ${props.size};
    `}
`;

const Column1 = Text.extend`
  padding-top: 28;
  padding-left: 8;
  padding-bottom: 8;
  font-size: 19;
  color: #000000;
  ${props =>
    props.inverted &&
    css`
      color: ${props => props.theme.textInverted};
    `}
`;

const Column2 = Column1.extend`
  padding-top: 32;
  font-size: 14;
  color: #707070;
  ${props =>
    props.inverted &&
    css`
      color: #7fe7ff;
    `}
`;

const Indicativo = Text.extend`
  font-size: 20;
  margin: 8px 8px 8px 8px;
  padding: 6px 8px 6px 8px;
  text-align: center;
`;

const Indicativo1 = Indicativo.extend`
  color: #6e6e6e;
  border: 1px solid #000000;
  margin-right: 2px;
`;

const Indicativo2 = Indicativo.extend`
  color: #ffffff;
  background-color: #00cdff;
  /* width: 48%; */
  width: 150px;
  margin-left: 2px;
`;

export default PriceMinimum;