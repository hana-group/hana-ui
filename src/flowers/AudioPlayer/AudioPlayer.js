import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import Progress from './Progress';
import {smartFormatTime} from '../../utils/timeFormat';
import {random} from '../../utils/random';

export default class AudioPlayer extends Component {
  static propTypes = {
    /**
     * @en
     * the AudioPlayer's song list.
     *
     * @cn
     * 歌单
     */
    list: PropTypes.arrayOf(PropTypes.shape({
      poster: PropTypes.string,
      src: PropTypes.string,
      title: PropTypes.string,
      artist: PropTypes.string
    })),

    /**
     * @en
     * whether autoplay
     *
     * @cn
     * 是否自动播放
     */
    autoPlay: PropTypes.bool,

    /**
     * @en
     * play mode
     *
     * @cn
     * 播放模式
     */
    mode: PropTypes.oneOf(['random', 'repeat', 'normal']),

    /**
     * @en
     * volume
     *
     * @cn
     * 音量
     */
    volume: PropTypes.number,

    /**
     * @en
     * current index of the song list
     *
     * @cn
     * 当前歌曲索引
     */
    currentIndex: PropTypes.number,

    /**
     * @en
     * current time of the audio
     *
     * @cn
     * 当前的`currentTime`
     */
    currentTime: PropTypes.number,

    /**
     * @en
     * default poster for no-cover-songs
     *
     * @cn
     * 默认封面
     */
    defaultPoster: PropTypes.string

  }

  static defaultProps = {
    list: [],
    autoPlay: false,
    mode: 'normal',
    volume: 1,
    currentIndex: 0,
    currentTime: 0
  }

  constructor(props) {
    super(props);
    const {list} = props;
    // TODO localstorage for history
    const {currentIndex, currentTime} = props;
    const current = list.length ? list[currentIndex] : {};
    this.state = {
      play: false,
      current,
      currentIndex,
      currentTime,
      duration: 0,
      volume: props.volume,
      showList: false,
      mode: props.mode
    };
    this.refAudio = null;
  }

  componentDidMount() {
    const {autoPlay} = this.props;
    const {volume, currentTime} = this.state;
    this.audio = findDOMNode(this.refAudio);
    this.audio.volume = volume;
    this.audio.currentTime = currentTime;
    this.audio.ontimeupdate = () => {
      this.setState({
        duration: this.audio.duration,
        currentTime: this.audio.currentTime
      });

      if (this.audio.currentTime >= this.audio.duration) {
        this.handleNext();
      }
    };

    if (autoPlay) {
      this.handlePlay();
    }
  }

  handlePlay = () => {
    this.setState({
      play: true
    });
    this.audio.play();
  }

  handlePause = () => {
    this.setState({
      play: false
    });
    this.audio.pause();
  }

  togglePlay = () => {
    const {play} = this.state;
    if (play) this.handlePause();
    else this.handlePlay();
  }

  handleSwitch = (index) => {
    const {list} = this.props;
    this.setState({
      current: list[index],
      currentIndex: index,
      duration: 0,
      currentTime: 0
    }, () => {
      this.audio.currentTime = 0;
      this.handlePlay();
    });
  }

  handleSwitchTime = (currentTime) => {
    this.audio.currentTime = currentTime;
    this.setState({currentTime});
  }

  handleSwitchVolume = (volume) => {
    let vo = volume / 100;
    if (vo >= 1) vo = 1;
    if (vo < 0) vo = 0;
    this.audio.volume = vo;
    this.setState({volume: vo});
  }

  handlePrev = () => {
    // TODO random mode
    const {list} = this.props;
    const {currentIndex, mode} = this.state;
    let index = list.length - 1;
    switch (mode) {
      case 'random':
        index = Math.round(random() * (list.length - 1));
        while (index === currentIndex) {
          index = Math.round(random() * (list.length - 1));
        }
        break;
      case 'repeat':
        index = currentIndex;
        break;
      case 'normal':
      default:
        if (currentIndex > 0) {
          index = currentIndex - 1;
        }
    }
    this.handleSwitch(index);
  }

  handleNext = () => {
    const {list} = this.props;
    const {currentIndex, mode} = this.state;
    let index = 0;
    switch (mode) {
      case 'random':
        index = Math.round(random() * (list.length - 1));
        while (index === currentIndex) {
          index = Math.round(random() * (list.length - 1));
        }
        break;
      case 'repeat':
        index = currentIndex;
        break;
      case 'normal':
      default:
        if (currentIndex < list.length - 1) {
          index = currentIndex + 1;
        }
    }
    this.handleSwitch(index);
  }

  handleSetMode = (mode) => {
    this.setState({
      mode
    });
  }

  render() {
    const {list, defaultPoster} = this.props;
    const {play, current, currentTime, duration, showList, currentIndex, mode, volume} = this.state;
    const playButtonClass = cx('hanaicon', 'hana-audio-play', {
      'icon-play': !play,
      'icon-pause': play
    });
    const listCls = cx('hana-audio-list', {
      'hana-audio-list-open': showList
    });
    return (
      <div className='hana-audio'>
        <audio ref={ref => {this.refAudio = ref;}} src={current.src} />
        <img src={current.poster || defaultPoster} alt={current.title} className='hana-audio-poster' />
        <section className='hana-audio-title'>
          {current.title} - {current.artist}
        </section>
        <section className='hana-audio-options'>
          <i className='hanaicon icon-media-pre' onClick={this.handlePrev} />
          <i className={playButtonClass} onClick={this.togglePlay} />
          <i className='hanaicon icon-media-next' onClick={this.handleNext} />
        </section>
        <section className='hana-audio-time'>
          <p className='hana-audio-time-current'>{smartFormatTime(currentTime)}</p>
          <p className='hana-audio-time-duration'>{smartFormatTime(duration || 0)}</p>
          <Progress
            max={duration}
            value={currentTime}
            onChange={this.handleSwitchTime}
          />
        </section>
        <section className='hana-audio-volume'>
          <i className='hanaicon icon-volume-zero' />
          <i className='hanaicon icon-volume-full' />
          <Progress
            max={100}
            value={volume * 100}
            onChange={this.handleSwitchVolume}
          />
        </section>
        <section className='hana-audio-mode'>
          {/* 各种模式 单曲循环/随机播放 */}
          <i className='hanaicon icon-list' onClick={() => this.setState({showList: !this.state.showList})} />
          <i
            className={cx('hanaicon icon-media-normal', {
              'hana-audio-mode-active': mode === 'normal'
            })}
            onClick={() => this.handleSetMode('normal')}
          />
          <i
            className={cx('hanaicon icon-media-random', {
              'hana-audio-mode-active': mode === 'random'
            })}
            onClick={() => this.handleSetMode('random')}
          />
          <i
            className={cx('hanaicon icon-media-repeat', {
              'hana-audio-mode-active': mode === 'repeat'
            })}
            onClick={() => this.handleSetMode('repeat')}
          />
        </section>
        <ul className={listCls}>
          {list.map(
            (item, index) => {
              const cls = cx('hana-audio-list-item', {
                'hana-audio-list-item-active': currentIndex === index
              });
              return (
                <li
                  className={cls}
                  key={index}
                  onClick={() => this.handleSwitch(index)}
                >
                  {item.title} - {item.artist}
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}
