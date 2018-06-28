import React from 'react';
import styled from 'styled-components/native';
import {oneOfType, object, array, number} from 'prop-types';
import {compose, withState, withProps, setPropTypes} from 'recompose';
import {isArray} from 'lodash';

const enhance = compose(
  setPropTypes({
    children: oneOfType([array, object]).isRequired,
    activeTab: number.isRequired
  }),
  withProps(({children, activeTab}) => ({
    render: () => {
      return isArray(children)
        ? React.cloneElement(children[activeTab])
        : React.cloneElement(children);
    }
  }))
);

export const FilterTabs = enhance(({render}) => {
  return <Wrapper>{render()}</Wrapper>;
});

const Wrapper = styled.View``;
