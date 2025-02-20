（注：本文来自个人博客：https://jungleford.wordpress.com/2025/02/19/cursor%e5%88%9d%e4%bd%93%e9%aa%8c/）

# Cursor初体验

今年刚刚过去的春节期间，“[DeepSeek暴击](https://mp.weixin.qq.com/s/o41vPh9eJCVjCRUE4u5npA)”把国产AI一下子拉到与2023年的“[ChatGPT](https://chatgpt.com/)暴击”和2024年初的“[Sora](https://openai.com/sora/)暴击”相平齐的地位，这确实是一件振奋人心的事件。我是在去年10月底或11月初左右开始注册使用DeepSeek聊天AI的，用了大概3个月，总体感觉在获取关于IT技术的知识和信息方面，与使用GPT-4o相差无几，最重要的是，要想免费使用o1级的AI，再也不用科学上网了，所以我就从ChatGPT完全转向了DeepSeek。为了表示对国产AI的支持，我还申请了它的API，并且给DeepSeek充了20块钱的token使用额度，同时也可以给自己平时做试验用。

![](https://jungleford.wordpress.com/wp-content/uploads/2025/02/8be58584d7c3494800ba69567b6c3a3.jpg)

![](https://jungleford.wordpress.com/wp-content/uploads/2025/02/fd0fcfc9f943abdf17c0306d802aac7.jpg)

最近在B站看到有人用再用[Cursor](https://www.cursor.com/)这款AI编辑器开发环境[进行编程和开发](https://www.bilibili.com/video/BV16qsBebE8u)，很好奇，就去弄了个下来玩玩，虽然composer只有14天体验期，但做个简单的小实验还是够用的。

Cursor是基于[VS Code](https://code.visualstudio.com/)开发的一款产品，使用VS Code的同学可以无感切换。与VS Code的Github Copilot插件不同，Cursor的AI助手分成两个：Chat和Composer。Chat就是普通的AI聊天，虽然也可以用来生成代码，但作为一个Cursor患者，应该是更依赖Composer，用Composer才能更方便地在全workspace上下文生成代码。这里我就随便头脑风暴一下，来个比较简单的吧，比方说[汉诺塔](https://baike.baidu.com/item/%E6%B1%89%E8%AF%BA%E5%A1%94%E9%97%AE%E9%A2%98/1945186)。

按照基本操作规范，我得在Notepads里先写一份项目大纲——

```markdown
# 前置
你是一个前端开发工程师，现在正在开发一个web应用，因此需要使用html、css、javascript等技术及其衍生技术和框架。

# 项目背景
本项目是一个演示性质简单web应用，用于展示一个汉诺塔的移动过程的动画。

# 技术架构
- 使用react框架
- 使用less作为css预处理器
- 使用typescript作为开发语言

# 基本需求
- 本项目是一个单页面应用，因此只需要一个html文件
- 本项目需要展示一个汉诺塔的移动过程的动画，因此需要一个动画效果
- 动画实现请尽可能使用浏览器原生api，不要使用第三方库
- 页面包含
  - 一个标题
  - 一个数字输入框，用于设置盘子的数量n，最小值为3，最大值为8
  - 一个下拉菜单，用于设置动画模式，包括：
    - 动画模式：用户可以开始、暂停、继续、重置动画
    - 单步模式：用户可以单步执行动画，每次单步执行动画，会显示一个动画步骤的提示
  - 如果用户选择动画模式，则下方区域显示：
    - 一个按钮，用于开始动画
    - 一个按钮，用于暂停和继续动画
    - 一个按钮，用于重置动画
  - 如果用户选择单步模式，则下方区域显示：
    - 一个按钮，用于显示初始状态画面
    - 一个按钮，用于显示上一步状态画面
    - 一个按钮，用于显示下一步状态画面
    - 一个按钮，用于显示最后一步状态画面
  - 一个动画演示区域，用于展示动画过程，包括：
    - 一个汉诺塔的3根柱子，分别为A、B、C，使用不同的颜色区分
    - 初始状态：
      - A柱子有n个盘子，盘子从上到下依次增大
      - 每个盘子从小到大从1开始编号
      - B柱子和C柱子为空
    - 移动盘子的规则：
      - 每次移动的盘子只能从一根柱子移动到另一根柱子
      - 每次只能移动柱子顶部的盘子
      - 每次只能移动一个盘子
      - 每次移动的盘子只能放在目标柱子的顶部
      - 每次移动的盘子只能放在比它大的盘子上面
  - 最下方是动画步骤提示区域，用于显示动画步骤的提示，包括：
    - 当前是第几步
    - 当前步骤移动的盘子编号
    - 当前步骤是从哪根柱子移动到哪根柱子

# 目录结构
- public/
  - index.html
- src/
  - components/
    - 汉诺塔组件
  - App.tsx
  - index.tsx
  - index.less
- package.json
- tsconfig.json
- .gitignore
- .cursorignore
- .cursorrules

# 代码规范
- 所有组件的样式都写在组件的less文件中
- 使用四格缩进
- 使用驼峰命名法命名组件
```

这份大纲可以从当前项目的`.cursorrules`文件复制，就是喂给AI大模型的提示词集合。虽然在Cursor的设置里已经可以启用`deepseek-v3`和`deepseek-r1`两个模型了，但是在Composer里面似乎还不支持deepseek的模型，不过在Chat窗口里还是可以选择deepseek模型的，我就在Chat里问了一下，决定用编码功能较好的**claude-3.5-sonnet**模型作为Composer的编码基座。在Composer的输入框里用 **@** 操作符把上面的大纲添加进来，然后就直接跟AI对话，让它根据这个需求给我自动编码生成一个演示汉诺塔问题动画的react项目。

由于项目简单，代码生成还是比较快的，大概两三分钟，就按照大纲要求自动生成目录和文件，并且自动在相应文件里填充代码。这里需要特别强调一下的是，为了验证Cursor的能力，我在这个实验性质的小项目开发里**几乎没有手写任何一行代码**（其实中间有稍微介入过一次，手工改动过半行代码，不超过5个字符），除了作为AI提示词的那份大纲之外，**也没有手工进行任何代码级别的项目配置**。Cursor生成的代码并不是一次通过的，即使是一个简单的小项目也可能会碰到各种各样的错误，这就需要开发人员在Composer里细心调教AI娘了，这里我只用中文描述我在Cursor里看到什么错误，在浏览器里看到什么运行结果，结果对不对，期望结果应该是什么样子，除了@操作符引用文件外，对话里我没有粘贴任何代码，全部是聊天对话语言，大家感受一下——

![](https://jungleford.wordpress.com/wp-content/uploads/2025/02/image.png)

![](https://jungleford.wordpress.com/wp-content/uploads/2025/02/image-1.png)

这样在几乎完全没有人工编码介入（也就是说，使用Cursor的人甚至可以完全不懂编程，只要会识字会打字就行），完全由AI自己理解，自己生成出来的代码效果如何呢？请继续感受一下——

![](https://jungleford.wordpress.com/wp-content/uploads/2025/02/hanoi.gif)

![](https://jungleford.wordpress.com/wp-content/uploads/2025/02/hanoi2.gif)

这个小项目我在Cursor中完全使用自然语言与AI聊天，一步一步指导它完成，大概花了一个下午的时间。而这期间，我所有的劳动，大概只有两部分：最开始编写那个大纲，以及观察运行结果并与AI对话。对于AI编程，我还算不上是一个熟手，如果是个Cursor熟手，我相信大概一个小时以内就可以完成。

一个单纯的编码程序员，未来可能会转型成为一个懂代码的产品设计师的角色（更像今天产品经理的角色），在他的工作时间里，可能只有很少（或者说比较少）的时间真正去手工编写代码，这时候就需要对产品的各个方面有更深刻的理解才行。

这，就是AI的威力，或者说AI革命的威力。