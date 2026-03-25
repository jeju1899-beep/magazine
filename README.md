# Luxury Magazine Flipbook Viewer

A minimal web-based premium flipbook viewer for image-based magazine presentations.

## Usage

1. Put your page files in `images/` with exact names: `001.jpg` ... `018.jpg`.
2. Open `index.html` in any modern browser.

## 미리보기 방법

### 1) 가장 간단한 방법 (로컬 서버)

```bash
cd /workspace/magazine
python3 -m http.server 4173
```

브라우저에서 아래 주소를 여세요.

- `http://localhost:4173`

### 2) 빠른 확인 (파일 직접 열기)

- `index.html` 파일을 브라우저로 직접 열어도 동작합니다.
- 다만 모바일 스와이프/캐시 동작까지 안정적으로 확인하려면 로컬 서버 방식(위 1번)을 권장합니다.

## Features

- Cover-first presentation (single-page cover)
- Double-page spread viewing for interior pages
- Keyboard, click-zone, and touch-swipe navigation
- Calm white/grey/black UI with smooth flip transitions
- Preserves image proportions (no crop, no distortion)
