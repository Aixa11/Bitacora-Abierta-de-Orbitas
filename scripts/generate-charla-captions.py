# -*- coding: utf-8 -*-
"""Genera captions-es.vtt y captions-en.vtt desde las speaker notes."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NOTES = ROOT / "public" / "media" / "charla" / "_speaker-notes.txt"
OUT_DIR = NOTES.parent

EN_SUMMARY: dict[int, str] = {
    1: (
        "Before the title, look at the image. It is a real photograph of Earth by the EPIC "
        "camera on DSCOVR (7 Oct 2026), about 1.5 million km away. NASA and ESA publish these "
        "views for free. This hour: learn to read them — what you see, how it was made, what "
        "decision it allows."
    ),
    2: (
        "Three stops map the hour: (1) from image to decision — GEOINT and how satellites look; "
        "(2) real cases — fire, water, forest, ice, ocean, hurricane; (3) open NASA and ESA data, "
        "Landsat vs Sentinel, and a live map in the browser."
    ),
    3: (
        "First stop: understand. Mixed audience is fine. Same path every image: what an untrained "
        "eye sees, how the satellite built the view, then the decision it enables. That path is "
        "geospatial intelligence on already published data."
    ),
    4: (
        "GEOINT: image + location + analysis = decision. Image is raw material; location ties "
        "every pixel to Earth; analysis translates what green means; decision is what we do. "
        "Example: where do crops need water this week?"
    ),
    5: (
        "Optical is like a phone camera — needs sunlight; clouds and night block the ground. "
        "Radar is like an echo — own microwave signal works at night and through clouds. "
        "Landsat/Sentinel-2 for how it looks; Sentinel-1/NISAR for water through clouds."
    ),
    6: (
        "Four instruments, four questions: optical (what color?), thermal (where is extra heat?), "
        "radar (did the surface change?), lidar (how tall?). Camera, thermometer, echo, ruler. "
        "Pick one question for Space Apps."
    ),
    7: (
        "Same Nile Delta, same day (12 Jul 2024), MODIS Terra: true color vs near-infrared false "
        "color. Healthy leaves bounce NIR; painting it green separates plants from soil. "
        "Available in NASA Worldview / GIBS."
    ),
    8: (
        "Three circles = the full path on the same delta: photo → false color → NDVI (a painted "
        "number). Cite dates: July 2024 for photo/false color; 8-day NDVI composite July 2025."
    ),
    9: (
        "Everything that follows is real data. The method does not change: image first, "
        "conclusion second."
    ),
    10: (
        "Two layers in one view: smoke is the photograph; red points are heat detections placed "
        "with coordinates (FIRMS / VIIRS)."
    ),
    11: (
        "Read the color code first, then before/after. Electric green is vegetation; dark blue is "
        "water; pale cyan is cloud."
    ),
    12: (
        "Dark green is forest; light brown is open soil. A white cloud in year 2000 is not a "
        "clearing."
    ),
    13: (
        "One portrait, not a before/after. White is ice; turquoise is lakes. The memory since "
        "1972 is the method — and it lives in Landsat."
    ),
    14: (
        "In 2000 the south is a green water body. In 2024 that same body is a pale desert. The "
        "smaller north still holds water."
    ),
    15: (
        "Black is land, not sea. Colors are only the ocean — and they are the difference from "
        "normal, not the water’s true color."
    ),
    16: (
        "True-color photo. White is cloud. The tighter center of the spiral is the eye. Land "
        "appears above."
    ),
    17: (
        "Same delta as before, at night. The brightest light below is Cairo. Surrounding black is "
        "desert without lights — not a hole in the data."
    ),
    18: "You already know how to read. Now learn where to reopen each scene.",
    19: (
        "Three doors, all free, each owning a file type. Create your account today: Earthdata, "
        "Landsat/EarthExplorer, Copernicus Data Space."
    ),
    20: "Say it slowly: decades of change? Landsat. This neighborhood this month? Sentinel-2.",
    21: "You do not need the last step. The first already yields a citable figure.",
    22: (
        "The demo teaches the gesture, not a perfect place: location, layer, two dates, and say "
        "aloud what the color means."
    ),
    23: (
        "Do not open registrations live. This slide is for the photo. The title is the logbook; "
        "below is the official step-by-step."
    ),
    24: "Each idea rests on an image you already read. Choose one in silence.",
    25: (
        "Start with the question. The figure caption must carry sensor, date, color recipe, and "
        "source."
    ),
    26: "Leave the link on screen about eight seconds for photos and notes.",
    27: (
        "Read the final line slowly. If time remains, one question. Hard stop at minute 60."
    ),
}


def ts_vtt(sec: float) -> str:
    if sec < 0:
        sec = 0.0
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = sec % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}"


def chunk_words(text: str, max_words: int = 16) -> list[str]:
    words = text.split()
    if not words:
        return []
    return [" ".join(words[i : i + max_words]) for i in range(0, len(words), max_words)]


def write_vtt(path: Path, language: str, cues: list[tuple[float, float, str]]) -> None:
    lines = ["WEBVTT", f"Kind: captions", f"Language: {language}", ""]
    n = 0
    for a, b, text in cues:
        if b <= a:
            b = a + 1.0
        safe = text.replace("-->", "→").strip()
        if not safe:
            continue
        n += 1
        lines.append(str(n))
        lines.append(f"{ts_vtt(a)} --> {ts_vtt(b)}")
        words = safe.split()
        if len(words) > 14:
            mid = len(words) // 2
            lines.append(" ".join(words[:mid]))
            lines.append(" ".join(words[mid:]))
        else:
            lines.append(safe)
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {path.name} cues={n}")


def main() -> int:
    if not NOTES.is_file():
        print(f"missing notes: {NOTES}", file=sys.stderr)
        return 1

    notes = NOTES.read_text(encoding="utf-8")
    pat = re.compile(
        r"L[aá]mina\s+(\d+)\s*·\s*entra\s+(\d+):(\d+)\s*·\s*dura\s+(\d+):(\d+)",
        re.I,
    )
    starts = list(pat.finditer(notes))
    if len(starts) < 20:
        print(f"unexpected lamina count: {len(starts)}", file=sys.stderr)
        return 1

    blocks: list[tuple[int, int, int, str, str]] = []
    for i, m in enumerate(starts):
        num = int(m.group(1))
        start_s = int(m.group(2)) * 60 + int(m.group(3))
        dur_s = int(m.group(4)) * 60 + int(m.group(5))
        end_s = start_s + dur_s
        chunk = notes[m.end() : starts[i + 1].start() if i + 1 < len(starts) else len(notes)]
        emph = re.search(
            r"DEN MÁS ÉNFASIS:\s*(.+?)(?:\n⏱|\nNO DIGAS|\nRELOJ|\nDECIR:)",
            chunk,
            re.S,
        )
        decir_m = re.search(r"DECIR:\s*(.*)", chunk, re.S)
        text = ""
        if decir_m:
            text = decir_m.group(1)
            text = re.split(r"\nL[aá]mina\s+\d+", text)[0]
        text = re.sub(r"\nExplora la Tierra.*?\n\d+\n", "\n", text)
        text = re.sub(r"\(silencio[^)]*\)", "", text)
        text = re.sub(r"\s+", " ", text).strip()
        emph_txt = re.sub(r"\s+", " ", emph.group(1)).strip() if emph else ""
        blocks.append((num, start_s, end_s, text, emph_txt))

    es_cues: list[tuple[float, float, str]] = []
    en_cues: list[tuple[float, float, str]] = []
    for num, start_s, end_s, text, emph in blocks:
        parts = chunk_words(text, 16)
        if parts:
            slot = (end_s - start_s) / len(parts)
            for j, part in enumerate(parts):
                a = start_s + j * slot
                b = start_s + (j + 1) * slot
                es_cues.append((a, b, part))

        en_text = EN_SUMMARY.get(num) or emph or text[:280]
        en_parts = chunk_words(en_text, 18)
        if en_parts:
            slot_e = (end_s - start_s) / len(en_parts)
            for j, part in enumerate(en_parts):
                a = start_s + j * slot_e
                b = start_s + (j + 1) * slot_e
                en_cues.append((a, b, part))

    es_cues.append(
        (
            3600.0,
            5458.0,
            "Espacio de preguntas y conversación con el público. "
            "Subtítulos de la charla principal terminan aquí.",
        )
    )
    en_cues.append(
        (
            3600.0,
            5458.0,
            "Q&A and audience conversation. Captions for the main talk end here.",
        )
    )

    write_vtt(OUT_DIR / "captions-es.vtt", "es", es_cues)
    write_vtt(OUT_DIR / "captions-en.vtt", "en", en_cues)
    NOTES.unlink(missing_ok=True)
    print("removed temporary speaker notes from public/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
