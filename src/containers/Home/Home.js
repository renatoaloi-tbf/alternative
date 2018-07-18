import React from 'react';
import { View, Image as ReactImage, YellowBox } from 'react-native';
import styled from 'styled-components/native';
import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle
} from 'recompose';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  Wrapper,
  Text,
  TopBar,
  Icon,
  Button,
  IconUri,
  DrawerButton,
  Image,
  ScrollWrapper
} from '~/components/shared';
import { RecentNumbers, QuickMenuItem } from '~/components/Home';
import { ImagesApp } from '~/config';
import { login } from '~/actions';
import { isNumber } from '~/utils';

import Intl from 'intl';
require('intl/locale-data/jsonp/pt');

const enhance = compose(
  connect(
    ({ user }) => ({ user }),
    { login }
  ),
  withHandlers({
    openMenu: ({ navigator }) => () => {
      navigator.toggleDrawer({
        side: 'left',
        animated: true,
        screen: 'Home'
      });
    },
    handleClearSearchUser: ({ clear }) => () => {
      clear();
    }
  }),
  lifecycle({
    async componentWillMount() {
      // await this.props.login();
    }
  })
);

export const Home = enhance(({ openMenu, user }) => {
  console.log('USUARRRRRIO', user);

  let image = '', cor = '';
  switch (user.category.toString()) {
    case '':
      image = null;
      cor = null;
      componentImage = '';
      componentTexto = '';
      break;
    case '0':
      image = '../../images/ic_star-bronze.png';
      componentImage = <ReactImage source={require('../../images/ic_star-bronze.png')}style={{ width: 24, height: 24 }} />;
      componentTexto = <View style={{ paddingLeft: 4 }} ><Text style={{ color: '#8C7853' }}>Bronze</Text></View>;
      
      break;
    case '1':
      image = '../../images/ic_star-prata.png';
      componentImage = <ReactImage source={require('../../images/ic_star-prata.png')}style={{ width: 24, height: 24 }} />;
      componentTexto = <View style={{ paddingLeft: 4 }} ><Text style={{ color: '#C0C0C0' }}>Prata</Text></View>;
      break;
    case '2':
      image = '../../images/medalha-gold-v2.png';
      componentImage = <ReactImage source={require('../../images/medalha-gold-v2.png')}style={{ width: 24, height: 24 }} />;
      componentTexto = <View style={{ paddingLeft: 4 }} ><Text style={{ color: '#febd00' }}>Ouro</Text></View>;
      break;
    default:
      break;
  }
  
  return (
    <Wrapper secondary>
      <TopBar
        title="Home"
        rightComponent={<Icon inverted name="bell" />}
        leftComponent={<DrawerButton />}
      />
      <WrapperAvatar >
        
        {image ? (
          <ViewPin>
            {componentImage}
            {componentTexto}
          </ViewPin>
        ) : (
          <ViewPin>
          </ViewPin>
          )}
        <Border>
          <AvatarDefault source={ImagesApp['avatarBlue']} />
        </Border>
      </WrapperAvatar>
      <WrapperCard>
        <Card>
          <Users>
            <Text align="center" size={20} info>
              {user.name}
            </Text>
            <City size={12} info>
              {user.city}
            </City>
          </Users>
          <TitleRecentNumbers>
            <Text size="12" secondary>
              Números recentes:
                </Text>
          </TitleRecentNumbers>
          <WrapperRecentNumbers>
            <RecentNumbers result={`${new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(user.recent.lastPickup.volume)}L`} description="Última coleta" />
            <RecentNumbers result={`${new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(user.recent.currentMonth.volume)}L`} description={`Total ${moment(user.recent.currentMonth.period, 'MM/YYYY').format('MMMM')}`} />
            <RecentNumbers result={`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(user.recent.lastMonth.price)}/L`} description={`${moment(user.recent.lastMonth.period, 'MM/YYYY').format('MMMM')}`} />
          </WrapperRecentNumbers>
        </Card>
        <WrapperQuickMenu>
          <QuickMenuItem
            route="Quality"
            info
            icon="certificate"
            description="Qualidade"
          />
          <QuickMenuItem
            route="Volume"
            success
            icon="beaker"
            description="Volume"
          />
          <QuickMenuItem
            route="Price"
            warning
            icon="currency-usd"
            description="Preço"
          />
          <QuickMenuItem
            route="Documentation"
            danger
            icon="file-document"
            description="Documentos"
          />
        </WrapperQuickMenu>
      </WrapperCard>
    </Wrapper>

  );
});

const ViewPin = styled.View`
  padding-left: 60;
  flex-direction: row;
  z-index: 10; 
  position: absolute;
`;

const Card = styled.View`
  background-color: ${props => props.theme.bg};
  padding-left: 20;
  padding-right: 20;
  border-radius: ${props => props.theme.borderRadius};
  padding-top: 50;
  box-shadow: 1px 0px 3px #0f0f0f;
  elevation: 3;
`;

const WrapperCard = styled.View`
  padding-left: 7;
  padding-right: 7;
  padding-bottom: 10;
  box-shadow: 0px 0.5px 1px #e0e0e0;
  position: absolute;
  width: 100%;
  top: 100;
`;

const WrapperRecentNumbers = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TitleRecentNumbers = styled.View`
  align-items: center;
  padding-top: 2;
  padding-bottom: 5;
`;

const Users = styled.View`
  align-items: center;
  padding-bottom: 5;
  padding-top: 15;
`;

const City = Text.extend`
  opacity: 0.75;
`;

const WrapperAvatar = styled.View`
  top: 20;
  left: 38%;
  right: 38%;
  box-shadow: 10px 5px 5px black;
  elevation: 1;
  z-index: 2;
`;

const AvatarDefault = Image.extend`
  width: 92;
  height: 92;
  border-radius: 10;
  z-index: 1;
`;

const Border = styled.View``;
const Header = styled.View`
  z-index: 2;
  height: 40;
`;

const AvatarIcon = styled.View`
  top: -4;
  flex: 1;
  justify-content: center;
  border: 2px solid #fff;
  height: 26;
  width: 26;
  background-color: ${props => props.theme.warning};
  z-index: 2;
  align-items: center;
  position: absolute;
  border-radius: 20;
  box-shadow: 0px 2px 1px #e3e3;
  z-index: 2;
`;

const ViewIcon = styled.View`
  z-index: 2;
  flex-direction: row;
  shadow-color: transparent;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-left: 30;
`;
const Description = styled.View`
  top: -12;
  padding-left: 70;
`;

const WrapperQuickMenu = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

