import React, {Component} from 'react';
import {View, Picker } from 'react-native';
import styled, {css} from 'styled-components/native';
import {
    Wrapper,
    TopBar,
    Icon,
    DrawerButton,
    ScrollWrapper,
    Text,
    TextInput
} from '~/components/shared';

import {
    compose,
    withHandlers,
    withProps,
    setPropTypes,
    withState,
    lifecycle
} from 'recompose';
import {connect} from 'react-redux';
import {isNumber} from 'lodash';
import Intl from 'intl';

require( 'intl/locale-data/jsonp/pt' );

const enhance = compose(
    connect(
        ({factors}) => ({factors}),
        {}
    ),
    withState('bpf', 'setBpf', 0), 
    withState('pncebt', 'setPncebt', 0), 
    withState('AdVolumeText', 'setAdVolumeText', 'L/Dia'), 
    withState('AdDistanciaText', 'setAdDistanciaText', 'Km'), 
    withState('CbtText', 'setCbtText', 'x 1.000/'), 
    withState('CcsText', 'setCcsText', 'x 1.000/'), 
    withState('ProteinaText', 'setProteinaText', 'g/100g'), 
    withState('GorduraText', 'setGorduraText', 'g/100g'), 

    withState('volume', 'setVolume', 0.0), 
    withState('distancia', 'setDistancia', 0.0), 
    withState('cbt', 'setCbt', 0.0), 
    withState('ccs', 'setCcs', 0.0), 
    withState('proteina', 'setProteina', 0.0), 
    withState('gordura', 'setGordura', 0.0), 

    /* withProps(({statements, month}) => {}), */
    lifecycle({
        componentWillMount() {
        }
    })
);

