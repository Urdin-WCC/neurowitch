# Neurowitch Core Libraries

This directory contains core libraries and utilities used throughout the Neurowitch application.

## Translation System

The application uses a centralized translation system to manage all user-facing text, implementing the requirements from Chapter 0, section 0.5 "Application Language":

> **Application Language**: IMPORTANT: While these development instructions are in English, the final application's user-facing interface (UI text, labels, messages, content) MUST be in Spanish. Ensure all user-visible text implemented in the components is in Spanish.

### How to Use Translations

All user-facing text should be loaded from the translation system. Never hardcode Spanish text directly in components.

```tsx
import { t } from "@/app/translations";

// Simple translation
const saveText = t("common", "save"); // "Guardar"

// Translation with parameters
const welcomeText = t("admin", "welcome", { params: ["Usuario"] }); // "Bienvenido, Usuario"

// For multiple translations from the same group, create a translator
import { createTranslator } from "@/app/translations";
const tCommon = createTranslator("common");
const saveText = tCommon("save");
const cancelText = tCommon("cancel");
```

### Adding New Translations

When adding new features that require UI text:

1. Identify the appropriate group for your text (or create a new one if needed)
2. Add your translations to the `translations` object in `app/translations.ts`
3. Use the translation functions in your components

For detailed documentation, see:
- [Translation System Documentation (English)](../docs/translation-system.md)
- [Documentación del Sistema de Traducciones (Español)](../docs/sistema-traducciones.md)
