#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

STRICT=0
if [[ "${1:-}" == "--strict" ]]; then
  STRICT=1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is required to run repo maintenance." >&2
  exit 1
fi

if ! command -v rg >/dev/null 2>&1; then
  echo "rg is required to run repo maintenance." >&2
  exit 1
fi

mkdir -p "$REPO_ROOT/output/maintenance"

TIMESTAMP="$(date '+%Y%m%d-%H%M%S')"
REPORT_PATH="$REPO_ROOT/output/maintenance/daily-maintenance-$TIMESTAMP.md"

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || printf 'unknown')"
HEAD_SHORT="$(git rev-parse --short HEAD 2>/dev/null || printf 'unknown')"
RECENT_COMMIT="$(git log -1 --pretty=format:'%h %ad %s' --date=short 2>/dev/null || printf 'no commit info')"
GIT_STATUS="$(git status --short 2>/dev/null || true)"
STAGED_FILES="$(git diff --cached --name-only 2>/dev/null || true)"
UNSTAGED_FILES="$(git diff --name-only 2>/dev/null || true)"
UNTRACKED_FILES="$(git ls-files --others --exclude-standard 2>/dev/null || true)"

DELETED_STATUS_LINES="$(printf '%s\n' "$GIT_STATUS" | rg '^(D | D)' || true)"
DELETED_STATUS_COUNT="$(printf '%s\n' "$DELETED_STATUS_LINES" | sed '/^$/d' | wc -l | tr -d ' ')"
UNTRACKED_STATUS_LINES="$(printf '%s\n' "$GIT_STATUS" | rg '^\?\? ' || true)"
UNTRACKED_STATUS_COUNT="$(printf '%s\n' "$UNTRACKED_STATUS_LINES" | sed '/^$/d' | wc -l | tr -d ' ')"

SYNC_INDEX_WARNING=0
if [[ "${DELETED_STATUS_COUNT:-0}" -ge 20 && "${UNTRACKED_STATUS_COUNT:-0}" -ge 10 ]]; then
  SYNC_INDEX_WARNING=1
fi

LINK_AUDIT="$(python3 - "$REPO_ROOT" <<'PY'
from pathlib import Path
import re
import sys

root = Path(sys.argv[1])
excluded_parts = {".git", ".playwright-cli", "output"}
md_files = [
    path for path in root.rglob("*.md")
    if not any(part in excluded_parts for part in path.parts)
]
link_re = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
issues = []
checked = 0

for file in md_files:
    text = file.read_text(encoding="utf-8")
    for match in link_re.finditer(text):
        link = match.group(1).strip()
        if link.startswith(("http://", "https://", "mailto:", "#")):
            continue
        link = link.split("#", 1)[0]
        if not link:
            continue
        checked += 1
        target = (file.parent / link).resolve()
        if not target.exists():
            issues.append((str(file.relative_to(root)), link))

print(f"markdown_files={len(md_files)}")
print(f"relative_links_checked={checked}")
print(f"missing_relative_links={len(issues)}")
for file, link in issues[:50]:
    print(f"missing::{file}::{link}")
PY
)"

MARKDOWN_FILES="$(printf '%s\n' "$LINK_AUDIT" | awk -F= '/^markdown_files=/{print $2}')"
RELATIVE_LINKS_CHECKED="$(printf '%s\n' "$LINK_AUDIT" | awk -F= '/^relative_links_checked=/{print $2}')"
MISSING_RELATIVE_LINKS="$(printf '%s\n' "$LINK_AUDIT" | awk -F= '/^missing_relative_links=/{print $2}')"
MISSING_LINK_DETAILS="$(printf '%s\n' "$LINK_AUDIT" | rg '^missing::' || true)"

PLACEHOLDER_HITS="$(rg -n -S 'TODO|FIXME|TBD|placeholder|待补充|问题1|问题2|后续会继续补|下一步会继续补' \
  README.md about activities artists collaboration docs/venues members performances research works \
  -g '*.md' --glob '!.playwright-cli/**' --glob '!output/**' || true)"