export const PriceMinimum = enhance (
    ({
        factors, bpf, pncebt, AdVolumeText, AdDistanciaText, CbtText, CcsText, ProteinaText, GorduraText,
        setBpf, setPncebt, setAdVolumeText, setAdDistanciaText, setCbtText, setCcsText, setProteinaText, 
        setGorduraText, volume, setVolume, distancia, setDistancia, cbt, setCbt, ccs, setCcs, 
        proteina, setProteina, gordura, setGordura
    }) => 
    {
        console.log('factors', factors);
        return (
            <Wrapper secondary>
                <TopBar
                    title="Preço Mínimo"
                    rightComponent={<Icon inverted name="bell" />}
                    leftComponent={<DrawerButton />}
                />
                <ScrollWrapperStyle>
                    <WrapperHeader>
                        <Message size='18'>Insira os dados de sua propriedade abaixo para simular a previsão de preço a ser pago em Abril de 2018</Message>
                    </WrapperHeader>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Preço base</Column1>
                            <Column2>(R$/Litro)</Column2>
                        </StyledView>
                        <StyledTextInput inverted blue>0,750</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Ad. mercado</Column1>
                            <Column2>(mínimo)</Column2>
                        </StyledView>
                        <StyledTextInput inverted blue>0,340</StyledTextInput>
                    </WrapperItem>

                    <WrapperSeparator>
                    </WrapperSeparator>

                    <WrapperItem>
                        <Column1>Ad. Volume</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(AdVolumeText === 'L/Dia') setAdVolumeText('') } } 
                                onChangeText={ (AdVolumeText) => { setAdVolumeText(AdVolumeText); factors.items.forEach(el => { 
                                    //if (isNumber(AdVolumeText)) {
                                        if(el.type==="volume") { if (el.value === parseInt(AdVolumeText)) setVolume(el.bonus); }  
                                    //}
                                }); }  }
                                onBlur={ () => { if(AdVolumeText === '') setAdVolumeText('L/Dia') } } 
                                value={ AdVolumeText } 
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 3 }).format(volume)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Ad. Distância</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(AdDistanciaText === 'Km') setAdDistanciaText('') } } 
                                onChangeText={ (AdDistanciaText) => { setAdDistanciaText(AdDistanciaText); factors.items.forEach(el => { 
                                    //if (isNumber(AdDistanciaText)) {
                                        if(el.type==="distance") { if (el.value === parseInt(AdDistanciaText)) setDistancia(el.bonus); }  
                                    //}
                                }); } }
                                onBlur={ () => { if(AdDistanciaText === '') setAdDistanciaText('Km') } } 
                                value={ AdDistanciaText } 
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 3 }).format(distancia)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>CBT</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(CbtText === 'x 1.000/') setCbtText('') } } 
                                onChangeText={ (CbtText) => {setCbtText(CbtText); factors.items.forEach(el => { 
                                    //if (isNumber(CbtText)) {
                                        if(el.type==="cbt") { if (el.value === parseInt(CbtText)) setCbt(el.bonus); }  
                                   // }
                                }); } }
                                onBlur={ () => { if(CbtText === '') setCbtText('x 1.000/') } }
                                value={ CbtText } 
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 3 }).format(cbt)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>CCS</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(CcsText === 'x 1.000/') setCcsText('') } } 
                                onChangeText={ (CcsText) => { setCcsText(CcsText); factors.items.forEach(el => { 
                                    //if (isNumber(CcsText)) {
                                        if(el.type==="ccs") { if (el.value === parseInt(CcsText)) setCcs(el.bonus); }  
                                    //}
                                }); } }
                                onBlur={ () => { if(CcsText === '') setCcsText('x 1.000/') } }
                                value={ CcsText } 
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 3 }).format(ccs)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Proteína</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(ProteinaText === 'g/100g') setProteinaText('') } } 
                                onChangeText={ (ProteinaText) => { setProteinaText(ProteinaText); factors.items.forEach(el => { 
                                    //if (isNumber(ProteinaText)) {
                                        if(el.type==="prot") { if (el.value === parseInt(ProteinaText)) setProteina(el.bonus); }  
                                    //}
                                }); } }
                                onBlur={ () => { if(ProteinaText === '') setProteinaText('g/100g') } }
                                value={ ProteinaText } 
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 3 }).format(proteina)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Gordura</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(GorduraText === 'g/100g') setGorduraText('') } } 
                                onChangeText={ (GorduraText) => { setGorduraText(GorduraText); factors.items.forEach(el => { 
                                    //if (isNumber(GorduraText)) {
                                        if(el.type==="fat") { if (el.value === parseInt(GorduraText)) setGordura(el.bonus); }  
                                    //}
                                }); } }
                                onBlur={ () => { if(GorduraText === '') setGorduraText('g/100g') } }
                                value={ GorduraText } 
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 3 }).format(gordura)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>BPF</Column1>
                        <ViewColumn2>
                            <View>
                                <StyledPicker
                                    selectedValue={bpf}
                                    onValueChange={ (itemValue, itemIndex) => setBpf(itemValue) }>
                                    <Picker.Item  label="  Selecione" value="0" />
                                    <Picker.Item  label="  Padrão" value="P" />
                                    <Picker.Item  label="  Nature" value="N" />
                                </StyledPicker>
                                <Icon style={{ position: 'absolute', zIndex: 20, top: 28, left: 85, color: '#6d6d6d' }} size={20} opacity={0.00} name="chevron-down" />
                            </View>
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>PNCEBT</Column1>
                        <ViewColumn2>
                            <View>
                                <StyledPicker
                                    selectedValue={pncebt}
                                    onValueChange={ (itemValue, itemIndex) => setPncebt(itemValue) }>
                                    <Picker.Item  label="  Selecione" value="0" />
                                    <Picker.Item  label="  Sim" value="S" />
                                    <Picker.Item  label="  Não" value="N" />
                                </StyledPicker>
                                <Icon style={{ position: 'absolute', zIndex: 20, top: 28, left: 85, color: '#6d6d6d' }} size={20} opacity={0.00} name="chevron-down" />
                            </View>
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItemTotal>
                        <StyledView>
                            <Column1 inverted>Total</Column1>
                            <Column2 inverted>(R$/Litro)</Column2>
                        </StyledView>
                        <StyledTextInput inverted white>1,0997</StyledTextInput>
                    </WrapperItemTotal>

                    <WrapperSeparator>
                    </WrapperSeparator>

                    <WrapperColumn>
                        <View>
                            <Message size='18' textblack>Indicativo de variação do adicional de mercado para o leite fornecido em:</Message>
                        </View>
                        <StyledViewFooter>
                            <Indicativo1>Maio de 2018</Indicativo1>
                            <Indicativo2>ALTA</Indicativo2>
                        </StyledViewFooter>
                    </WrapperColumn>

                    <WrapperFooter>
                        <Message size='12'>* O indicativo de preço não é um compromisso de preço a ser praticado. É uma TENDÊNCIA de preço, baseado em análises da equipe NESTLE sobre as variáveis que influenciam a oferta e demanda do mercado de leite.</Message>
                    </WrapperFooter>
                </ScrollWrapperStyle>
            </Wrapper>
        );
    }
);

