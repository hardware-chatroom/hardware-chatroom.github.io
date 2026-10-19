# Explore content / 探索主页内容

The Explore page is a browsing destination, not a participation questionnaire. It aggregates published project articles and entries from `zh.json` / `en.json`. Empty collections stay empty; no placeholder posts or events are shown.

Project articles in `content/projects/` appear automatically. To announce an event, livestream/replay, or link an article, add an object to the corresponding language's JSON array:

```json
[
  {
    "id": "your-event",
    "kind": "event",
    "title": "活动名称",
    "summary": "活动内容、时间和参与方式。",
    "href": "https://example.com/event",
    "date": "2026-10-31",
    "label": "线上活动 · UTC+8",
    "draft": true
  }
]
```

Set `draft: false` to publish. `kind` is `article`, `event`, or `live`. Each id must be unique in its language. `href` must be an existing site path or HTTPS URL. Dates use `YYYY-MM-DD` for ordering; include exact time and timezone in summary or label when relevant. A livestream entry can link to its host or replay; the static site does not infer whether a broadcast is currently live. Commit/push to rebuild the feed and offline cache. This example is documentation only and is not displayed on the site.
