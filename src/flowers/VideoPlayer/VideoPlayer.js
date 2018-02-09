/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/6/1
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

import {getKeyFromCode} from '../../utils';
import Progress from './Progress';

export default class VideoPlayer extends Component {
  static propTypes = {
    /**
     * @en
     * Switch the view to window or full-page.
     *
     * @cn
     * 切换窗口和全屏模式。
     */
    view: PropTypes.oneOf(['window', 'full']),
    /**
     * @en
     * 播放模式，可以设置为“随机”、“循环”、“单曲循环”、“通常”。
     *
     * @cn
     * Mode of playing, could be set to 'random', 'cycle', 'repeat', 'normal'.
     */
    mode: PropTypes.oneOf(['random', 'cycle', 'repeat', 'normal']),
    /**
     * @en
     * If current video can preload.
     *
     * @cn
     * 允许当前视频被预加载。
     */
    preload: PropTypes.string,
    /**
     * @en
     * If current video can auto play.
     *
     * @cn
     * 允许当前视频自动播放。
     */
    autoPlay: PropTypes.bool,
    /**
     * @en
     * Play current video.
     *
     * @cn
     * 播放当前视频。
     */
    play: PropTypes.bool,
    /**
     * @en
     * Set the time for current video.
     *
     * @cn
     * 设置当前视频的播放时间。
     */
    currentTime: PropTypes.number,
    /**
     * @en
     * Set volume.
     *
     * @cn
     * 设置音量。
     */
    volume: PropTypes.number,
    /**
     * @en
     * Video list.
     * It contains many items that describe the videos' information:
     * title: title of video.
     * desc: description of video.
     * sources: list of {src: link of source file, type: type of source}.
     * image: an image which will be shown when none of video sources is available.
     * text: an element which will be shown when none of video and image sources is available.
     * poster: poster of video.
     *
     * @cn
     * 视频列表。
     * 由一个被视频元素构造的列表组成：
     * title: 视频标题。
     * desc: 视频描述信息。
     * sources: 视频源列表：{src: 源文件链接，源类型}。
     * image: 当视频源文件都无效时，默认显示的图像。
     * text: 当视频源文件和默认图像都无效时，显示的元素。
     * poster: 视频封面。
     */
    list: PropTypes.arrayOf({
      title: PropTypes.string.isRequired,
      desc: PropTypes.string,
      sources: PropTypes.arrayOf({
        src: PropTypes.string.isRequired,
        type: PropTypes.string
      }).isRequired,
      image: PropTypes.string,
      text: PropTypes.string,
      poster: PropTypes.string
    }),
    /**
     * @en
     * Index of current video in list.
     *
     * @cn
     * 当前视频在列表中的序号。
     */
    currentItem: PropTypes.number,
    /**
     * @en
     * Default text of video.
     *
     * @cn
     * 视频默认介绍信息。
     */
    defaultText: PropTypes.string,
    /**
     * @en
     * Default image of video.
     *
     * @cn
     * 视频默认图片。
     */
    defaultImage: PropTypes.string,
    /**
     * @en
     * Default poster of video.
     *
     * @cn
     * 视频默认封面。
     */
    defaultPoster: PropTypes.string,
    /**
     * @en
     * Tooltip's style.
     *
     * @cn
     * 提示框的样式。
     */
    style: PropTypes.object,
    /**
     * @en
     * Tooltip's className.
     *
     * @cn
     * 提示框根元素的class。
     */
    className: PropTypes.string,
    /**
     * @en
     * Children.
     *
     * @cn
     * 子级元素。
     */
    children: PropTypes.node
  };

  static defaultProps = {
    view: 'window',
    mode: 'normal',
    autoPlay: false,
    preload: 'auto',
    list: [],
    defaultText: 'Not support !'
  };

  constructor(props) {
    super(props);
    this.parseSources(props.list);
    this.state = {
      // noList: props.list.length === 1,
      view: props.view,
      mode: props.mode,
      play: props.play || props.autoPlay || false,
      currentTime: props.currentTime || 0,
      currentPercent: 0,
      volume: props.volume || 1,
      currentItem: props.currentItem || 0,
      bufferedPercent: 0,
      // showControllers: true,
      openList: false
    };
    this.timeoutId = 0;
    this.durationStr = '00:00';
    this.currentStr = '00:00';
  }