const StyledPicker = styled.Picker`
    margin-top: 18;
    margin-right: 10;
    background-color: rgba(250,250,250,1.0);
    color: #707070;
    border: 1px solid #fafafa;
    border-radius: ${props => props.theme.borderRadius};
    height: 40;
    width: 112;
`;

const TextInputUnd = TextInput.extend`
    margin-top: 16;
    margin-right: 10;
    background-color: rgba(250,250,250,1.0);
    color: #707070;
    border: 1px solid #fafafa;
    border-radius: ${props => props.theme.borderRadius};
    height: 40;
    width: 112;
    padding-left: 16;
    /* text-align: center; */
    text-align-vertical: center;
    padding-top: 0;
    padding-bottom: 0;
`;

const ViewColumn2 = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const StyledView = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const StyledViewFooter = StyledView.extend`
    /* width: 100%; */
    flex-direction: row;
    justify-content: space-between; 
    /* padding-right: 8; */
    padding-left: 8;
    padding-bottom: 8;
`;

const StyledTextInput = Text.extend`
    text-align: center;
    margin-top: 16;
    margin-right: 8;
    margin-bottom: 8;
    height: 40;
    width: 80;
    background-color: rgba(255,255,255,0.0);
    border: 1px solid #0196ff;
    color: #0196ff;
    font-size: 18;
    border-radius: ${props => props.theme.borderRadius};
    /* padding-top: 12; */
    text-align: center;
    text-align-vertical: center;

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
  justify-content: space-between; 
  background-color: ${props => props.theme.bg};
  padding-right: 8;
  padding-left: 8;
  padding-bottom: 8;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid #ededed;
  box-shadow: 1px 0px 3px #0f0f0f;
  elevation: 1;
`;

const WrapperColumn = styled.View`
  flex-direction: column;
  justify-content: space-between; 
  background-color: ${props => props.theme.bg};
  padding-right: 8;
  padding-left: 8;
  padding-bottom: 8;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid #ededed;
  box-shadow: 1px 0px 3px #0f0f0f;
  elevation: 1;
`;

const WrapperSeparator = styled.View`
  padding-right: 8;
  padding-left: 8;
  padding-bottom: 8;
  border-radius: ${props => props.theme.borderRadius};
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
  /* padding-top: 28; */
  padding-left: 8;
  /* padding-bottom: 8; */
  margin-top: 16;
  margin-bottom: 8;
  font-size: 16;
  color: #000000;
  text-align: center;
  text-align-vertical: center;
  /* border: 1px solid red; */
  
  ${props =>
    props.inverted &&
    css`
      color: ${props => props.theme.textInverted};
    `}
`;

const Column2 = Column1.extend`
  /* padding-top: 32; */
  font-size: 14;
  color: #707070;
  ${props =>
    props.inverted &&
    css`
      color: #7fe7ff;
    `}
`;

const Indicativo = Text.extend`
  font-size: 16;
  /* margin: 8px 8px 8px 8px; */
  padding: 6px 8px 6px 8px;
  text-align: center;
  margin-top: 10px;
`;

const Indicativo1 = Indicativo.extend`
  color: #6e6e6e;
  border: 1px solid #000000;
  /* margin-right: 2px; */
  width: 40%;
  border-radius: ${props => props.theme.borderRadius};
`;

const Indicativo2 = Indicativo.extend`
  color: #ffffff;
  background-color: #00cdff;
  /* width: 48%; */
  /* width: 150px; */
  /* margin-left: 2px; */
  width: 53%;
  margin-right: 8;
  border-radius: ${props => props.theme.borderRadius};
`;

