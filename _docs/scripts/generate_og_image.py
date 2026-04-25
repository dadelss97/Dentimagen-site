#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from textwrap import fill

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS_DIR = ROOT / "website" / "assets"
OUTPUT_PATH = ASSETS_DIR / "og" / "dentimagen-og-1200x630.jpg"
LOGO_PATH = ASSETS_DIR / "logo-dentimagen.png"
PHOTO_PATH = ASSETS_DIR / "photos" / "home-hero-equipo-02.webp"

WIDTH = 1200
HEIGHT = 630


def load_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


TITLE_FONT = load_font(
    [
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ],
    62,
)
BODY_FONT = load_font(
    [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ],
    28,
)
EYEBROW_FONT = load_font(
    [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ],
    18,
)
PILL_FONT = load_font(
    [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ],
    18,
)
BADGE_FONT = load_font(
    [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ],
    19,
)


def hex_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def lerp_color(start: tuple[int, int, int], end: tuple[int, int, int], ratio: float) -> tuple[int, int, int]:
    return tuple(int(start[i] + (end[i] - start[i]) * ratio) for i in range(3))


def create_background() -> Image.Image:
    top = hex_rgb("#fff8f1")
    bottom = hex_rgb("#f1e6da")
    accent = hex_rgb("#ece2ff")

    background = Image.new("RGBA", (WIDTH, HEIGHT))
    pixels = background.load()

    for y in range(HEIGHT):
        vertical_ratio = y / max(HEIGHT - 1, 1)
        for x in range(WIDTH):
            horizontal_ratio = x / max(WIDTH - 1, 1)
            base = lerp_color(top, bottom, vertical_ratio)
            accent_mix = max(0.0, min(1.0, (horizontal_ratio - 0.56) / 0.44))
            pixels[x, y] = (*lerp_color(base, accent, accent_mix * 0.34), 255)

    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.ellipse((780, -110, 1320, 390), fill=(109, 40, 217, 28))
    draw.ellipse((720, 340, 1180, 820), fill=(10, 22, 40, 22))
    draw.rounded_rectangle((68, 60, 728, 570), radius=38, fill=(255, 251, 247, 228))

    blur = overlay.filter(ImageFilter.GaussianBlur(radius=18))
    return Image.alpha_composite(background, blur)


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    source_w, source_h = image.size
    source_ratio = source_w / source_h
    target_ratio = target_w / target_h

    if source_ratio > target_ratio:
        scaled_h = target_h
        scaled_w = int(target_h * source_ratio)
    else:
        scaled_w = target_w
        scaled_h = int(target_w / source_ratio)

    resized = image.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
    left = max(0, (scaled_w - target_w) // 2)
    top = max(0, (scaled_h - target_h) // 2)
    return resized.crop((left, top, left + target_w, top + target_h))


def add_photo_card(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    card_box = (760, 78, 1128, 554)
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((748, 90, 1138, 566), radius=34, fill=(10, 22, 40, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=18))
    canvas.alpha_composite(shadow)

    card = Image.new("RGBA", (card_box[2] - card_box[0], card_box[3] - card_box[1]), (0, 0, 0, 0))
    if PHOTO_PATH.exists():
        photo = Image.open(PHOTO_PATH).convert("RGBA")
        fitted = cover(photo, card.size)
        card.paste(fitted, (0, 0))
    else:
        fallback = Image.new("RGBA", card.size, (10, 22, 40, 255))
        fallback_draw = ImageDraw.Draw(fallback)
        fallback_draw.rectangle((0, 0, card.size[0], card.size[1]), fill=(10, 22, 40, 255))
        card = fallback

    gradient_overlay = Image.new("RGBA", card.size, (0, 0, 0, 0))
    gradient_pixels = gradient_overlay.load()
    for y in range(card.size[1]):
        alpha = int(110 + (145 * (y / max(card.size[1] - 1, 1))))
        for x in range(card.size[0]):
            gradient_pixels[x, y] = (10, 22, 40, alpha)
    card = Image.alpha_composite(card, gradient_overlay)

    mask = Image.new("L", card.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle((0, 0, card.size[0], card.size[1]), radius=32, fill=255)

    bordered = Image.new("RGBA", card.size, (0, 0, 0, 0))
    bordered.paste(card, (0, 0), mask)
    canvas.paste(bordered, (card_box[0], card_box[1]), mask)

    draw.rounded_rectangle(card_box, radius=32, outline=(255, 255, 255, 96), width=2)
    draw.rounded_rectangle((792, 110, 1032, 154), radius=18, fill=(255, 255, 255, 218))
    draw.text((816, 121), "Primera consulta gratis", font=BADGE_FONT, fill=hex_rgb("#0a1628"))
    draw.rounded_rectangle((786, 486, 1088, 530), radius=18, fill=(109, 40, 217, 230))
    draw.text((810, 498), "Tecnologia moderna + trato humano", font=BADGE_FONT, fill=(255, 255, 255))


def add_logo(canvas: Image.Image) -> None:
    if not LOGO_PATH.exists():
        return

    logo = Image.open(LOGO_PATH).convert("RGBA")
    target_w = 336
    target_h = int(target_w * logo.size[1] / logo.size[0])
    logo = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    canvas.paste(logo, (88, 92), logo)


def draw_pill(draw: ImageDraw.ImageDraw, xy: tuple[int, int, int, int], text: str, *, fill_color: tuple[int, int, int, int], text_color: tuple[int, int, int]) -> None:
    draw.rounded_rectangle(xy, radius=20, fill=fill_color)
    left, top, right, bottom = xy
    bbox = draw.textbbox((0, 0), text, font=PILL_FONT)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    draw.text(
        (left + ((right - left - text_w) / 2), top + ((bottom - top - text_h) / 2) - 2),
        text,
        font=PILL_FONT,
        fill=text_color,
    )


def add_copy(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    accent = hex_rgb("#6d28d9")
    navy = hex_rgb("#0a1628")
    muted = hex_rgb("#4a5568")

    draw.text((88, 178), "CLINICA DENTAL EN QUITO", font=EYEBROW_FONT, fill=accent)

    title = "Norte Quito y\nCumbaya"
    draw.multiline_text((88, 214), title, font=TITLE_FONT, fill=navy, spacing=6)

    subtitle = fill(
        "Implantes, ortodoncia y estetica dental con tecnologia moderna, sedes en Norte Quito y Cumbaya, y atencion cercana para toda la familia.",
        width=38,
    )
    draw.multiline_text((88, 388), subtitle, font=BODY_FONT, fill=muted, spacing=10)

    draw.line((88, 530, 182, 530), fill=accent, width=4)
    draw_pill(draw, (88, 544, 330, 590), "www.dentimagen.net", fill_color=(255, 255, 255, 224), text_color=navy)
    draw_pill(draw, (348, 544, 620, 590), "WhatsApp: +593 99 423 6117", fill_color=(109, 40, 217, 230), text_color=(255, 255, 255))


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    canvas = create_background()
    add_photo_card(canvas)
    add_logo(canvas)
    add_copy(canvas)
    rgb_canvas = canvas.convert("RGB")
    rgb_canvas.save(OUTPUT_PATH, format="JPEG", quality=90, optimize=True, progressive=True)
    print(f"Created {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
