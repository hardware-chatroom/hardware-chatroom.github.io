export type Locale = "zh" | "en";
export const ORG = "https://github.com/hardware-chatroom";
export const REPO = `${ORG}/hardware-chatroom.github.io`;
export const SITE = "https://hardware-chatroom.github.io";
export const route = (locale: Locale, path = "") => `${locale === "en" ? "/en" : ""}/${path ? `${path}/` : ""}`;
export const propose = (title = "") => `${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent("## Idea / 想法\n\n## Hardware / 硬件\n\n## What to try / 想验证什么\n\n## What I need / 希望获得的帮助\n")}`;

export const copy = {
  zh: {
    lang: "zh-CN", name: "硬件唠嗑室", nav: ["项目", "实验笔记", "关于"],
    skip: "跳到正文", menu: "打开导航", close: "关闭导航", join: "一起探索", more: "了解更多",
    kicker: "好奇心，接上电。", tagline: "聊聊硬件，动手做点好玩的。",
    intro: "一个开放、有趣、由好奇心驱动的硬件探索社区。",
    lead: "比起讨论一个东西有多厉害，我们更想亲手试试它究竟能做什么。",
    workbench: "工作台上", workbenchEn: "ON THE WORKBENCH", allProjects: "探索项目",
    workbenchIntro: "先从一个小问题开始。把想法接上线，让下一次实验发生。",
    proposal: "实验提案", proposalNote: "以下是待发起的探索方向，欢迎把它变成第一个项目。",
    ideas: [
      { title: "给一个小屏幕，接上好奇心。", text: "从 ESP32 和 OLED 开始，试试让设备用自己的方式回应。", tag: "DIY & Prototyping", issue: "实验提案：ESP32 与小屏幕", art: "screen" },
      { title: "拆开看看，还能怎么玩？", text: "一件电子玩具，一个没弄懂的问题。沿着电路，找到新的可能。", tag: "Hardware Hacking", issue: "实验提案：拆解与改造电子玩具", art: "circuit" },
    ],
    ideaAction: "聊聊这个想法", notes: "实验笔记", allNotes: "阅读笔记",
    noteTag: "社区笔记", noteTitle: "从一个问题开始，把过程留下来。",
    noteIntro: "关于我们为什么折腾硬件，以及那些还没跑通的尝试为什么也值得分享。",
    explore: "我们在探索", directions: [
      ["Hardware Hacking", "拆解设备、逆向协议、固件研究与硬件改造。"],
      ["AI × Hardware", "探索 Agent、语音交互、智能设备与物理世界的连接。"],
      ["DIY & Prototyping", "从开发板到完整原型，把脑海里的想法做出来。"],
      ["Open Hardware", "分享开源项目、工具、知识与可复现的实践。"],
    ],
    invite: "带上你的奇怪想法，", inviteEnd: "一起来玩。", inviteText: "未完成的项目、刚买的电子玩具，或者一句「要不试试？」。这里都欢迎。",
    footer: "聊点硬件，做点东西，分享过程，玩得开心。", install: "添加到主屏幕", installed: "已安装", offline: "当前离线，仍可阅读已缓存的页面。", online: "已重新连接网络。", update: "有新版本可用", refresh: "更新", dismiss: "关闭", installTitle: "把工作台放进口袋。", installIntro: "添加到主屏幕，像打开一个应用一样，随时回来逛逛。", ios: "在 Safari 中打开本站，点击「分享」，再选择「添加到主屏幕」。", manual: "在浏览器菜单中选择「安装应用」或「添加到主屏幕」。安装选项因浏览器而异。", installReady: "安装 Hardware Chatroom", offlineHint: "最近访问的页面可离线阅读；GitHub 链接需要网络连接。",
    aboutTitle: "好奇心驱动，动手见真章。", aboutLabel: "关于硬件唠嗑室",
    aboutParagraphs: ["硬件唠嗑室是一个开放、有趣、由好奇心驱动的硬件探索社区。", "我们喜欢各种有意思的硬件：开发板、智能穿戴、电子玩具、传感器、机器人，以及那些尚未被充分探索的新设备。", "我们关注 AI 与硬件的结合，但不局限于 AI。新技术、新产品、新奇的交互方式，都可能成为下一次实验的起点。", "比起讨论一个东西有多厉害，我们更想亲手试试它究竟能做什么。"],
    beliefsTitle: "我们相信", beliefs: [
      ["好奇心驱动探索。", "不必每个项目都有明确的商业价值，有趣本身就是一个很好的理由。"],
      ["动手比围观更有意思。", "热点可以追，但更希望通过复现、改造和实验，验证那些令人兴奋的想法。"],
      ["过程和结果同样重要。", "记录设计、开发、调试和踩坑的过程，让失败的尝试也能成为有价值的经验。"],
      ["开放让创造更有趣。", "分享代码、设计、教程和思考，让更多人能够复现、改进，甚至创造完全不同的东西。"],
    ],
    joinTitle: "从一句「要不试试？」开始。", joinIntro: "不管你是经验丰富的硬件开发者，还是刚刚接触 ESP32 的新手，都欢迎来到硬件唠嗑室。", joinSteps: [
      ["带来一个想法", "说说你感兴趣的设备、想验证的问题，或者一个奇怪的脑洞。", "发起一个想法"],
      ["记录一次尝试", "分享接线、代码、测量和踩坑。没做完也可以，把已经弄懂的部分留下来。", "分享实验记录"],
      ["一起改进", "发现文案、设计或代码可以变得更好？打开仓库，提交你的改进。", "查看官网仓库"],
    ],
    notesLead: "成功、失败和还没想明白的部分，都值得留下。", article: [
      ["有趣，就是一个起点。", "硬件唠嗑室想留住的，是拿到一个新设备时那句「它还能做什么？」。开发板、电子玩具、传感器，甚至一个普通的按钮，都可能成为实验的起点。"],
      ["让兴奋的想法经得起实验。", "我们关注 AI 与硬件，也关注所有新奇的技术和交互。看到令人兴奋的演示，试着复现它；遇到不成立的假设，把测量和原因一起写下来。"],
      ["没跑通，也值得记录。", "一次串口排查、一份接线修正、一个暂时失败的方案，都可能帮下一个人少绕一点路。我们希望记录的不只有结果，还有问题、判断、尝试和改变主意的过程。"],
      ["把下一步留给更多人。", "尽量分享代码、设计文件、环境和复现步骤。说清楚哪些部分验证过，哪些还只是猜想。让别人能够接着做，也让一个小实验长出新的方向。"],
    ],
    heroAlt: "白色面包板上的开发板、小屏幕和按钮，屏幕显示像素笑脸", illustration: "硬件概念配图", logoLabel: "对话与电路", brandTitle: "一个符号，两种好奇。", brandDescription: "对话气泡容纳想法，电路触点把讨论接向动手实践。图标与网站、应用图标共用一套设计。", downloadLogo: "下载矢量 Logo", notFound: "这条线路还没接上。", backHome: "回到工作台",
  },
  en: {
    lang: "en", name: "Hardware Chatroom", nav: ["Projects", "Field notes", "About"],
    skip: "Skip to content", menu: "Open navigation", close: "Close navigation", join: "Come explore", more: "Learn more",
    kicker: "Curiosity, plugged in.", tagline: "聊聊硬件，动手做点好玩的。",
    intro: "An open, playful, curiosity-driven community for exploring hardware.",
    lead: "Rather than just talk about how impressive something is, we'd like to get our hands on it and see what it can actually do.",
    workbench: "On the workbench", workbenchEn: "IDEAS INTO EXPERIMENTS", allProjects: "Explore projects",
    workbenchIntro: "Start with a small question. Wire up an idea. See what happens next.", proposal: "Experiment idea", proposalNote: "These ideas are waiting for someone to start exploring. Help turn one into our first project.",
    ideas: [
      { title: "A tiny screen. A little curiosity.", text: "Start with an ESP32 and an OLED. See how a device might respond in its own way.", tag: "DIY & Prototyping", issue: "Experiment idea: ESP32 and a tiny screen", art: "screen" },
      { title: "Open it up. What else can it do?", text: "An electronic toy. An unanswered question. Follow the circuit to a new possibility.", tag: "Hardware Hacking", issue: "Experiment idea: electronic toy teardown", art: "circuit" },
    ],
    ideaAction: "Explore this idea", notes: "Field notes", allNotes: "Read the notes", noteTag: "Community note", noteTitle: "Start with a question. Leave a trail.", noteIntro: "Why we tinker with hardware, and why the attempts that don't work deserve a place here too.",
    explore: "What we're exploring", directions: [
      ["Hardware Hacking", "Device teardowns, protocol reverse engineering, firmware exploration, and hardware mods."],
      ["AI × Hardware", "Exploring how agents, voice interfaces, and smart devices connect with the physical world."],
      ["DIY & Prototyping", "From development boards to complete prototypes, bringing ideas to life."],
      ["Open Hardware", "Sharing open-source projects, tools, knowledge, and experiments others can reproduce."],
    ],
    invite: "Bring your weird ideas.", inviteEnd: "Let's play.", inviteText: "An unfinished project, a new electronic toy, or just a “what if?”. All welcome.", footer: "Talk hardware. Build things. Share the process. Have fun.",
    install: "Add to home screen", installed: "Installed", offline: "You're offline. Cached pages are still available.", online: "You're back online.", update: "A new version is ready", refresh: "Update", dismiss: "Dismiss", installTitle: "A workbench in your pocket.", installIntro: "Add Hardware Chatroom to your home screen and come back with a tap.", ios: "Open this site in Safari, tap Share, then choose Add to Home Screen.", manual: "Look for Install app or Add to home screen in your browser menu. Installation options vary by browser.", installReady: "Install Hardware Chatroom", offlineHint: "Recently visited pages are available offline. GitHub links need an internet connection.",
    aboutTitle: "Driven by curiosity. Made by hand.", aboutLabel: "ABOUT HARDWARE CHATROOM", aboutParagraphs: ["Hardware Chatroom is an open, playful, curiosity-driven community for exploring hardware.", "We love all kinds of interesting hardware: development boards, wearables, electronic toys, sensors, robots, and new devices whose possibilities are still waiting to be explored.", "We're interested in AI and hardware, but our curiosity doesn't stop at AI. New technologies, new products, and unusual ways to interact with devices can all spark our next experiment.", "Rather than just talk about how impressive something is, we'd like to get our hands on it and see what it can actually do."],
    beliefsTitle: "What we believe", beliefs: [
      ["Curiosity drives exploration.", "Not every project needs a clear business case. Being fun is a good enough reason."],
      ["Building is more fun than watching.", "We follow exciting trends, then reproduce, modify, and experiment to put those ideas to the test."],
      ["The process matters as much as the result.", "We document design, development, debugging, and the pitfalls along the way, so failed attempts can become useful lessons too."],
      ["Openness makes creating more fun.", "We share code, designs, tutorials, and ideas so others can reproduce, improve, or build something entirely different."],
    ],
    joinTitle: "It starts with a “what if?”.", joinIntro: "Whether you're an experienced hardware developer or just getting started with an ESP32, you're welcome at Hardware Chatroom.", joinSteps: [
      ["Bring an idea", "Tell us about a device, a question you'd like to test, or a wonderfully strange idea.", "Start an idea"],
      ["Share an experiment", "Share your wiring, code, measurements, and wrong turns. It doesn't need to be finished to be useful.", "Share your notes"],
      ["Make it better, together", "Have an improvement to the copy, design, or code? Open the repository and contribute a change.", "Explore the website repository"],
    ],
    notesLead: "The successes, the failures, and the questions still open. All worth keeping.", article: [
      ["Fun is a place to start.", "Hardware Chatroom is a place for the question that comes with a new device: “What else can it do?” A development board, an electronic toy, a sensor, or even an ordinary button can start an experiment."],
      ["Put exciting ideas to the test.", "We're interested in AI and hardware, and in all kinds of new technology and interaction. Try to reproduce an exciting demo. When a hypothesis doesn't hold up, share the measurements and the reasoning too."],
      ["It doesn't have to work to be worth sharing.", "A serial debugging session, a corrected wiring diagram, or a failed approach might help the next person take a shorter route. We want to keep the questions, judgments, attempts, and changes of mind alongside the results."],
      ["Leave the next step open.", "Share code, design files, environments, and reproduction steps where you can. Be clear about what's been verified and what's still a guess. Let others pick up the experiment and take it somewhere new."],
    ],
    heroAlt: "A development board, tiny screen, and button on a white breadboard, with a pixel smile on the screen", illustration: "Hardware concept illustration", logoLabel: "Conversation meets circuitry", brandTitle: "One mark. Two kinds of curiosity.", brandDescription: "A conversation bubble holds an idea. Circuit contacts connect it to hands-on exploration. One design for the community, the website, and the installed app.", downloadLogo: "Download the SVG logo", notFound: "This circuit isn't connected yet.", backHome: "Back to the workbench",
  },
};

export type Section = "projects" | "notes" | "about" | "join";
export const sections: Section[] = ["projects", "notes", "about", "join"];
