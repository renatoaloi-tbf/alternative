import React from 'react';
import styled from 'styled-components/native';
import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle
} from 'recompose';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

import {
  Wrapper,
  Text,
  TopBar,
  Icon,
  Button,
  IconUri,
  DrawerButton,
  Image
} from '~/components/shared';
import {RecentNumbers, QuickMenuItem} from '~/components/Home';
import {ImagesApp} from '~/config';
import {login} from '~/actions';
import {isNumber} from '~/utils';

const enhance = compose(
  connect(
    ({user}) => ({user}),
    {login}
  ),
  withHandlers({
    openMenu: ({navigator}) => () => {
      navigator.toggleDrawer({
        side: 'left',
        animated: true,
        screen: 'Home'
      });
    },
    handleClearSearchUser: ({clear}) => () => {
      clear();
    }
  }),
  lifecycle({
    async componentWillMount() {
      // await this.props.login();
    }
  })
);

export const Home = enhance(({openMenu, user}) => {
  return (
    <Wrapper secondary>
      <TopBar
        title="Home"
        rightComponent={<Icon inverted name="bell" />}
        leftComponent={<DrawerButton />}
      />
      <WrapperAvatar>
        <Border>
          <AvatarDefault source={ImagesApp['avatarBlue']} />
        </Border>
      </WrapperAvatar>
      <WrapperCard>
        <Card>
          <Users>
            <Text align="center" size={21} info>
              {user.name}
            </Text>
            <City size={11} info>
              {user.city}
            </City>
          </Users>
          <TitleRecentNumbers>
            <Text size="11" secondary>
              Números recentes:
            </Text>
          </TitleRecentNumbers>
          <WrapperRecentNumbers>
            <RecentNumbers result={`${isNumber(user.recent.lastPickup.volume)}L`} description="Última coleta" />
            <RecentNumbers result={`${isNumber(user.recent.currentMonth.volume)}L`} description={`Total ${moment(user.recent.currentMonth.period, 'MM/YYYY').format('MMMM')}`} />
            <RecentNumbers  result={`R$ ${user.recent.lastMonth.price}L`} description={`${moment(user.recent.currentMonth.period, 'MM/YYYY').format('MMMM')}`} />
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

const Card = styled.View`
  background-color: ${props => props.theme.bg};
  padding-left: 20;
  padding-right: 20;
  border-radius: 2;
  padding-top: 50;
  elevation: 0.3;
`;

const WrapperCard = styled.View`
  padding-left: 7;
  padding-right: 7;
  padding-bottom: 10;
  box-shadow: 0px 0.5px 1px #e0e0e0;
  position: absolute;
  width: 100%;
  top: 120;
`;

const WrapperRecentNumbers = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TitleRecentNumbers = styled.View`
  align-items: center;
  padding-top: 10;
  padding-bottom: 10;
`;

const Users = styled.View`
  align-items: center;
  padding-bottom: 10;
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
