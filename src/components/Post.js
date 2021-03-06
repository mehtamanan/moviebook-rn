import React, { Component } from 'react';
import ReactNative, { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar'; // eslint-disable-line
import { sharedStyles, images, POST_HEIGHT } from '../utils';
import { Section } from '../components';

class Post extends Component {
  // must pass post and onUsernamePress props

  state = { width: 0, height: 0 }

  componentWillMount() {
    ReactNative.Image.getSize(this.props.post.poster_url, (srcWidth, srcHeight) => {
      const maxHeight = POST_HEIGHT;
      const maxWidth = Dimensions.get('window').width;

      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      this.setState({ width: srcWidth * ratio, height: srcHeight * ratio });
    }, error => {
      console.log('error:', error);
    });
  }

  render() {
    const { owner, profile_picture, username, movie_title, poster_url } = this.props.post;
    const { sideMargins, imageStyle, viewStyle } = styles;
    const { smallFontStyle, simpleFontStyle } = sharedStyles;
    const { avatar, grey } = images;

    return (
      <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}>
        <Section style={sideMargins}>
          <Image
            style={imageStyle}
            source={{ uri: profile_picture }}
            defaultSource={avatar}
          />
          <View style={viewStyle} >
            <TouchableOpacity onPress={() => this.props.onUsernamePress(username, owner)}>
              <Text style={simpleFontStyle} numberOfLines={1}>
                {username}
              </Text>
            </TouchableOpacity>
            <Text style={smallFontStyle} numberOfLines={1}>
              {movie_title}
            </Text>
          </View>
        </Section>

        <Section style={{ justifyContent: 'center', paddingTop: 5, paddingBottom: 10 }}>
          <Image
            style={{ width: this.state.width, height: this.state.height }}
            indicator={ProgressBar}
            source={{ uri: poster_url }}
            defaultSource={grey}
          />
        </Section>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sideMargins: {
    marginLeft: 15,
    marginTop: 5,
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  viewStyle: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 15
   }
});

export { Post };
