/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/5
 */

import ast from './ast';
import display from './display';

/* eslint-disable */

const defineAst = [
  ['define', {name: 'transform', type: 'add', props: {name: 't1', props: {type: 'normal', left: 0.4, right: null, top: null, bottom: null, opacity: 1}}}],
  ['define', {name: 'transform', type: 'add', props: {name: 't2', props: {type: 'normal', left: 0, right: null, top: 0.2, bottom: null, opacity: 1}}}],
  ['define', {name: 'transform', type: 'add', props: {name: 't3', props: {type: 'normal', left: 0.1, right: null, top: null, bottom: 0.2, opacity: null}}}],
  ['define', {name: 'transform', type: 'add', props: {name: 't4', props: {type: 'normal', left: null, right: 0, top: 0.2, bottom: null, opacity: null}}}],
  ['define', {name: 'transform', type: 'add', props: {name: 'tf1', props: {type: 'function', args: 'x', funBody: 'return {left: x / 6, top: 0};'}}}],
  ['define', {name: 'animation', type: 'add', props: {name: 'a1', props: {duration: 1000, types: {top: 'quadOut', left: 'quadOut', opacity: 'linear', zoom: 'linear'}}}}],
  ['define', {name: 'transition', type: 'add', props: {name: 'ts1', props: {type: 'cover', params: {duration: 1000, curve: 'linear', direction: 'left'}}}}],
  ['define', {name: 'transition', type: 'add', props: {name: 'ts2', props: {type: 'move', params: {duration: 1000, curve: 'linear', direction: 'left'}}}}],
  ['define', {name: 'transition', type: 'add', props: {name: 'ts3', props: {type: 'dissolve', params: {duration: 1000, curve: 'linear', direction: 'left'}}}}],
  ['define', {name: 'image', type: 'add', props: {name: 'bg', props: {child: '1', url: '/demo/static/hana-song/bg/02.jpg'}}}],
  ['define', {name: 'image', type: 'add', props: {name: 'bg', props: {child: '2', url: '/demo/static/hana-song/bg/01.jpg'}}}],
  ['define', {name: 'image', type: 'add', props: {name: 'char', props: {child: '1', url: '/demo/static/hana-song/char/hana/AA01A.png'}}}],
  ['define', {name: 'image', type: 'add', props: {name: 'char', props: {child: '2', url: '/demo/static/hana-song/char/hana/AA03A.png'}}}],
  ['define', {name: 'image', type: 'add', props: {name: 'char', props: {child: '3', url: '/demo/static/hana-song/char/hana/BA01A.png'}}}],
  ['define', {name: 'image', type: 'add', props: {name: 'btn', props: {child: '1', url: '/demo/static/hana-song/icons/button.png'}}}],
  ['define', {name: 'audio', type: 'add', props: {name: 'bgm', props: {url: '/demo/static/hana-song/music/byebye.mp3'}}}],
  ['define', {name: 'audio', type: 'add', props: {name: 'bgm2', props: {url: '/demo/static/hana-song/music/date.mp3'}}}],
  ['define', {name: 'audio', type: 'add', props: {name: 'knock', props: {url: '/demo/static/hana-song/music/knock.wav'}}}],
  ['define', {name: 'video', type: 'add', props: {name: 'op', props: {url: '/demo/static/hana-song/video/op.mp4'}}}],
   ['define', {name: 'shape', type: 'add', props: {name: 'r1', props: {params: {
     type: 'rect', height: 82, width: 178,
     backgroundColor: 'rgba(102, 204, 255, 1)',
     borderColor: 'rgba(0, 0, 0, 1)',
     borderRadius: 20,
     backgroundImage: {name: 'btn', child: '1'}
   }}}}],
   ['define', {name: 'shape', type: 'add', props: {name: 'r2', props: {params: {
     type: 'circle', radius: 200, method: 'fill',
     backgroundColor: 'rgba(102, 204, 255, 1)',
     borderColor: 'rgba(0, 0, 0, 1)',
     borderWidth: 3
   }}}}],
   ['define', {name: 'shape', type: 'add', props: {name: 'r3', props: {params: {
     type: 'polygon',
     backgroundImage: {name: 'bg', child: '1'},
     path: [
       {x: 0, y: 80}, {x: 80, y: 80}, {x: 120, y: 0}, {x: 160, y: 80}, {x: 240, y: 80},
       {x: 180, y: 140}, {x: 220, y: 240}, {x: 120, y: 180}, {x: 20, y: 240}, {x: 60, y: 140}
     ]
   }}}}],
  ['define', {name: 'screen', type: 'add', props: {name: 'screen1', props: {children: [
     {
       type: 'image',
       props: {name: 'char', child: '1'},
       transform: {right: 0, top: 0},
       events: [
         {
           type: 'click',
           action: ['text', {type: 'text', name: 'text1', text: '萌萌萌', color: '#0f0', mode: 'string', alias: null, size: 64, cps: 10, transform: 't2', transition: null, animation: null, behind: null, width: 540, lineHeight: 80, child: null, transformArgs: []}]
         },
         {
           type: 'click',
           action: ['text', {type: 'text', name: 'text1', text: '萌萌萌222', color: '#6cf', mode: 'string', alias: null, size: 64, cps: 10, transform: 't1', transition: null, animation: null, behind: null, width: 540, lineHeight: 80, child: null, transformArgs: []}]
         }
       ]
     },
    {
      type: 'text',
      props: {text: '蛤蛤', color: '#0f0', size: 48, cps: 20, lineHeight: 52, width: 240, transformArgs: []},
      transform: {left: 0, bottom: 0}
    },
    {
      type: 'shape',
      props: {params: {type: 'rect', height: 82, width: 178,
        backgroundColor: 'rgba(102, 204, 255, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 20,
        backgroundImage: {name: 'btn', child: '1'}
      }},
      transform: {left: 0.2, bottom: 0.2},
      events: [
        {
          type: 'click',
          action: ['text', {type: 'text', name: 'text1', text: '绿色的START', mode: 'string', alias: null, color: '#0f0', size: 64, cps: 10, transformArgs: [], transform: 't3', transition: null, animation: null, behind: null, width: 540, lineHeight: 80}]
        }
      ]
    }
  ]}}}],
  ['define', {name: 'screen', type: 'add', props: {name: 'screen2', props: {children: [
    {
      type: 'shape',
      props: {params: {type: 'rect', height: 82, width: 178,
        backgroundColor: 'rgba(102, 204, 255, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 20,
        backgroundImage: {name: 'btn', child: '1'}
      }},
      transform: {left: 0.25, bottom: 0.21},
      events: [
        {
          type: 'click',
          action: ['text', {type: 'text', name: 'text1', transformArgs: [], text: '黑色的Start', mode: 'string', alias: null, color: '#000', size: 64, cps: 10, transform: 't3', transition: null, animation: null, behind: null, width: 540, lineHeight: 80}]
        }
      ]
    }
  ]}}}],
  ['define', {name: 'var', type: 'add', props: {name: 'moe', props: {value: '萌'}}}],
  ['define', {name: 'slider', type: 'add', props: {name: 'sl1', props: {}}}],
  ['define', {name: 'screen', type: 'add', props: {name: 'screen3', props: {children: [
    {
      type: 'shape',
      props: {params: {type: 'rect', height: 100, width: 220,
        backgroundColor: 'rgba(102, 204, 255, 1)',
        borderRadius: 20,
        color: '#fff',
        fontSize: 40,
        text: 'Game Start'
      }},
      transform: {left: 0.28, bottom: 0.22},
      events: [
        {
          type: 'click',
          action: ['show', {type: 'image', name: 'bg', child: '1', transform: null, transformArgs: [], animation: null, transition: null, behind: null, alias: null}]
        }
      ]
    },
    {
      type: 'shape',
      props: {params: {type: 'rect', height: 100, width: 220,
        backgroundColor: 'rgba(102, 204, 255, 1)',
        borderRadius: 20,
        color: '#fff',
        fontSize: 40,
        text: 'Quit Game'
      }},
      transform: {left: 0.48, bottom: 0.22},
      events: [
        {
          type: 'click',
          action: ['hide',{name: 'screen3', transform: 't3', transformArgs: [], animation: null, transition: null, child: null, behind: null, alias: null}]
        }
      ]
    }
  ]}}}],
  ['define', {name: '', type: 'load', props: {}}]
];

