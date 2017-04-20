import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Post, Section, Header, Body } from '../components';

class Newsfeed extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Body>
          <Section>
            <FlatList
              data={this.props.newsfeed}
              renderItem={({ item }) => <Post post={item} />}
            />
          </Section>
        </Body>
      </View>
    )
  }
}

const mapStateToProps = store => {
  const newsfeed = []
  for (const p of store.posts.newsfeed) {
    newsfeed.push({ ...p, key: p.id })
  }
  return { newsfeed }
}

export default connect(mapStateToProps, {})(Newsfeed);
