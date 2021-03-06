import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet, Button } from 'react-native';
import { Icon } from '../../components/shared/Icon';
import { navigatorStyle } from '~/config';

export default class In62 extends Component {

    state = {
        modalVisible: true,
        latitude: null,
        longitude: null,
        error: null
    };

    constructor(props) {
        super(props);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    closeModal() {
        this.navigation();
        this.setModalVisible();
    }

    estouCiente() {
        this.getLocation();

    }

    setModalVisible() {
        this.setState({ modalVisible: false });
    }

    navigation() {
        this.props.navigator.push({
            screen: 'Documentation',
            navigatorStyle
        });
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            })
            this.navigation();
            this.setModalVisible();
        }, (error) => {
            this.setState({ error: null }),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        });

    }



    render() {
        return (
            <View style={styles.container}>
                <Modal

                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.closeModal();
                    }}>
                    <View style={ styles.modal1 }>
                        <Icon size={100} opacity={0.00} color="#FFFFFF" name="alert" />
                    </View>
                    <View style={styles.modal2}>
                        <Text style={styles.title}>
                            Resultados de análises do leite das especificações
                        </Text>
                        <Text style={styles.subTitle}>
                            Parâmetro da IN62 de Janeiro de 2018
                        </Text>
                        {/*
                            INICIANDO O GRID
                            HEAD GRID
                        */}
                        <View style={styles.gridHead}>
                            <View style={styles.gridHeadTextView} >
                                <Text style={styles.gridHeadText}>Análise</Text>
                            </View>
                            <View style={styles.gridHeadTextView} >
                                <Text style={styles.gridHeadText}>Leite fornecido</Text>
                            </View>
                            <View style={styles.gridHeadTextView} >
                                <Text style={styles.gridHeadText}>Padrão</Text>
                            </View>
                        </View>
                        {/*
                            BODY GRID
                        */}
                        <View style={styles.gridBody}>
                            <View style={styles.gridBodyTextView} >
                                <Text >Gordura</Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >3.94 <Icon style={styles.styleIcon} size={15} opacity={0.00} name="check" /></Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >Máx 4,0</Text>
                            </View>
                        </View>
                        <View style={styles.gridBody}>
                            <View style={styles.gridBodyTextView} >
                                <Text style={styles.alertColor}>Proteína</Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text style={styles.alertColor}>8.52 <Icon style={styles.alertColor} size={15} opacity={0.00} name="window-close" /></Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text style={styles.alertColor}>Máx 5,0</Text>
                            </View>
                        </View>

                        <View style={styles.gridBody}>
                            <View style={styles.gridBodyTextView} >
                                <Text >ESD</Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >8.92 <Icon style={styles.styleIcon} size={15} opacity={0.00} name="check" /></Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >Min 3,0</Text>
                            </View>
                        </View>

                        <View style={styles.gridBody}>
                            <View style={styles.gridBodyTextView} >
                                <Text >CBT</Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >393 <Icon style={styles.styleIcon} size={15} opacity={0.00} name="check" /></Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >Min 2,9</Text>
                            </View>
                        </View>

                        <View style={styles.gridBody}>
                            <View style={styles.gridBodyTextView} >
                                <Text >EST</Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >12.86 <Icon style={styles.styleIcon} size={15} opacity={0.00} name="check" /></Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >Min 8,4</Text>
                            </View>
                        </View>

                        <View style={styles.gridBody}>
                            <View style={styles.gridBodyTextView} >
                                <Text >CCS</Text>
                            </View>
                            <View style={styles.gridBodyTextView} >
                                <Text >278 <Icon style={styles.styleIcon} size={15} opacity={0.00} name="check" /> </Text>
                            </View>

                            <View style={styles.gridBodyTextView} >
                                <Text >Min 8,4</Text>
                            </View>
                        </View>

                        <View>
                            <Text>*(Média do leite fornecido)</Text>
                        </View>

                    </View>

                    <View style={styles.bottomView} >
                        <TouchableHighlight style={styles.buttonStyle}
                            onPress={() => {
                                this.closeModal();
                            }}>
                            <Text>Preencher checklist</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.buttonStyle}
                            onPress={() => {
                                this.estouCiente();
                            }}>
                            <Text>Estou ciente</Text>
                        </TouchableHighlight>

                    </View>
                </Modal>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 0,

    },

    modal1: {
        alignItems: 'center',
        backgroundColor: '#ffbd00',
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 20,
        borderTopColor: 'rgba(52, 52, 52, 0.8)',
        borderRightWidth: 20,
        borderRightColor: 'rgba(52, 52, 52, 0.8)',
        borderLeftWidth: 20,
        borderLeftColor: 'rgba(52, 52, 52, 0.8)'
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    },
    modal2: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 30,
        borderRightWidth: 20,
        borderRightColor: 'rgba(52, 52, 52, 0.8)',
        borderLeftWidth: 20,
        borderLeftColor: 'rgba(52, 52, 52, 0.8)',
        height: 50
    },
    title: {
        fontSize: 15,
        fontWeight: "900",
        color: "#000000"
    },
    subTitle: {
        marginTop: 10,
        fontSize: 10
    },
    gridHead: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    gridHeadTextView: { width: 80, height: 40 },
    gridHeadText: { color: "#000000" },

    gridBody: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    gridBodyTextView: { width: 80, height: 15 },
    styleIcon: { alignSelf: 'flex-end', color: '#6d6d6d' },
    alertColor: { color: '#ffbd00' },

    bottomView: {
        width: '100%',
        height: 190,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 500,
        flexDirection: 'row',
        borderRightWidth: 20,
        borderRightColor: 'rgba(52, 52, 52, 0.8)',
        borderLeftWidth: 20,
        borderLeftColor: 'rgba(52, 52, 52, 0.8)',
        borderBottomWidth: 130,
        borderBottomColor: 'rgba(52, 52, 52, 0.8)'
    },
    buttonStyle: {
        backgroundColor: '#ffffff',
        width: 160,
        borderTopWidth: 1,
        borderColor: '#efefef',
        borderRightWidth: 2,
        alignItems: 'center',
        paddingTop: 15,
    }

})