import React from 'react';
import {omit, debounce} from 'lodash';
import styled, {css} from 'styled-components/native';
import {array, bool, func} from 'prop-types';
import {
  FlatList as NativeFlatList,
  RefreshControl,
  Platform,
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import {
  compose,
  defaultProps,
  setPropTypes,
  branch,
  renderComponent,
  withHandlers,
  withProps,
  onlyUpdateForKeys
} from 'recompose';

// Locals
import {theme} from '~/config';

const enhance = compose(
  setPropTypes({
    data: array.isRequired,
    optimized: bool,
    refreshing: bool,
    loading: bool,
    fetching: bool,
    onRefresh: func
  }),
  defaultProps({
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
    removeClippedSubviews: true,
    onEndReachedThreshold: Platform.select({ios: 0, android: 0.5}),
    refreshing: false,
    loading: false,
    endRendering: false
  }),
  withProps(({onEndReached}) => ({
    onEndReached: debounce(e => {
      if (typeof onEndReached === 'function') {
        onEndReached(e);
      }
    }, 800)
  })),
  branch(
    ({loading}) => loading,
    renderComponent(({loading}) => <View loading={loading} />)
  ),
  withHandlers({
    renderFooter: ({endRendering}) => () => {
      if (endRendering) return null;
      return (
        <View style={{paddingVertical: 10}}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
  })
);

export const FlatList = enhance(
  (props) => {
    return (
      <NativeFlatList 
        {...omit(props, ['onRefresh', 'refreshing'])}
        ListFooterComponent={
          !!props.renderLoadingFooter ? props.renderFooter : null
        }
        refreshControl={
          <RefreshControl 
            colors={[theme.textSecondary]}
            tintColor={theme.textSecondary}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        }
      />
    );
  }  
);

