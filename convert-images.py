import sys, shutil
from pathlib import Path
from PIL import Image
import pillow_avif  # noqa

root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
print(f"📁 {root}\n")

# 1) me.png → me-96.avif + me-96.webp + me-96.png
src = root / "public" / "photo" / "me.png"
if src.exists():
    img = Image.open(src).convert("RGBA")
    # center crop مربّع
    d = min(img.size); img = img.crop(((img.width-d)//2, (img.height-d)//2, (img.width+d)//2, (img.height+d)//2))
    img = img.resize((96, 96), Image.LANCZOS)
    img.save(src.parent / "me-96.avif", format="AVIF", quality=80)
    img.save(src.parent / "me-96.webp", format="WEBP", quality=85, method=6)
    img.save(src.parent / "me-96.png", format="PNG", optimize=True)
    print(f"✅ me-96.avif/webp/png — من {src.stat().st_size//1024} KiB لـ ~2-5 KiB")
else:
    print("⚠️ public/photo/me.png غير موجود")

# 2) full-moon.webp → أصغر
src = root / "src" / "assets" / "full-moon.webp"
if src.exists():
    img = Image.open(src)
    if img.size[0] > 1500:
        shutil.copy2(src, src.with_suffix(".webp.bak"))
        img.resize((1500, 1500), Image.LANCZOS).save(src, format="WEBP", quality=85, method=6)
        print(f"✅ full-moon.webp resized لـ 1500×1500")
    else:
        print("ℹ️ full-moon.webp أصلاً صغير")

# 3) hero-poster.jpg → مضغوط
src = root / "public" / "photo" / "hero-poster.jpg"
if src.exists():
    img = Image.open(src).convert("RGB")
    if img.size[0] > 1200:
        r = 1200/img.size[0]; img = img.resize((1200, int(img.size[1]*r)), Image.LANCZOS)
        shutil.copy2(src, src.with_suffix(".jpg.bak"))
        img.save(src, format="JPEG", quality=82, optimize=True, progressive=True)
        print(f"✅ hero-poster.jpg مضغوط")

print("\n🎉 خلّص. عدّل src في Navigation.tsx لـ /photo/me-96.png")