PLACEHOLDER_COUNT="$(printf '%s\n' "$PLACEHOLDER_HITS" | sed '/^$/d' | wc -l | tr -d ' ')"

OPEN_TODO_HITS="$(rg -n '^- \[ \]' docs/next-wave-todo-2026-03-16.md || true)"
OPEN_TODO_COUNT="$(printf '%s\n' "$OPEN_TODO_HITS" | sed '/^$/d' | wc -l | tr -d ' ')"

STAGED_PLAYWRIGHT="$(printf '%s\n' "$STAGED_FILES" | rg '(^|/)\.playwright-cli/' || true)"
STAGED_PLAYWRIGHT_COUNT="$(printf '%s\n' "$STAGED_PLAYWRIGHT" | sed '/^$/d' | wc -l | tr -d ' ')"

if [[ -f "$REPO_ROOT/prototype/index.html" && -f "$REPO_ROOT/prototype/styles.css" && -f "$REPO_ROOT/prototype/app.js" ]]; then
  PROTOTYPE_STATE="present"
else
  PROTOTYPE_STATE="missing"
fi

if [[ -n "$GIT_STATUS" ]]; then
  GIT_WORKTREE_STATE="dirty"
else
  GIT_WORKTREE_STATE="clean"
fi

ACTION_LINES=()

if [[ "${MISSING_RELATIVE_LINKS:-0}" -gt 0 ]]; then
  ACTION_LINES+=("- P0: 修复 Markdown 相对坏链（${MISSING_RELATIVE_LINKS} 个）。")
fi

if [[ "${STAGED_PLAYWRIGHT_COUNT:-0}" -gt 0 ]]; then
  ACTION_LINES+=("- P0: 从 staged 中移除 .playwright-cli 临时调试产物。")
fi

if [[ "$SYNC_INDEX_WARNING" -eq 1 ]]; then
  ACTION_LINES+=("- P0: 当前工作区疑似出现同步盘/Git 索引异常，提交前先修复 deleted + untracked 大面积同时出现的问题。")
fi

if [[ "${PLACEHOLDER_COUNT:-0}" -gt 0 ]]; then
  ACTION_LINES+=("- P1: 清理明显占位与待补文本（当前命中 ${PLACEHOLDER_COUNT} 处）。")
fi

if [[ "${OPEN_TODO_COUNT:-0}" -gt 0 ]]; then
  ACTION_LINES+=("- P1: 复核 Next-Wave Todo 仍未完成的 ${OPEN_TODO_COUNT} 条事项，确认哪些已过期、哪些仍有效。")
fi

if [[ "$PROTOTYPE_STATE" == "present" ]]; then
  ACTION_LINES+=("- P2: 保持 prototype 与 docs/前台策略文档同步，避免前台原型和文字判断脱节。")
fi

if [[ "$GIT_WORKTREE_STATE" == "dirty" ]]; then
  ACTION_LINES+=("- P2: 在提交前确认当前工作区改动是否都属于本轮目标，避免把无关噪音一起带进版本。")
else
  ACTION_LINES+=("- 当前工作区干净，可以从结构优化或前台迭代开始下一轮。")
fi

