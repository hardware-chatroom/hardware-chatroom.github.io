export type ExploreItem = { id: string; kind: "article" | "event" | "live"; title: string; summary: string; href: string; date?: string; label?: string };
export const exploreCopy = {
  zh: { title: "一起探索", intro: "文章、活动、直播。找到下一件让你好奇的事。", nav: "探索", all: "全部", article: "文章", event: "活动", live: "直播", emptyTitle: "这里，留给接下来发生的事。", emptyText: "有新的文章、活动或直播时，会出现在这里。随时回来看看。", emptyCategory: "这个分类还没有发布内容。", read: "看看内容", eventAction: "查看活动", liveAction: "观看直播 / 回放", browse: "先看看内容" },
  en: { title: "Come explore", intro: "Articles, events, and livestreams. Find your next curious thing.", nav: "Explore", all: "All", article: "Articles", event: "Events", live: "Livestreams", emptyTitle: "A little room for what's next.", emptyText: "New articles, events, and livestreams will appear here. Come back anytime.", emptyCategory: "Nothing has been published in this category yet.", read: "Read the article", eventAction: "View the event", liveAction: "Watch live / replay", browse: "Explore the content" },
};