  componentDidMount = () => {
    const dom = findDOMNode(this.refs.video);
    dom.addEventListener('canplaythrough', this.handleProgress);
    dom.addEventListener('timeupdate', this.handleTimeUpdate);
    dom.addEventListener('ended', this.handlePlayEnd);
    document.addEventListener('fullscreenchange', this.handleViewChange);
    document.addEventListener('webkitfullscreenchange', this.handleViewChange);
    document.addEventListener('mozfullscreenchange', this.handleViewChange);
    document.addEventListener('MSFullscreenChange', this.handleViewChange);
    if (this.state.play) {
      this.play();
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState(this.parseProps(nextProps), () => {
      if (this.state.play) {
        this.play();
      }
    });
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutId);
    const dom = findDOMNode(this.refs.video);
    dom.removeEventListener('canplaythrough', this.handleProgress);
    dom.removeEventListener('timeupdate', this.handleTimeUpdate);
    dom.removeEventListener('ended', this.handlePlayEnd);
    document.removeEventListener('fullscreenchange', this.handleViewChange);
    document.removeEventListener('webkitfullscreenchange', this.handleViewChange);
    document.removeEventListener('mozfullscreenchange', this.handleViewChange);
    document.removeEventListener('MSFullscreenChange', this.handleViewChange);
  }

  parseProps = props => {
    this.parseSources(props.list);
    const {
      view,
      mode,
      play,
      currentTime,
      volume,
      currentItem
    } = this.state;

    return {
      // noList: props.list.length === 1,
      view: props.view || view,
      mode: props.mode || mode,
      play: props.play || play,
      currentTime: props.currentTime || currentTime,
      volume: props.volume || volume,
      currentItem: props.currentItem || currentItem
    };
  }

  parseSources = list => {
    const {
      defaultText,
      defaultImage,
      defaultPoster
    } = this.props;

    this.list = list;
    this.list.forEach(item => {
      if (!item.text) {
        item.text = defaultText;
      }
      if (!item.image && defaultImage) {
        item.image = defaultImage;
      }
      if (!item.poster && defaultPoster) {
        item.poster = defaultPoster;
      }
      item.sources.forEach(source => {
        if (!source.type) {
          source.type = this.genType(source.src);
        }
      });
    });
  }

