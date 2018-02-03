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
    {label: {en: 'Text', cn: '文本输入'}, path: 'text', component: Text},
    {label: {en: 'Button', cn: '按钮'}, path: 'button', component: Button},
    {label: {en: 'Switch', cn: '开关'}, path: 'switch', component: Switch},
    {label: {en: 'Checkbox', cn: '检查框'}, path: 'checkbox', component: Checkbox},
    {label: {en: 'Icon', cn: '图标'}, path: 'icon', component: Icon},
    {label: {en: 'Radio', cn: '触点'}, path: 'radio', component: Radio},
    {label: {en: 'Divider', cn: '分隔线'}, path: 'divider', component: Divider},
    {label: {en: 'Title', cn: '标题'}, path: 'title', component: Title},
    {label: {en: 'Tooltip', cn: '冒泡提示框'}, path: 'tooltip', component: Tooltip},
    {label: {en: 'Select', cn: '选择器'}, path: 'select', component: Select},
    {label: {en: 'Tag', cn: '标签'}, path: 'tag', component: Tag},
    {label: {en: 'Notification', cn: '消息提示'}, path: 'notification', component: Notification},
    {label: {en: 'Modal', cn: '模式对话框'}, path: 'modal', component: Modal},
    {label: {en: 'DatePicker', cn: '日期选择器'}, path: 'date-picker', component: DatePicker},
    {label: {en: 'Menu', cn: '菜单'}, path: 'menu', component: Menu},
    {label: {en: 'Sidebar', cn: '侧边栏'}, path: 'sidebar', component: Sidebar},
    {label: {en: 'TimePicker', cn: '时间选择器'}, path: 'time-picker', component: TimePicker},
    {label: {en: 'Image', cn: '图像'}, path: 'image', component: Image},
    {label: {en: 'Postcard', cn: '明信片'}, path: 'postcard', component: Postcard},
    {label: {en: 'Table', cn: '表格'}, path: 'table', component: Table},
    {label: {en: 'TextArea', cn: '多行文本'}, path: 'text-area', component: TextArea},
    {label: {en: 'Loading', cn: '加载器'}, path: 'loading', component: Loading},
    {label: {en: 'Pagination', cn: '分页器'}, path: 'pagination', component: Pagination},
    {label: {en: 'Progress', cn: '进度条'}, path: 'progress', component: Progress},
    {label: {en: 'Popover', cn: '冒泡弹出框'}, path: 'popover', component: Popover},
    {label: {en: 'Slider', cn: '滑动条'}, path: 'slider', component: Slider},
    {label: {en: 'Animation', cn: '动画'}, path: 'animation', component: Animation},
    {label: {en: 'Link', cn: '链接'}, path: 'link', component: Link}
  ], 'path'),
  burgeon: sortBy([
    {label: {en: 'Card', cn: '卡片'}, path: 'card', component: Card},
    {label: {en: 'IconButton', cn: '图标按钮'}, path: 'iconbutton', component: IconButton},
    {label: {en: 'DateTimePicker', cn: '日期时间选择器'}, path: 'date-time-picker', component: DateTimePicker},
    {label: {en: 'Form', cn: '表单'}, path: 'form', component: Form},
    {label: {en: 'Upload', cn: '上传'}, path: 'upload', component: Upload},
    {label: {en: 'Carousel', cn: '旋转木马'}, path: 'carousel', component: Carousel}
  ], 'path'),
  flowers: sortBy([
    {label: {en: 'VideoPlayer', cn: '视频播放器'}, path: 'video-player', component: VideoPlayer},
    {label: {en: 'AudioPlayer', cn: '音乐播放器'}, path: 'audio-player', component: AudioPlayer}
    // {label: {en: 'ADVEngine', cn: 'ADV游戏引擎'}, path: 'adv-engine', component: ADVEngine}
  ], 'path')
};

export default components;
