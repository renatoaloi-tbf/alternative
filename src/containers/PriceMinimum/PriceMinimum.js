import React, { Component } from 'react';
import { View, Picker } from 'react-native';
import styled, { css } from 'styled-components/native';
import moment from 'moment'
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
import { connect } from 'react-redux';
import { isNumber } from 'lodash';
import Intl from 'intl';

require('intl/locale-data/jsonp/pt');

const enhance = compose(
    connect(
        ({ factors }) => ({ factors }),
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
    withState('soma', 'setSoma', 0),
    withState('preselecionado', 'setPreselecionado', 0),
    /* withProps(({statements, month}) => {}), */
    lifecycle({
        componentWillMount() {
            this.props.setSoma(this.props.factors.infos.basePrice + this.props.factors.infos.marketBonus);
        }
    })
);

export const PriceMinimum = enhance(
    ({
        factors, bpf, pncebt, AdVolumeText, AdDistanciaText, CbtText, CcsText, ProteinaText, GorduraText,
        setBpf, setPncebt, setAdVolumeText, setAdDistanciaText, setCbtText, setCcsText, setProteinaText,
        setGorduraText, volume, setVolume, distancia, setDistancia, cbt, setCbt, ccs, setCcs,
        proteina, setProteina, gordura, setGordura, soma, setSoma, preselecionado, setPreselecionado
    }) => {
        
        //console.log('factors', factors);

        var digitos = 6;
        
        return (
            <Wrapper secondary>
                <TopBar
                    title="Preço Mínimo"
                    rightComponent={<Icon inverted name="bell" />}
                    leftComponent={<DrawerButton />}
                />
                <ScrollWrapperStyle>
                    <WrapperHeader>
                        <Message size='18'>Insira os dados de sua propriedade abaixo para simular a previsão de preço a ser pago em {moment(factors.infos.period, 'M/YYYY').format('MMMM [de] YYYY').charAt(0).toUpperCase() + moment(factors.infos.period, 'M/YYYY').format('MMMM [de] YYYY').slice(1)}</Message>
                    </WrapperHeader>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Preço base</Column1>
                            <Column2>(R$/Litro)</Column2>
                        </StyledView>
                        <StyledTextInput inverted blue>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 6 }).format(factors.infos.basePrice)}</StyledTextInput>
                    </WrapperItem>
                    <WrapperItem>
                        <StyledView>
                            <Column1>Ad. mercado</Column1>
                            <Column2>(mínimo)</Column2>
                        </StyledView>
                        <StyledTextInput inverted blue>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 6 }).format(factors.infos.marketBonus)}</StyledTextInput>
                    </WrapperItem>

                    <WrapperSeparator>
                    </WrapperSeparator>

                    <WrapperItem>
                        <Column1>Ad. Volume</Column1>
                        <ViewColumn2>
                            <TextInputUnd
                                onFocus={() => { if (AdVolumeText === 'L/Dia') setAdVolumeText('') }}
                                onChangeText={(AdVolumeText) => {
                                    let ja_achei = false;
                                    setAdVolumeText(AdVolumeText);
                                    factors.items[0].forEach(el => {
                                        if (el.type === "volume") {
                                            if ( parseInt(AdVolumeText) >= el.range_min 
                                                    && parseInt(AdVolumeText) <= el.range_max ) {
                                                if (!ja_achei)
                                                {
                                                    setVolume(el.value);
                                                    ja_achei = true;
                                                }
                                            }
                                        }
                                    });
                                    if (!ja_achei)
                                    {
                                        setVolume(0.0);
                                        ja_achei = true;
                                    }
                                }}
                                onBlur={() => {
                                    if (AdVolumeText === '' || parseInt(AdVolumeText) === 0) {
                                        setAdVolumeText('L/Dia');
                                        setVolume(0.0);
                                    }
                                    else
                                    {
                                        let somaAtual = soma + parseFloat(volume);
                                        console.log('somaAtual', somaAtual);
                                        setSoma(somaAtual);
                                    }
                                }}
                                value={AdVolumeText}
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(volume)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Ad. Distância</Column1>
                        <ViewColumn2>
                            <TextInputUnd
                                onFocus={() => { if (AdDistanciaText === 'Km') setAdDistanciaText('') }}
                                onChangeText={(AdDistanciaText) => {
                                    let ja_achei = false;
                                    setAdDistanciaText(AdDistanciaText); factors.items[0].forEach(el => {
                                        if (el.type === "distância") {
                                            if (parseInt(AdDistanciaText) >= el.range_min 
                                                    && parseInt(AdDistanciaText) <= el.range_max) {
                                                if (!ja_achei)
                                                {
                                                    setDistancia(el.value);
                                                    ja_achei = true;
                                                }
                                            }
                                        }
                                    });
                                    if (!ja_achei)
                                    {
                                        setDistancia(0.0);
                                    }
                                }}
                                onBlur={() => {
                                    if (AdDistanciaText === '') {
                                        setAdDistanciaText('Km');
                                        setDistancia(0.0);
                                    }
                                    else
                                    {
                                        let somaAtual = soma + parseFloat(distancia);
                                        setSoma(somaAtual);
                                    }
                                }}
                                value={AdDistanciaText}
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(distancia)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>CBT</Column1>
                        <ViewColumn2>
                            <TextInputUnd
                                onFocus={() => { if (CbtText === 'x 1.000/') setCbtText('') }}
                                onChangeText={(CbtText) => {
                                    let ja_achei = false;
                                    setCbtText(CbtText); factors.items[0].forEach(el => {
                                        if (el.type === "cbt") {
                                            if (parseInt(CbtText) >= el.range_min 
                                                    && parseInt(CbtText) <= el.range_max) {
                                                if (!ja_achei)
                                                {
                                                    setCbt(el.value);
                                                    ja_achei = true;
                                                }
                                            }
                                        }
                                    });
                                    if (!ja_achei)
                                    {
                                        setCbt(0.0);
                                        ja_achei = true;
                                    }
                                }}
                                onBlur={() => {
                                    if (CbtText === '') {
                                        setCbtText('x 1.000/');
                                        setCbt(0.0);
                                    }
                                    else
                                    {
                                        let somaAtual = soma + parseFloat(cbt);
                                        setSoma(somaAtual);
                                    }
                                }}
                                value={CbtText}
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(cbt)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>CCS</Column1>
                        <ViewColumn2>
                            <TextInputUnd
                                onFocus={() => { if (CcsText === 'x 1.000/') setCcsText('') }}
                                onChangeText={(CcsText) => {
                                    let ja_achei = false;
                                    setCcsText(CcsText); factors.items[0].forEach(el => {
                                        if (el.type === "ccs") {
                                            if (parseInt(CcsText) >= el.range_min 
                                                    && parseInt(CcsText) <= el.range_max) {
                                                if (!ja_achei)
                                                {
                                                    setCcs(el.value);
                                                    ja_achei = true;
                                                }
                                            }
                                        }
                                    });
                                    if (!ja_achei)
                                    {
                                        setCcs(0.0);
                                        ja_achei = true;
                                    }
                                }}
                                onBlur={() => {
                                    if (CcsText === '') {
                                        setCcsText('x 1.000/');
                                        setCcs(0.0);
                                    }
                                    else
                                    {
                                        let somaAtual = soma + parseFloat(ccs);
                                        setSoma(somaAtual);
                                    }
                                }}
                                value={CcsText}
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(ccs)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Proteína</Column1>
                        <ViewColumn2>
                            <TextInputUnd
                                onFocus={() => { if (ProteinaText === 'g/100g') setProteinaText('') }}
                                onChangeText={(ProteinaText) => {
                                    let ja_achei = false;
                                    ProteinaText = ProteinaText.replace(',', '.');
                                    setProteinaText(ProteinaText); factors.items[0].forEach(el => {
                                        if (el.type === "proteína") {
                                            //console.log('el.range_min', el.range_min);
                                            //console.log('el.range_max', el.range_max);
                                            if (parseFloat(ProteinaText) >= parseFloat(el.range_min) 
                                                    && parseFloat(ProteinaText) <= parseFloat(el.range_max)) {
                                                if (!ja_achei)
                                                {
                                                    setProteina(el.value);
                                                    ja_achei = true;
                                                }
                                            }
                                        }
                                    });
                                    if (!ja_achei)
                                    {
                                        setProteina(0.0);
                                        ja_achei = true;
                                    }
                                }}
                                onBlur={() => {
                                    if (ProteinaText === '') {
                                        setProteinaText('g/100g');
                                        setProteina(0.0);
                                    }
                                    else
                                    {
                                        let somaAtual = soma + parseFloat(proteina);
                                        setSoma(somaAtual);
                                    }
                                }}
                                value={ProteinaText}
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(proteina)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Gordura</Column1>
                        <ViewColumn2>
                            <TextInputUnd
                                onFocus={() => { if (GorduraText === 'g/100g') setGorduraText('') }}
                                onChangeText={(GorduraText) => {
                                    let ja_achei = false;
                                    GorduraText = GorduraText.replace(',', '.');
                                    setGorduraText(GorduraText); factors.items[0].forEach(el => {
                                        if (el.type === "gordura") {
                                            if (parseFloat(GorduraText) >= parseFloat(el.range_min) 
                                                    && parseFloat(GorduraText) <= parseFloat(el.range_max)) {
                                                if (!ja_achei)
                                                {
                                                    setGordura(el.value);
                                                    ja_achei = true;
                                                }
                                            }
                                        }
                                    });
                                    if (!ja_achei)
                                    {
                                        setGordura(0.0);
                                        ja_achei = true;
                                    }
                                }}
                                onBlur={() => {
                                    if (GorduraText === '') {
                                        setGorduraText('g/100g');
                                        setGordura(0.0);
                                    }
                                    else
                                    {
                                        let somaAtual = soma + parseFloat(gordura);
                                        setSoma(somaAtual);
                                    }
                                }}
                                value={GorduraText}
                            />
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(gordura)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>BPF</Column1>
                        <ViewColumn2>
                            <View>
                                <StyledPicker
                                    selectedValue={bpf}
                                    onValueChange={(itemValue, itemIndex) => { 
                                        if (itemIndex > 0) {
                                            let subAtual = soma - bpf;
                                            let somaAtual = subAtual + parseFloat(itemValue.replace(",", "."));
                                            setBpf(itemValue)
                                            setSoma(somaAtual);
                                        }                                        
                                        }}>
                                    <Picker.Item label="  Selecione" value="0" />
                                    <Picker.Item label="  Padrão" value="0.03" />
                                    <Picker.Item label="  Nature" value="0.10" />
                                </StyledPicker>
                                <Icon style={{ position: 'absolute', zIndex: 20, top: 28, left: 85, color: '#6d6d6d' }} size={20} opacity={0.00} name="chevron-down" />
                            </View>
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(bpf)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>PNCEBT</Column1>
                        <ViewColumn2>
                            <View>
                                <StyledPicker
                                    selectedValue={pncebt}
                                    onValueChange={(itemValue, itemIndex) => {
                                        if (itemIndex > 0) {
                                            let subAtual = soma - pncebt;
                                            let somaAtual = subAtual + parseFloat(itemValue.replace(",", "."));
                                            setPncebt(itemValue)
                                            setSoma(somaAtual);
                                        }    
                                    }
                                    }>
                                    <Picker.Item label="  Selecione" value="0" />
                                    <Picker.Item label="  Sim" value="0.01" />
                                    <Picker.Item label="  Não" value="0.00" />
                                </StyledPicker>
                                <Icon style={{ position: 'absolute', zIndex: 20, top: 28, left: 85, color: '#6d6d6d' }} size={20} opacity={0.00} name="chevron-down" />
                            </View>
                            <StyledTextInput white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(pncebt)}</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItemTotal>
                        <StyledView>
                            <Column1 inverted>Total</Column1>
                            <Column2 inverted>(R$/Litro)</Column2>
                        </StyledView>
                        <StyledTextInput inverted white>{new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: digitos }).format(soma)}</StyledTextInput>
                    </WrapperItemTotal>

                    <WrapperSeparator>
                    </WrapperSeparator>

                    <WrapperColumn>
                        <View>
                            <Message size='18' textblack>Indicativo de variação do adicional de mercado para o leite fornecido em:</Message>
                        </View>
                        <StyledViewFooter>
                            <Indicativo1>{moment(factors.infos.period, 'M/YYYY').format('MMM [de] YYYY').charAt(0).toUpperCase() + moment(factors.infos.period, 'M/YYYY').format('MMM [de] YYYY').slice(1)}</Indicativo1>
                            <Indicativo2>{factors.infos.tendency}</Indicativo2>
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
    font-size: 16;
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

