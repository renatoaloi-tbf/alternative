import React from 'react';

import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle
} from 'recompose';

import {
  Wrapper,
  TopBar,
  Icon,
  BackButton,
  ScrollWrapper,
  Text,
  LargeTopBar
} from '~/components/shared';

import {connect} from 'react-redux';

import { getStatements } from '~/actions';

const enhance = compose(
  connect(
    ({statements}) => ({statements}),
    { getStatements }
  ),
  withState('month', 'setMonth', '12/2017'),
  withState('titlebar', 'setTitle', 'Blank'),
  lifecycle({
    componentWillMount() {
      console.log('title', this.props.title);
      this.props.setTitle(this.props.title);
      this.props.setMonth(this.props.mes);
      this.props.getStatements[this.props.month];
    }
  })
);

export const Blank = enhance(
  ({statements, titlebar, month}) => {
    return (
      <Wrapper secondary>
        <LargeTopBar
          title={statements.byMonthExt[month]}
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<BackButton />}
        />
        <ScrollWrapperState>
            <Text>{titlebar}</Text>
        </ScrollWrapperState>
      </Wrapper>
    );
  }
);

const ScrollWrapperState = ScrollWrapper.extend`
  background-color: ${props => props.theme.bg};
  padding-left: 8;
  padding-right: 8;
  padding-top: 8;
`;
