# Portraits

Drop investor portrait images here, named by their catalog number:

```
001.jpg   → Warren Buffett
002.jpg   → Charlie Munger
...
```

- Any file starting with the 3-digit number is detected automatically (`001.jpg`, `001.png`, etc.). The card markup currently points at `.jpg`, so prefer `.jpg`.
- Portrait orientation: vertical (3:4) works best; images are cropped with `object-fit: cover`.
- A duotone filter is applied in CSS so mismatched source photos blend into the gallery palette — no need to pre-edit them.
- Missing a portrait? The card falls back to an intentional gradient-and-initials placeholder, so the grid never looks broken.
