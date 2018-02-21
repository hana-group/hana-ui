/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/28
 */
import sortBy from 'lodash/sortBy';

import Text from './seeds/Text';
import Switch from './seeds/Switch';
import Checkbox from './seeds/Checkbox';
import Icon from './seeds/Icon';
import Radio from './seeds/Radio';
import Select from './seeds/Select';
import Divider from './seeds/Divider';
import Button from './seeds/Button';
import Title from './seeds/Title';
import Tooltip from './seeds/Tooltip';
import Tag from './seeds/Tag';
import Notification from './seeds/Notification';
import Menu from './seeds/Menu';
import Modal from './seeds/Modal';
import DatePicker from './seeds/DatePicker';
import Sidebar from './seeds/Sidebar';
import TimePicker from './seeds/TimePicker';
import Image from './seeds/Image';
import Table from './seeds/Table';
import TextArea from './seeds/TextArea';
import Loading from './seeds/Loading';
import Pagination from './seeds/Pagination';
import Progress from './seeds/Progress';
import Popover from './seeds/Popover';
import Slider from './seeds/Slider';
import Postcard from './seeds/Postcard';
import Animation from './seeds/Animation';
import Link from './seeds/Link';

import Card from './burgeon/Card';
import IconButton from './burgeon/IconButton';
import DateTimePicker from './burgeon/DateTimePicker';
import Form from './burgeon/Form';
import Upload from './burgeon/Upload';
import Carousel from './burgeon/Carousel';

// import ADVEngine from './flowers/ADVEngine';
import VideoPlayer from './flowers/VideoPlayer';
import AudioPlayer from './flowers/AudioPlayer';

const components = {
  categories: [
    {key: 'seeds', label: {en: 'Seeds', cn: '种子'}, path: 'seeds'},
    {key: 'burgeon', label: {en: 'Burgeon', cn: '新芽'}, path: 'burgeon'},
    {key: 'flowers', label: {en: 'Flowers', cn: '花'}, path: 'flowers'}
  ],
  seeds: sortBy([
    {label: {en: 'Text', cn: '文本输入'}, path: 'text', component: Text, readme: require('./seeds/Text/README.md')},
    {label: {en: 'Button', cn: '按钮'}, path: 'button', component: Button, readme: require('./seeds/Button/README.md')},
    {label: {en: 'Switch', cn: '开关'}, path: 'switch', component: Switch, readme: require('./seeds/Switch/README.md')},
    {label: {en: 'Checkbox', cn: '多选框'}, path: 'checkbox', component: Checkbox, readme: require('./seeds/Checkbox/README.md')},
    {label: {en: 'Icon', cn: '图标'}, path: 'icon', component: Icon, readme: require('./seeds/Icon/README.md')},
    {label: {en: 'Radio', cn: '单选框'}, path: 'radio', component: Radio, readme: require('./seeds/Radio/README.md')},
    {label: {en: 'Divider', cn: '分隔线'}, path: 'divider', component: Divider, readme: require('./seeds/Divider/README.md')},
    {label: {en: 'Title', cn: '标题'}, path: 'title', component: Title, readme: require('./seeds/Title/README.md')},
    {label: {en: 'Tooltip', cn: '冒泡提示框'}, path: 'tooltip', component: Tooltip, readme: require('./seeds/Tooltip/README.md')},
    {label: {en: 'Select', cn: '选择器'}, path: 'select', component: Select, readme: require('./seeds/Select/README.md')},
    {label: {en: 'Tag', cn: '标签'}, path: 'tag', component: Tag, readme: require('./seeds/Tag/README.md')},
    {label: {en: 'Notification', cn: '消息提示'}, path: 'notification', component: Notification, readme: require('./seeds/Notification/README.md')},
    {label: {en: 'Modal', cn: '模式对话框'}, path: 'modal', component: Modal, readme: require('./seeds/Modal/README.md')},
    {label: {en: 'DatePicker', cn: '日期选择器'}, path: 'date-picker', component: DatePicker, readme: require('./seeds/DatePicker/README.md')},
    {label: {en: 'Menu', cn: '菜单'}, path: 'menu', component: Menu, readme: require('./seeds/Menu/README.md')},
    {label: {en: 'Sidebar', cn: '侧边栏'}, path: 'sidebar', component: Sidebar, readme: require('./seeds/Sidebar/README.md')},
    {label: {en: 'TimePicker', cn: '时间选择器'}, path: 'time-picker', component: TimePicker, readme: require('./seeds/TimePicker/README.md')},
    {label: {en: 'Image', cn: '图像'}, path: 'image', component: Image, readme: require('./seeds/Image/README.md')},
    {label: {en: 'Postcard', cn: '明信片'}, path: 'postcard', component: Postcard, readme: require('./seeds/Postcard/README.md')},
    {label: {en: 'Table', cn: '表格'}, path: 'table', component: Table, readme: require('./seeds/Table/README.md')},
    {label: {en: 'TextArea', cn: '多行文本'}, path: 'text-area', component: TextArea, readme: require('./seeds/TextArea/README.md')},
    {label: {en: 'Loading', cn: '加载器'}, path: 'loading', component: Loading, readme: require('./seeds/Loading/README.md')},
    {label: {en: 'Pagination', cn: '分页器'}, path: 'pagination', component: Pagination, readme: require('./seeds/Pagination/README.md')},
    {label: {en: 'Progress', cn: '进度条'}, path: 'progress', component: Progress, readme: require('./seeds/Progress/README.md')},
    {label: {en: 'Popover', cn: '冒泡弹出框'}, path: 'popover', component: Popover, readme: require('./seeds/Popover/README.md')},
    {label: {en: 'Slider', cn: '滑动条'}, path: 'slider', component: Slider, readme: require('./seeds/Slider/README.md')},
    {label: {en: 'Animation', cn: '动画'}, path: 'animation', component: Animation, readme: require('./seeds/Animation/README.md')},
    {label: {en: 'Link', cn: '链接'}, path: 'link', component: Link, readme: require('./seeds/Link/README.md')}
  ], 'path'),
  burgeon: sortBy([
    {label: {en: 'Card', cn: '卡片'}, path: 'card', component: Card, readme: require('./burgeon/Card/README.md')},
    {label: {en: 'IconButton', cn: '图标按钮'}, path: 'iconbutton', component: IconButton, readme: require('./burgeon/IconButton/README.md')},
    {label: {en: 'DateTimePicker', cn: '日期时间选择器'}, path: 'date-time-picker', component: DateTimePicker, readme: require('./burgeon/DateTimePicker/README.md')},
    {label: {en: 'Form', cn: '表单'}, path: 'form', component: Form, readme: require('./burgeon/Form/README.md')},
    {label: {en: 'Upload', cn: '上传'}, path: 'upload', component: Upload, readme: require('./burgeon/Upload/README.md')},
    {label: {en: 'Carousel', cn: '旋转木马'}, path: 'carousel', component: Carousel, readme: require('./burgeon/Carousel/README.md')}
  ], 'path'),
  flowers: sortBy([
    {label: {en: 'VideoPlayer', cn: '视频播放器'}, path: 'video-player', component: VideoPlayer, readme: require('./flowers/VideoPlayer/README.md')},
    {label: {en: 'AudioPlayer', cn: '音乐播放器'}, path: 'audio-player', component: AudioPlayer, readme: require('./flowers/AudioPlayer/README.md')}
    // {label: {en: 'ADVEngine', cn: 'ADV游戏引擎'}, path: 'adv-engine', component: ADVEngine, readme: require('./seeds/ADVEngine/README.md')}
  ], 'path')
};

export default components;