  genType = url => {
    const ext = url.split('.')[1];
    switch (ext) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogg':
      case 'ogv':
        return 'video/ogg';
      case 'mov':
        return 'video/quicktime';
      default:
        return 'text';
    }
  }

  smartFormatTime = time => {
    let s = ~~(time % 60);
    let m = time / 60;
    let h = 0;
    if (m >= 60) {
      h = h / 60;
      m = m % 60;
    }

    h = ~~h;
    m = ~~m;

    m = m < 10 ? `0${m}` : `${m}`;
    s = s < 10 ? `0${s}` : `${s}`;

    if (h) {
      return `${h}:${m}:${s}`;
    }
    return `${m}:${s}`;
  }

  play = () => {
    this.timeoutId = setTimeout(
      () => {
        this.refs.video.volume = this.state.volume;
        this.refs.video.play();
        this.setState({play: true});
      },
      10
    );
  }

  pause = () => {
    this.timeoutId = setTimeout(
      () => {
        this.refs.video.pause();
        this.setState({play: false});
      },
      10
    );
  }

  handleProgress = event => {
    const dom = event.target;
    if (dom.duration) {
      this.durationStr = this.smartFormatTime(dom.duration);
      this.setState({bufferedPercent: dom.buffered.end(0) / dom.duration * 100});
    }
  }

  handleTimeUpdate = event => {
    const duration = event.target.duration;
    const current = event.target.currentTime;

    this.currentStr = this.smartFormatTime(current);
    this.setState({
      currentTime: current,
      currentPercent: ~~((current / duration) * 100)
    });
  }

  handlePlayEnd = (event, pre = false) => {
    const {
      mode,
      currentItem
    } = this.state;

    // todo: really list, use another list for playing
    const max = this.list.length - 1;
    let next = currentItem;

    if (pre) {
      switch (mode) {
        case 'normal':
          if (currentItem === 0) {
            this.state.play = false;
            this.handleChangeItem(0);
            return;
          }
          next = currentItem - 1;
          break;
        case 'cycle':
          next = currentItem === 0 ? max : currentItem - 1;
          break;
        case 'repeat':
          break;
        case 'random':
          if (window.crypto) {
            next = ~~(window.crypto.getRandomValues(new Uint8Array([1]))[0] / 255 * (max + 1));
          } else {
            next = ~~(Math.random() * (max + 1));
          }
          if (next === currentItem) {
            next = currentItem === 0 ? max : currentItem - 1;
          }
          break;
        default:
          break;
      }
    } else {
      switch (mode) {
        case 'normal':
          if (currentItem === max) {
            this.state.play = false;
            this.handleChangeItem(max);
            return;
          }
          next = currentItem + 1;
          break;
        case 'cycle':
          next = currentItem === max ? 0 : currentItem + 1;
          break;
        case 'repeat':
          break;
        case 'random':
          if (window.crypto) {
            next = ~~(window.crypto.getRandomValues(new Uint8Array([1]))[0] / 255 * (max + 1));
          } else {
            next = ~~(Math.random() * (max + 1));
          }
          if (next === currentItem) {
            next = currentItem === 0 ? max : currentItem - 1;
          }
          break;
        default:
          break;
      }
    }

    this.handleChangeItem(next);
  }

  handlePressKey = e => {
    e.preventDefault();
    e.stopPropagation();

    const {
      currentPercent,
      volume
    } = this.state;

    switch (getKeyFromCode(e.keyCode || e.which)) {
      case 'LEFT':
        this.handleChangeCurrent(currentPercent - 1);
        return;
      case 'RIGHT':
        this.handleChangeCurrent(currentPercent + 1);
        return;
      case 'UP':
        this.handleChangeVolume(volume + 0.1);
        return;
      case 'DOWN':
        this.handleChangeVolume(volume - 0.1);
        return;
      case 'SPACE':
        this.handleSwitchPlay();
        return;
      default:
        return;
    }
  };

  handleSwitchPlay = () => {
    const {
      play
    } = this.state;

    if (play) {
      this.pause();
      return;
    }
    this.play();
  }

  handleSwitchVolume = () => {
    const {
      volume
    } = this.state;

    this.handleChangeVolume(volume ? 0 : 1);
  }

  handleChangeVolume = volume => {
    let nextVolume = volume;
    if (volume > 1) {
      nextVolume = 1;
    } else if (volume < 0) {
      nextVolume = 0;
    }

    this.setState({volume: nextVolume}, () => {
      this.refs.video.volume = this.state.volume;
    });
  }

  handleChangeCurrent = (current, cb) => {
    let nextCurrent = current;
    if (current > 100) {
      nextCurrent = 100;
    } else if (current < 0) {
      nextCurrent = 0;
    }

    const dom = findDOMNode(this.refs.video);
    dom.currentTime = dom.duration * nextCurrent / 100;
    this.setState({
      currentPercent: nextCurrent,
      currentTime: dom.currentTime
    }, cb ? cb() : () => {});
  }

  handleSwitchMode = () => {
    const {
      mode
    } = this.state;
    let nextMode = mode;

    switch (mode) {
      case 'normal':
        nextMode = 'cycle';
        break;
      case 'cycle':
        nextMode = 'repeat';
        break;
      case 'repeat':
        nextMode = 'random';
        break;
      case 'random':
        nextMode = 'normal';
        break;
      default:
        break;
    }
    this.setState({mode: nextMode});
  }

  handleSwitchView = () => {
    const {
      view
    } = this.state;
    const dom = findDOMNode(this.refs.root);

    if (view === 'full') {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      return;
    }

    if (dom.requestFullscreen) {
      dom.requestFullscreen();
    } else if (dom.msRequestFullscreen) {
      dom.msRequestFullscreen();
    } else if (dom.mozRequestFullScreen) {
      dom.mozRequestFullScreen();
    } else if (dom.webkitRequestFullscreen) {
      dom.webkitRequestFullscreen();
    }
  }

  handleViewChange = () => {
    const fullscreen = document.isFullScreen
      || document.msIsFullScreen
      || document.mozIsFullScreen
      || document.webkitIsFullScreen;

    this.setState({view: fullscreen ? 'full' : 'window'});
  }

  handleSwitchList = () => {
    const {
      openList
    } = this.state;

    this.setState({openList: !openList});
  }

  handleChangeItem = item => {
    const {
      play
    } = this.state;

    const dom = findDOMNode(this.refs.video);
    this.setState({
      currentPercent: 0,
      currentTime: 0,
      currentItem: item
    });
    dom.load();
    if (play) {
      dom.play();
    } else {
      dom.pause();
    }
  }

  render() {
    const {
      play,
      view
    } = this.state;

    return (
      <div
        className={cx(
          'hana-video-player',
          `hana-video-player-${view}`
        )}
        ref={'root'}
        tabIndex={-1}
        onKeyDown={this.handlePressKey}
      >
        {this.renderVideo()}
        <div
          className={cx(
            'hana-video-player-mask',
            `hana-video-player-mask-${play ? 'pause' : 'play'}`
          )}
          onClick={this.handleSwitchPlay}
        />
        {this.renderList()}
        {this.renderControllers()}
        {this.renderProgress()}
      </div>
    );
  }

  renderVideo = () => {
    const {
      autoPlay,
      preload,
      defaultText,
      defaultImage,
      defaultPoster,
      className,
      style
    } = this.props;

    const {
      currentItem
    } = this.state;

    if (this.list.length === 0) {
      return this.props.children;
    }

    const item = this.list[currentItem];
    const poster = item.poster ? {poster: item.poster} : {poster: defaultPoster};

    return (
      <video
        key={item}
        className={cx('hana-video-player-video', className)}
        style={style}
        ref={'video'}
        {...poster}
        autoPlay={autoPlay}
        preload={preload}
      >
        {
          item.sources.map(({src, type}, index) => (
            <source key={index} src={src} type={type} />
          ))
        }
        <img src={item.image || defaultImage} alt={item.title} />
        <p>{item.text || defaultText}</p>
      </video>
    );
  }

  renderControllers = () => {
    const {
      play,
      volume,
      mode
    } = this.state;

    if (this.list.length === 0) {
      return null;
    }

    return (
      <div className={cx('hana-video-player-ctr')}>
        <div className={cx('hana-video-player-ctr-bg')} />
        <div className={cx('hana-video-player-ctr-fg')} >
          <i
            className={cx(
              'hana-video-player-ctr-icon',
              'hana-video-player-ctr-mode',
              `hana-video-player-ctr-mode-${mode}`
            )}
            onClick={this.handleSwitchMode}
          />
          <div className={'hana-video-player-ctr-volume'}>
            <i
              className={cx(
                'hana-video-player-ctr-icon',
                `hana-video-player-ctr-volume-${volume === 0 ? 'z' : 'f'}`
              )}
              onClick={this.handleSwitchVolume}
            />
            <Progress
              className={cx('hana-video-player-progress-volume')}
              realTimeChange
              current={volume * 100}
              buffered={0}
              onChange={v => this.handleChangeVolume(v / 100)}
            />
          </div>
          <i
            className={cx(
              'hana-video-player-ctr-icon',
              'hana-video-player-ctr-pre'
            )}
            onClick={e => this.handlePlayEnd(e, true)}
          />
          <i
            className={cx(
              'hana-video-player-ctr-icon',
              `hana-video-player-ctr-${play ? 'pause' : 'play'}`
            )}
            onClick={this.handleSwitchPlay}
          />
          <i
            className={cx(
              'hana-video-player-ctr-icon',
              'hana-video-player-ctr-next'
            )}
            onClick={this.handlePlayEnd}
          />
          <i
            className={cx(
              'hana-video-player-ctr-icon',
              'hana-video-player-ctr-view-f'
            )}
            onClick={this.handleSwitchView}
          />
          <i
            className={cx(
              'hana-video-player-ctr-icon',
              'hana-video-player-ctr-list'
            )}
            onClick={this.handleSwitchList}
          />
        </div>
      </div>
    );
  }

  renderProgress = () => {
    const {
      currentPercent,
      bufferedPercent
    } = this.state;

    if (this.list.length === 0) {
      return null;
    }

    return (
      <div
        className={cx('hana-video-player-time-bar')}
      >
        <p>{this.currentStr}</p>
        <Progress
          className={cx('hana-video-player-progress-time')}
          current={currentPercent}
          buffered={bufferedPercent}
          onChange={this.handleChangeCurrent}
        />
        <p>{this.durationStr}</p>
      </div>
    );
  }

  renderList = () => {
    const {
      openList
    } = this.state;

    if (this.list.length <= 0) {
      return null;
    }

    return (
      <ul
        className={cx(
          'hana-video-player-list',
          `hana-video-player-list-${openList ? 'open' : 'close'}`
        )}
      >
        {
          this.list.map((item, index) => this.renderListItem(index, item))
        }
      </ul>
    );
  }

  renderListItem = (index, item) => {
    const {
      defaultImage,
      defaultPoster
    } = this.props;

    const {
      currentItem
    } = this.state;

    const {
      title,
      desc,
      image: realImage,
      poster: realPoster
    } = item;

    const image = realPoster || realImage || defaultPoster || defaultImage;

    return (
      <li
        key={index}
        className={cx(
          'hana-video-player-item',
          `hana-video-player-item-${index === currentItem ? 'active' : 'normal'}`
        )}
        onClick={() => {
          if (index !== currentItem) {
            this.handleChangeItem(index);
          }
        }}
      >
        <div
          className={cx('hana-video-player-item-poster')}
          style={{backgroundImage: `url(${image})`}}
        />
        <div className={cx('hana-video-player-item-info')}>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </li>
    );
  }
}