{
  echo "# Daily Maintenance Report"
  echo
  echo "- date: $(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo "- branch: \`$BRANCH\`"
  echo "- head: \`$HEAD_SHORT\`"
  echo "- recent_commit: \`$RECENT_COMMIT\`"
  echo "- worktree: \`$GIT_WORKTREE_STATE\`"
  echo "- prototype: \`$PROTOTYPE_STATE\`"
  echo
  echo "## Git Snapshot"
  echo
  if [[ -n "$GIT_STATUS" ]]; then
    echo '```text'
    printf '%s\n' "$GIT_STATUS"
    echo '```'
  else
    echo "- worktree clean"
  fi
  echo
  echo "## Automated Checks"
  echo
  echo "- markdown_files: ${MARKDOWN_FILES:-0}"
  echo "- relative_links_checked: ${RELATIVE_LINKS_CHECKED:-0}"
  echo "- missing_relative_links: ${MISSING_RELATIVE_LINKS:-0}"
  echo "- placeholder_hits: ${PLACEHOLDER_COUNT:-0}"
  echo "- open_todos_in_next_wave: ${OPEN_TODO_COUNT:-0}"
  echo "- staged_playwright_artifacts: ${STAGED_PLAYWRIGHT_COUNT:-0}"
  echo "- deleted_status_lines: ${DELETED_STATUS_COUNT:-0}"
  echo "- untracked_status_lines: ${UNTRACKED_STATUS_COUNT:-0}"
  echo "- sync_index_warning: ${SYNC_INDEX_WARNING}"
  echo
  if [[ -n "$MISSING_LINK_DETAILS" ]]; then
    echo "### Missing Relative Links"
    echo
    printf '%s\n' "$MISSING_LINK_DETAILS" | sed 's/^missing::/- /; s/::/ -> /'
    echo
  fi
  if [[ -n "$PLACEHOLDER_HITS" ]]; then
    echo "### Placeholder Hits"
    echo
    echo '```text'
    printf '%s\n' "$PLACEHOLDER_HITS" | head -n 40
    echo '```'
    echo
  fi
  if [[ -n "$STAGED_PLAYWRIGHT" ]]; then
    echo "### Staged Temporary Artifacts"
    echo
    echo '```text'
    printf '%s\n' "$STAGED_PLAYWRIGHT"
    echo '```'
    echo
  fi
  if [[ "$SYNC_INDEX_WARNING" -eq 1 ]]; then
    echo "### Git Index Warning"
    echo
    echo "- The worktree shows many deleted tracked files and many untracked replacements at the same time."
    echo "- In this repository, that usually indicates a sync-volume or Git index mismatch rather than a normal content edit."
    echo "- Resolve this state before committing, or you risk creating a noisy or destructive history."
    echo
  fi
  if [[ -n "$OPEN_TODO_HITS" ]]; then
    echo "### Open Todo Lines"
    echo
    echo '```text'
    printf '%s\n' "$OPEN_TODO_HITS"
    echo '```'
    echo
  fi
  echo "## Suggested Next Actions"
  echo
  for line in "${ACTION_LINES[@]}"; do
    printf '%s\n' "$line"
  done
  echo
  echo "## Pre-Commit Recommendation"
  echo
  if [[ "${MISSING_RELATIVE_LINKS:-0}" -gt 0 || "${STAGED_PLAYWRIGHT_COUNT:-0}" -gt 0 || "$SYNC_INDEX_WARNING" -eq 1 ]]; then
    echo "- status: not ready for strict pre-commit"
  else
    echo "- status: ready for strict pre-commit"
  fi
} >"$REPORT_PATH"

echo "Daily maintenance report written to:"
echo "  $REPORT_PATH"
echo
echo "Summary:"
echo "  branch=$BRANCH head=$HEAD_SHORT worktree=$GIT_WORKTREE_STATE"
echo "  markdown_files=${MARKDOWN_FILES:-0} links_checked=${RELATIVE_LINKS_CHECKED:-0} missing_links=${MISSING_RELATIVE_LINKS:-0}"
echo "  placeholders=${PLACEHOLDER_COUNT:-0} open_todos=${OPEN_TODO_COUNT:-0} staged_playwright=${STAGED_PLAYWRIGHT_COUNT:-0}"

if [[ "$STRICT" -eq 1 ]]; then
  if [[ "${MISSING_RELATIVE_LINKS:-0}" -gt 0 ]]; then
    echo
    echo "Strict mode failed: Markdown relative links are broken." >&2
    exit 1
  fi

  if [[ "${STAGED_PLAYWRIGHT_COUNT:-0}" -gt 0 ]]; then
    echo
    echo "Strict mode failed: .playwright-cli artifacts are staged." >&2
    exit 1
  fi

  if [[ "$SYNC_INDEX_WARNING" -eq 1 ]]; then
    echo
    echo "Strict mode failed: probable sync-volume or Git index anomaly detected." >&2
    exit 1
  fi
fi
