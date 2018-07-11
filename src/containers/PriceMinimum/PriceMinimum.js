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
//import { TextInput } from 'react-native';

// class PrecoInput extends Component
// {
//     constructor(props) {
//         super(props);
//         this.state = { 
//             bpf: 0, 
//             pncebt: 0, 
//             AdVolumeText: 'L/Dia',
//             AdDistanciaText: 'Km',
//             CbtText: 'x 1.000/',
//             CcsText: 'x 1.000/',
//             ProteinaText: 'g/100g',
//             GorduraText: 'g/100g'
//         };
//     }

//     render()
//     {
//         return(
//             <TextInputUnd 
//                 onFocus={ () => { if(this.props.text === 'L/Dia') setPro({AdVolumeText: ''}) } } 
//                 onChangeText={ (AdVolumeText) => this.setState({AdVolumeText}) }
//                 value={ this.state.AdVolumeText } 
//             />
//         );
//     }
// }

export default class PriceMinimum extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            bpf: 0, 
            pncebt: 0, 
            AdVolumeText: 'L/Dia',
            AdDistanciaText: 'Km',
            CbtText: 'x 1.000/',
            CcsText: 'x 1.000/',
            ProteinaText: 'g/100g',
            GorduraText: 'g/100g'
        };
    }

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
                        <Message size='18'>Insira os dados de sua propriedade abaixo para simular a previsão de preço a ser pago em Abril de 2018</Message>
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
                            <Column2>(mínimo)</Column2>
                        </StyledView>
                        <StyledTextInput inverted blue>0,3400</StyledTextInput>
                    </WrapperItem>

                    <WrapperSeparator>
                    </WrapperSeparator>

                    <WrapperItem>
                        <Column1>Ad. Volume</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(this.state.AdVolumeText === 'L/Dia') this.setState({AdVolumeText: ''}) } } 
                                onChangeText={ (AdVolumeText) => this.setState({AdVolumeText}) }
                                onBlur={ () => { if(this.state.AdVolumeText === '') this.setState({AdVolumeText: 'L/Dia'}) } } 
                                value={ this.state.AdVolumeText } 
                            />
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Ad. Distância</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(this.state.AdDistanciaText === 'Km') this.setState({AdDistanciaText: ''}) } } 
                                onChangeText={ (AdDistanciaText) => this.setState({AdDistanciaText}) }
                                onBlur={ () => { if(this.state.AdDistanciaText === '') this.setState({AdDistanciaText: 'Km'}) } } 
                                value={ this.state.AdDistanciaText } 
                            />
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>CBT</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(this.state.CbtText === 'x 1.000/') this.setState({CbtText: ''}) } } 
                                onChangeText={ (CbtText) => this.setState({CbtText}) }
                                onBlur={ () => { if(this.state.CbtText === '') this.setState({CbtText: 'x 1.000/'}) } }
                                value={ this.state.CbtText } 
                            />
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>CCS</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(this.state.CcsText === 'x 1.000/') this.setState({CcsText: ''}) } } 
                                onChangeText={ (CcsText) => this.setState({CcsText}) }
                                onBlur={ () => { if(this.state.CcsText === '') this.setState({CcsText: 'x 1.000/'}) } }
                                value={ this.state.CcsText } 
                            />
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Proteína</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(this.state.ProteinaText === 'g/100g') this.setState({ProteinaText: ''}) } } 
                                onChangeText={ (ProteinaText) => this.setState({ProteinaText}) }
                                onBlur={ () => { if(this.state.ProteinaText === '') this.setState({ProteinaText: 'g/100g'}) } }
                                value={ this.state.ProteinaText } 
                            />
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>Gordura</Column1>
                        <ViewColumn2>
                            <TextInputUnd 
                                onFocus={ () => { if(this.state.GorduraText === 'g/100g') this.setState({GorduraText: ''}) } } 
                                onChangeText={ (GorduraText) => this.setState({GorduraText}) }
                                onBlur={ () => { if(this.state.GorduraText === '') this.setState({GorduraText: 'g/100g'}) } }
                                value={ this.state.GorduraText } 
                            />
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>BPF</Column1>
                        <ViewColumn2>
                            <View>
                                <StyledPicker
                                    selectedValue={this.state.bpf}
                                    onValueChange={ (itemValue, itemIndex) => this.setState({bpf: itemValue}) }>
                                    <Picker.Item  label="  Selecione" value="0" />
                                    <Picker.Item  label="  Padrão" value="P" />
                                    <Picker.Item  label="  Nature" value="N" />
                                </StyledPicker>
                                <Icon style={{ position: 'absolute', zIndex: 20, top: 33, left: 85, color: '#6d6d6d' }} size={20} opacity={0.00} name="chevron-down" />
                            </View>
                            <StyledTextInput white>0,0390</StyledTextInput>
                        </ViewColumn2>
                    </WrapperItem>
                    <WrapperItem>
                        <Column1>PNCEBT</Column1>
                        <ViewColumn2>
                            <View>
                                <StyledPicker
                                    selectedValue={this.state.pncebt}
                                    onValueChange={ (itemValue, itemIndex) => this.setState({pncebt: itemValue}) }>
                                    <Picker.Item  label="  Selecione" value="0" />
                                    <Picker.Item  label="  Sim" value="S" />
                                    <Picker.Item  label="  Não" value="N" />
                                </StyledPicker>
                                <Icon style={{ position: 'absolute', zIndex: 20, top: 33, left: 85, color: '#6d6d6d' }} size={20} opacity={0.00} name="chevron-down" />
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
}

const StyledPicker = styled.Picker`
    margin-top: 18;
    margin-right: 10;
    background-color: rgba(250,250,250,1.0);
    color: #707070;
    border: 1px solid #fafafa;
    border-radius: ${props => props.theme.borderRadius};
    height: 50;
    width: 120;
`;

const TextInputUnd = TextInput.extend`
    margin-top: 18;
    margin-right: 10;
    background-color: rgba(250,250,250,1.0);
    color: #707070;
    border: 1px solid #fafafa;
    border-radius: ${props => props.theme.borderRadius};
    height: 50;
    width: 120;
    padding-top: 12;
    padding-left: 20;
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
    margin-top: 18;
    margin-right: 18;
    margin-bottom: 8;
    height: 50;
    width: 90;
    background-color: rgba(255,255,255,0.0);
    border: 1px solid #0196ff;
    color: #0196ff;
    font-size: 18;
    border-radius: ${props => props.theme.borderRadius};
    padding-top: 12;

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
  padding-top: 28;
  padding-left: 8;
  padding-bottom: 8;
  font-size: 18;
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
  font-size: 18;
  /* margin: 8px 8px 8px 8px; */
  padding: 6px 8px 6px 8px;
  text-align: center;
  margin-top: 10px;
`;

const Indicativo1 = Indicativo.extend`
  color: #6e6e6e;
  border: 1px solid #000000;
  /* margin-right: 2px; */
  width: 36%;
  border-radius: ${props => props.theme.borderRadius};
`;

const Indicativo2 = Indicativo.extend`
  color: #ffffff;
  background-color: #00cdff;
  /* width: 48%; */
  /* width: 150px; */
  /* margin-left: 2px; */
  width: 56%;
  margin-right: 18;
  border-radius: ${props => props.theme.borderRadius};
`;

