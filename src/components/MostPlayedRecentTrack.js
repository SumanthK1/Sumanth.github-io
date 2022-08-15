  
import React,  { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image} from 'react-bootstrap';

const apiLink = 'https://ws.audioscrobbler.com/2.0';
const apiKey = '800de91cb1adb48853ce5fcd629b7b4a';

function MostPlayedRecentTrack(props) {
    const styles = {
      title: {
        margin: 0,
        fontFamily: 'Karla',
        fontSize: '18px',
        lineHeight: '28px',
      },
      name: {
        margin: 0,
        fontFamily: 'Karla',
        fontSize: '22px',
        lineHeight: '28px',
        fontWeight: 'bold',
        color: props.props.colorAccent,
      },
      main: {
        padding: 0,
        margin: 0,
      },
      colCenter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }

    }

    const [track, setTrack] = useState(null);
    useEffect(() => {
      axios({
        method: 'GET',
        url: apiLink,
        params: {
          method: 'user.gettoptracks',
          user: 'Janelamle',
          limit: '1',
          api_key: apiKey,
          period: '7day',
          format: 'json'
        },
      })
        .then((res) => {
          const trackInfo = res.data.toptracks.track[0];
          var topTrack = {
            name: trackInfo.name,
            artwork: trackInfo.image[0]['#text'],
            artist: trackInfo.artist.name,
            playCount: trackInfo.playcount,
          }
          axios({
            method: 'GET',
            url: apiLink,
            params: {
              method: 'track.getInfo',
              track: topTrack.name,
              artist: topTrack.artist,
              api_key: apiKey,
              format: 'json',
            },
          })
            .then((res) => {
              topTrack.artwork = res.data.track.album.image[2]['#text'];
              setTrack(topTrack); 
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        }) 
    }, []);
  
    if (!track) {
      return null;
    }
    return (
      null
    );
  }
  
  export default  MostPlayedRecentTrack;