const textAst = [
    ['show', {type: 'image', name: 'bg', child: '1', transform: null, transformArgs: [], animation: null, transition: null, behind: null, alias: null}],
    ['exec', {code: 'alert(vars.moe); vars.moe = "aaa"; console.log(vars.moe)'}],
   ['show',{name: 'screen1', transform: 't3', transformArgs: [], animation: null, transition: null, child: null, behind: null, alias: null}],
   ['show',{name: 'screen2', transform: 't3', transformArgs: [], animation: null, transition: null, child: null, behind: null, alias: null}],
  ['show',{name: 'screen3', transform: 't3', transformArgs: [], animation: null, transition: null, child: null, behind: null, alias: null}],
    ['show', {child: null, name: 'r1', transform: 'tf1', transformArgs: [2], animation: null, transition: null, behind: null, alias: null}],
    ['show', {child: null, name: 'r2', transform: null, transformArgs: [], animation: null, transition: null, behind: null, alias: null}],
    ['show', {child: null, name: 'r3', transform: null, transformArgs: [], animation: null, transition: null, behind: null, alias: null}],
    ['play', {type: 'audio', audioType: 'music', name: 'bgm', loop: true, transition: 'fade', offset: 10, transitionDuration: 5}],
    ['play', {type: 'audio', audioType: 'music', name: 'bgm2', loop: true, transition: 'fade', transitionDuration: 5}],
    ['play', {type: 'audio', audioType: 'sound', name: 'knock', delay: 1}],
  ['stop', {type: 'audio', name: 'bgm2', transition: 'fade', transitionDuration: 5}],
   ['show', {name: 'op', child: null, transform: 't1', transformArgs: [], animation: null, transition: null, behind: null, alias: null}],
   ['play', {name: 'op', type: 'video'}],
   ['show', {name: 'op', child: null, transform: 't2', transformArgs: [], animation: 'a1', transition: null, behind: null, alias: null}],
   ['text', {
     text: '蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤2',
     color: '#0f0', size: 48, cps: 20, lineHeight: 52, width: 240,
     transform: 't2', transformArgs: [], animation: null, transition: null, behind: null, alias: 'text1'
   }],
   ['text', {
     text: '蛤蛤222', color: '#f00', size: 102, cps: 10, lineHeight: null, width: null,
     transform: 't4', transformArgs: [], animation: 'a1', transition: null, behind: null, alias: 'text1'
   }],
   ['show', {name: 'char', child: '1', transform: 't1', transformArgs: [], animation: null, transition: null, behind: null, alias: null}],
   ['show', {name: 'char', child: '2', transform: 't1', transformArgs: [], animation: null, transition: 'ts1', behind: null, alias: null}],
   ['show', {name: 'char', child: '3', transform: 't1', transformArgs: [], animation: null, transition: 'ts2', behind: null, alias: null}],
   ['show', {name: 'char', child: '1', transform: 't1', transformArgs: [], animation: null, transition: 'ts3', behind: null, alias: null}],
   ['show', {name: 'char', child: '2', transform: 't2', transformArgs: [], animation: 'a1', transition: null, behind: null, alias: null}],
   ['show', {name: 'char', child: '1', transform: 't3', transformArgs: [], animation: null, transition: null, behind: null, alias: 'charx'}],
   ['scene', {name: 'bg', child: '2', transform: null, transformArgs: [], transition: 'ts1'}],
   ['scene', {name: 'bg', child: '1', transform: null, transformArgs: [], transition: 'ts2'}],
   ['scene', {name: 'bg', child: '2', transform: null, transformArgs: [], transition: 'ts3'}],
   ['hide', {name: 'bg', transform: 't2', transformArgs: [], animation: 'a1', transition: null}],
//   [
//     'show',
//     {
//       type: 'image',
//       name: 'bg',
//       child: '1',
//       animation: null,
//       transform: null,
//       transformArgs: [],
//       transition: null,
//       behind: null,
//       alias: null,
//       events: [
//         {type : 'keyup', code: 'SHIFT', action: ['show', {type: 'text', name: 'text1', text: '萌萌萌', color: '#0f0', size: 64, cps: 10, transform: 't2', transition: null, animation: null, behind: null, width: 240, lineHeight: 80}]},
//         {type : 'keyup', code: 'ESCAPE', action: ['hide', {type: 'image', name: 'bg', transform: null, transition: null}]}
//       ]
//     }
//   ]
];

const test = dom => {
  let i = 0;
  dom.addEventListener('mouseup', () => {
    // test
    if (textAst[i]) ast[textAst[i][0]].exec(textAst[i][1]);
    if (i === textAst.length) {
       //i = 0;
    } else {
      i++;
    }
  });
};

export const init = dom => {
  display.init(dom);
  defineAst.forEach(item => {
    ast[item[0]].exec(item[1]);
  });
  test(dom);
};

/* eslint-enable */
